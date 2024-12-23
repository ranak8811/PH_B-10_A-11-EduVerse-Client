/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import useTitle from "../../public/PageTitle/title";

const Register = () => {
  useTitle("Register");
  const { registerNewUser, setUser, updateUserProfile, loginUsingGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validatePassword = (password) => {
    const errors = [];
    if (!/[A-Z]/.test(password)) errors.push("Must have an uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Must have a lowercase letter.");
    if (password.length < 6) errors.push("Must be at least 6 characters.");
    return errors;
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, photoURL, password } = formData;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";

    if (!photoURL) {
      newErrors.photoURL = "Photo URL is required.";
    } else if (!isValidURL(formData.photoURL)) {
      newErrors.photoURL = "Please enter a valid URL.";
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length) newErrors.password = passwordErrors.join(" ");

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form!");
      return;
    }

    registerNewUser(email, password)
      .then((result) => {
        //--------------------------------databse part starts
        // console.log("User created at fb: ", result.user);

        const createdAt = result?.user?.metadata?.creationTime;

        const newUser = { name, email, createdAt };
        // add new user to the database
        // fetch("https://movie-server-ruby.vercel.app/users", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(newUser),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     // console.log("User created to db: ", data);

        //     if (data.insertedId) {
        //       Swal.fire("User created to database successfully");
        //     }
        //   });
        //--------------------------------databse part ends

        updateUserProfile({ displayName: name, photoURL: photoURL })
          .then(() => {
            toast.success(
              `Registration successful! for ${result.user.displayName}`
            );
            navigate("/login");
          })
          .catch((err) => {
            toast.error(
              "Error updating profile. Please try again.",
              err.message
            );
          });
        setUser(result.user);
      })
      .catch((err) => {
        toast.error(`Registration failed: ${err.message}`);
      });
  };

  const handleGoogleSignIn = () => {
    loginUsingGoogle()
      .then((result) => {
        setUser(result.user);

        //--------------------------------database part starts
        // console.log("User created at Firebase: ", result.user);

        const createdAt = result?.user?.metadata?.creationTime;

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          createdAt: createdAt,
        };

        // fetch("https://movie-server-ruby.vercel.app/users", {
        //   method: "PUT",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(newUser),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     if (data.insertedId) {
        //       Swal.fire("User created in the database successfully");
        //     }
        //   })
        //   .catch((error) => {
        //     console.error("Error creating user in the database:", error);
        //   });
        //--------------------------------database part ends

        toast.success(`${result.user.displayName} is logged in with Google`);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(`Google Sign-In failed: ${err.message}`);
      });
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-gradient-to-r from-black via-red-900 to-black text-white">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Register Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input input-bordered w-full bg-gray-800 ${
                errors.name ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input input-bordered w-full bg-gray-800 ${
                errors.email ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input input-bordered w-full bg-gray-800 ${
                errors.password ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium">
              Photo URL
            </label>
            <input
              type="text"
              id="photoURL"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className={`input input-bordered w-full bg-gray-800 ${
                errors.photoURL ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter your photo URL"
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm mt-1">{errors.photoURL}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-gradient-to-r from-red-600 to-red-800 w-full mt-4 text-white font-bold"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-red-400 hover:underline">
              Login here
            </Link>
          </p>
          <button
            className="btn btn-outline btn-error w-full mt-2"
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
