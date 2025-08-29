import { Button } from "../../components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  Star,
  TrendingUp,
  Zap,
  Sparkles,
  ArrowRight,
  Heart,
  Eye,
  Shield,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
} from "../../store/shop/products-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { toast } from "sonner";
import ProductDetailsDialog from "../../components/shopping-view/product-details";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon, color: "bg-blue-500", description: "Trendy men's fashion" },
  { id: "women", label: "Women", icon: CloudLightning, color: "bg-pink-500", description: "Elegant women's collection" },
  { id: "kids", label: "Kids", icon: BabyIcon, color: "bg-green-500", description: "Comfortable kids wear" },
  { id: "accessories", label: "Accessories", icon: WatchIcon, color: "bg-purple-500", description: "Stylish accessories" },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon, color: "bg-orange-500", description: "Quality footwear" },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt, color: "bg-black", description: "Just Do It" },
  { id: "adidas", label: "Adidas", icon: WashingMachine, color: "bg-blue-600", description: "Impossible is Nothing" },
  { id: "puma", label: "Puma", icon: ShoppingBasket, color: "bg-red-500", description: "Forever Faster" },
  { id: "levi", label: "Levi's", icon: Airplay, color: "bg-blue-800", description: "Quality Never Goes Out of Style" },
  { id: "zara", label: "Zara", icon: Images, color: "bg-gray-800", description: "Fashion Forward" },
  { id: "h&m", label: "H&M", icon: Heater, color: "bg-red-600", description: "Fashion & Quality at the Best Price" },
];

const featureImageList = [
  { _id: "1", image: bannerOne, title: "New Collection", subtitle: "Discover the latest trends" },
  { _id: "2", image: bannerTwo, title: "Summer Sale", subtitle: "Up to 70% off on selected items" },
  { _id: "3", image: bannerThree, title: "Premium Quality", subtitle: "Shop the finest materials" }
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList } = useSelector((state) => state.shopProducts);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    const product = productList.find((p) => p._id === getCurrentProductId);
    setSelectedProduct(product);
    setOpenDetailsDialog(true);
  }

  function handleAddtoCart(getCurrentProductId) {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log("selectedProduct", selectedProduct);
  console.log("openDetailsDialog", openDetailsDialog);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Enhanced Hero Section with Premium Design */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] xl:h-[95vh] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <div
                key={slide?._id || index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out`}
              >
                <img
                  src={slide?.image}
                  alt={slide?.title}
                  className="w-full h-full object-cover parallax-bg"
                />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4 sm:px-8 lg:px-12 xl:px-16 max-w-6xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 animate-fade-in-up text-shadow">
                      <span className="text-white">{slide?.title}</span>
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-10 animate-fade-in-up animation-delay-200 text-shadow">
                      {slide?.subtitle}
                    </p>
                    <Button 
                      size="lg" 
                      className="btn-premium text-lg px-8 py-4 animate-fade-in-up animation-delay-400 glow-on-hover"
                      onClick={() => navigate('/shop/listing')}
                    >
                      Shop Now <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          : null}
        
        {/* Enhanced Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {featureImageList.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide 
                  ? "bg-black scale-125 shadow-lg" 
                  : "bg-black/50 hover:bg-black/75"
              }`}
            />
          ))}
        </div>

        {/* Enhanced Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-6 transform -translate-y-1/2 glass-card hover-3d border border-black shadow-xl w-12 h-12"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-6 transform -translate-y-2 glass-card hover-3d border border-black shadow-xl w-12 h-12"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </Button>
      </div>

      {/* Enhanced Features Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group bg-white border border-black rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Fast Delivery</h3>
              <p className="text-black text-lg">Free shipping on orders over $50</p>
            </div>
            <div className="text-center group bg-white border border-black rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Secure Payment</h3>
              <p className="text-black text-lg">100% secure payment processing</p>
            </div>
            <div className="text-center group bg-white border border-black rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <RefreshCw className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Easy Returns</h3>
              <p className="text-black text-lg">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="section-padding bg-white border border-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-black">
              Shop by Category
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
              Discover our curated collections designed for every style and occasion
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {categoriesWithIcon.map((categoryItem, index) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className={`group cursor-pointer glass-card hover-3d overflow-hidden animate-fade-up border border-black`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <categoryItem.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-black group-hover:text-black transition-colors">
                    {categoryItem.label}
                  </h3>
                  <p className="text-black group-hover:text-black transition-colors">
                    {categoryItem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Brands Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-black">
              Top Brands
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
              Shop from the world's most trusted and popular brands
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {brandsWithIcon.map((brandItem, index) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className={`group cursor-pointer bg-white border border-black hover:border-black hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <brandItem.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-black group-hover:text-black transition-colors">
                    {brandItem.label}
                  </h3>
                  <p className="text-sm text-black group-hover:text-black transition-colors">
                    {brandItem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products Section */}
      <section className="section-padding bg-white border border-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-black mr-4 floating" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-black">
                Featured Products
              </h2>
              <Sparkles className="w-10 h-10 text-black ml-4 floating" />
            </div>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
              Handpicked products that combine style, quality, and value
            </p>
          </div>
          <div className="product-grid-premium">
            {productList && productList.length > 0
              ? productList.map((productItem, idx) => (
                  <div key={productItem._id || idx} className="group animate-fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  </div>
                ))
              : (
                <div className="col-span-full text-center py-16">
                  <div className="animate-pulse">
                    <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6"></div>
                    <div className="h-6 bg-white/20 rounded w-64 mx-auto mb-4"></div>
                    <div className="h-4 bg-white/20 rounded w-48 mx-auto"></div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="section-padding bg-white border border-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-black mb-10 max-w-3xl mx-auto leading-relaxed">
            Subscribe to our newsletter for exclusive offers, new arrivals, and fashion tips
          </p>
          <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-black focus:ring-4 focus:ring-black/30 outline-none text-lg bg-white text-black placeholder:text-gray-500"
            />
            <Button className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-4 transition-all duration-300">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={selectedProduct}
      />
    </div>
  );
}

export default ShoppingHome;