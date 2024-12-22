import { motion } from "framer-motion";
import pic1 from "../assets/banner/eduPic1.jpeg";
import pic2 from "../assets/banner/eduPic2.avif";
import pic3 from "../assets/banner/eduPic3.webp";

const Banner = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col justify-center items-center">
      {/* Project Title */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to <span className="text-red-500">EduVerse</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-lg md:text-2xl font-medium text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        Explore and learn a variety of courses designed for every learner!
      </motion.p>

      {/* Image Carousel */}
      <div className="relative w-full max-w-4xl h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg">
        <motion.div
          className="flex"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{
            duration: 1.2,
            // repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {/* Image 1 */}
          <motion.img
            src={pic1}
            alt="Learning Environment"
            className="w-full object-cover"
            whileHover={{ scale: 1.05 }}
          />
          {/* Image 2 */}
          <motion.img
            src={pic2}
            alt="Digital Learning"
            className="w-full object-cover"
            whileHover={{ scale: 1.05 }}
          />
          {/* Image 3 */}
          <motion.img
            src={pic3}
            alt="Group Collaboration"
            className="w-full object-cover"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>
      </div>

      {/* Call-to-Action Button */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <a
          href="#"
          className="bg-red-500 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Start Exploring
        </a>
      </motion.div>
    </div>
  );
};

export default Banner;
