import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md bg-white">
      <SheetHeader className="border-b border-black pb-4">
        <SheetTitle className="text-2xl font-bold text-black">Your Cart</SheetTitle>
      </SheetHeader>
      
      <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, idx) => (
            <UserCartItemsContent key={item.productId || idx} cartItem={item} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-black text-lg">Your cart is empty</p>
            <p className="text-gray-600 mt-2">Add some products to get started!</p>
          </div>
        )}
      </div>
      
      {cartItems && cartItems.length > 0 && (
        <>
          <div className="mt-6 pt-4 border-t border-black space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-black">Total</span>
              <span className="text-2xl font-bold text-black">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <Button
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
            className="w-full mt-6 bg-black text-white hover:bg-gray-800 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;