import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import config from "../../config/config";

const BASE_URL = config.BASE_URL;

const Product = ({ productSectionRef }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product`);
        if (response.data && response.data.length > 0) {
          setProduct(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center bg-purple-200 items-center h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center text-4xl h-screen items-center font-semibold text-purple-800 bg-purple-200">
        No product available.
      </div>
    );
  }

  // Define Framer Motion Variants
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section ref={productSectionRef}>
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-center text-purple-500 mb-10">
          Our Product
        </h1>

        <div className="flex py-10 flex-col md:flex-row items-center bg-purple-200 shadow-lg rounded-lg overflow-hidden">
          {/* Text Section */}
          <motion.div
            className="w-full md:w-1/2 p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }} // Trigger animation every time
            variants={textVariants}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h2>
            <p className="text-lg text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg text-gray-600 mb-2">{product.ingredients}</p>
            <p className="text-2xl font-bold text-gray-600 mb-6">
              Price: <span className="text-black">{product.price} PKR</span>
            </p>
            <Link to={`/order-form/${product._id}`}>
            <motion.button
              className="bg-purple-600 text-white px-6 py-2 rounded-sm text-lg shadow-md transition-all"
              whileHover={{
                scale: 1.1, 
                boxShadow: "0px 0px 15px rgba(128, 90, 213, 0.8)", 
                backgroundColor: "#805ad5", 
                transition: {
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10, 
                  duration: 0.3,
                },
              }}
              whileTap={{
                scale: 0.9, 
                backgroundColor: "#4c2889", 
                transition: { duration: 0.2 },
              }}
  >
    Order Now
  </motion.button>
            </Link>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full justify-end flex px-5 md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }} // Trigger animation every time
            variants={imageVariants}
          >
            <img
              src={product.mainImage}
              alt={product.name}
              className="w-[100%] object-cover rounded-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Product;
