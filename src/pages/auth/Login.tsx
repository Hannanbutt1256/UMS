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
      console.log("Full response data:", response.data); // Inspect response

      // Assuming response contains a nested user object
      const user = {
        email: response.data.user?.email, // Adjust based on actual response
        password: response.data.user?.password, // Adjust based on actual response
      };
      if (!user.email) {
        // If no user is found in the response
        alert("Please register first");
        navigate("/auth/register"); // Redirect to register page
        return;
      }

      console.log("user is:", user);

      // Store the user data in localStorage and set user in context immediately
      localStorage.setItem("user", JSON.stringify(user)); // Store as JSON string

      // Set user in context
      setUser(user);
      console.log("User set in context:", user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Handle Axios error
        setError(
          err.response?.data?.message || "An error occurred during login."
        );
      } else {
        // General error handling (non-Axios error)
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center font-mont h-screen">
      <div className=" rounded-xl p-6 md:px-20 w-fit bg-gradient-to-br from-mintGreen to-softBlue ">
        <h2 className="text-center p-3 text-2xl font-bold text-lightBeige ">
          Login
        </h2>
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <input
              {...register("email")}
              type="email"
              className=" border-2 border-blue-300 focus:border-blue-700 focus:outline-none p-2 pr-16 rounded-xl m-2 "
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
              className=" border-2 border-blue-300 focus:border-blue-700 focus:outline-none p-2 pr-16 rounded-xl m-2 "
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
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
