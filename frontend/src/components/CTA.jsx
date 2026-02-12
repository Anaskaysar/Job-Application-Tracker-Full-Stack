import { Briefcase, User } from "lucide-react";

const CTA = ({ onSignIn, onTryDemo }) => {
  return (
    <div className="py-20 bg-linear-to-r from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Organize Your Job Search?
        </h2>
        <p className="text-xl text-blue-100 mb-10">
            Join thousands of professionals using JobTrackerr! to land their dream roles.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onSignIn}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg inline-flex items-center gap-2 shadow-xl"
          >
            <User size={24} />
            Get Started Free
          </button>
          <button
            onClick={onTryDemo}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-400 font-semibold text-lg inline-flex items-center gap-2"
          >
            <Briefcase size={24} />
            Try Demo First
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
