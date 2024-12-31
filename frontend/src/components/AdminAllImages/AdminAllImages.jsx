import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";

const BASE_URL = config.BASE_URL;

const AdminAllImages = () => {
  const [images, setImages] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(null);

  const token = localStorage.getItem("token");

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/image/all`);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/image/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `${token}`,
        },
      });
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const updateImage = async (id) => {
    const formData = new FormData();
    formData.append("image", updatedImage);

    try {
      const response = await axios.put(`${BASE_URL}/image/${id}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `${token}`,
        },
      });
      setImages(images.map((img) => (img._id === id ? response.data.updatedImage : img)));
      setEditMode(null);
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-6 bg-purple-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Product All Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image._id} className="relative bg-white shadow-md p-4 rounded-lg">
            {editMode === image._id ? (
              <div className="space-y-2">
                <input
                  type="file"
                  className="w-full text-sm mb-2"
                  onChange={(e) => setUpdatedImage(e.target.files[0])}
                />
                <button
                  onClick={() => updateImage(image._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <img
                  src={image.imageUrl}
                  alt="Product"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditMode(image._id)}
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteImage(image._id)}
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllImages;
