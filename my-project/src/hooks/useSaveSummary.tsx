import { useState } from "react";
import axios from "axios";

const useSaveSummary = () => {
  const [loading, setLoading] = useState(false);

  const saveText = async (newSummary: string, readingListId: number) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("uid") || sessionStorage.getItem("uid");

    if (!token || !userId || !readingListId) {
      console.error("Token, user ID, or reading list ID is missing");
      return;
    }

    setLoading(true);

    // Construct the new URL based on the updated route
    const url = `http://localhost:3000/api/users/${userId}/reading-list/${readingListId}`;
    console.log(`Sending PUT request to: ${url}`); // Log the constructed URL

    try {
      const response = await axios.put(
        url,
        { summary: newSummary },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Summary updated:", response.data);
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

  return { saveText, loading };
};

export default useSaveSummary;
