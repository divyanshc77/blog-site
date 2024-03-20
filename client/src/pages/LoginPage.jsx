import { useState, useContext,useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { HashLoader } from "react-spinners";

const LoginPage = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(()=>{
    alert("Dummy Credentials can be used if wanted.                                   Username: aman Password: aman")
  },[])

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("https://cheap-blog-site.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    setTimeout(() => {
      setLoading(false);
    }, 10000);
    if (response.ok) {
      const data = await response.json();
      setUserInfo(data);
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
      alert("Wrong username or password");
    }
  };

  return (
    <>
      {loading && (
        <div className="backdrop">
          <HashLoader color="#1a1a1a" className="loader" />
        </div>
      )}
      <form className="login" onSubmit={submitHandler}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="button-28" role="button">
          Enter
        </button>
      </form>
    </>
  );
};

export default LoginPage;
