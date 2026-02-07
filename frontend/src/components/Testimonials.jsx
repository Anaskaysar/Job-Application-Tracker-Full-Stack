import { testimonialsData } from "../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
