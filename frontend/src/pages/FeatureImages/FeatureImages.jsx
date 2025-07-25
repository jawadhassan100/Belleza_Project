import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { FaArrowUp } from "react-icons/fa";

// LightGallery imports
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

const BASE_URL = config.BASE_URL;

const FeatureImages = () => {
  const [loading, setLoading] = useState(true);
  const [allImages, setAllImages] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.history.scrollRestoration = "manual";

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 110);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/image/all`);
        setAllImages(response.data);
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

  return (
    <>
      <section className="pt-24 pb-3 px-3 bg-purple-200 min-h-screen">
        <h2 className="text-4xl font-bold text-center text-purple-500 mb-10">Product Images</h2>

        <LightGallery
          speed={500}
          plugins={[lgZoom, lgThumbnail]}
          elementClassNames="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4"
        >
          {allImages.map((img, idx) => (
            <a
              key={idx}
              href={img.imageUrl}
              className="break-inside-avoid block w-full mb-4"
            >
              <img
                src={img.imageUrl}
                alt={`Image ${idx}`}
                className="w-full rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </a>
          ))}
        </LightGallery>
      </section>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-600 transition-all duration-300"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </>
  );
};

export default FeatureImages;
