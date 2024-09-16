import axios from "axios";
import { useEffect } from "react";
import { User } from "../types/types";

 export function getUser(  setUser: React.Dispatch<React.SetStateAction<User>>) {
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("uid") || sessionStorage.getItem("uid");

    if (token && userId) {
      axios
        .get(`http://localhost:3000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setUser(response.data))
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);
}

function getBook() {
    
}