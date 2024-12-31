import { useEffect, useState } from "react"
import Features from "./components/Features/Features"
import Footer from "./components/Footer/Footer"
import Hero from "./components/Hero/Hero"
import IngredientsSection from "./components/Ingredients/Ingredients"
import Product from "./components/Product/Product"
import Reviews from "./components/Reviews/Reviews"
import WhyChooseUs from "./components/whyChooseUs/whyChooseUs"
import { FaArrowUp } from "react-icons/fa6";
import { FaWhatsapp } from 'react-icons/fa';
import { useRef } from "react";
import ProductImages from "./components/ProductImages/ProductImages"

const HomePage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const phoneNumber = '+923425645900'
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

 const productSectionRef = useRef(null);

  const handleScrollToProducts = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
  

  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
    <div className="overflow-hidden">
       <Hero onScrollToProducts={handleScrollToProducts}/>
       <Product  productSectionRef= {productSectionRef}/>
       <ProductImages/>
       <IngredientsSection/>
       <Features/>
       <WhyChooseUs/>
       <Reviews/>
       <Footer/>
    </div>
     {showScrollButton && (
        <button
          onClick={handleClick}
      className="fixed bottom-20 right-4 p-3 bg-green-500 rounded-full shadow-lg cursor-pointer hover:bg-green-600"
    >
      <FaWhatsapp size={30} color="white" />
        </button>
      )}
    {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-600 transition-all duration-300"
        >
          <FaArrowUp className='text-xl'/>
        </button>
      )}

    </>
  )
}

export default HomePage