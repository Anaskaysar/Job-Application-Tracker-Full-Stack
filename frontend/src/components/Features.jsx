import { featuresData } from "../data/features";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <div className="bg-transparent py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features to streamline your job search
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
