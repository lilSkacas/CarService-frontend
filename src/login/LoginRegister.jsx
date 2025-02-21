import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginRegister = ({ onClose }) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "", phoneNumber: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/carservice/auth/signin", {
        username: formData.username,
        password: formData.password,
      });
      console.log("Login response:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };


  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/carservice/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber
      });
      console.log("Registration Successful:", response.data);
      setIsRegister(false); // Switch back to login after successful registration
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
    }
  };

  // Handle Password Reset
  const handlePasswordReset = async () => {
    try {
      const response = await axios.post("http://localhost:8080/carservice/user/reset-password", {
        email: formData.email,
      });
      console.log("Password Reset Email Sent:", response.data);
      setIsForgotPassword(false);
    } catch (error) {
      console.error("Reset Password Error:", error.response?.data || error.message);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="absolute top-2 right-4 text-lg">✖</button>
        {!isForgotPassword && !isRegister && (
          <>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input type="text" name="username" placeholder="Username" className="w-full p-2 border mb-2" onChange={handleChange} value={formData.username}/>
            <input type="password" name="password" placeholder="Password" className="w-full p-2 border mb-2" onChange={handleChange} value={formData.password}/>
            <button onClick={handleLogin}  className="w-full bg-blue-600 text-white p-2 mt-2">Login</button>
            <p className="text-sm mt-2 cursor-pointer text-blue-600" onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
            <p className="text-sm mt-2">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setIsRegister(true)}>Sign Up</span></p>
          </>
        )}

        {isForgotPassword && (
          <>
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <input type="email" name="email" placeholder="Enter your email" className="w-full p-2 border mb-2" onChange={handleChange} value={formData.email}/>
            <button onClick={handlePasswordReset}  className="w-full bg-blue-600 text-white p-2 mt-2">Send Reset Link</button>
            <p className="text-sm mt-2 cursor-pointer text-blue-600" onClick={() => setIsForgotPassword(false)}>Back to Login</p>
          </>
        )}

        {isRegister && (
          <>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <input type="text" name="username" placeholder="Username" className="w-full p-2 border mb-2" onChange={handleChange} value={formData.username}/>
            <input type="email" name="email" placeholder="Email" className="w-full p-2 border mb-2" onChange={handleChange} value={formData.email}/>
            <input type="password" name="password" placeholder="Password" className="w-full p-2 border mb-2"  onChange={handleChange} value={formData.password}/>
            <input type="password" name="confirmPassword" placeholder="Repeat Password" className="w-full p-2 border mb-2" onChange={handleChange} value={formData.confirmPassword} />
            <input type="text" name="phoneNumber" placeholder="Phone Number" className="w-full p-2 border mb-2" onChange={handleChange} value={formData.phoneNumber} />
            <button onClick={handleRegister} className="w-full bg-green-600 text-white p-2 mt-2">Register</button>
            <p className="text-sm mt-2 cursor-pointer text-blue-600" onClick={() => setIsRegister(false)}>Back to Login</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
