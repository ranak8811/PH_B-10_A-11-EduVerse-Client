/* eslint-disable react/prop-types */
const Heading = ({ title, subtitle }) => {
  return (
    <div className="text-center my-6 py-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-gray-900 dark:text-green-400">
        {title}
      </h1>

      {subtitle && (
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}

      <div className="mt-4 flex justify-center">
        <span className="block h-1 w-16 bg-red-500 rounded-full dark:bg-green-500"></span>
      </div>
    </div>
  );
};

export default Heading;
