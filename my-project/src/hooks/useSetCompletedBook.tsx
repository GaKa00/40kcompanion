import axios from "axios";
import { useEffect } from "react";

const useSetCompletedBook = (readingListId: number) => {
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("uid") || sessionStorage.getItem("uid");

    if (token && userId) {
      axios
        .put(
          `http://localhost:3000/api/users/${userId}/reading-list/${readingListId}`,
          { isReading: false, isFinished: true }, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          alert("Book marked as completed!");
        })
        .catch((error) => {
          console.error("Error updating book in reading list:", error);
        });
    }
  }, [readingListId]);
};

export default useSetCompletedBook;
