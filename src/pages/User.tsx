import { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const UserAndProductCategories = () => {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<number | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const totalUsersResponse = await axios.get(
          "https://server-eight-tau.vercel.app/api/users/total"
        );
        setTotalUsers(totalUsersResponse.data.totalUsers);

        const onlineUsersResponse = await axios.get(
          "https://server-eight-tau.vercel.app/api/users/online"
        );
        setOnlineUsers(onlineUsersResponse.data.onlineUsers);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch product data and process categories
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const products = response.data;

        // Count products per category
        const counts: { [key: string]: number } = {};
        products.forEach((product: { category: string }) => {
          counts[product.category] = counts[product.category] + 1 || 1;
        });
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  // Check if the data is loaded
  if (
    totalUsers === null ||
    onlineUsers === null ||
    Object.keys(categoryCounts).length === 0
  ) {
    return <div>Loading...</div>;
  }

  // Prepare the user status chart data
  const userChartData = {
    labels: ["Online Users", "Offline Users"],
    datasets: [
      {
        data: [onlineUsers, totalUsers - onlineUsers],
        backgroundColor: ["#4CAF50", "#4A90E2"], // Green for online, blue for offline
        hoverBackgroundColor: ["#66BB6A", "#4A90E2"],
      },
    ],
  };

  // Prepare the product category chart data
  const categoryChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Product Categories",
        data: Object.values(categoryCounts),
        backgroundColor: [
          "#FF6F61", // Red
          "#4A90E2", // Blue
          "#FFEB3B", // Yellow
          "#2ECC71", // Green
          "#9B59B6", // Purple
        ], // Add more colors as needed
        hoverBackgroundColor: [
          "#FF6F61",
          "#4A90E2",
          "#FFEB3B",
          "#2ECC71",
          "#9B59B6",
        ],
      },
    ],
  };

  // Chart options for responsiveness
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to adjust size
  };

  return (
    <div className="grid  md:grid-cols-2 w-full sm:w-96 mx-auto ">
      {/* User Status Chart */}
      <div className="">
        <h2 className="text-center text-xl font-semibold mb-4">User Status</h2>
        <div className="relative" style={{ height: "300px" }}>
          <Doughnut data={userChartData} options={chartOptions} />
        </div>
        <div className="text-center mt-4">
          <p>Total Users: {totalUsers}</p>
          <p>Online Users: {onlineUsers}</p>
        </div>
      </div>
      {/* Product Categories Bar Chart */}
      <div>
        <h2 className="text-center text-xl font-semibold mb-4 mt-8">
          Product Categories
        </h2>
        <div className="relative" style={{ height: "300px" }}>
          <Bar data={categoryChartData} options={chartOptions} />
        </div>
        <div className="text-center mt-4">
          <p>Product Categories Breakdown</p>
        </div>
      </div>
    </div>
  );
};

export default UserAndProductCategories;
