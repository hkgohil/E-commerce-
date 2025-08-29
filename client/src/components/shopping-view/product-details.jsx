import { StarIcon, X, Heart, ShoppingCart, Star, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { toast } from "sonner";
import { setProductDetails } from "../../store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { getReviews } from "../../store/shop/review-slice";
import { Badge } from "../ui/badge";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  // Create image array for gallery with null check
  const productImages = productDetails?.image ? [productDetails.image] : [];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (!getCurrentProductId || !getTotalStock) {
      toast.error("Product information is incomplete");
      return;
    }

    let getCartItems = cartItems?.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getQuantity} quantity can be added for this item`);
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart successfully!");
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setCurrentImageIndex(0);
  }

  function handleWishlist() {
    if (!productDetails?._id) {
      toast.error("Product information is not available");
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let updated;
    if (wishlist.includes(productDetails._id)) {
      updated = wishlist.filter((id) => id !== productDetails._id);
      setIsWishlisted(false);
      toast.success("Removed from wishlist");
    } else {
      updated = [...wishlist, productDetails._id];
      setIsWishlisted(true);
      toast.success("Added to wishlist");
    }
    localStorage.setItem("wishlist", JSON.stringify(updated));
  }

  function nextImage() {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  }

  function prevImage() {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  }

  useEffect(() => {
    if (productDetails?._id) {
      dispatch(getReviews(productDetails._id));
      // Check if product is in wishlist
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setIsWishlisted(wishlist.includes(productDetails._id));
    }
  }, [productDetails?._id, dispatch]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  const discountPercentage = productDetails?.salePrice > 0 && productDetails?.price > productDetails?.salePrice
    ? Math.round(((productDetails.price - productDetails.salePrice) / productDetails.price) * 100)
    : 0;

  // Don't render if productDetails is null or modal is not open
  if (!productDetails || !open) {
    return null;
  }

  return (
    <>
      {/* Semi-transparent overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleDialogClose}
      />
      
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-[95vw] lg:max-w-[900px] xl:max-w-[1100px] max-h-[95vh] bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Product Images Section */}
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center bg-gray-50 p-6 lg:p-8 relative">
            <div className="relative w-full h-64 lg:h-[420px] flex items-center justify-center">
              {productImages.length > 0 ? (
                <img
                  src={productImages[currentImageIndex]}
                  alt={productDetails?.title || 'Product Image'}
                  className="w-full h-full object-contain rounded-xl shadow-md border border-gray-100 bg-white"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
                  <Eye className="h-16 w-16 text-gray-400" />
                </div>
              )}
              {/* Image Navigation */}
              {productImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-gray-100 rounded-full shadow z-10 border border-gray-200"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-gray-100 rounded-full shadow z-10 border border-gray-200"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
              {/* Image Indicators */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full border-2 ${index === currentImageIndex ? 'bg-black border-black' : 'bg-white border-gray-300'} transition-all`}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto w-full justify-center">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? 'border-black' : 'border-gray-200 hover:border-gray-300'} transition-all`}
                  >
                    <img
                      src={image}
                      alt={`${productDetails?.title || 'Product'} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="lg:w-1/2 w-full flex flex-col h-full bg-white p-6 lg:p-8 relative">
            {/* Close Button - always top right of details section */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-[9999] w-10 h-10 bg-white hover:bg-gray-50 rounded-full shadow border border-gray-200"
              onClick={handleDialogClose}
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </Button>
            {/* Header and Wishlist */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-black mb-1 line-clamp-2">
                  {productDetails?.title || 'Product Title'}
                </h1>
                <p className="text-black text-sm lg:text-base line-clamp-3">
                  {productDetails?.description || 'Product description not available'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 hover:bg-gray-100 transition-all duration-300 text-black rounded-full border border-black ml-2"
                onClick={handleWishlist}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-black text-black' : 'text-black'}`} />
              </Button>
            </div>
            {/* Price and Discount */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                {productDetails?.salePrice > 0 ? (
                  <>
                    <span className="text-3xl font-bold text-black">${productDetails.salePrice}</span>
                    <span className="text-xl text-gray-500 line-through">${productDetails.price}</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-black">${productDetails?.price || 0}</span>
                )}
              </div>
              {discountPercentage > 0 && (
                <Badge className="bg-black text-white px-3 py-2 text-sm font-semibold border border-black">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>
            {/* Rating */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2"> 
                <StarRatingComponent rating={averageReview} />
              </div>
              <span className="text-gray-700 font-medium text-sm lg:text-base ml-3">
                {averageReview.toFixed(1)} ({reviews?.length || 0} reviews)
              </span>
            </div>
            {/* Stock Status */}
            <div className="mb-6">
              {!productDetails?.totalStock || productDetails.totalStock === 0 ? (
                <Badge className="bg-red-100 text-red-800 px-3 py-2 text-sm border border-red-200">
                  Out of Stock
                </Badge>
              ) : productDetails.totalStock < 10 ? (
                <Badge className="bg-orange-100 text-orange-800 px-3 py-2 text-sm border border-orange-200">
                  Only {productDetails.totalStock} left
                </Badge>
              ) : (
                <Badge className="bg-green-100 text-green-800 px-3 py-2 text-sm border border-green-200">
                  In Stock ({productDetails.totalStock} available)
                </Badge>
              )}
            </div>
            <Separator className="my-4 bg-black" />
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-auto">
              <Button
                onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
                className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-semibold rounded-xl transition-all duration-300"
                disabled={!productDetails?.totalStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsDialog;