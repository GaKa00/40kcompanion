import axios from "axios";
import { useEffect } from "react";

const useAddToList = (bookId: number) => {
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("uid") || sessionStorage.getItem("uid");

    if (token && userId) {
      axios
        .post(
          `http://localhost:3000/api/users/${userId}/reading-list`,
          { bookId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          alert("Book added to reading list");
        })
        .catch((error:string) => {
          console.error("Error adding book to reading list:", error);
        });
    }
  }, [bookId]);
};


export default useAddToList