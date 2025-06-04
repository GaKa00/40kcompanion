import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/ProtectedRoute";

import Faq from "../pages/PublicPages/Faq";
import Signup from "../pages/PublicPages/Signup";
import Support from "../pages/PublicPages/Support";
import Signin from "../pages/AccountPages/Signin";
import Myprofile from "../pages/AccountPages/Myprofile";
import Librarypage from "../pages/PublicPages/Librarypage";
import Settings from "../pages/AccountPages/Settings";
import ForgotPassword from "../pages/ResestPWForm";
import ResetPassword from "../pages/SetNewPW";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/faq",
    element: <Faq />,
  },
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Myprofile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/library",
    element: (
      <ProtectedRoute>
        <Librarypage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/readinglist",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/searchResults/:query",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
]);

export default router;
