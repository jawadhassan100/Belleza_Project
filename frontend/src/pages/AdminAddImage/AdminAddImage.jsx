import Sidebar from "../../components/Sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import config from "../../config/config";
import './image.css'
const BASE_URL = config.BASE_URL;

const AdminAddImage = () => {
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      setUploadStatus("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const token = localStorage.getItem("token");

    try {
      await axios.post(`${BASE_URL}/image/add`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Failed to upload the image. Please try again.");
    }
  };

  return (
    <div className="flex pt-16 h-screen bg-purple-200">
      <Sidebar />
      <div className="flex-1 overflow-auto mt-10 p-6">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4 image-text">Add New Image</h1>
          <form onSubmit={handleImageUpload} className="space-y-4">
            <div className="input">
              <label
                htmlFor="imageUpload"
                className="block text-sm font-medium text-gray-700 mb-2 heading"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="imageUpload"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition"
            >
              Upload
            </button>
          </form>
          {uploadStatus && (
            <p
              className={`mt-4 text-center ${
                uploadStatus.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {uploadStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAddImage;
