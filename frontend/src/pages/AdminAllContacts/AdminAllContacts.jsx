import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSnackbar } from "notistack";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation"; // Assuming you have this component
import config from "../../config/config";
import './contact.css'
const BASE_URL = config.BASE_URL;

const AllContact = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);  // Add loading state
  const { enqueueSnackbar } = useSnackbar();

  // Fetch all contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/contact/all-contact`, {
          headers: {
            Authorization: token,
          },
        });
        setContacts(response.data);
      } catch (err) {
        enqueueSnackbar("Failed to fetch contacts. Try again later.", {
          variant: "error",
        });
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);  // Set loading to false when the request is done
      }
    };
    fetchContacts();
  }, [enqueueSnackbar]);

  // Delete contact
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${BASE_URL}/contact/delete-contact/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setContacts(contacts.filter((contact) => contact._id !== id));
      enqueueSnackbar(response.data.message || "Contact Deleted 👍", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to delete contact. Try again later.", {
        variant: "error",
      });
      console.error("Error deleting contact:", error);
    }
  };

  // Open modal with message
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  // Close modal
  const closeModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="flex bg-purple-200 pt-16 h-screen text-gray-800">
      <Sidebar />
      <div className="w-full p-6">
        {/* Show loading animation while fetching */}
        {loading && (
          <div className="flex justify-center bg-purple-200 -mt-10 items-center h-screen">
            <LoadingAnimation />
          </div>
        )}

        {/* Display contacts only when loading is done */}
        {!loading && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-center text-purple-800">All Contacts</h1>

            {contacts.length === 0 ? (
              // Show message when no contacts exist
              <div className="flex items-center justify-center h-full">
                <p className="text-lg text-purple-600 font-medium -mt-20">No contacts available.</p>
              </div>
            ) : (
              <>
                {/* Table for medium to large screens */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-3/4 mx-auto text-left text-sm border border-gray-300 shadow-lg rounded-lg bg-white">
                    <thead className="bg-purple-600 text-white">
                      <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr
                          key={contact._id}
                          className="border-b border-gray-300 hover:bg-purple-100"
                        >
                          <td className="p-4">{contact.name}</td>
                          <td className="p-4">{contact.email}</td>
                          <td className="p-4 flex gap-2">
                            <button
                              onClick={() => handleViewMessage(contact.message)}
                              className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete(contact._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cards for small screens */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="bg-white text-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between border border-gray-300"
                    >
                      <h2 className="text-xl font-bold mb-2 contact-name">{contact.name}</h2>
                      <p className="text-gray-600 mb-2 contact-email">{contact.email}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewMessage(contact.message)}
                          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Modal for viewing message */}
            {selectedMessage && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white text-gray-800 mx-3 p-6 rounded-lg max-w-md w-full shadow-lg border border-gray-300">
                  <p className="text-gray-700 mb-6">{selectedMessage}</p>
                  <button
                    onClick={closeModal}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition w-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContact;
