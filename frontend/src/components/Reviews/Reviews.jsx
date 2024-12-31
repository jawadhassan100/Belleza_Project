import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const reviewsData = [
  {
    name: "Ali Khan",
    review: "This cream is amazing! My skin became soft and radiant after using it.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/25.jpg"
  },
  {
    name: "Ayesha Noor",
    review: "Great experience! My skin feels fresh after using it.",
    rating: 4.5,
    avatar: "https://randomuser.me/api/portraits/women/26.jpg"
  },
  {
    name: "Ahmed Raza",
    review: "Provides deep moisture to the skin. I highly recommend it!",
    rating: 4.7,
    avatar: "https://randomuser.me/api/portraits/men/27.jpg"
  },
  {
    name: "Sana Malik",
    review: "After using this product, my skin feels incredibly smooth and soft. Excellent product!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    name: "Hassan Javed",
    review: "The delivery was on time, and the product quality is outstanding.",
    rating: 4.3,
    avatar: "https://randomuser.me/api/portraits/men/29.jpg"
  }
];

const Reviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="reviews-section bg-purple-50 py-16 px-4"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-purple-800 text-center mb-8">
        Customer Reviews
      </h2>
      <div className="flex justify-center">
        <Slider {...settings} className="w-full max-w-4xl">
          {reviewsData.map((review, index) => (
            <div key={index} className="review-card p-8 bg-white rounded-lg shadow-md text-center">
              <img
                src={review.avatar}
                alt={`${review.name}'s avatar`}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-purple-400"
              />
              <h3 className="text-2xl font-semibold text-purple-700 mb-2">
                {review.name}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {review.review}
              </p>
              <div className="flex justify-center items-center">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">★</span>
                ))}
                {review.rating % 1 !== 0 && (
                  <span className="text-yellow-500 text-lg">★</span> // Half star for 0.5 ratings
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.section>
  );
};

export default Reviews;
