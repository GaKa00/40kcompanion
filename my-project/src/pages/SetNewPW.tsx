import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

const ResetPassword = () => {
const { token } = useParams();
console.log("Token from URL:", token);

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/password-reset/${token}`,
        { newPassword }
      );
      setMessage(response.data.message);
    } catch (error:any) {
      setMessage(`Error resetting password: ${error.message}`);
    }
  }; 

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
