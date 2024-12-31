import { motion } from "framer-motion";

const Ingredients = () => {
  // Framer Motion Variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="bg-gradient-to-br mb-3 from-purple-200 to-purple-50 py-16 px-4">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={staggerContainer}
      >
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-purple-700 mb-8"
          variants={fadeUpVariants}
        >
          Ingredients
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-700 text-lg max-w-3xl mx-auto mb-12 leading-relaxed"
          variants={fadeUpVariants}
        >
          Whiten with the power of{" "}
          <span className="font-semibold text-yellow-600">Vitamin-C</span>,{" "}
          <span className="font-semibold text-yellow-600">Niacinamide (Vitamin B3)</span>,{" "}
          <span className="font-semibold text-yellow-600">Salicylic Acid</span>,{" "}
          <span className="font-semibold text-yellow-600">Glycolic Acid</span>,{" "}
          <span className="font-semibold text-yellow-600">Peptides</span>,{" "}
          <span className="font-semibold text-yellow-600">Ceramides</span>,{" "}
          <span className="font-semibold text-yellow-600">Green Tea Extract</span>,{" "}
          <span className="font-semibold text-yellow-600">Tretinoin</span>,{" "}
          <span className="font-semibold text-yellow-600">Glutathione</span>,{" "}
          <span className="font-semibold text-yellow-600">Vitamin-E</span>,{" "}
          <span className="font-semibold text-yellow-600">Alpha Arbutin</span>,{" "}
          <span className="font-semibold text-yellow-600">Licorice Root Extract</span>,{" "}
          <span className="font-semibold text-yellow-600">Kojic Acid</span>,{" "}
          <span className="font-semibold text-yellow-600">Retinol</span>, and{" "}
          <span className="font-semibold text-yellow-600">Azelaic Acid</span>.
        </motion.p>

        {/* Styled Card Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {/* Individual Ingredient Cards */}
          {[
            {
              title: "Vitamin-C",
              description:
                "Promotes bright and even skin tone with powerful antioxidants.",
            },
            {
              title: "Niacinamide",
              description:
                "Vitamin B3 that reduces inflammation and strengthens the skin barrier.",
            },
            {
              title: "Glycolic Acid",
              description:
                "Gently exfoliates for smoother, younger-looking skin.",
            },
          ].map((ingredient, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
              variants={fadeUpVariants}
            >
              <h3 className="text-2xl font-bold text-purple-600 mb-2">
                {ingredient.title}
              </h3>
              <p className="text-gray-600">{ingredient.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Ingredients;
