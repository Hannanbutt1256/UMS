import { RegisterInterface } from "../../types/auth";
import { registerSchema } from "../../validation/authSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInterface>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterInterface> = async (data) => {
    console.log("Form Submitted:", data);

    try {
      const response = await axios.post(
        "https://server-eight-tau.vercel.app/api/register",
        data
      );
      console.log("Registration successful:", response.data);
      window.location.href = "../auth/login";
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="flex justify-center items-center font-mont h-screen">
      <div className=" rounded-xl p-6 md:px-20 w-fit bg-gradient-to-br from-mintGreen to-softBlue ">
        <h2 className="text-center p-3 text-2xl font-bold text-lightBeige ">
          Sign Up
        </h2>
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("userName")}
              type="text"
              className=" border-2 border-blue-300 focus:border-blue-700 focus:outline-none p-2 pr-16 rounded-xl m-2 "
              placeholder="Username"
            />
            {errors.userName && (
              <p className="text-red-600">{errors.userName.message}</p>
            )}
          </div>

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

          <div className="">
            <input
              {...register("confirmPassword")}
              type="password"
              className=" border-2 border-blue-300 focus:border-blue-700 focus:outline-none p-2 pr-16 rounded-xl m-2 "
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="p-2 px-4 rounded-full m-2 bg-blue-700 text-white text-lg font-medium"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
