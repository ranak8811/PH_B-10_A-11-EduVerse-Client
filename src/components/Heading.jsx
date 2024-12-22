/* eslint-disable react/prop-types */
const Heading = ({ title, subtitle }) => {
  return (
    <div className="text-center my-6 bg-gradient-to-r from-black via-red-900 to-black text-white py-6">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
        {title}
      </h1>
      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm sm:text-base lg:text-lg text-gray-300">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;
