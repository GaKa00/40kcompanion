

import { Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import axios from "axios";

const Settings = () => {



   const deleteAccount = () => {
     const token =
       localStorage.getItem("token") || sessionStorage.getItem("token");
     const userId =
       localStorage.getItem("uid") || sessionStorage.getItem("uid");

     // Display a confirmation dialog before proceeding
     const confirmed = window.confirm(
       "Are you sure you want to delete your account? This action cannot be undone."
     );

     if (confirmed && userId && token) {
       axios
         .delete(`http://localhost:3000/api/delete/${userId}`, {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         })
         .then(() => {
           alert("Account deleted successfully");
           // Optionally, you can log the user out or redirect them after account deletion
           localStorage.clear();
           sessionStorage.clear();
           window.location.href = "/"; // Redirect to homepage or login page
         })
         .catch((error) => {
           console.error("Error deleting account:", error);
           alert("Failed to delete account. Please try again.");
         });
     }
   };


 
  return (
    <div>
        <Button onClick={deleteAccount}>
Delete Account
    </Button>
      
    </div>
  )
}

export default Settings
