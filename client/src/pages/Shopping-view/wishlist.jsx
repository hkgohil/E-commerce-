import { useEffect, useState } from "react";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { Heart, X } from "lucide-react";

function getWishlistFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  } catch {
    return [];
  }
}

function setWishlistToStorage(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function WishlistPage() {
  const { productList } = useSelector((state) => state.shopProducts);
  const [wishlist, setWishlist] = useState(getWishlistFromStorage());

  useEffect(() => {
    const onStorage = () => setWishlist(getWishlistFromStorage());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function handleRemoveFromWishlist(productId) {
    const updated = wishlist.filter((id) => id !== productId);
    setWishlist(updated);
    setWishlistToStorage(updated);
  }

  function handleWishlistChange(updated) {
    setWishlist(updated);
  }

  const wishlistedProducts = productList.filter((product) =>
    wishlist.includes(product._id)
  );

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-black animate-pulse-glow" />
          <h1 className="text-3xl sm:text-4xl font-bold text-black">
            My Wishlist
          </h1>
        </div>
        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-16 h-16 text-black mx-auto mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold text-black mb-2">Your wishlist is empty</h2>
            <p className="text-black mb-6">Browse products and add your favorites to your wishlist!</p>
            <Button href="/shop/home" as="a" className="bg-black text-white px-6 py-3 rounded-lg font-semibold">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistedProducts.map((product) => (
              <div key={product._id} className="relative group">
                <ShoppingProductTile product={product} onWishlistChange={handleWishlistChange} />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white z-10 shadow-lg"
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  aria-label="Remove from wishlist"
                >
                  <X className="w-5 h-5 text-black" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage; 