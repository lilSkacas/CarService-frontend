import React from "react";
import oilImage from "../assets/oil.jpg";
import tyreImage from "../assets/tyre.png";
import engineImage from "../assets/engine.jpg";
import suspensionImage from "../assets/suspension.jpg";
import brakesImage from "../assets/brakes.jpg";
import vansImage from "../assets/vans.jpg";
import {Link} from "react-router-dom";

const services = [
  { name: "Oil Service", image: oilImage },
  { name: "Tyre Replacement", image: tyreImage },
  { name: "Engine Repair", image: engineImage },
  { name: "Suspension Repair", image: suspensionImage },
  { name: "Brakes Inspection", image: brakesImage },
  { name: "Van Rental", image: vansImage, link: "/van-rental"},
];



const Services = () => {
    return (
      <div
        className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center"
             >
        <h1 className="text-5xl font-bold text-white mb-10">Our Services</h1>
        <div className="flex-row flex gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-black bg-opacity-50 p-8 rounded-lg text-white text-center">
              <Link to={service.link}>
              <img
                src={service.image}
                alt={service.name}
                className="w-32 h-32 mx-auto mb-4 rounded-lg object-cover"
              />
              </Link>
              <h2 className="text-2xl font-semibold">{service.name}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Services;
