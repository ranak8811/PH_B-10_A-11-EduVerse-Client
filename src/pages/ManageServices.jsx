import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const ManageServices = () => {
  const { user } = useAuth();
  const [myServices, setMyServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's services
  const fetchMyServices = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/myAddedService/${user?.email}`
      );
      setMyServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a service
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (confirm) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/service/${id}`);
        setMyServices(myServices.filter((service) => service._id !== id));
        toast.success("Service deleted successfully!");
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Failed to delete the service.");
      }
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
          Manage Your Services
        </h1>

        {/* Loading State */}
        {isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading services...
          </p>
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
                      {/* Edit Button */}
                      <button
                        onClick={() =>
                          toast.success("Edit functionality coming soon!")
                        }
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit size={18} />
                      </button>

                      {/* Delete Button */}
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

// import axios from "axios";
// import { useEffect, useState } from "react";
// import useAuth from "../hooks/useAuth";

// const ManageServices = () => {
//   const { user } = useAuth();
//   const [myServices, setMyServices] = useState([]);

//   const fetchPopularServices = async () => {
//     const { data } = await axios.get(
//       `${import.meta.env.VITE_API_URL}/myAddedService/${user?.email}`
//     );
//     setMyServices(data);
//   };

//   useEffect(() => {
//     fetchPopularServices();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);
//   return <div>{myServices.length}</div>;
// };

// export default ManageServices;
