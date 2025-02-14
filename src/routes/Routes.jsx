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
import UpdateService from "../pages/UpdateService";
import BookedService from "../pages/BookedService";
import ServiceToDo from "../pages/ServiceToDo";
import Instructors from "../pages/Instructors";

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
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/servicesCount`),
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
        // loader: ({ params }) =>
        //   fetch(`${import.meta.env.VITE_API_URL}/allServices/${params.id}`),
      },
      {
        path: "/manageServices",
        element: (
          <PrivateRouter>
            <ManageServices></ManageServices>
          </PrivateRouter>
        ),
      },
      {
        path: "/updateService/:id",
        element: (
          <PrivateRouter>
            <UpdateService></UpdateService>
          </PrivateRouter>
        ),
        // loader: ({ params }) =>
        //   fetch(`${import.meta.env.VITE_API_URL}/allServices/${params.id}`),
      },
      {
        path: "/bookedService",
        element: (
          <PrivateRouter>
            <BookedService></BookedService>
          </PrivateRouter>
        ),
      },
      {
        path: "/serviceToDo",
        element: (
          <PrivateRouter>
            <ServiceToDo></ServiceToDo>
          </PrivateRouter>
        ),
      },
      {
        path: "/instructor",
        element: <Instructors></Instructors>,
      },
    ],
  },
]);

export default router;
