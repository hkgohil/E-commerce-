import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "../../config";
import { Badge } from "../ui/badge";
import { Heart, Eye, Star, ShoppingCart, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

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

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
  onWishlistChange,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = getWishlistFromStorage();
    setIsWishlisted(wishlist.includes(product?._id));
  }, [product?._id]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    const wishlist = getWishlistFromStorage();
    let updated;
    if (wishlist.includes(product?._id)) {
      updated = wishlist.filter((id) => id !== product._id);
      setIsWishlisted(false);
    } else {
      updated = [...wishlist, product._id];
      setIsWishlisted(true);
    }
    setWishlistToStorage(updated);
    if (onWishlistChange) onWishlistChange(updated);
  };

  const getDiscountPercentage = () => {
    if (product?.salePrice > 0 && product?.price > product?.salePrice) {
      return Math.round(((product.price - product.salePrice) / product.price) * 100);
    }
    return 0;
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <Card 
      className="group relative overflow-hidden bg-white border border-gray-200 hover:border-primary/30 hover-3d glow-on-hover shadow-lg hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div 
        className="relative overflow-hidden cursor-pointer"
        onClick={() => handleGetProductDetails && handleGetProductDetails(product?._id)}
      >
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[280px] sm:h-[320px] lg:h-[350px] xl:h-[380px] object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Enhanced Overlay with quick actions */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`absolute top-4 right-4 flex flex-row gap-3`}>
            <Button
              size="icon"
              variant="ghost"
              className="w-12 h-12 bg-white/95 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
              onClick={handleWishlist}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-all duration-300`} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="w-12 h-12 bg-white/95 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <Eye className="w-6 h-6 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Enhanced Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product?.totalStock === 0 ? (
            <Badge className="bg-black text-white border border-black shadow-xl px-3 py-1 text-sm font-semibold">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="bg-black text-white border border-black shadow-xl px-3 py-1 text-sm font-semibold">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : discountPercentage > 0 ? (
            <Badge className="bg-black text-white border border-black shadow-xl px-3 py-1 text-sm font-semibold">
              {`${discountPercentage}% OFF`}
            </Badge>
          ) : null}
          
          {product?.isNew && (
            <Badge className="bg-black text-white border border-black shadow-xl px-3 py-1 text-sm font-semibold">
              New
            </Badge>
          )}
        </div>

        {/* Enhanced Rating */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl border border-black">
            <Star className="w-5 h-5 fill-black text-black" />
            <span className="text-sm font-bold text-black">4.8</span>
          </div>
        </div>
      </div>

      {/* Enhanced Product Info */}
      <CardContent className="p-6 lg:p-8">
        <div className="space-y-4">
          {/* Category and Brand */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-black font-semibold bg-white px-3 py-1 rounded-full border border-black">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-black font-medium bg-white px-3 py-1 rounded-full border border-black">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-lg lg:text-xl font-bold text-black line-clamp-2 group-hover:text-black transition-all duration-300 leading-tight">
            {product?.title}
          </h3>

          {/* Enhanced Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {product?.salePrice > 0 ? (
                <>
                  <span className="text-2xl lg:text-3xl font-bold text-black">
                    ${product?.salePrice}
                  </span>
                  <span className="text-lg lg:text-xl text-black line-through">
                    ${product?.price}
                  </span>
                </>
              ) : (
                <span className="text-2xl lg:text-3xl font-bold text-black">
                  ${product?.price}
                </span>
              )}
            </div>
            
            {discountPercentage > 0 && (
              <div className="flex items-center gap-2 text-black bg-white px-3 py-1 rounded-full border border-black">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">{discountPercentage}% off</span>
              </div>
            )}
          </div>

          {/* Enhanced Stock Status */}
          {product?.totalStock > 0 && product?.totalStock < 20 && (
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden border border-black">
                <div 
                  className="bg-black h-3 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${(product.totalStock / 20) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-black font-medium">{product.totalStock} left</span>
            </div>
          )}
        </div>
      </CardContent>

      {/* Enhanced Action Button */}
      <CardFooter className="p-6 lg:p-8 pt-0">
        {product?.totalStock === 0 ? (
          <Button 
            className="w-full bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300 py-4 text-lg font-semibold rounded-xl"
            disabled
          >
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart && handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-black text-white hover:bg-gray-800 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
          >
            <ShoppingCart className="w-6 h-6 mr-3" />
            Add to Cart
          </Button>
        )}
      </CardFooter>

      {/* Enhanced Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-black transition-all duration-500 pointer-events-none rounded-xl"></div>
      
      {/* Floating Animation on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"></div>
    </Card>
  );
}

export default ShoppingProductTile;