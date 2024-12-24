// import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { format } from "date-fns";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useTitle from "../../public/PageTitle/title";

const ServiceToDo = () => {
  useTitle("Service to do");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Fetch user's booked services
  const fetchMyServices = async () => {
    try {
      // const { data } = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/service-to-do/${user?.email}`
      // );
      const { data } = await axiosSecure.get(`/service-to-do/${user?.email}`);
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch booked services. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update service status
  const handleStateChange = async (id, status) => {
    try {
      // await axios.patch(`${import.meta.env.VITE_API_URL}/status-update/${id}`, {
      //   status,
      // });
      await axiosSecure.patch(`/status-update/${id}`, {
        status,
      });
      toast.success("Status updated successfully!");
      fetchMyServices(); // Refresh the UI
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status. Please try again.");
    }
  };

  // Trigger fetch on component mount
  useEffect(() => {
    if (user?.email) fetchMyServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="min-h-screen p-5 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Services To Do
        </h1>

        {/* Show total services */}
        <p className="text-center text-lg font-semibold text-green-500 mb-4">
          Total Services: {services.length}
        </p>

        {/* If no services */}
        {isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading services...
          </p>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No services found where you are the provider.
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
                    Status
                  </th>
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    Special Instruction
                  </th>
                  <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
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
                    <td
                      className={`px-4 py-2 font-bold text-center rounded ${
                        service.serviceStatus === "Pending"
                          ? "bg-red-500 text-white"
                          : service.serviceStatus === "Working"
                          ? "bg-yellow-500 text-black"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {service.serviceStatus}
                    </td>
                    <td className="px-4 py-2">
                      {service.specialInstruction || "No instructions provided"}
                    </td>
                    <td className="px-4 py-2">
                      {/* Dropdown for status change */}
                      <select
                        value={service.serviceStatus}
                        onChange={(e) =>
                          handleStateChange(service._id, e.target.value)
                        }
                        className="bg-gray-200 dark:bg-gray-700 dark:text-white p-2 rounded-lg"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Working">Working</option>
                        <option value="Completed">Completed</option>
                      </select>
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

export default ServiceToDo;
