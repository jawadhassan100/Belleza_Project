import HomePage from "./HomePage"
import './App.css'
import { Route, Routes, useNavigate } from "react-router"
import AboutUs from "./pages/AboutUs/AboutUs"
import Navbar from "./components/Navbar/Navbar"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import { AuthProvider } from "./helpers/AuthContext"
import OrderForm from "./pages/OrderForm/OrderForm"
import ContactUs from "./pages/ContactUs/ContactUs"
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react"
import AdminRoute from "./helpers/AdminRoutes"
import Dashboard from "./pages/Dashboard/Dashboard"
import Unauthorized from "./pages/Unauthorized/Unauthorized"
import FeatureImages from "./pages/FeatureImages/FeatureImages"
import AdminAddImage from "./pages/AdminAddImage/AdminAddImage"
import AdminAllContacts from "./pages/AdminAllContacts/AdminAllContacts"
import AdminAllOrders from "./pages/AdminAllOrders/AdminAllOrders"
import NotFoundPage from "./pages/404Page/404Page"
import CheckoutSuccess from "./pages/checkoutPage/checkoutPage"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return; // No token, no need to check
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
        window.location.reload()
        console.log("Logged out: Token has expired.");
      } else {
        setIsAuthenticated(true);
      
      }
    };

    // Check token immediately on mount
    checkToken();

    const interval = setInterval(checkToken, 60000); // Check every minute

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
    <AuthProvider isAuthenticated={isAuthenticated}>
    <Navbar/>
    <Routes>
      <Route path="/"  element={ <HomePage/>}/>
      <Route path="/about-us"  element={ <AboutUs/>}/>
      <Route path="/contact-us"  element={ <ContactUs/>}/>
      <Route path="/register"  element={ <Register/>}/>
      <Route path="/login"  element={ <Login/>}/>
      <Route path="/order-form/:id"  element={ <OrderForm/>}/>
      <Route path="/product/image"  element={ <FeatureImages/>}/>
      <Route path="/unauthorized" element={<Unauthorized/>} />
      <Route path="/checkout" element={<CheckoutSuccess/>} />
      <Route path="/dashboard" element={<AdminRoute element={<Dashboard/>} />} />
      <Route path="/add-image" element={<AdminRoute element={<AdminAddImage/>} />} />
      <Route path="/all-contacts" element={<AdminRoute element={<AdminAllContacts />} />} />
      <Route path="/all-orders" element={<AdminRoute element={<AdminAllOrders />} />} />
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
    </AuthProvider>
    </>
  )
}

export default App