import axios from "axios";
import { useState } from "react";

const useSaveQuotes = () => {
  const [loading, setLoading] = useState(false);

  const saveQuote = async (newQuote: string, readingListId: number) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("uid") || sessionStorage.getItem("uid");

    if (!token || !userId || !readingListId) {
      console.error("Token, user ID, or reading list ID is missing");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}/reading-list/${readingListId}/quote`,
        { newQuote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Quotes updated:", response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error updating summary:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { saveQuote, loading };
};

export default useSaveQuotes;