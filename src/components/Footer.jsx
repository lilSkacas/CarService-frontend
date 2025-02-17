import React from "react";
import { FaFacebook, FaInstagram,FaTwitter} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-10 text-center">
        <div className="max-w-4xl mx-auto">
        <p className="text-lg font-semibold">Working Hours:</p>
        <p>Monday - Friday: 8:00 AM - 17:00 PM</p>
        <p>Saturday: Closed</p>
        <p>Sunday: Closed</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://www.facebook.com/Garaziukascom" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-blue-600 text-3xl" /></a>
          <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-pink-600 text-3xl" /></a>
          <a href="https://www.twitter.com/yourpage" target="_blank" rel="noopener noreferrer"><FaTwitter className="text-blue-400 text-3xl" /></a>
        </div>
        <p className="mt-4">&copy; {new Date().getFullYear()} Garaziukas Car Service. All rights reserved.</p>
      
         </div>
    </footer>
  );
};


export default Footer;