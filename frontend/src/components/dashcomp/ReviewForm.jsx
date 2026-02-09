import { Star } from 'lucide-react';
import { useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const ReviewForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/api/reviews/', {
        rating,
        comment,
      });
      
      // Reset form
      setRating(5);
      setComment('');
      
      if (onSuccess) onSuccess();
      
      alert('Thank you for your review! It will be visible once approved.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-8 bg-blue-50 rounded-2xl">
        <p className="text-gray-600">Please sign in to leave a review.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Your Experience</h3>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Star Rating */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Your Rating
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={32}
                className={`${
                  star <= (hoveredRating || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                } transition-colors`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm font-medium text-gray-600">
            {rating} {rating === 1 ? 'star' : 'stars'}
          </span>
        </div>
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-3">
          Your Review
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
          placeholder="Tell us about your experience with Job Tracker..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !comment.trim()}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
