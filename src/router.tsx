import { createBrowserRouter } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import DashboardLayout from "./Layouts/DashboardLayout";
import BookPage from "./pages/BookPage";
import Dash from "./pages/Dash";
import NavbarLayout from "./Layouts/NavbarLayout";
import PyqPage from "./pages/PyqPage";
import AddBook from "./pages/AddBook";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <NavbarLayout />,
        children: [
          {
            path: "/",
            element: <Homepage />,
          },
          {
            path: "/about",
            element: <About />,
          },
        ],
      },

      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "dash",
            element: <Dash />,
          },
          {
            path: "books",
            element: <BookPage />,
          },
          {
            path:'pyq',
            element:<PyqPage/>
          },
          {
            path:'books/add',
            element:<AddBook/>
          }
        ],
      },
    ],
  },

  {
    path: "/login",
    element: <Loginpage />,
  },
]);

export default router;
