import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import pic1 from "../assets/banner/eduPic1.jpeg";
import pic2 from "../assets/banner/eduPic2.avif";
import pic3 from "../assets/banner/eduPic3.webp";
import { Link } from "react-router-dom";

const Banner = () => {
  const images = [pic1, pic2, pic3];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col justify-center items-center">
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to{" "}
        <span className="text-red-500 dark:text-green-400">EduVerse</span>
      </motion.h1>

      <motion.div
        className="text-lg md:text-2xl font-medium text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <Typewriter
          words={[
            "Explore new horizons!",
            "Learn at your own pace!",
            "Achieve your goals today!",
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </motion.div>

      <div className="relative w-full max-w-4xl h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="absolute top-0 left-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 1.5, delay: index * 3 },
              }}
              exit={{ opacity: 0 }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 3 }}
      >
        <Link
          to="/allServices"
          className="bg-gradient-to-r from-red-500 to-green-500 hover:from-green-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Start Exploring
        </Link>
      </motion.div>
    </div>
  );
};

export default Banner;
