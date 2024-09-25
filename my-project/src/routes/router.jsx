 
 
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Bookpage from "../pages/PublicPages/Bookpage";
import Faq from "../pages/PublicPages/Faq"
import Signup from "../pages/PublicPages/Signup"
import Support from "../pages/PublicPages/Support"
import Signin from "../pages/AccountPages/Signin"
import Myprofile from "../pages/AccountPages/Myprofile"
import Librarypage from "../pages/PublicPages/Librarypage";
import Settings from "../pages/AccountPages/Settings"

 const router = createBrowserRouter([
   {
     path: "/",
     element: <App />,
   },
   {
     path: "/books",
     element: <Bookpage />,
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
     path: "/",
     element: <App />,
   },
 ]);

export default router