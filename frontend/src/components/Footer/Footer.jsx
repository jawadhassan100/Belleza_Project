import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-container bg-gradient-to-b from-purple-700 to-purple-900 text-white p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Info */}
        <div className="footer-section">
            <h3 className="text-3xl font-bold mb-4 text-purple-300">BELLEZA</h3>
          <p className="text-md text-purple-100 -mt-2">
            Discover your natural glow with <strong>BELLEZA</strong>. Enriched
            with Glutathione and Vitamin E, our premium cream is designed to
            nourish and rejuvenate your skin.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="text-2xl font-semibold mb-4 text-purple-300">
            Quick Links
          </h3>
          <ul className="text-purple-100">
            <li className="mb-2">
              <a href="#" className="hover:text-purple-400 transition">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-purple-400 transition">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-purple-400 transition">
                Orders
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-purple-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="text-2xl font-semibold mb-4 text-purple-300">
            Get in Touch
          </h3>
          <p className="text-md text-purple-100 mb-2">
            Have questions or feedback? We’d love to hear from you!
          </p>
          <a
            href="mailto:jawadhassankhan2001@gmail.com"
            className="text-purple-400 hover:underline"
          >
            Email Us
          </a>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h3 className="text-2xl font-semibold mb-4 text-purple-300">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-purple-200">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400 transition"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400 transition"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400 transition"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400 transition"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 text-purple-300">
        <p>BELLEZA &copy; 2024 - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
