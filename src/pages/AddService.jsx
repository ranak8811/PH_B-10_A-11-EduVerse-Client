import { useState } from "react";
// import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useTitle from "../../public/PageTitle/title";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  useTitle("Add Service");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    price: "",
    area: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    let validationErrors = {};

    if (!formData.imageUrl) {
      validationErrors.imageUrl = "Image URL is required";
    } else if (!/^https?:\/\/.+\..+/.test(formData.imageUrl)) {
      validationErrors.imageUrl = "Please enter a valid URL";
    }

    if (!formData.name) {
      validationErrors.name = "Service name is required";
    }

    if (!formData.price) {
      validationErrors.price = "Price is required";
    } else if (isNaN(formData.price)) {
      validationErrors.price = "Price must be a number";
    }

    if (!formData.area) {
      validationErrors.area = "Service area is required";
    }

    if (!formData.description) {
      validationErrors.description = "Description is required";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();

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

    console.log(serviceObject);

    try {
      // Post the object using axios (dummy API for now)
      // await axios.post(
      //   `${import.meta.env.VITE_API_URL}/services`,
      //   serviceObject
      // );
      await axiosSecure.post(`/services`, serviceObject);
      setFormData({
        imageUrl: "",
        name: "",
        price: "",
        area: "",
        description: "",
      });
      setErrors({});
      toast.success("Service added successfully!");
      navigate("/manageServices");
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="min-h-screen p-5 dark:bg-gray-900 bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6 text-center">
          Add a New Service
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
            className="w-full bg-[#f86c6c] hover:bg-green-500 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
