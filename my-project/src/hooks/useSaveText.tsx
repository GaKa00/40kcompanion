import { useState } from "react";
import axios from "axios";

const useSaveText = () => {
  const [loading, setLoading] = useState(false);


  const saveText = async (
    newText: string,
    readingListId: number,
    TextType: string
  ) => {
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
        `http://localhost:3000/api/users/${userId}/reading-list/${readingListId}`,
        { [TextType]: newText }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Quotes updated:", response.data);
    } catch (error) {
      console.error("Error updating quotes:", error);
     
    } finally {
      setLoading(false); 
    }
  };

  return { saveText, loading, };
};

export default useSaveText;
