import { useLocation, useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const ServiceCard = ({ course }) => {
  const location = useLocation();
  const navigate = useNavigate();
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
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {name}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex-grow">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </p>

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

        <div className="mt-auto">
          <div className="flex justify-between items-center mt-4">
            {["/allServices"].includes(location.pathname) && (
              <p className="text-sm font-bold text-red-500">Area: {area}</p>
            )}
            <p className="text-lg font-bold text-green-500">Price: ${price}</p>
          </div>

          <button
            onClick={() => navigate(`/serviceDetails/${_id}`)}
            className="mt-4 w-full bg-red-500 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
