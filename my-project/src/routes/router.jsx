 
 
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Faq from "../pages/PublicPages/Faq"
import Signup from "../pages/PublicPages/Signup"
import Support from "../pages/PublicPages/Support"
import Signin from "../pages/AccountPages/Signin"
import Myprofile from "../pages/AccountPages/Myprofile"
import Librarypage from "../pages/PublicPages/Librarypage";
import Settings from "../pages/AccountPages/Settings"
import ForgotPassword from "../pages/ResestPWForm"
import ResetPassword from "../pages/SetNewPW"

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
     element: <Signup/>,
   },
   {
     path: "/signin",
     element: <Signin />,
   },
   {
     path: "/profile",
     element: <Myprofile />,
   },
   {
     path: "/settings",
     element: <Settings/>,
   },
   {
     path: "/library",
     element: <Librarypage/>,
   },
   {
     path: "/readinglist",
     element: <App />,
   },
   {
     path: "/searchResults/:query",
     element: <App />,
   },

   {
    path: "/forgotPassword",
    element: <ForgotPassword/>,
   },
   {
  path: "/reset-password/:token",
    element: <ResetPassword/>,
   }

 ]);

export default router