import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { HashLoader } from "react-spinners";
import Card from "../components/card";

import "./profile.css";

const ProfilePage = () => {
  const { userInfo } = useContext(UserContext);
  const [myPosts, setMyPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://cheap-blog-site.onrender.com/user/myposts/${userInfo.id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((posts) => {
        return posts.json();
      })
      .then((data) => {
        // console.log(data);
        setMyPosts(data);
      });

    fetch(`https://cheap-blog-site.onrender.com/user/likedposts/${userInfo.id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((posts) => {
        return posts.json();
      })
      .then((data) => {
        // console.log(data);
        setLikedPosts(data);
        setLoading(false);
      });

    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="backdrop">
          <HashLoader color="#1a1a1a" className="loader" />
        </div>
      ) : (
        <>
          <div>
            <h1 className="user-profile">
              <span className="user-name">@{userInfo?.username}</span>
            </h1>
            <div>
              <h2 className="post-category">
                Your Posts :
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </h2>
              <div className="post-container">
                {myPosts.map((post) => {
                  return (
                    <Link
                      to={`/post/${post?._id}`}
                      className="card-link"
                      key={Math.floor(Math.random() * 100000000)}
                      s
                    >
                      <Card {...post} />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <h2 className="post-category">
                Liked Posts :{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </h2>
              <div className="post-container">
                {likedPosts.map((post) => {
                  return (
                    <Link
                      to={`/post/${post?._id}`}
                      className="card-link"
                      key={Math.floor(Math.random() * 100000000)}
                    >
                      <Card {...post} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePage;
