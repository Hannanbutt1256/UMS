import { useState } from "react";
import User from "./User";
import Products from "./Products";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"user" | "products">("user");

  return (
    <div className="text-lightBeige font-geist-sans mx-5 py-7 px-7 mt-5 bg-black min-h-screen">
      {/* Navigation Section */}
      <section className="flex gap-4 mb-5">
        <ul className="flex gap-4 cursor-pointer">
          <Link to="user">
            <li
              className={`py-2 px-4 rounded-lg ${
                activeTab === "user"
                  ? "bg-lightBeige text-black"
                  : "bg-gray-700 text-lightBeige hover:bg-gray-600"
              }`}
              onClick={() => setActiveTab("user")}
            >
              User
            </li>
          </Link>
          <Link to="products">
            <li
              className={`py-2 px-4 rounded-lg ${
                activeTab === "products"
                  ? "bg-lightBeige text-black"
                  : "bg-gray-700 text-lightBeige hover:bg-gray-600"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </li>
          </Link>
        </ul>
      </section>

      {/* Render Different Components Based on Active Tab */}
      <section className="p-5 bg-gray-800 text-lightBeige rounded-lg shadow-md">
        {activeTab === "user" && <User />}
        {activeTab === "products" && <Products />}
      </section>
    </div>
  );
};

export default Dashboard;
