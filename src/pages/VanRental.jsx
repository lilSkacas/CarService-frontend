import React from "react";

const VanRental = () => {
  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: "url('')" }}
    >
      <div className="max-w-6xl items-center justify-center w-1/2 ml-20">
        <div className="text-center p-6">
          <h1 className="text-5xl font-bold mb-6">Van Rental</h1>
          <p className="text-lg mb-10 ml-20">
            We offer high-quality van rental services for all your transportation needs.
            Whether you need a van for business, family trips, or moving, we have a
            selection of well-maintained vehicles ready for you.
            </p>
            <p className="text-lg mb-10">
            The price of rent for the vehicle is <strong className="font-bold"> 40 eur/24h </strong> 
          </p>
          
    </div>
  </div>
  
    <div className="flex relative w-1/2 left-12 mb-10 ml-20"
            
            >
        <div className="items-center justify-center">
         <img 
          src="/src/assets/van1.png" 
          alt="Van Rental" className="w-1/2 h-auto object-fill rounded-lg shadow-lg relative absolute z-10"
          style={{ top: "20px" }} // Adjust this value to control the overlap
           />
         {/* van.png image on top of van2.jpg  */}
         <div className="items-center justify-center">
         <img 
          src="/src/assets/van2.jpg" 
          alt="Van Rental" className="w-1/2 h-auto object-fill rounded-lg shadow-lg relative"
          style={{ marginLeft: "120px" }}
           />
           <div className="items-center justify-center">
            <img
              src="/src/assets/van3.png"
              alt="Van Rental" className="w-1/2 h-auto object-fill rounded-lg shadow-lg relative"
              style={{ top: "-20px" }}
           />
          
          </div>
       </div>
      </div>
      </div>
    </div>
  );
};

export default VanRental;
