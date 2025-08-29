import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect } from "react";
import { getReviews } from "../../store/shop/review-slice";
import ProductDetailsDialog from '../../components/shopping-view/product-details';

function ProductDetailPage({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails, dispatch]);

  return (
    <ProductDetailsDialog open={open} setOpen={setOpen} productDetails={productDetails} />
  );
}

export default ProductDetailPage;