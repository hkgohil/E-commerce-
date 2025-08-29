import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="border border-black max-w-md w-full text-center">
        <CardHeader className="pb-6">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold text-black">Payment Successful!</CardTitle>
          <p className="text-black mt-2">Your order has been placed successfully.</p>
        </CardHeader>
        <div className="p-6 pt-0">
          <Button 
            className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-semibold rounded-lg transition-all duration-300"
            onClick={() => navigate("/shop/account")}
          >
            View Orders
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;  