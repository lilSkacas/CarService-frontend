import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [cars, setCars] = useState([]); // Store multiple cars
  const [newCar, setNewCar] = useState({
    licensePlate: "",
    make: "",
    model: "",
    year: "",
    engine: "",
    fuel: "",
    transmission: "",
    wheelDrive: "",
    body: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const navigate = useNavigate();

  // Fetch Profile Data (e.g., on component mount)
  useEffect(() => {
    // You can get the user's details from an API here
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/carservice/user/get/{id}", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // assuming token is stored
          },
        });
        setProfileData(response.data);
        setCars(response.data.cars || []);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCarChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/carservice/user/addCar",
        newCar,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCars([...cars, response.data]); // Add new car to state
      setNewCar({ // Reset form
        licensePlate: "",
        make: "",
        model: "",
        year: "",
        engine: "",
        fuel: "",
        transmission: "",
        wheelDrive: "",
        body: "",
      });
      setIsAddingCar(false);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  // Handle form submission to update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8080/carservice/user/update",
        profileData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // assuming token is stored
          },
        }
      );
      console.log("Profile updated:", response.data);
      setIsEditing(false); // exit edit mode
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page (adjust path as needed)
  };

  // Handle Delete Account
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete("http://localhost:8080/carservice/user/delete", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Account deleted:", response.data);
      localStorage.removeItem("token"); // Remove token after account is deleted
      navigate("/signup"); // Redirect to signup page (adjust path as needed)
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {!isEditing ? (
        <div>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>
          <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white p-1 mt-4 ml-2">
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-60 p-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-60 p-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleChange}
              className="w-40 p-1 border rounded"
              required
            />
           </div>
          <button type="submit" className="bg-green-900 text-white p-1 mt-2">
            Save Changes
          </button>
          </form>
      )}
          <button onClick={handleLogout} className="bg-yellow-600 text-white p-1 mt-4 ml-2">
            Logout
          </button>
          <button onClick={handleDeleteAccount} className="bg-red-900 text-white p-1 mt-4 ml-2">
            Delete Account
          </button>

          <h2 className="text-2xl font-bold mt-6">My Cars</h2>
      <button onClick={() => setIsAddingCar(!isAddingCar)} className="bg-blue-500 text-white p-2 mt-2">
        {isAddingCar ? "Cancel" : "Add Car"}
      </button>

      <div className="mt-4">
        {cars.map((car, index) => (
          <div key={index} className="border p-3 mb-2 rounded">
            
            <label className="block font-semibold">License Plate:</label>
            <p className="border p-2 rounded">{car.licensePlate}</p>

            <p><strong>Make:</strong> {car.make}</p>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Engine:</strong> {car.engine}</p>
            <p><strong>Fuel:</strong> {car.fuel}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Wheel Drive:</strong> {car.wheelDrive}</p>
            <p><strong>Body:</strong> {car.body}</p>
          </div>
        ))}
      </div>

      {/* Add Car Form */}
      {isAddingCar && (
        <form onSubmit={handleAddCar} className="mt-4 border p-4 rounded ">
          <h3 className="text-xl font-bold mb-4 ml-4">Add New Car</h3>

      <div className="flex-row mb-2 items-center p-2">
      <input type="text" name="licensePlate" placeholder="License Plate" value={newCar.licensePlate} onChange={handleCarChange} className=" p-1 border rounded w-60 mr-4" required/>
        <label htmlFor="licensePlate" className="font-semibold">License Plate</label>
      </div>

        <div className="flex-row mb-2 items-center p-2">
           <input type="text" name="make" placeholder="Make" value={newCar.make} onChange={handleCarChange} className="w-60 p-1 border rounded mr-4" required/>
          <label htmlFor="make" className="font-semibold mr-4">Make</label>
        </div>

          <div className="flex-row mb-2 items-center p-2">
          <input type="text" name="model" placeholder="Model" value={newCar.model} onChange={handleCarChange} className="w-60 p-1 border rounded mr-4" required />
            <label htmlFor="model" className="font-semibold ">Model</label>          
          </div>

          <div className="flex-row mb-2 items-center p-2">
            <input type="text" name="year" placeholder="Year" value={newCar.year} onChange={handleCarChange} className="w-60 p-1 border rounded mr-4" required />
              <label htmlFor="year" className="font-semibold mr-4">Year</label>
          </div>

          <div className="flex-row mb-2 items-center p-2">
            <input type="text" name="engine" placeholder="Engine" value={newCar.engine} onChange={handleCarChange} className="w-60 p-1 border rounded mr-4" required />
            <label htmlFor="engine" className="font-semibold mr-4">Engine</label>
          </div>

          <div className="flex-row mb-2 items-center p-2">
            <input type="text" name="fuel" placeholder="Fuel" value={newCar.fuel} onChange={handleCarChange} className="w-60 p-1 border rounded mr-4" required />
            <label htmlFor="fuel" className="font-semibold mr-4">Fuel</label>
          </div>

          <div className="flex-row mb-2 items-center p-2">
            <input type="text" name="transmission" placeholder="Transmission" value={newCar.transmission} onChange={handleCarChange} className="w-60 p-1 border rounded mr-4" required />
            <label htmlFor="transmission" className="font-semibold mr-4">Transmission</label>
          </div>

          <div className="flex-row mb-2 items-center p-2">
            <input  type="text" name="wheelDrive" placeholder="Wheel Drive" value={newCar.wheelDrive} onChange={handleCarChange} className="w-60 p-1 border rounded mr-4" required />
            <label htmlFor="wheel drive" className="font-semibold mr-4">Wheel Drive</label>
          </div>

          <div className="flex-row mb-2 items-center p-2">
            <input type="text" name="body" placeholder="Body" value={newCar.body} onChange={handleCarChange} className="w-60 p-1 border rounded mr-4" required />
            <label htmlFor="mbody" className="font-semibold mr-4">Body</label>
         </div>

         </form>
      )}
        {isAddingCar && (
          <button type="submit" onClick={handleAddCar} className="bg-green-600 text-white p-2 mt-2 ">
            Save Car
          </button>
        )}
    </div>
  );
};
   

export default Profile;