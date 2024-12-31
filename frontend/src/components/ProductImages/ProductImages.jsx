import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import { Link } from "react-router";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
const BASE_URL = config.BASE_URL;

const ProductImages = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchImages = async () => {
          try {
            const response = await axios.get(
              `${BASE_URL}/image/all`  
            ); 
            setImages(response.data.slice(0, 4)); 
          } catch (error) {
            console.error("Error fetching images:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchImages();
      }, []);
  
      if (loading) {
        return  <div className="flex justify-center bg-purple-200 items-center h-screen">
        <LoadingAnimation /> 
      </div>
      }
    
      return (
        <section className="my-4 py-8 px-3 bg-purple-200">
          <h2 className="text-4xl  font-bold text-center text-purple-500 mb-10">
             Featured Images
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-3 mt-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-[3px] shadow-md group"
              >
                <img
                  src={image.imageUrl}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
            <div className="flex justify-center mt-6">
                <Link to="/product/image">
              <button
                className="px-6 py-2 bg-purple-500 text-white rounded-sm shadow hover:bg-purple-800 transition duration-300"
              >
                See All Images
              </button>
              </Link>
            </div>
        </section>
      );
    };

export default ProductImages