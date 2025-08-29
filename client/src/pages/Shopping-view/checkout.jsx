import Address from "../../components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "../../components/shopping-view/cart-items-content";
import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { createNewOrder } from "../../store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL, isLoading, error } = useSelector((state) => state.shopOrder || {});
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();

  console.log(currentSelectedAddress, "currentSelectedAddress");
  console.log(cartItems, "cartItems");
  console.log(approvalURL, "approvalURL");
  console.log(error, "error");
  console.log(approvalURL, "approvalURL");
  console.log(error, "error");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed");
      return;
    }
    if (currentSelectedAddress === null) {
      toast.error("Please select one address to proceed.");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log("Payment response:", data);
      console.log("Payload:", data?.payload);
      console.log("Success:", data?.payload?.success);
      console.log("Approval URL:", data?.payload?.approvalURL);
      
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
        toast.success("Redirecting to PayPal...");
        console.log("Should redirect to:", data?.payload?.approvalURL);
        
        // Redirect immediately if approvalURL is available
        if (data?.payload?.approvalURL) {
          console.log("Redirecting immediately to:", data?.payload?.approvalURL);
          window.location.href = data?.payload?.approvalURL;
        }
      } else {
        setIsPaymemntStart(false);
        toast.error(data?.payload?.message || "Payment initiation failed");
      }
    }).catch((error) => {
      console.error("Payment error:", error);
      setIsPaymemntStart(false);
      toast.error("Payment initiation failed. Please try again.");
    });
  }

  useEffect(() => {
    if (approvalURL) {
      console.log("Redirecting to PayPal:", approvalURL);
      window.location.href = approvalURL;
    }
  }, [approvalURL]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Payment initiation failed");
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 p-6 lg:p-8 max-w-7xl mx-auto">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-black rounded-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Order Summary</h2>
            {cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item) => (
                  <UserCartItemsContent key={item.productId} cartItem={item} />
                ))
              : (
                <div className="text-center py-8">
                  <p className="text-black">No items in cart</p>
                </div>
              )}
            <div className="mt-6 pt-4 border-t border-black space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-black">Total</span>
                <span className="text-2xl font-bold text-black">${totalCartAmount}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {currentSelectedAddress && (
              <div className="p-4 bg-gray-100 border border-black rounded-lg">
                <p className="text-sm font-semibold text-black mb-2">Selected Address:</p>
                <p className="text-sm text-black">{currentSelectedAddress.address}, {currentSelectedAddress.city}</p>
              </div>
            )}
            <Button 
              onClick={handleInitiatePaypalPayment} 
              className="w-full bg-black text-white hover:bg-gray-800 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              disabled={!currentSelectedAddress || isLoading}
            >
              {isLoading || isPaymentStart
                ? "Processing PayPal Payment..."
                : "Checkout with PayPal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;