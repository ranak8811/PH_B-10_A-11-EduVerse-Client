import { useNavigate } from "react-router-dom";
import useTitle from "../../public/PageTitle/title";
import errorLottieFile from "../assets/lottie/error.json";
import Lottie from "lottie-react";
const ErrorPage = () => {
  useTitle("Error Page");
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <Lottie animationData={errorLottieFile} loop />

      <h1 className="text-5xl font-bold  my-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>

      <button
        onClick={goBack}
        className="border border-red-500 
            text-red-500 
            hover:bg-red-500
            dark:border-green-500
            dark:hover:bg-green-500
            dark:text-green-500
            hover:text-white
            dark:hover:text-white
            transition 
            duration-300
            rounded-lg 
            py-3 
            px-6"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
