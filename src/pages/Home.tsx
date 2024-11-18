import { Link } from "react-router-dom";
import userManagement from "../assets/user_management.png";
const Home = () => {
  return (
    <div className="font-geist-sans mx-5 py-7 px-7 mt-5 flex items-center  text-lightBeige ">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-softBlue">
          User Management System
        </h1>
        <h2 className="text-base font-medium">
          Effortlessly Manage Your Users with Our All-in-One Platform
        </h2>
        <p className="text-sm font-extralight mt-2  w-9/12 ">
          Streamline your user administration, permissions, and access controls
          – all from a single, secure dashboard.
        </p>
        <Link to="/auth/register">
          <button className=" p-3 rounded-full bg-softBlue text-lightBeige font-medium mt-6 ">
            Get Started Now
          </button>
        </Link>
      </div>
      <div className="flex-1 justify-center hidden md:block">
        <img
          src={userManagement}
          alt="User Management System"
          className=" max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Home;
