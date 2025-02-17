import React, { useState } from "react";

const LoginRegister = ({ onClose }) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="absolute top-2 right-4 text-lg">✖</button>
        {!isForgotPassword && !isRegister && (
          <>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input type="text" placeholder="Username" className="w-full p-2 border mb-2" />
            <input type="password" placeholder="Password" className="w-full p-2 border mb-2" />
            <button className="w-full bg-blue-600 text-white p-2 mt-2">Login</button>
            <p className="text-sm mt-2 cursor-pointer text-blue-600" onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
            <p className="text-sm mt-2">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setIsRegister(true)}>Sign Up</span></p>
          </>
        )}

        {isForgotPassword && (
          <>
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <input type="email" placeholder="Enter your email" className="w-full p-2 border mb-2" />
            <button className="w-full bg-blue-600 text-white p-2 mt-2">Send Reset Link</button>
            <p className="text-sm mt-2 cursor-pointer text-blue-600" onClick={() => setIsForgotPassword(false)}>Back to Login</p>
          </>
        )}

        {isRegister && (
          <>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <input type="text" placeholder="Username" className="w-full p-2 border mb-2" />
            <input type="email" placeholder="Email" className="w-full p-2 border mb-2" />
            <input type="password" placeholder="Password" className="w-full p-2 border mb-2" />
            <input type="password" placeholder="Repeat Password" className="w-full p-2 border mb-2" />
            <button className="w-full bg-green-600 text-white p-2 mt-2">Register</button>
            <p className="text-sm mt-2 cursor-pointer text-blue-600" onClick={() => setIsRegister(false)}>Back to Login</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
