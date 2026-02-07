import StarRating from "./StarRating";

const TestimonialCard = ({ name, role, content, rating, initials, color }) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
      <StarRating rating={rating} />
      <p className="text-gray-700 mb-6 italic">"{content}"</p>
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 ${color} text-white rounded-full flex items-center justify-center font-bold`}
        >
          {initials}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-600">{role}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
