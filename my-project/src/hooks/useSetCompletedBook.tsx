import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import { ReadingList } from "../types/types";

//This hook is used to register a selected book to the users readinglist
//after validating a user, it takes the books id  in the users readinglist (which exists in the modal where this hook is called)
//and then sets it as complete (which allows the book to show in the "finished book" section)
const useSetCompletedBook = () => {
  const setCompletedBook = useCallback(
    async (readingListId: number): Promise<ReadingList | null> => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const userId =
        localStorage.getItem("uid") || sessionStorage.getItem("uid");

      if (!token || !userId) {
        console.error("Token or user ID is missing", {
          token: !!token,
          userId: !!userId,
        });
        return null;
      }

      try {
        console.log("Attempting to mark book as finished:", {
          readingListId,
          userId,
        });
        const response = await axios.put(
          `http://localhost:3000/api/users/${userId}/reading-list/${readingListId}`,
          { isReading: false, isFinished: true },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Successfully marked book as finished:", response.data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.error("Error updating book in reading list:", {
            status: axiosError.response?.status,
            data: axiosError.response?.data,
            message: axiosError.message,
            readingListId,
            userId,
          });
        } else {
          console.error("Unexpected error updating book:", error);
        }
        throw error;
      }
    },
    []
  );

  return { setCompletedBook };
};

export default useSetCompletedBook;
