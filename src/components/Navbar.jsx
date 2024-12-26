import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import "../styles/style.css";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import logo from "../assets/education.png";

const Navbar = () => {
  const { user, logOutUser, darkMode, setDarkMode } = useContext(AuthContext);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
      document.documentElement.classList.toggle("dark", JSON.parse(savedTheme));
    }
  }, [setDarkMode]);

  const links = (
    <ul className="lg:flex items-center gap-5 text-gray-800 dark:text-gray-200">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "custom-link active" : "custom-link"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allServices"
          className={({ isActive }) =>
            isActive ? "custom-link active" : "custom-link"
          }
        >
          Services
        </NavLink>
      </li>
      {user && (
        <li className="relative group">
          <div className="custom-link cursor-pointer">Dashboard</div>
          <ul className="dropdown-content absolute hidden group-hover:flex flex-col bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg w-40 gap-2 text-center">
            <li>
              <NavLink
                to="/addService"
                className={({ isActive }) =>
                  isActive ? "dropdown-item active" : "dropdown-item"
                }
              >
                Add Service
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manageServices"
                className={({ isActive }) =>
                  isActive ? "dropdown-item active" : "dropdown-item"
                }
              >
                Manage Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bookedService"
                className={({ isActive }) =>
                  isActive ? "dropdown-item active" : "dropdown-item"
                }
              >
                Booked Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/serviceToDo"
                className={({ isActive }) =>
                  isActive ? "dropdown-item active" : "dropdown-item"
                }
              >
                Service To-Do
              </NavLink>
            </li>
          </ul>
        </li>
      )}

      <li>
        <NavLink
          to="/instructor"
          className={({ isActive }) =>
            isActive ? "custom-link active" : "custom-link"
          }
        >
          Instructor
        </NavLink>
      </li>
    </ul>
  );

  return (
    <div className="navbar bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-lg">
      <div className="navbar-start">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="" />
          <span className="text-2xl font-bold text-red-500">EduVerse</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">{links}</div>
      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            {user.photoURL && (
              <img
                referrerPolicy="no-referrer"
                title={user.displayName}
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full border-2 border-green-500"
              />
            )}
            <span className="font-semibold hidden md:block">
              {user.displayName}
            </span>
            <button
              onClick={logOutUser}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-green-500 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-500 transition duration-300"
          >
            Login
          </Link>
        )}
        <button
          onClick={handleThemeToggle}
          className="p-2 ml-2 md:ml-0 bg-gray-200 dark:bg-gray-700 rounded-full"
        >
          {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
        </button>
      </div>

      <div className="navbar-center ml-2 lg:hidden">
        <div className="dropdown relative">
          <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul className="dropdown-content absolute right-0 mt-2 w-48 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-lg p-2">
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
