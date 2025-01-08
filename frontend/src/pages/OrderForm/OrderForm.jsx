import axios from "axios";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import config from "../../config/config";
import { useNavigate, useParams } from "react-router";

const BASE_URL = config.BASE_URL;
const DELIVERY_CHARGES = 150;

const provinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Jammu and Kashmir",
  "Islamabad Capital Territory",
];

const OrderForm = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
    quantity: 1,
  });

  const [myPrice, setMyPrice] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await axios.get(`${BASE_URL}/product/${id}`);
        const price = response.data.price;
        if (price && !isNaN(price)) {
          setMyPrice(price * orderDetails.quantity + DELIVERY_CHARGES);
        } else {
          setMyPrice(DELIVERY_CHARGES);
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [id, orderDetails.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/order/create`, {
        ...orderDetails,
        productId: id,
      });

      if (response.status === 200) {
        enqueueSnackbar("Order Created Successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/checkout");
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <div className="pt-20 flex justify-center items-center p-4 bg-gray-100 rounded-md shadow-md">
      <div className="bg-white shadow-lg rounded-lg p-4 contact-form w-full max-w-lg ease-in-out">
      <h2 className="text-2xl font-bold mb-6 text-center">Place Your Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="fullName"
              value={orderDetails.fullName}
              onChange={handleChange}
              placeholder="john doe"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="phoneNumber"
              value={orderDetails.phoneNumber}
              onChange={handleChange}
              placeholder="+123456789"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={orderDetails.email}
            onChange={handleChange}
            placeholder="example123@.com"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Address <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="address"
            value={orderDetails.address}
            onChange={handleChange}
            placeholder="123 Main Street"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
          <div>
            <label className="block font-semibold">City <span className="text-red-500">*</span></label>
            <input
            type="text"
            name="city"
            value={orderDetails.city}
            onChange={handleChange}
            placeholder="abbottabad"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          </div>

          <div>
            <label className="block font-semibold">Province <span className="text-red-500">*</span></label>
            <select
              name="province"
              value={orderDetails.province}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>Select your province</option>
              {provinces.map((province) => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
          <div>
            <label className="block font-semibold">Quantity <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="quantity"
              value={orderDetails.quantity}
              onChange={handleChange}
              min="1"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Total Price (incl. delivery) <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={`${myPrice} PKR`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-800 transition duration-300"
        >
          Submit Order
        </button>
      </form>
      </div>
    </div>
  );
};

export default OrderForm;
