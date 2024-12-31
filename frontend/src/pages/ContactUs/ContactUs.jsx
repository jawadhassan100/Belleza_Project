import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';
import config from '../../config/config';

const BASE_URL = config.BASE_URL;
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const { name, email, subject, message } = formData;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{
    window.scrollTo(0, 0);
  })
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      enqueueSnackbar('All fields are required!', { variant: 'warning' , autoHideDuration:1000 });
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/contact/create-contact`, formData);
      enqueueSnackbar(response.data.message, { variant: 'success' , autoHideDuration:1000 });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.error || 'Error sending message', {
        variant: 'error',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center pt-20 py-10 px-4">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 contact-form w-full max-w-lg ease-in-out"
        initial={{ opacity: 0, x: -500 }}  // Start position (offscreen to the left)
        animate={{ opacity: 1, x: 0 }}      // End position (onscreen)
        transition={{ duration: 1.5 }}       // Animation duration
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-800">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your Name"
              
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your Email"
              
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Subject"
              
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none"
              placeholder="Your Message"
              
            ></textarea>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Send Message
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
