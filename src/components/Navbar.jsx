import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import "../styles/style.css";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const { user, logOutUser, darkMode, setDarkMode } = useContext(AuthContext);
  const links = (
    <div className="lg:flex gap-2 space-y-1 lg:space-y-0">
      <li>
        <NavLink to={"/"} className="custom-link">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/allServices"} className={"custom-link"}>
          Services
        </NavLink>
      </li>
      <li className="relative">
        <details className="absolute">
          <summary className={"custom-link"}>Dashboard</summary>
          <ul className="p-2">
            <li>
              <NavLink to={"/login"} className={"dropdown"}>
                Add Service
              </NavLink>
            </li>
            <li>
              <NavLink to={"/login"} className={"dropdown"}>
                Manage Service
              </NavLink>
            </li>
            <li>
              <NavLink to={"/login"} className={"dropdown"}>
                Booked-Services
              </NavLink>
            </li>
            <li>
              <NavLink to={"/login"} className={"dropdown"}>
                Service-To-Do
              </NavLink>
            </li>
          </ul>
        </details>
      </li>
    </div>
  );

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          EduVerse
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            {user && user.photoURL && (
              <img
                referrerPolicy="no-referrer"
                title={user.displayName}
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 border-2 cursor-pointer border-gray-400 rounded-full object-cover"
              />
            )}
          </div>
          <div>
            {user && user.displayName ? (
              <div className="flex items-center gap-3">
                <h6 className="font-semibold hidden md:block">
                  {user.displayName}
                </h6>
                <button
                  onClick={logOutUser}
                  className="btn bg-red-500 text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to={"/login"} className="btn">
                Login
              </Link>
            )}
          </div>
          <button onClick={handleThemeToggle} className="btn">
            {darkMode ? <MdDarkMode /> : <MdLightMode />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
