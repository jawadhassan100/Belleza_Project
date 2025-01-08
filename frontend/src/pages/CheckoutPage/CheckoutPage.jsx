import { FaCheckCircle, FaEnvelope } from 'react-icons/fa';

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen pt-24 sm:pt-24  bg-purple-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8">
        <div className="text-center space-y-6">
          <FaCheckCircle className="mx-auto h-16 w-16 text-purple-500" />
          
          <h1 className="text-3xl font-bold text-gray-900">
            Thank You for Your Order!
          </h1>
          
          <div className="space-y-4 text-gray-600">
            <p className="text-lg">
              Your order has been placed successfully. We&apos;re excited to fulfill your purchase!
            </p>
            
            <p>
              You will receive a confirmation email shortly with your order details.
            </p>
            
            <div className="pt-4">
              <p className="font-medium">Need assistance?</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <FaEnvelope className="text-gray-600" />
                <a 
                  href="mailto:Bellezapk1@gmail.com" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Bellezapk1@gmail.com
                </a>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                We appreciate your business and hope you enjoy your purchase!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;