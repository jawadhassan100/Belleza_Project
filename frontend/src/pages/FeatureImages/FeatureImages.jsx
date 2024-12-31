import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { FaArrowUp } from "react-icons/fa";

const BASE_URL = config.BASE_URL;

const FeatureImages = () => {
  const [loading, setLoading] = useState(true);
  const [verticalImages, setVerticalImages] = useState([]);
  const [horizontalImages, setHorizontalImages] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  
    // Prevent browser from retaining scroll position on refresh
    window.history.scrollRestoration = 'manual';
  
    const handleScroll = () => {
      if (window.scrollY > 110) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/image/all`);
        const allImages = response.data;

        // Separate vertical and horizontal images based on aspect ratio
        const verticals = [];
        const horizontals = [];

        await Promise.all(
          allImages.map((img) => {
            return new Promise((resolve) => {
              const imgElement = new Image();
              imgElement.src = img.imageUrl;
              imgElement.onload = () => {
                if (imgElement.naturalWidth > imgElement.naturalHeight) {
                  horizontals.push(img);
                } else {
                  verticals.push(img);
                }
                resolve();
              };
            });
          })
        );

        setVerticalImages(verticals);
        setHorizontalImages(horizontals);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center bg-purple-200 items-center h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  const renderRows = () => {
    const rows = [];
    let verticalIndex = 0;
    let horizontalIndex = 0;

    while (verticalIndex < verticalImages.length || horizontalIndex < horizontalImages.length) {
      // Add a row of 4 vertical images
      if (verticalIndex < verticalImages.length) {
        rows.push(
          <div className="grid grid-cols-2 sm:grid-col-2 md:grid-cols-4 gap-4" key={`vertical-${verticalIndex}`}>
            {verticalImages.slice(verticalIndex, verticalIndex + 4).map((img, idx) => (
              <img
                key={idx}
                src={img.imageUrl}
                alt={`Vertical Image ${idx}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ))}
          </div>
        );
        verticalIndex += 4;
      }

      // Add a row of 2 horizontal images
      if (horizontalIndex < horizontalImages.length) {
        rows.push(
          <div className="grid grid-cols-2 gap-4 mt-4 mb-5" key={`horizontal-${horizontalIndex}`}>
            {horizontalImages.slice(horizontalIndex, horizontalIndex + 2).map((img, idx) => (
              <img
                key={idx}
                src={img.imageUrl}
                alt={`Horizontal Image ${idx}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ))}
          </div>
        );
        horizontalIndex += 2;
      }
    }

    return rows;
  };

  return (
    <>
    <section className="pt-24 pb-3 px-3 bg-purple-200">
      <h2 className="text-4xl font-bold text-center text-purple-500 mb-10">Product Images</h2>
      {renderRows()}
    </section>
    {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-600 transition-all duration-300"
        >
          <FaArrowUp className='text-xl'/>
        </button>
      )}
    </>
  );
};

export default FeatureImages;
