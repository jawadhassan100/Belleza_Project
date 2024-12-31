import { useContext, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import config from '../../config/config';

const BASE_URL = config.BASE_URL;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, setIsAdmin } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/api/logout`, {}, {
        withCredentials: true,
        headers: { Authorization: `${token}` },
      });

      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        setIsAdmin(false);
        enqueueSnackbar(response.data.msg, { variant: "success", autoHideDuration: 1000 });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.msg || error.msg, { variant: "error", autoHideDuration: 1000 });
    }
  };

  return (
    <div>
      {/* Main Navbar */}
      <div className="flex justify-between items-center px-4 py-4 sm:px-8 fixed z-50 w-full lg:px-16 bg-purple-500">
        {/* Left: Logo */}
        <div className="text-2xl font-bold md:text-[28px] lg:text-[32px] text-white">
          <Link to="/">BELLEZA</Link>
        </div>

        {/* Right: Menu Items, Cart Icon, and Logout */}
        <div className="flex items-center space-x-8 text-white font-semibold text-lg">
          <div className="hidden md:flex gap-4 space-x-6">
            <Link to="/" className="hover:text-purple-900 transition duration-300">
              Home
            </Link>
            <Link to="/about-us" className="hover:text-purple-900 transition duration-300">
              About Us
            </Link>
            <Link to="/product/image" className="hover:text-purple-900 transition duration-300">
              Product
            </Link>
            {isAdmin && (
              <Link to="/dashboard" className="hover:text-purple-900 transition duration-300">
                Dashboard
              </Link>
            )}
            <Link to="/contact-us" className="hover:text-purple-900 transition duration-300">
              Contact Us
            </Link>
          </div>


          {isAdmin && (
            <button
              onClick={handleLogout}
              className="bg-purple-700 text-white font-semibold px-5 py-1 rounded-sm hover:bg-purple-900 hidden md:block lg:block"
            >
              Logout
            </button>
          )}

          {/* Hamburger Menu Button for Small Screens */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <CiMenuFries className="text-2xl text-white" />
          </button>
        </div>
      </div>

      {/* Sliding Menu for Smaller Screens */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-full bg-purple-400 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white">
          <TfiClose className="text-3xl" />
        </button>

        <ul className="list-none flex flex-col gap-12 mt-24 items-center font-semibold text-white text-xl">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/about-us" onClick={() => setIsOpen(false)}>About Us</Link>
          </li>
          <li>
            <Link to="/product/image" onClick={() => setIsOpen(false)}>Products</Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
            </li>
          )}
          <li>
            <Link to="/contact-us" onClick={() => setIsOpen(false)}>Contact Us</Link>
          </li>
          {isAdmin && (
            <button
            onClick={() => {
              handleLogout();  // Log out the user
              setIsOpen(false);  // Ensure the navbar is closed on logout
            }}
              className="bg-purple-700 text-white font-semibold px-5 py-1 rounded-sm hover:bg-purple-900"
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
