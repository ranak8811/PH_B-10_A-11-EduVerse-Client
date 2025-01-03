// import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useTitle from "../../public/PageTitle/title";
import loadingLottieData from "../assets/lottie/loading.json";
import Lottie from "lottie-react";

const ManageServices = () => {
  useTitle("Manage Services");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [myServices, setMyServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyServices = async () => {
    try {
      // const { data } = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/myAddedService/${user?.email}`,
      //   { withCredentials: true }
      // );
      const { data } = await axiosSecure.get(`/myAddedService/${user?.email}`);
      setMyServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    //----------------------------------------------------------------
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/service/${id}`);

          if (data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your service has been deleted.",
              icon: "success",
            });
            fetchMyServices();
          } else {
            Swal.fire({
              title: "Error",
              text: "Failed to delete the service. Please try again.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting service:", error);
          Swal.fire({
            title: "Error",
            text: "An unexpected error occurred. Please try again later.",
            icon: "error",
          });
        }
      }
    });
    //----------------------------------------------------------------
  };

  useEffect(() => {
    if (user?.email) fetchMyServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="min-h-screen p-5 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Manage Your Services
        </h1>

        {isLoading ? (
          <div className="w-96 mx-auto lg:w-full max-w-md">
            <Lottie animationData={loadingLottieData} loop />
          </div>
        ) : myServices.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No services found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    #
                  </th>
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    Name
                  </th>
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    Price
                  </th>
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    Description
                  </th>
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {myServices.map((service, index) => (
                  <tr
                    key={service._id}
                    className={`${
                      index % 2 === 0
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{service.name}</td>
                    <td className="px-4 py-2 text-green-500 font-semibold">
                      ${service.price}
                    </td>
                    <td className="px-4 py-2">
                      {service.description.length > 50
                        ? `${service.description.slice(0, 50)}...`
                        : service.description}
                    </td>
                    <td className="px-4 py-2 flex justify-center space-x-4">
                      <button
                        onClick={() =>
                          navigate(`/updateService/${service._id}`)
                        }
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(service._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageServices;
