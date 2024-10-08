import axios from "axios";
import { useEffect } from "react";



//This hook is used to register a selected book to the users readinglist
//after validating a user, it takes the book id (which exists in the modal where this hook is called)
//and then posts it to the users readinglist

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