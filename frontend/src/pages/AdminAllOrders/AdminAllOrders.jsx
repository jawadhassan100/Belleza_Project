import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import config from "../../config/config";
import { useSnackbar } from "notistack";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import './order.css'
const BASE_URL = config.BASE_URL;

const AdminAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);  // Added loading state
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();  // Hook for Notistack

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);  // Set loading to true when fetching starts
      try {
        const response = await axios.get(`${BASE_URL}/order/all`, {
          withCredentials: true,
          headers: {
            Authorization: `${token}`,
          },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        enqueueSnackbar("Error fetching orders", { variant: "error" });
      } finally {
        setLoading(false);  // Set loading to false when fetching ends
      }
    };

    fetchOrders();
  }, [token , enqueueSnackbar]);  // Added token to dependency array to avoid infinite loop

  // Handle delete order
  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`${BASE_URL}/order/delete/${orderId}`, {
        withCredentials: true,
        headers: {
          Authorization: `${token}`,
        },
      });
      setOrders(orders.filter((order) => order._id !== orderId));
      enqueueSnackbar("Order deleted successfully", { variant: "success" , autoHideDuration:1000});  // Success notification
    } catch (error) {
      console.error("Error deleting order:", error);
      enqueueSnackbar("Error deleting order", { variant: "error" });  // Error notification
    }
  };

  // Open modal with order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="flex pt-16 h-screen bg-purple-200">
        <Sidebar />
        
        {/* Main content area */}
        <div className="flex-1 overflow-auto p-6 relative">
          
          {/* Loading Animation Overlay */}
          {loading && (
            <div className="flex justify-center bg-purple-200 -mt-10 items-center h-screen">
              <LoadingAnimation />
            </div>
          )}

          {/* Orders Section */}
          {!loading && (
            <div>
              <h1 className="text-2xl text-center text-purple-600 font-bold mb-6">All Orders</h1>

              {orders.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-lg text-purple-600 font-medium -mt-20">No orders available.</p>
                </div>
              ) : (
                <div>
                  {/* Table view for larger screens */}
                  <div className="hidden sm:block">
                    <div className="overflow-x-auto">
                      <table className="table-auto text-center w-full border-collapse bg-white">
                        <thead>
                          <tr className="bg-purple-500">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Total Price</th>
                            <th className="px-4 py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order._id} className="border-t">
                              <td className="px-4 py-2">{order.fullName}</td>
                              <td className="px-4 py-2">{order.email}</td>
                              <td className="px-4 py-2">{order.totalPrice}rs</td>
                              <td className="px-4 py-2 space-x-2">
                                <button
                                  className="bg-blue-500 text-white px-3 py-1 rounded"
                                  onClick={() => viewOrderDetails(order)}
                                >
                                  View
                                </button>
                                <button
                                  className="bg-red-500 text-white px-3 py-1 rounded"
                                  onClick={() => deleteOrder(order._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Card view for smaller screens */}
                  <div className="sm:hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {orders.map((order) => (
                        <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
                          <h2 className="text-xl font-semibold text-purple-600">{order.fullName}</h2>
                          <p className="order-email"><strong>Email:</strong> {order.email}</p>
                          <p><strong>Total Price:</strong> {order.totalPrice}rs</p>
                          <div className="mt-4 space-x-2">
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded"
                              onClick={() => viewOrderDetails(order)}
                            >
                              View
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded"
                              onClick={() => deleteOrder(order._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Modal for viewing order details */}
          {isModalOpen && selectedOrder && (
            <div className="fixed inset-0 flex px-2 items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <p><strong>Name:</strong> {selectedOrder.fullName}</p>
                <p><strong>Email:</strong> {selectedOrder.email}</p>
                <p><strong>Phone:</strong> {selectedOrder.phoneNumber}</p>
                <p><strong>City:</strong> {selectedOrder.city}</p>
                <p><strong>Province:</strong> {selectedOrder.province}</p>
                <p><strong>Address:</strong> {selectedOrder.address}</p>
                <p><strong>Total Price:</strong> {selectedOrder.totalPrice}rs</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminAllOrders;
