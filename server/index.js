const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

//importing models
const User = require("./models/User");
const Post = require("./models/Post");

const salt = bcrypt.genSaltSync(10);
const secret = process.env.secret;

//---------------------------------------
//            Middleware
//---------------------------------------
app.use(
  cors({ origin: "https://cheap-blog-site.netlify.app", credentials: true })
);
app.use(express.json());
app.use(cookieParser());

//---------------------------------------
//            Regarding User
//---------------------------------------
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
      likedPosts: [],
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: "Username already exists" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const result = bcrypt.compareSync(password, user.password);
    if (result) {
      //we will return jsonwebtoken
      jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { sameSite: "none", secure: true }).json({
          id: user._id,
          username: user.username,
          likedPosts: user.likedPosts,
        });
      });
    } else {
      res.status(400).json("Wrong Credentials");
    }
  } else res.status(400).json("Wrong Credentials");
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.get("/user", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) return res.status(401).json(err);
    // console.log("reached for userinfo")
    const user = await User.findById(decoded.id);
    // console.log(user);
    res.json(user);
  });
});

app.get("/user/myposts/:id", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) return res.status(401).json(err);
    const posts = await Post.find({ author: decoded.id });
    res.json(posts);
  });
});

app.get("/user/likedposts/:id", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) return res.status(401).json(err);
    const user = await User.findById(decoded.id);
    let posts = [];

    for (let i = 0; i < user.likedPosts.length; i++) {
      posts.push(await Post.findById(user.likedPosts[i]));
    }
    res.json(posts);
  });
});

//-------------------------------------------
//            Regarding Likes
//-------------------------------------------

app.put("/like/:id", async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  // console.log("reached to like here");

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) return res.status(401).json(err);
    const user = await User.findById(decoded.id);
    const likedPosts = user.likedPosts;
    likedPosts.push(id);
    // console.log(likedPosts);
    // //update the user
    await User.findOneAndUpdate(
      { _id: decoded.id.toString() },
      { likedPosts: likedPosts }
    );
    res.json(likedPosts);
  });
});

app.put("/dislike/:id", async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) return res.status(401).json(err);
    const user = await User.findById(decoded.id);
    let likedPosts = user.likedPosts;
    const k = likedPosts.findIndex((i) => {
      return i.toString() === id;
    });
    likedPosts.splice(k, 1);
    // //update the user
    await User.findOneAndUpdate(
      { _id: decoded.id.toString() },
      { likedPosts: likedPosts }
    );
    res.json(likedPosts);
  });
});

//-------------------------------------------
//            Regarding Posts
//-------------------------------------------

app.post("/uploadPost", async (req, res) => {
  const { title, summary, imageUrl, content } = req.body;

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) return res.status(401).json(err);
    const post = await Post.create({
      title,
      summary,
      imageUrl,
      content,
      author: decoded.id,
    });
    res.json(post);
  });
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(15);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  // console.log("reached here");
  const { id } = req.params;
  const post = await Post.findById(id).populate("author", ["username"]);
  res.json(post);
});

app.put("/update/:id", async (req, res) => {
  // console.log("reached here to update");
  const { title, summary, imageUrl, content } = req.body;
  const { token } = req.cookies;
  const { id } = req.params;

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) return res.status(401).json(err);
    const post = await Post.findById(id);
    const result = post.author.toString() === decoded.id.toString();
    if (!result) return res.status(401).json("Not Authorized");
    await Post.findOneAndUpdate(
      { _id: id.toString() },
      { title, summary, imageUrl, content }
    );
    res.json("ok");
  });
});

app.delete("/post/delete/:id", async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) return res.status(401).json(err);
    const post = await Post.findById(id);
    const result = post.author.toString() === decoded.id.toString();
    if (!result) return res.status(401).json("Not Authorized");
    await Post.deleteOne({ _id: id.toString() });
    res.json("ok");
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Connected to DB");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
