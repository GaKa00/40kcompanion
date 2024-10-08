import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import router from './routes/router.jsx';
import theme from './components/ui/theme.js';
import { TagProvider } from './utils/TagContext.tsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TagProvider>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </TagProvider>
  </React.StrictMode>
);
