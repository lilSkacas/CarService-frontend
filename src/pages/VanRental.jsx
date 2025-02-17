import React from "react";

const VanRental = () => {
  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center flex items-center justify-center text-white p-10"
      style={{ backgroundImage: "url('/src/assets/van-rental-bg.jpg')" }}
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-left">
        <div className="md:w-1/2 text-left p-6">
          <h1 className="text-5xl font-bold mb-6">Van Rental</h1>
          <p className="text-lg mb-6">
            We offer high-quality van rental services for all your transportation needs.
            Whether you need a van for business, family trips, or moving, we have a
            selection of well-maintained vehicles ready for you.
            </p>
            <p className="text-lg mb-6">
            The price of rent for the vehicle is 40 eur/24h
          </p>
        </div>
        <div className="md:w-3/4 flex justify-end items-stretch content-end gap-3">
        
          <img 
          src="https://scontent.fvno2-1.fna.fbcdn.net/v/t39.30808-6/384118791_815882410397493_5818412481076556683_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=v0O9DinlTXIQ7kNvgHGdWWZ&_nc_oc=Adgu123tEZSkD01IugZivZqPB-4UzUwe6PaJjKwr05RbER-NPil8NYmENI7ecGRGkZY&_nc_zt=23&_nc_ht=scontent.fvno2-1.fna&_nc_gid=AT2reuV9a0BM8l6j1xL83wo&oh=00_AYC_9dxgw3NfoxplV_LwoXP3XM4arN7-8YnQJsg-3G5IdQ&oe=67B7FD2A" 
          alt="Van Rental" className="w-5/6 rounded-lg shadow-lg"
           />
          <img 
          src="/src/assets/van.jpg" 
          alt="Van Rental" className="w-3/4 rounded-lg shadow-lg" 
          />
        </div>
      </div>
    </div>
  );
};

export default VanRental;
