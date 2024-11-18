import { useForm, SubmitHandler } from "react-hook-form";
import { LoginInterface } from "../../types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation/authSchema";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../common/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [_error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
    try {
      console.log("Login Submitted Data", data);

      // Send login request
      const response = await axios.post(
        "https://server-eight-tau.vercel.app/api/login",
        data
      );

      console.log("Full response data:", response.data);

      // Assuming the backend returns user data on successful login
      const user = response.data.user;

      if (!user) {
        // If no user is found in the response, it's a failed login attempt
        alert("User not found. Please register first.");
        navigate("/register"); // Redirect to register page
        return;
      }

      console.log("User is:", user);

      // Store the user data in localStorage and set user in context immediately
      localStorage.setItem("user", JSON.stringify(user));

      // Set user in context
      setUser(user);
      console.log("User set in context:", user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Handle specific error statuses
        if (err.response?.status === 401) {
          // Invalid credentials error handling
          setError("Invalid credentials. Please try again.");
        } else if (err.response?.status === 404) {
          // User not found error handling
          setError("User not found. Please register.");
        } else {
          // General error handling (other errors)
          setError(
            err.response?.data?.message || "An error occurred during login."
          );
        }
      } else {
        // Handle non-Axios errors
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center font-mont h-screen">
      <div className="rounded-xl p-6 md:px-20 w-fit bg-gradient-to-br from-mintGreen to-softBlue">
        <h2 className="text-center p-3 text-2xl font-bold text-lightBeige">
          Login
        </h2>
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <input
              {...register("email")}
              type="email"
              className="border-2 border-blue-300 focus:border-blue-700 focus:outline-none p-2 pr-16 rounded-xl m-2"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="">
            <input
              {...register("password")}
              type="password"
              className="border-2 border-blue-300 focus:border-blue-700 focus:outline-none p-2 pr-16 rounded-xl m-2"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="p-2 px-4 rounded-full m-2 bg-blue-700 text-white text-lg font-medium"
          >
            Login
          </button>

          {_error && <p className="text-red-600">{_error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
