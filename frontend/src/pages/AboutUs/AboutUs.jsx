import { useState } from "react";
import Footer from "../../components/Footer/Footer";


const AboutUs = () => {
  useState(()=>{
    window.scrollTo(0,0)
  })
    return (
        <>
       
      <section className="bg-purple-100 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-black mb-12">
            About Us
          </h2>
          
          {/* Description */}
          <p className="text-xl font-semibold mb-8 text-gray-800">
            At <strong>BELLEZA</strong>, we believe in creating products that not only meet but exceed expectations. With a passion for quality, sustainability, and innovation, we are dedicated to bringing you the best.
          </p>
  
          <p className="text-lg text-gray-800 mb-16">
            Since our inception, our mission has been to provide premium products made with the finest ingredients. Every item we offer is carefully crafted with attention to detail and a commitment to delivering an extraordinary experience.
          </p>
  
          {/* Story Section */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-16">
            <div className="flex-1 bg-white p-8 rounded-lg shadow-xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-black mb-4">Our Journey</h3>
              <p className="text-lg text-gray-800">
                Our journey began with a simple idea: to provide products that inspire joy and satisfaction. Over the years, we have perfected our craft, sourcing the best ingredients and materials to create items that are both beautiful and functional. Whether it&apos;s fresh, organic herbs or vibrant fruits, we only settle for the best.
              </p>
            </div>
  
            <div className="flex-1 bg-white p-8 rounded-lg shadow-xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-black mb-4">Our Values</h3>
              <p className="text-lg text-gray-800">
                Sustainability is at the heart of everything we do. We believe in respecting nature and the environment by sourcing ethically and minimizing waste. Our commitment to using only organic, non-GMO ingredients ensures that you not only get a high-quality product but one that you can feel good about using.
              </p>
            </div>
          </div>
  
          {/* Why We're Different Section */}
          <h3 className="text-3xl font-bold text-black mb-8">
            Why Choose Us?
          </h3>
  
          <p className="text-lg text-gray-800 mb-16">
            What sets us apart is our unwavering dedication to quality, customer satisfaction, and sustainability. Here&apos;s why you should choose our products:
          </p>
  
          {/* Feature List */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
             
              <h3 className="text-2xl font-bold mb-4">Customer Satisfaction</h3>
              <p className="text-lg">
                Our customers are at the core of everything we do. We pride ourselves on delivering not just products, but experiences that leave our clients completely satisfied.
              </p>
            </div>
  
            {/* Feature 2 */}
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
             
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-lg">
                We stay ahead of the curve by continuously innovating and introducing new products that meet the ever-evolving needs of our customers.
              </p>
            </div>
  
            {/* Feature 3 */}
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
             
              <h3 className="text-2xl font-bold mb-4">Trust & Partnership</h3>
              <p className="text-lg">
                We value long-term relationships with our customers and partners, built on mutual trust, transparency, and commitment to success.
              </p>
            </div>
          </div>
  
          {/* Closing Statement */}
          <div className="mt-16">
            <p className="text-lg text-gray-800">
              When you choose <strong>BELLEZA</strong>, you&apos;re not just choosing a product; you&apos;re choosing a brand that stands for quality, sustainability, and customer satisfaction. We&apos;re committed to providing you with products that enhance your life in meaningful ways, and we look forward to being a part of your journey.
            </p>
          </div>
        </div>
      </section>
        <Footer/>
      </>
    );
  };
  
  export default AboutUs;
  