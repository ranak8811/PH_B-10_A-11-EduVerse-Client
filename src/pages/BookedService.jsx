// import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { format } from "date-fns";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useTitle from "../../public/PageTitle/title";
import Lottie from "lottie-react";
import loadingLottieData from "../assets/lottie/loading.json";

const BookedService = () => {
  useTitle("Booked Services");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [bookedServices, setBookedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyServices = async () => {
    try {
      // const { data } = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/bookedService/${user?.email}`
      // );
      const { data } = await axiosSecure.get(`/bookedService/${user?.email}`);
      setBookedServices(data);
    } catch (error) {
      console.error("Error fetching booked services:", error);
      toast.error("Failed to fetch booked services. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="min-h-screen p-5 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Your Booked Services
        </h1>

        <p className="text-center text-lg font-semibold text-green-500 mb-4">
          Total Booked Services: {bookedServices.length}
        </p>

        {isLoading ? (
          <div className="w-96 mx-auto lg:w-full max-w-md">
            <Lottie animationData={loadingLottieData} loop />
          </div>
        ) : bookedServices.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            You have not booked any services yet.
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
                    Service Name
                  </th>
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    Date
                  </th>
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    Price
                  </th>
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    Provider
                  </th>
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    Status
                  </th>
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    Special Instruction
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookedServices.map((service, index) => (
                  <tr
                    key={service._id}
                    className={`${
                      index % 2 === 0
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{service.serviceName}</td>
                    <td className="px-4 py-2">
                      {format(new Date(service.serviceDate), "P")}
                    </td>
                    <td className="px-4 py-2 text-green-500 font-semibold">
                      ${service.price}
                    </td>
                    <td className="px-4 py-2">{service.providerEmail}</td>
                    <td
                      className={`px-4 py-2 font-bold text-white text-center rounded ${
                        service.serviceStatus === "Pending"
                          ? "bg-red-500"
                          : service.serviceStatus === "Working"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {service.serviceStatus}
                    </td>
                    <td className="px-4 py-2">
                      {service.specialInstruction || "No instructions provided"}
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

export default BookedService;
