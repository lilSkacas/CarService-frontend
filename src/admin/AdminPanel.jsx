import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users'); // users, cars, statistics

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/carservice/admin/users', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch all cars
  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:8080/carservice/admin/cars', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const response = await axios.get('http://localhost:8080/carservice/admin/check', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.data.isAdmin) {
          navigate('/profile');
        } else {
          await Promise.all([fetchUsers(), fetchCars()]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking admin access:', error);
        navigate('/profile');
      }
    };

    checkAdminAccess();
  }, [navigate]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8080/carservice/admin/users/${userId}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await axios.delete(`http://localhost:8080/carservice/admin/cars/${carId}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCars(cars.filter(car => car.id !== carId));
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      {/* Navigation Tabs */}
      <div className="flex mb-6 space-x-4">
        <button
          className={`p-2 ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`p-2 ${activeTab === 'cars' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded`}
          onClick={() => setActiveTab('cars')}
        >
          Cars
        </button>
        <button
          className={`p-2 ${activeTab === 'statistics' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded`}
          onClick={() => setActiveTab('statistics')}
        >
          Statistics
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Cars</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">{user.cars?.length || 0}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleViewUserDetails(user)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cars Tab */}
      {activeTab === 'cars' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Car Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Make</th>
                  <th className="px-4 py-2">Model</th>
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Owner</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id} className="border-b">
                    <td className="px-4 py-2">{car.make}</td>
                    <td className="px-4 py-2">{car.model}</td>
                    <td className="px-4 py-2">{car.year}</td>
                    <td className="px-4 py-2">{car.user?.username}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteCar(car.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'statistics' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="font-bold">Total Users</h3>
              <p className="text-2xl">{users.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h3 className="font-bold">Total Cars</h3>
              <p className="text-2xl">{cars.length}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded">
              <h3 className="font-bold">Average Cars per User</h3>
              <p className="text-2xl">
                {users.length ? (cars.length / users.length).toFixed(1) : '0'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Username:</p>
                <p>{selectedUser.username}</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <p className="font-semibold">Role:</p>
                <p>{selectedUser.role}</p>
              </div>
              <div>
                <p className="font-semibold">Phone Number:</p>
                <p>{selectedUser.phoneNumber}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-bold mb-2">User's Cars</h3>
              <div className="space-y-2">
                {selectedUser.cars?.map((car) => (
                  <div key={car.id} className="border p-2 rounded">
                    <p>{car.make} {car.model} ({car.year})</p>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-6 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
