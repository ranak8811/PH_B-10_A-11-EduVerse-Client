import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/education.png";
import { motion } from "framer-motion";

const Footer = () => {
  const variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="flex flex-col items-start gap-3"
        >
          <img src={logo} alt="EduVerse Logo" className="w-12 h-12" />
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-2xl font-bold text-gray-900 dark:text-gray-100"
          >
            EduVerse
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400">
            Empowering learners with high-quality online courses and a
            supportive community.
          </p>
        </motion.div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-gray-600 hover:text-blue-500">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-blue-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/blog" className="text-gray-600 hover:text-blue-500">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-gray-600 hover:text-blue-500">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-gray-600 hover:text-blue-500">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-gray-600 hover:text-blue-500">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <Link
              to="https://facebook.com"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </Link>
            <Link
              to="https://github.com"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              to="https://linkedin.com"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </Link>
          </div>
          <h3 className="text-lg font-semibold mt-4">Contact Us</h3>
          <p className="text-gray-500 dark:text-gray-400">
            <a href="mailto:support@eduverse.com" className="hover:underline">
              support@eduverse.com
            </a>
          </p>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm">
          © {new Date().getFullYear()} EduVerse. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
