import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useTitle from "../../public/PageTitle/title";
import Lottie from "lottie-react";
import loginLottieData from "../assets/lottie/login.json";
import { HiEyeOff } from "react-icons/hi";
import { FaEye } from "react-icons/fa";

const Login = () => {
  useTitle("Login");
  const { loginUsingGoogle, setUser, loginRegisteredUser } =
    useContext(AuthContext);
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const result = await loginRegisteredUser(email, password);
      setUser(result.user);

      toast.success(
        `${result.user.displayName} is logged in with email and password`
      );

      navigate(location?.state ? location.state : "/");
    } catch (err) {
      const errorMessage = err.message || "An unexpected error occurred!";
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginUsingGoogle();
      setUser(result.user);

      // --------------------------------database part starts
      console.log("User created at Firebase: ", result.user);

      const createdAt = result?.user?.metadata?.creationTime;

      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        createdAt: createdAt,
      };

      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      // --------------------------------database part ends

      toast.success(`${result.user.displayName} logged in with Google`);
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      const errorMessage = err.message || "An unexpected error occurred!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-80 lg:w-96">
            <Lottie animationData={loginLottieData} loop />
          </div>
        </div>

        <div className="w-full lg:w-1/2 max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-red-600 dark:text-green-400">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className={`input input-bordered w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 ${
                  errors.email ? "border-red-500" : "border-gray-400"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                // type="password"
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: "Password is required" })}
                className={`input input-bordered w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 ${
                  errors.password ? "border-red-500" : "border-gray-400"
                }`}
                placeholder="Enter your password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2/3 transform -translate-y-1/2 right-3 cursor-pointer text-gray-600"
              >
                {showPassword ? <HiEyeOff size={20} /> : <FaEye size={20} />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-red-500 dark:text-green-400 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-red-500 to-green-500 hover:from-green-600 hover:to-red-600 text-white font-bold py-2 rounded-lg transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-red-500 dark:text-green-400 hover:underline"
              >
                Register here
              </Link>
            </p>
            <button
              className="btn btn-outline border-red-500 text-red-500 dark:border-green-400 dark:text-green-400 hover:bg-red-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 w-full mt-4"
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
