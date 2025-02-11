import { useState } from "react";
import Heading from "./Heading";
import Lottie from "lottie-react";
import newslettersLottieFiles from "../assets/lottie/newsletter.json";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Subscribed successfully!");
    setEmail(""); // Clear input after submission
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-12 px-6">
      {/* Heading */}
      <Heading
        title={"Stay Updated!"}
        subtitle={
          "Subscribe to our newsletter for the latest updates and courses."
        }
      />

      {/* Content Wrapper */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
        {/* Lottie Animation */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Lottie
            animationData={newslettersLottieFiles}
            loop
            className="max-w-xs md:max-w-md"
          />
        </div>

        {/* Newsletter Form */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-center text-red-500 dark:text-green-400 mb-4">
            Join Our Community
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
            Get the latest updates and insights delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-green-400 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-green-500 hover:from-green-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
