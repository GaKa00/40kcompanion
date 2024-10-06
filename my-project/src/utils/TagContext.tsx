import React, { createContext, useState, useContext } from "react";
import { TagContextType, TagProviderProps } from "../types/types";


const TagContext = createContext<TagContextType | undefined>(undefined);



export const TagProvider: React.FC<TagProviderProps> = ({ children }) => {
  const [tag, setTag] = useState<string>("");

  return (
    <TagContext.Provider value={{ tag, setTag }}>
      {children}
    </TagContext.Provider>
  );
};

export const useTag = (): TagContextType => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTag must be used within a TagProvider");
  }
  return context;
};



export default TagContext;
