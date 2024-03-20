import { useState, useEffect } from "react";
import Post from "../components/Post";
import { HashLoader } from "react-spinners";

const Indexpage = () => {
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://cheap-blog-site.onrender.com/posts").then((posts) => {
      posts.json().then((posts) => {
        // console.log(posts);
        setPosts(posts);
      });
      setLoading(false);
    });
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 10000);

  return (
    <>
      {loading && (
        <div className="backdrop">
          <HashLoader color="#1a1a1a" className="loader" />
        </div>
      )}
      {Posts.length > 0 ? (
        Posts.map((post) => {
          return <Post {...post} key={Math.floor(Math.random()*100000000)} />;
        })) : (
          <>
          <div  className="not-found">
          <h1>No posts found</h1>
          <h2>Maybe you can contribute to our page. Register and share.</h2>
          </div>
          </>
        )}
    </>
  );
};

export default Indexpage;
