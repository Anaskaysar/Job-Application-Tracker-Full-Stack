import { HelpCircle, MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Background Mesh Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[100px]"></div>
      
      {/* SVG Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px)`, 
          backgroundSize: '24px 24px' 
        }}>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <h1 className="text-[12rem] font-black text-blue-600/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <HelpCircle className="text-blue-600 animate-bounce" size={80} />
            </div>
          </div>
        </div>
        
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
          The page you're looking for was moved, removed, renamed, or might never have existed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 font-bold text-lg shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <MoveLeft size={20} />
            Back to Home
          </Link>
          <a
            href="mailto:kaysarulanas2@gmail.com"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold text-lg transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
