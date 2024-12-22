import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllServices from "../pages/AllServices";
import AddService from "../pages/AddService";
import PrivateRouter from "./PrivateRouter";
import ServiceDetails from "../pages/ServiceDetails";
import ManageServices from "../pages/ManageServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allServices",
        element: <AllServices></AllServices>,
      },
      {
        path: "/addService",
        element: (
          <PrivateRouter>
            <AddService></AddService>
          </PrivateRouter>
        ),
      },
      {
        path: "/serviceDetails/:id",
        element: (
          <PrivateRouter>
            <ServiceDetails></ServiceDetails>
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/allServices/${params.id}`),
      },
      {
        path: "/manageServices",
        element: (
          <PrivateRouter>
            <ManageServices></ManageServices>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
