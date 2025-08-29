import { Home, LogOut, Menu, ShoppingCart, UserCog, Search, Heart, User, ChevronDown } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { useEffect, useState, useRef } from "react";
import { fetchCartItems } from "../../store/shop/cart-slice";
import UserCartWrapper from "./cart-wrapper";
import { Input } from "../ui/input";
import VoiceSearchButton from "../ui/voice-search-button";

// All navigation items in one array for perfect alignment
const mainNavItems = [
  { id: "home", label: "Home", path: "/shop/home" },
  { id: "products", label: "All Products", path: "/shop/listing" },
  { id: "men", label: "Men", path: "/shop/listing" },
  { id: "women", label: "Women", path: "/shop/listing" },
  { id: "kids", label: "Kids", path: "/shop/listing" },
  { id: "footwear", label: "Footwear", path: "/shop/listing" },
  { id: "accessories", label: "Accessories", path: "/shop/listing" },
];

const categoryNavItems = [
  { id: "men", label: "Men", path: "/shop/listing" },
  { id: "women", label: "Women", path: "/shop/listing" },
  { id: "kids", label: "Kids", path: "/shop/listing" },
  { id: "footwear", label: "Footwear", path: "/shop/listing" },
  { id: "accessories", label: "Accessories", path: "/shop/listing" },
];

function MenuItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const [, setSearchParams] = useSearchParams();
  
    function handleNavigate(getCurrentMenuItem) {
      sessionStorage.removeItem("filters");
      const currentFilter =
        getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
          ? {
              category: [getCurrentMenuItem.id],
            }
          : null;
  
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
  
      location.pathname.includes("listing") && currentFilter !== null
        ? setSearchParams(
            new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
          )
        : navigate(getCurrentMenuItem.path);
    }
  
    return (
      <nav className="flex items-center justify-center gap-6 lg:gap-8 xl:gap-10">
        {/* All Navigation Items in Perfect Row Alignment */}
        {mainNavItems.map((menuItem) => (
          <Label
            onClick={() => handleNavigate(menuItem)}
            className={`text-sm lg:text-base font-medium cursor-pointer transition-all duration-300 hover:text-gray-700 relative group whitespace-nowrap px-2 py-1 ${
              location.pathname === menuItem.path ? 'text-black' : 'text-gray-600'
            }`}
            key={menuItem.id}
          >
            {menuItem.label}
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full ${
              location.pathname === menuItem.path ? 'w-full' : ''
            }`}></span>
          </Label>
        ))}
      </nav>
    );
  }

function HeaderRightContent() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const dispatch = useDispatch();
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef();

    useEffect(() => {
      if (isAuthenticated && user?.id) {
        dispatch(fetchCartItems(user.id));
      }
    }, [dispatch, isAuthenticated, user]);

    const cartItemsCount = cartItems?.items?.length || 0;

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/shop/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    };

    const handleVoiceResult = (transcript) => {
      setSearchQuery(transcript);
      // Optionally auto-search:
      if (transcript && transcript.trim()) {
        navigate(`/shop/search?q=${encodeURIComponent(transcript.trim())}`);
      }
    };

    return (
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Enhanced Search Bar */}
        <form onSubmit={handleSearch} className="hidden lg:flex relative items-center">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-56 xl:w-64 pr-20 h-10 border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-200"
          />
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
            <VoiceSearchButton onResult={handleVoiceResult} />
          </div>
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-black hover:bg-gray-800 rounded-md flex items-center justify-center p-0 transition-all duration-200"
          >
            <Search className="h-4 w-4 text-white" />
          </Button>
        </form>

        {/* Enhanced Wishlist */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 hover:bg-gray-100 transition-all duration-200 rounded-lg flex items-center justify-center"
          onClick={() => navigate('/shop/wishlist')}
        >
          <Heart className="h-5 w-5 text-gray-700 hover:text-black transition-colors duration-200" />
        </Button>

        {/* Enhanced Cart */}
        <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
          <SheetTrigger asChild>
            <div className="relative cursor-pointer group flex items-center justify-center">
              <div className="h-10 w-10 hover:bg-gray-100 transition-all duration-200 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-black transition-colors duration-200" />
              </div>
              {cartItemsCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse shadow-lg">
                  {cartItemsCount}
                </div>
              )}
            </div>
          </SheetTrigger>
          <UserCartWrapper cartItems={cartItems?.items || []} setOpenCartSheet={setOpenCartSheet} />
        </Sheet>

        {/* Enhanced User Menu */}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-lg hover:bg-gray-100 transition-all duration-200">
                <Avatar className="h-10 w-10 ring-2 ring-gray-200 hover:ring-gray-300 transition-all duration-200">
                  <AvatarFallback className="bg-gray-100 text-black font-semibold text-sm">
                    {user?.userName?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white border border-gray-200 shadow-xl" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-lg font-bold leading-none text-black">
                    {user?.userName || "User"}
                  </p>
                  <p className="text-sm leading-none text-gray-600">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 p-4 transition-all duration-200">
                <User className="mr-3 h-4 w-4 text-gray-600" />
                <span className="font-medium text-black">My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 p-4 transition-all duration-200">
                <ShoppingCart className="mr-3 h-4 w-4 text-gray-600" />
                <span className="font-medium text-black">My Orders</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 p-4 transition-all duration-200">
                <Heart className="mr-3 h-4 w-4 text-gray-600" />
                <span className="font-medium text-black">Wishlist</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 text-black p-4 transition-all duration-200">
                <LogOut className="mr-3 h-4 w-4 text-gray-600" />
                <span className="font-medium">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/auth/login">
              <Button variant="ghost" className="h-9 px-4 hover:bg-gray-100 transition-all duration-200 font-medium text-gray-700 hover:text-black">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button className="h-9 px-4 bg-black hover:bg-gray-800 text-white font-medium transition-all duration-200">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
}

function MobileMenuItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const [, setSearchParams] = useSearchParams();
  
    function handleNavigate(getCurrentMenuItem) {
      sessionStorage.removeItem("filters");
      const currentFilter =
        getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
          ? {
              category: [getCurrentMenuItem.id],
            }
          : null;
  
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
  
      location.pathname.includes("listing") && currentFilter !== null
        ? setSearchParams(
            new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
          )
        : navigate(getCurrentMenuItem.path);
    }
  
    return (
      <nav className="flex flex-col gap-6">
        {/* Main Navigation Items */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Main</h3>
          {mainNavItems.map((menuItem) => (
            <Label
              onClick={() => handleNavigate(menuItem)}
              className={`text-base font-medium cursor-pointer transition-all duration-200 hover:text-black block ${
                location.pathname === menuItem.path ? 'text-black' : 'text-gray-600'
              }`}
              key={menuItem.id}
            >
              {menuItem.label}
            </Label>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Categories</h3>
          {categoryNavItems.map((categoryItem) => (
            <Label
              onClick={() => handleNavigate(categoryItem)}
              className={`text-base font-medium cursor-pointer transition-all duration-200 hover:text-black block ${
                location.pathname === categoryItem.path ? 'text-black' : 'text-gray-600'
              }`}
              key={categoryItem.id}
            >
              {categoryItem.label}
            </Label>
          ))}
        </div>
      </nav>
    );
}
  
function ShoppingHeader() {
    const navigate = useNavigate();
    
    return (
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="flex h-16 lg:h-18 items-center justify-between px-4 md:px-6 lg:px-8 xl:px-12">
          {/* Enhanced Logo */}
          <Link to="/shop/home" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-black rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
              <Home className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <div>
              <span className="text-lg lg:text-xl font-bold text-black">
                StyleStore
              </span>
              <p className="text-xs text-gray-600 -mt-0.5">Premium Fashion</p>
            </div>
          </Link>

          {/* Enhanced Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden h-9 w-9 hover:bg-gray-100 transition-all duration-200 rounded-lg border-gray-300">
                <Menu className="h-5 w-5 text-gray-700" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-white border-r border-gray-200">
              <div className="space-y-8 p-6">
                <MobileMenuItems />
                <HeaderRightContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* Enhanced Desktop Navigation - Centered with proper spacing */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:px-8">
            <MenuItems />
          </div>
  
          {/* Enhanced Desktop Actions */}
          <div className="hidden lg:flex lg:flex-shrink-0">
            <HeaderRightContent />
          </div>
        </div>

        {/* Enhanced Mobile Search Bar */}
        <div className="lg:hidden px-4 py-3 border-t border-gray-100 bg-gray-50">
          <form onSubmit={(e) => {
            e.preventDefault();
            const query = e.target.search.value;
            if (query.trim()) {
              navigate(`/shop/search?q=${encodeURIComponent(query.trim())}`);
            }
          }} className="relative">
            <Input
              name="search"
              type="text"
              placeholder="Search products..."
              className="w-full pr-20 h-10 border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-200"
              ref={input => (window._mobileSearchInput = input)}
            />
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
              <VoiceSearchButton onResult={transcript => {
                if (window._mobileSearchInput) {
                  window._mobileSearchInput.value = transcript;
                  if (transcript && transcript.trim()) {
                    navigate(`/shop/search?q=${encodeURIComponent(transcript.trim())}`);
                  }
                }
              }} />
            </div>
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-black hover:bg-gray-800 rounded-md"
            >
              <Search className="h-4 w-4 text-white" />
            </Button>
          </form>
        </div>
      </header>
    );
}

export default ShoppingHeader;