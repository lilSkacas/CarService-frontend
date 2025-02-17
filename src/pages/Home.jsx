import React from "react";
import {Link} from "react-router-dom";
import driftImage from "../assets/drift.jpg";

const Home = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex-col items-center justify-center text-center px-4"
      style={{ backgroundImage: "url('https://www.baltana.com/files/wallpapers-24/Night-Road-Wallpaper-1920x1080-60127.jpg')" }}
    >
      <Link to="/contact2" className="flex justify-center">
          <img
            src={driftImage}
            alt="Explore Our Services"
            className="mt-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            style={{width: "1500px", height:"300px", objectFit: "cover"}}
          />
          <div className="absolute inset-100 flex  items-center justify-center py-20 right-32">
        <h2 className="text-black text-2xl md:text-4xl lg:text-5xl font-extrabold px-20">MB Reponis</h2>
        </div>
        </Link>
       <div className="bg-black bg-opacity-50 p-8 rounded-lg">
      <h1 className="text-5xl font-bold">Garaziukas Car Service </h1>
      <p className="mt-4 text-lg">Your safety is our top priority</p>
    </div>
    </div>
  );
};

export default Home;