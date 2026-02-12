import { Quote } from "lucide-react";
import { Link } from "react-router-dom";
import authBg from "../assets/auth-bg.png";
import Logo from "./Logo";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Left Panel: Visual & Brand (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 text-white">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={authBg}
            alt="Auth Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px]"></div>
        </div>

        {/* Content Overlays */}
        <div className="relative z-10">
          <Link to="/">
            <Logo size="lg" variant="white" />
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="mb-8">
            <Quote className="text-blue-200 mb-4 opacity-50" size={48} />
            <p className="text-3xl font-medium leading-tight text-white mb-6">
              "This platform is the reason I finally organized my job search and landed my role at a top tech company."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-white/50 flex items-center justify-center font-bold">
                SM
              </div>
              <div>
                <div className="font-bold">Sarah Mitchell</div>
                <div className="text-sm text-blue-100 italic">Software Engineer</div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-12 text-blue-100 text-sm font-medium">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">10k+</span>
              <span>Users Tracked</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">98%</span>
              <span>Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-12 lg:px-20 py-12 bg-gray-50/50">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/">
              <Logo size="md" variant="gradient" className="text-gray-900" />
            </Link>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-sm text-gray-600 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-500/5 border border-gray-100 ring-1 ring-gray-900/5">
            {children}
          </div>
          
          <p className="text-center text-xs text-gray-400 mt-8">
            &copy; 2026 JobTrackerr!. Secure, encrypted, and private.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
