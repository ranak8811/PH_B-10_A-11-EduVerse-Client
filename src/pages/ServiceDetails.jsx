import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
// import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ServiceDetails = () => {
  const { user } = useAuth(); // Current user info
  const course = useLoaderData(); // Service data loaded via route loader
  const {
    _id,
    imageUrl,
    name,
    price,
    area,
    description,
    providerName,
    providerEmail,
    providerImage,
  } = course;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specialInstruction, setSpecialInstruction] = useState("");
  //   const [serviceDate, setServiceDate] = useState("");
  const [serviceDate, setServiceDate] = useState(new Date());

  const handleBookNow = () => {
    setIsModalOpen(true);
  };

  const handlePurchase = async () => {
    const purchaseData = {
      serviceId: _id,
      serviceName: name,
      serviceImage: imageUrl,
      providerName,
      providerEmail,
      purchasedUserEmail: user.email,
      purchasedUserName: user.displayName,
      serviceDate,
      specialInstruction,
      price,
      serviceStatus: "Pending",
    };

    console.table(purchaseData);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        purchaseData
      );
      console.log(data);
      // Show toast notification
      toast.success("Service booked successfully!");
      // Reset modal fields
      setSpecialInstruction("");
      setServiceDate("");
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message);
      //   toast.error(err?.response?.data);
    }
  };

  //   console.log("Service taking date: ", serviceDate);

  return (
    <div className="min-h-screen p-5 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Service Details Container */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header Image */}
        <img src={imageUrl} alt={name} className="w-full h-64 object-cover" />

        <div className="p-6 md:p-10">
          {/* Single Service Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {description}
            </p>

            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-medium text-red-500">Area: {area}</p>
              <p className="text-xl font-bold text-green-500">
                Price: ${price}
              </p>
            </div>
          </div>

          {/* Service Provider Information */}
          <div className="border-t border-gray-300 dark:border-gray-600 pt-6 mt-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Service Provider Information
            </h2>
            <div className="flex items-center">
              <img
                src={providerImage}
                alt={providerName}
                className="w-16 h-16 rounded-full border-2 border-green-500"
              />
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {providerName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {providerEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleBookNow}
            className="mt-8 w-full bg-red-500 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Booking Details
            </h2>

            {/* Service Info */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Service ID:</strong> {_id}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Service Name:</strong> {name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Service Price:</strong> ${price}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Provider Name:</strong> {providerName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Provider Email:</strong> {providerEmail}
              </p>
            </div>

            {/* Current User Info */}
            <div className="space-y-3 mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Current User:</strong> {user.displayName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Email:</strong> {user.email}
              </p>
            </div>

            {/* Booking Inputs */}
            <div className="mt-4 space-y-4">
              {/* Service Date */}
              <div>
                <label
                  htmlFor="serviceDate"
                  className="block text-gray-700 dark:text-gray-300 font-medium"
                >
                  Service Date
                </label>
                {/* <input
                  type="date"
                  id="serviceDate"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  className="w-full mt-2 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring focus:ring-red-400"
                /> */}
                {/* Date Picker Input Field */}
                <DatePicker
                  className="w-full text-black mt-2 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring focus:ring-red-400"
                  selected={serviceDate}
                  onChange={(date) => setServiceDate(date)}
                />
              </div>

              {/* Special Instruction */}
              <div>
                <label
                  htmlFor="specialInstruction"
                  className="block text-gray-700 dark:text-gray-300 font-medium"
                >
                  Special Instruction
                </label>
                <textarea
                  id="specialInstruction"
                  rows="3"
                  value={specialInstruction}
                  onChange={(e) => setSpecialInstruction(e.target.value)}
                  className="w-full mt-2 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring focus:ring-red-400"
                  placeholder="Enter your goals or special instructions for the course"
                ></textarea>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 bg-gray-300 dark:bg-gray-700 dark:text-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                className="py-2 px-4 bg-red-500 hover:bg-green-500 text-white font-bold rounded-lg"
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;