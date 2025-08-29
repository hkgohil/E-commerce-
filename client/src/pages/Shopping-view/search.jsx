import ProductDetailsDialog from "../../components/shopping-view/product-details";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { Input } from "../../components/ui/input";
import { useToast } from "../../components/ui/use-toast";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { fetchProductDetails } from "../../store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "../../store/shop/search-slice";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SlidersHorizontal,
  X,
  Sparkles,
  TrendingUp,
  Clock,
  Star
} from "lucide-react";
import VoiceSearchButton from "../../components/ui/voice-search-button";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults = [] } = useSelector((state) => state.shopSearch || {});
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();
  const inputRef = useRef();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
      const timeoutId = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 800);
      return () => clearTimeout(timeoutId);
    } else if (keyword.trim() === "") {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword, dispatch, setSearchParams]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

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
        toast.success("Product is added to cart");
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const getSortedResults = () => {
    if (!searchResults.length) return [];
    
    const sorted = [...searchResults];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      case "price-high":
        return sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return sorted;
    }
  };

  const sortedResults = getSortedResults();

  const handleVoiceResult = (transcript) => {
    setKeyword(transcript);
    if (transcript && transcript.trim().length > 2) {
      setSearchParams(new URLSearchParams(`?keyword=${transcript}`));
      dispatch(getSearchResults(transcript));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  ref={inputRef}
                  value={keyword}
                  name="keyword"
                  onChange={(event) => setKeyword(event.target.value)}
                  className="pl-12 pr-16 py-4 text-lg bg-gray-50 border-gray-200 focus:bg-white focus:border-primary transition-all duration-300"
                  placeholder="Search for products, brands, categories..."
                />
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                  <VoiceSearchButton onResult={handleVoiceResult} />
                </div>
                {keyword && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setKeyword("")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      {showFilters && (
        <div className="bg-white border-b animate-slide-in-up">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/30 focus:border-black transition-all duration-300"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* View Mode Toggle */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {sortedResults.length} results found
            </span>
            {keyword && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Search className="w-3 h-3" />
                "{keyword}"
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-9 w-9"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-9 w-9"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="container mx-auto px-4 pb-12">
        {!keyword ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Searching</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter keywords to find the perfect products for you. Try searching for categories, brands, or specific items.
            </p>
          </div>
        ) : !sortedResults.length ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn't find any products matching "{keyword}". Try different keywords or browse our categories.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-black hover:text-white transition-colors border border-black">
                Men's Clothing
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-black hover:text-white transition-colors border border-black">
                Women's Fashion
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-black hover:text-white transition-colors border border-black">
                Accessories
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-black hover:text-white transition-colors border border-black">
                Footwear
              </Badge>
            </div>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {sortedResults.map((item, index) => (
              <div 
                key={item._id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {viewMode === "list" ? (
                  <Card className="flex flex-row overflow-hidden hover:shadow-lg transition-all duration-300 border border-black">
                    <div className="w-48 h-48 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-black">{item.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-black mb-2">
                            <span className="bg-gray-100 text-black px-2 py-1 rounded-full border border-black">
                              {item.category}
                            </span>
                            <span>{item.brand}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-4 fill-black text-black" />
                            <span className="text-sm text-black">4.8 (120 reviews)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-black mb-1">
                            ${item.salePrice || item.price}
                          </div>
                          {item.salePrice && (
                            <div className="text-sm text-gray-500 line-through">
                              ${item.price}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={() => handleAddtoCart(item._id, item.totalStock)}
                          className="flex-1 bg-black text-white hover:bg-gray-800"
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleGetProductDetails(item._id)}
                          className="border border-black hover:bg-gray-100"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <ShoppingProductTile
                    handleAddtoCart={handleAddtoCart}
                    product={item}
                    handleGetProductDetails={handleGetProductDetails}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;