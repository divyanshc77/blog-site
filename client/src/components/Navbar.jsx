import React from "react";
import { Link, NavLink ,useNavigate} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import "./nav.css";
import { HashLoader } from "react-spinners";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "../ThemeContext";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {theme} =useContext(ThemeContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://cheap-blog-site.onrender.com/user", {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUserInfo(data);
        });
      }
    });
  }, []);

  const logout = () => {
    setLoading(true);
    fetch("https://cheap-blog-site.onrender.com/logout", {
      credentials: "include",
      method: "POST",
    }).then((response) => {
      setUserInfo(null);
      setLoading(false);
      navigate("/")
    });
  };

  const username = userInfo?.username;

  return (
    <>
      {loading && (
        <div className="backdrop">
          <HashLoader color="#1a1a1a" className="loader" />
        </div>
      )}
      <header>
        <Link to="/" className={`logo ${theme}`}>
          YodaBlog
        </Link>
        <nav>
          <ThemeToggle />
          {username && (
            <>
              <NavLink to="/create-post" className={`${theme}`}>Create Post</NavLink>
              <button className="button-27" role="button" onClick={logout}>
                <a className="logout">
                  Logout
                </a>
              </button>
              <NavLink to={`/user/${userInfo.id}`} className={`${theme}`}>{username}</NavLink>
            </>
          )}
          {!username && (
            <>
              <NavLink to="/login" className={`${theme}`}>Login</NavLink>
              <NavLink to="/register" className={`${theme}`}>Register</NavLink>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
