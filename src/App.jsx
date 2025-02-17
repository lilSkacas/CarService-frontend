import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import VanRental from "./pages/VanRental";
import Contacts from "./pages/Contacts";
import LoginRegister from "./login/LoginRegister";
import Profile from "./login/Profile";
import Contact2 from "./pages/Contact2";



const App = () => {
  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center bg-no-repeat bg-fixed text-white"
      style={{ backgroundImage: "url('https://www.baltana.com/files/wallpapers-24/Night-Road-Wallpaper-1920x1080-60127.jpg')",  backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <Header />
      <div className="pt-20"> {/* Space to avoid overlap with fixed header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/van-rental" element={<VanRental />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<LoginRegister />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/contact2" element={<Contact2 />}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
