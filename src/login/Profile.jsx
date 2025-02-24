import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [clientData, setClientData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    companyName: "",
    phoneNumber: "",
    additionalNotes: ""
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [cars, setCars] = useState([]);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: "",
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setFormData(JSON.parse(storedUserData));
      // Fetch user's cars
      const fetchCars = async () => {
        try {
          const id = Number(localStorage.getItem("id"));
          const response = await axios.get(`http://localhost:8080/carservice/user/get/${id}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setCars(response.data.vehicle || []);
        } catch (error) {
          console.error("Error fetching cars:", error);
        }
      };
      fetchCars();

      // Fetch client data from Tadabase
      const fetchClientData = async () => {
        try {
          const id = Number(localStorage.getItem("id"));
          // Replace with your actual Tadabase API endpoint
          const response = await axios.get(`http://localhost:8080/carservice/client/get/${id}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setClientData(response.data || {});
        } catch (error) {
          console.error("Error fetching client data:", error);
        }
      };
      fetchClientData();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const id = Number(localStorage.getItem("id"));
      const response = await axios.put(`http://localhost:8080/carservice/user/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.setItem("userData", JSON.stringify(formData));
      setUserData(formData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  const handleClientDataChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleClientUpdate = async () => {
    try {
      const id = Number(localStorage.getItem("id"));
      // Replace with your actual Tadabase API endpoint
      await axios.put(`http://localhost:8080/carservice/client/update/${id}`, clientData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsEditingClient(false);
    } catch (error) {
      console.error("Error updating client data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/carservice/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        const id = Number(localStorage.getItem("id"));
        await axios.delete(`http://localhost:8080/carservice/user/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        localStorage.clear();
        alert("Account deleted successfully.");
        navigate("/login");
      } catch (error) {
        console.error("Error deleting account:", error.response?.data || error.message);
      }
    }
  };

  const handleAddCar = async () => {
    if (cars.length >= 3) {
      alert("You can only add up to 3 cars");
      return;
    }

    try {
      const id = Number(localStorage.getItem("id"));
      const carWithUser = { ...newCar, user: { id } };
      const response = await axios.post("http://localhost:8080/carservice/vehicle/create", carWithUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCars([...cars, response.data]);
      setIsAddingCar(false);
      setNewCar({ make: "", model: "", year: "", engine: "", fuel: "", transmission: "", wheelDrive: "", body: ""});
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:8080/carservice/vehicle/delete/${carId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCars(cars.filter(car => car.id !== carId));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleCarChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-10 min-h-screen ">
      <h1 className="text-3xl font-bold  mb-4">Profile</h1>
      {isEditing ? (
        <div className="profile-form">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          <button onClick={handleProfileUpdate} className="bg-green-600 text-white p-1 mt-4 ml-2" >Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-blue-600 text-white p-1 mt-4 ml-2">Cancel</button>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
          <button onClick={() => setIsEditing(true)} className="bg-purple-600 text-white mt-4 rounded">Edit Profile</button>
        </div>
      )}

      <div className="bg-opacity-50 p-4 rounded-lg mt-6 mb-4">
        <div className="flex justify-start items-center mb-4">
          <h2 className="text-3xl font-bold mr-4">Client Information</h2>
          <button
            onClick={() => setIsEditingClient(!isEditingClient)}
            className="bg-blue-600 text-white p-2 rounded "
          >
            {isEditingClient ? "Cancel" : "Edit Client Info"}
          </button>
        </div>

        {isEditingClient ? (
          <div className="grid gap-4 w-1/2">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={clientData.firstName}
                onChange={handleClientDataChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={clientData.lastName}
                onChange={handleClientDataChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={clientData.address}
                onChange={handleClientDataChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">City</label>
              <input
                type="text"
                name="city"
                value={clientData.city}
                onChange={handleClientDataChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={clientData.postalCode}
                onChange={handleClientDataChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={clientData.country}
                onChange={handleClientDataChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={clientData.companyName}
                onChange={handleClientDataChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">VAT Number</label>
              <input
                type="text"
                name="vatNumber"
                value={clientData.vatNumber}
                onChange={handleClientDataChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={clientData.additionalNotes}
                onChange={handleClientDataChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            <div className="col-span-2">
              <button
                onClick={handleClientUpdate}
                className="bg-green-600 text-white p-2 rounded"
              >
                Save Client Information
              </button>
            </div>
          </div>
        ) : (
          <div className="grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">First Name:</p>
              <p>{clientData.firstName}</p>
            </div>
            <div>
              <p className="font-semibold ">Last Name:</p>
              <p>{clientData.lastName}</p>
            </div>
            <div>
              <p className="font-semibold">Address:</p>
              <p>{clientData.address}</p>
            </div>
            <div>
              <p className="font-semibold">City:</p>
              <p>{clientData.city}</p>
            </div>
            <div>
              <p className="font-semibold">Postal Code:</p>
              <p>{clientData.postalCode}</p>
            </div>
            <div>
              <p className="font-semibold">Country:</p>
              <p>{clientData.country}</p>
            </div>
            <div>
              <p className="font-semibold">Company Name:</p>
              <p>{clientData.companyName}</p>
            </div>
            <div>
              <p className="font-semibold">VAT Number:</p>
              <p>{clientData.vatNumber}</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold">Additional Notes:</p>
              <p>{clientData.additionalNotes}</p>
            </div>
          </div>
        )}
      </div>

      <button onClick={handleLogout} className="bg-yellow-600 text-white p-1 mt-4 ml-2">
        Logout
      </button>
      <button onClick={handleDeleteAccount} className="bg-red-900 text-white p-1 mt-4 ml-2">
        Delete Account
      </button>

      <div className="bg-black-600 text-white p-2 mt-10 ml-2 cars-section">
        <h3>My Cars ({cars.length}/3)</h3>
        <div className="cars-list">
          {cars.map((car) => (
            <div key={car.id} className="car-item">
              <p>{car.make} {car.model} ({car.year})</p>
              <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
            </div>
          ))}
        </div>

        {isAddingCar ? (
          <div className="add-car-form p-4">
            <input
              type="text"
              name="make"
              placeholder="Make"
              value={newCar.make}
              onChange={handleCarChange}
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={newCar.model}
              onChange={handleCarChange}
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={newCar.year}
              onChange={handleCarChange}
            />
            
            <button onClick={handleAddCar} className="bg-green-600 text-white p-1 mt-4 ml-2">Save Car</button>
            <button onClick={() => setIsAddingCar(false)} className="bg-blue-600 text-white p-1 mt-4 ml-2" >Cancel</button>
          </div>
        ) : (
          cars.length < 3 && (
            <button onClick={() => setIsAddingCar(true)} className="bg-purple-600 text-white p-1 mt-4 ml-2" >Add Car</button>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
