import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useTitle from "../../public/PageTitle/title";

const Login = () => {
  useTitle("Login");
  const { loginUsingGoogle, setUser, loginRegisteredUser } =
    useContext(AuthContext);
  const location = useLocation();
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

      //--------------------------------database part starts
      // console.log("User created at Firebase: ", result.user);

      // const createdAt = result?.user?.metadata?.creationTime;

      // const newUser = {
      //   name: result.user.displayName,
      //   email: result.user.email,
      //   createdAt: createdAt,
      // };

      // await fetch("https://movie-server-ruby.vercel.app/users", {
      //   method: "PUT",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(newUser),
      // });
      //--------------------------------database part ends

      toast.success(`${result.user.displayName} logged in with Google`);
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      const errorMessage = err.message || "An unexpected error occurred!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-gradient-to-r from-black via-red-900 to-black text-white">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`input input-bordered w-full bg-gray-800 ${
                errors.email ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`input input-bordered w-full bg-gray-800 ${
                errors.password ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-red-400 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn bg-gradient-to-r from-red-600 to-red-800 w-full mt-4 text-white font-bold"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-red-400 hover:underline">
              Register here
            </Link>
          </p>
          <button
            className="btn btn-outline btn-error w-full mt-2"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
