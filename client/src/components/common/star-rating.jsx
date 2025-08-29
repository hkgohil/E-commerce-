import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating");

  return (
    <div className="flex items-center gap-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          className={`p-1 rounded-full transition-colors ${
            star <= rating
              ? "text-black hover:bg-gray-100"
              : "text-gray-400 hover:bg-gray-100 hover:text-black"
          }`}
          variant="ghost"
          size="icon"
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
          <StarIcon
            className={`w-5 h-5 ${
              star <= rating ? "fill-black" : "fill-gray-300"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;