import "./App.css";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Indexpage from "./pages/Indexpage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPage from "./pages/EditPage";
import ProfilePage from "./pages/ProfilePage";
import PageNotFound from "./components/PageNotFound";

import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </UserContextProvider>   
  );
}

export default App;
