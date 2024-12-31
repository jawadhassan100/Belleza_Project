import { motion } from "framer-motion";
import bgHero from "../../assets/bgHero.jpg";

const Hero = ({ onScrollToProducts }) => {


  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative h-screen flex items-center z-20 justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/60 to-black/40 -z-10"></div>
      <motion.div
        className="text-center text-white px-4 sm:px-8 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          variants={textVariants}
        >
          Discover <span className="text-purple-300">Natural Glow</span>
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          variants={textVariants}
        >
          Introducing <strong>BELLEZA</strong> — an all-natural extract cream
          enriched with Glutathione & Vitamin E for radiant, healthy skin.
        </motion.p>
        <motion.button
          onClick={onScrollToProducts}
          className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-800 transition duration-300"
          variants={buttonVariants}
        >
          Buy Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
