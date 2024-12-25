import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import loadingLottieData from "../assets/lottie/loading.json";
import Lottie from "lottie-react";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/instructors`)
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-96 lg:w-full max-w-md">
          <Lottie animationData={loadingLottieData} loop />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
        Meet Our Instructors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((instructor) => (
          <motion.div
            key={instructor._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={instructor.instructorImageURL}
                alt={instructor.instructorName}
                className="w-full h-60 object-cover"
              />
              <motion.div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-xl font-bold text-white">
                  {instructor.instructorName}
                </p>
                <p className="text-sm text-gray-300">{instructor.subject}</p>
              </motion.div>
            </div>

            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
                {instructor.instructorEmail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
