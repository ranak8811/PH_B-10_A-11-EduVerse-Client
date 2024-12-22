import { Link, useLocation } from "react-router-dom";

/* eslint-disable react/prop-types */
const ServiceCard = ({ course }) => {
  const location = useLocation();
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

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      {/* Service Image */}
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />

      {/* Service Details */}
      <div className="p-4">
        {/* Service Name */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {name}
        </h2>

        {/* Service Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </p>

        {/* Service Provider Info */}
        <div className="flex items-center mt-4">
          <img
            src={providerImage}
            alt={providerName}
            className="w-10 h-10 rounded-full border-2 border-green-500"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {providerName}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {providerEmail}
            </p>
          </div>
        </div>

        {/* Service Area and Price */}
        <div className="flex justify-between items-center mt-4">
          {["/allServices"].includes(location.pathname) && (
            <p className="text-xl font-bold text-red-500">Area: {area}</p>
          )}

          <p className="text-lg font-bold text-green-500">${price}</p>
        </div>

        {/* View Detail Button */}
        <Link
          to={`/serviceDetails/${_id}`}
          className="mt-4 w-full bg-red-500 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;