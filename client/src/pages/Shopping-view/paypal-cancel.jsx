import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

function PaypalCancelPage() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("PayPal payment was cancelled");
  }, []);

  const handleReturnToCheckout = () => {
    navigate("/shop/checkout");
  };

  const handleReturnToHome = () => {
    navigate("/shop/home");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-lg border border-black p-8 text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-black mb-4">
            Payment Cancelled
          </h1>
          
          <p className="text-black mb-8">
            Your PayPal payment was cancelled. You can try again or return to shopping.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={handleReturnToCheckout}
              className="w-full bg-black hover:bg-gray-800"
            >
              Try Payment Again
            </Button>
            
            <Button 
              onClick={handleReturnToHome}
              variant="outline"
              className="w-full"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaypalCancelPage; 