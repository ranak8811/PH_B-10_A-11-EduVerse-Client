import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useTitle from "../../public/PageTitle/title";

const UpdateService = () => {
  useTitle("Update Service");
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const fetchServiceDetails = async () => {
    try {
      const { data } = await axiosSecure.get(`/allServices/${id}`);

      setFormData({
        imageUrl: data.imageUrl || "",
        name: data.name || "",
        price: data.price || "",
        area: data.area || "",
        description: data.description || "",
      });
    } catch (error) {
      console.error("Error fetching service details:", error);
      toast.error("Failed to fetch service details. Please try again.");
    }
  };

  useEffect(() => {
    fetchServiceDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const validateField = (name, value) => {
    switch (name) {
      case "imageUrl":
        if (!value) return "Image URL is required";
        if (!/^https?:\/\/.+\..+/.test(value))
          return "Please enter a valid URL";
        break;
      case "name":
        if (!value) return "Service name is required";
        break;
      case "price":
        if (!value) return "Price is required";
        if (isNaN(value)) return "Price must be a number";
        break;
      case "area":
        if (!value) return "Service area is required";
        break;
      case "description":
        if (!value) return "Description is required";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const fieldError = validateField(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) validationErrors[key] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const serviceObject = {
      ...formData,
      providerName: user.displayName,
      providerEmail: user.email,
      providerImage: user.photoURL,
    };

    try {
      await axiosSecure.put(`/updateService/${id}`, serviceObject);
      toast.success("Your service has been updated successfully");
      navigate("/manageServices");
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Update service failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-5 dark:bg-gray-900 bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6 text-center">
          Update Service
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-gray-600 dark:text-gray-300 font-medium"
            >
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter the image URL"
              className="w-full mt-2 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring focus:ring-red-400"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-gray-600 dark:text-gray-300 font-medium"
            >
              Service Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter the service name"
              className="w-full mt-2 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring focus:ring-red-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-gray-600 dark:text-gray-300 font-medium"
            >
              Price (in USD)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter the service price"
              className="w-full mt-2 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring focus:ring-red-400"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="area"
              className="block text-gray-600 dark:text-gray-300 font-medium"
            >
              Service Area
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Enter the service area (e.g., Dhaka)"
              className="w-full mt-2 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring focus:ring-red-400"
            />
            {errors.area && (
              <p className="text-red-500 text-sm mt-1">{errors.area}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-600 dark:text-gray-300 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter the service description"
              rows="4"
              className="w-full mt-2 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring focus:ring-red-400"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Update Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
