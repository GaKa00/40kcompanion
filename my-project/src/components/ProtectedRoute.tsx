import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const toast = useToast();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    toast({
      title: "Authentication required",
      description: "Please sign in to access this page",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
