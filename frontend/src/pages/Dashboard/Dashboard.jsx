import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import config from "../../config/config";
import AdminAllImages from "../../components/AdminAllImages/AdminAllImages";

const BASE_URL = config.BASE_URL;

const Dashboard = () => {
  const [data, setData] = useState({
    totalContacts: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalImages: 0,
  });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${BASE_URL}/dashboard/data`, {
          withCredentials: true,
          headers: {
            Authorization: `${token}`,
          },
        });
        setData(response.data.totals);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex pt-16 h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        {/* Conditionally render loading animation or dashboard content */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingAnimation />
          </div>
        ) : (
          <>
            <div className="w-full max-w-6xl mx-auto mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 text-center mb-8">
                Overview of your platform&apos;s data
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Total Products", count: data.totalProducts },
                  { title: "Total Images", count: data.totalImages },
                  { title: "Total Orders", count: data.totalOrders },
                  { title: "Total Contacts", count: data.totalContacts },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-6 text-center"
                  >
                    <div className="text-4xl font-semibold text-purple-500 mb-2">
                      {item.count}
                    </div>
                    <div className="text-gray-500">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
            <AdminAllImages />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
