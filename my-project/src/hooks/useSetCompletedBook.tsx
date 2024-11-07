import axios from "axios";
import { useCallback } from "react";

//This hook is used to register a selected book to the users readinglist
//after validating a user, it takes the books id  in the users readinglist (which exists in the modal where this hook is called)
//and then sets it as complete (which allows the book to show in the "finished book" section)
const useSetCompletedBook = () => {
  const setCompletedBook = useCallback((readingListId: number) => {
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
        .catch((error) => {
          console.error("Error updating book in reading list:", error);
        });
    }
  }, []);

  return { setCompletedBook };
};

export default useSetCompletedBook;
