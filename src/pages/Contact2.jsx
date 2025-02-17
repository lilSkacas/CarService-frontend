import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook } from "react-icons/fa";

const Contact2 = () => {
  return (
    <div
        className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center"
     >
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-left p-6">
        <h1 className="text-6xl font-bold mb-6">Contact Us</h1>
          
                         <div className="text-lg max-w-5xl text-left mb-6 space-x-12">
                 <a href="https://www.facebook.com/Garaziukascom" target="Join Us On" rel="noopener noreferrer" className="mb-8">         
        <p className="flex items-center justify-left mb-8 gap-3 "><FaFacebook className="text-blue-600 text-3xl"/>Join Us On FaceBook</p>
        </a>
        <p className="flex items-center justify-left gap-3"><FaMapMarkerAlt /> Kalvariju g 122, Vilnius, Lietuva</p>
        <p className="flex items-center justify-left gap-3"><FaPhone /> +370 (646) 91069</p>
        <p className="flex items-center justify-left gap-3"><FaEnvelope /> reponis@gmail.com</p>
          
            <div className="mb-4 flex-row items-left space-x-11 text-left">
            
              <FaClock className="text-yellow-600 text-2xl relative top-8" />
             
              
              <p className="text-lg font-semibold">Working Hours:</p>
              <p>Monday - Friday: 8:00 AM - 17:00 PM</p>
              <p>Saturday: Closed</p>
              <p>Sunday: Closed</p>
            </div> 
          </div>
        </div>
      <div className="md:w-full flex justify-end">
      <img src="/src/assets/reponis.jpg" className="w-full max-w-4xl rounded-lg shadow-lg" 
                style={{width: "720px", height:"720px", objectFit: "cover"}}/>
   
    </div>
   </div> 
  </div>

  );
};

export default Contact2;