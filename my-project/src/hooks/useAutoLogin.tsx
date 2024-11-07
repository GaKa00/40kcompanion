

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAutoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(
          "http://localhost:3000/api/verify",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          if (response.data.isValid) {
           
            navigate("/library");
          } else {
           
            localStorage.removeItem("token");
          }
        })
        .catch(() => {
       
          localStorage.removeItem("token");
        });
    }
  }, [navigate]);

  return null;
};

export default useAutoLogin;

