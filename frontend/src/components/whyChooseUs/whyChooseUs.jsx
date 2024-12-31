import { FaThumbsUp, FaRocket, FaHandshake } from "react-icons/fa";
import bg from "../../assets/bg.jpg";

const WhyChooseUs = () => {
  return (
    <section
      className="relative flex items-center justify-center bg-fixed bg-cover bg-center py-16 md:py-32"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-7xl mx-auto text-center bg-black bg-opacity-50 p-6 md:p-10 lg:rounded-lg">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8">
          Why Choose Us?
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl font-medium mb-10 md:mb-16 text-gray-200">
          We&apos;re dedicated to providing you with the best services, and here&apos;s why.
        </p>

        {/* Cards for Features */}
        <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-3">
          {/* First Card */}
          <div className="bg-white text-gray-800 p-6 md:p-8 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center text-5xl text-purple-600 mb-4">
              <FaThumbsUp />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Customer Satisfaction</h3>
            <p className="text-sm md:text-base">
              We prioritize your satisfaction by providing top-notch quality and exceptional customer service.
            </p>
          </div>

          {/* Second Card */}
          <div className="bg-white text-gray-800 p-6 md:p-8 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center text-5xl text-purple-600 mb-4">
              <FaRocket />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Innovative Solutions</h3>
            <p className="text-sm md:text-base">
              Our team uses cutting-edge technology to bring innovative and efficient solutions tailored to you.
            </p>
          </div>

          {/* Third Card */}
          <div className="bg-white text-gray-800 p-6 md:p-8 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center text-5xl text-purple-600 mb-4">
              <FaHandshake />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Partnership & Trust</h3>
            <p className="text-sm md:text-base">
              We build lasting relationships based on trust and a commitment to long-term success for our clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
