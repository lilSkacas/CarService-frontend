import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    username: "johndoe",
    phone: "+1234567890",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6">User Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
              placeholder="Email"
            />
            <input
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
              placeholder="Username"
            />
            <input
              type="text"
              name="phone"
              value={updatedUser.phone}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
              placeholder="Phone"
            />
            <button onClick={handleSave} className="bg-blue-500 text-white p-2 w-full rounded">
              Save Changes
            </button>
          </>
        ) : (
          <>
            <p className="mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="mb-2"><strong>Username:</strong> {user.username}</p>
            <p className="mb-4"><strong>Phone:</strong> {user.phone}</p>
            <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white p-2 w-full rounded">
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;