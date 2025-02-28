import logo from "../assets/logo.png";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setIsAdmin(role === "ADMIN");
  }, []);

  return ( 
    <header className="flex justify-between items-center p-6 bg-black bg-opacity-75 w-full fixed top-0 left-0 z-50">
      {/* Logo */}
      <div>
        <img src={logo} alt="Car Service Logo" className="h-16 w-auto" />
      </div>
      
      {/* Navigation */}
      <nav className="absolute left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/services" className="hover:underline">Services</Link></li>
          <li><Link to="/van-rental" className="hover:underline">Van Rental</Link></li>
          <li><Link to="/contacts" className="hover:underline">Contacts</Link></li>
          {isAdmin && (
            <li><Link to="/admin" className="hover:underline text-yellow-400 20x1">Admin Panel</Link></li>
          )}
        </ul>
      </nav>

      <div className="flex items-center space-x-2">
        <FaUser />
            <Link to="/login" className="hover:underline">Login/Register</Link>
      </div>
    </header>
  );
};

export default Header;
