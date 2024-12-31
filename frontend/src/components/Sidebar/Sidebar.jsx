import { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdLocalShipping } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { Link } from "react-router";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        isOpen ? "w-56" : "w-14"
      } bg-purple-500 text-white h-full transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        className="text-white p-4 focus:outline-none"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Menu Items */}
      <nav className="flex-1">
        <ul className="mt-4 space-y-2 pl-2">
            <Link to="/dashboard">
          <li>
            <a
              href="#"
              className="flex items-center gap-4 p-3 mr-2 rounded-md hover:bg-purple-600 transition-all"
            >
              <FaHome size={20} />
              {isOpen && <span>Home</span>}
            </a>
          </li>
            </Link>
            <Link to="/add-image">
          <li>
            <a
              href="#"
              className="flex items-center gap-4 p-3 mr-2 rounded-md hover:bg-purple-600 transition-all"
            >
               <AiFillProduct size={20} />
              {isOpen && <span>Products Image</span>}
            </a>
          </li>
            </Link>
          <Link to="/all-orders">
          <li>
            <a
              href="#"
              className="flex items-center gap-4 p-3 mr-2 rounded-md hover:bg-purple-600 transition-all"
            >
              <MdLocalShipping size={20} />
              {isOpen && <span>Orders</span>}
            </a>
          </li>
          </Link>
          <Link to="/all-contacts">
          <li className="flex items-center gap-4 p-3 mr-2  rounded-md hover:bg-purple-600 transition-all">
            <RiContactsFill  size={20}/>
            <Link
              to="/all-contacts"
              className={`${isOpen ? "block" : "hidden"} text-md`}
            >
              Contacts
            </Link>
          </li>
         </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
