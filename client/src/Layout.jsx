import {useContext} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar";
import { ThemeContext } from "./ThemeContext";

const Layout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`main-guy ${theme}`}>
      <main>
        <Navbar />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout