import { useEffect, useState } from "react";
import api from "../api/axios";
import { testimonialsData } from "../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get('/api/reviews/');
        // If we have real reviews, use them; otherwise fall back to static data
        if (response.data && response.data.length > 0) {
          setReviews(response.data.slice(0, 6)); // Show max 6 reviews
        } else {
          setReviews(testimonialsData);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        setReviews(testimonialsData); // Fallback to static data
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const displayReviews = reviews.map((review) => ({
    name: review.display_name || review.username || 'Anonymous',
    role: 'Job Seeker',
    content: review.comment || review.content,
    rating: review.rating,
  }));

  return (
    <div className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loved by Job Seekers
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands who've landed their dream jobs
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {displayReviews.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
