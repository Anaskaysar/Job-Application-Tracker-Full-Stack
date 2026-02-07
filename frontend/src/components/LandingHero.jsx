import { Briefcase, User } from "lucide-react";

const LandingHero = ({ onSignIn, onTryDemo }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Land Your Dream Job with
          <span className="text-blue-600"> Smart Tracking</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Organize applications, track progress, and never miss an opportunity.
          The complete job search management system designed for your success.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onSignIn}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <User size={24} />
            Sign In
          </button>
          <button
            onClick={onTryDemo}
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 font-semibold text-lg inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Briefcase size={24} />
            Try Demo
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          No credit card required • Free demo access
        </p>
      </div>

      {/* Hero Image/Preview */}
      <div className="mt-16 relative">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="text-white text-sm font-medium">
              Job Tracker Dashboard
            </div>
          </div>
          <div className="p-8 bg-gray-50">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {["Applied", "Interview", "Offer", "Rejected"].map(
                (status, idx) => (
                  <div
                    key={status}
                    className="bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <div className="text-sm text-gray-600 mb-1">{status}</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {[5, 3, 2, 4][idx]}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 p-4 h-32"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
