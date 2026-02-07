import { Star, StarHalf } from "lucide-react";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 mb-4">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="text-yellow-400 fill-yellow-400" size={20} />
      ))}
      {hasHalfStar && (
        <StarHalf className="text-yellow-400 fill-yellow-400" size={20} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-gray-300" size={20} />
      ))}
    </div>
  );
};

export default StarRating;
