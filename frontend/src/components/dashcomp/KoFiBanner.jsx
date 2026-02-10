import { Coffee, ExternalLink, Heart } from 'lucide-react';
import { useState } from 'react';

const KoFiBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#FF5E5B]/10 to-[#FF5E5B]/5 border border-[#FF5E5B]/20 rounded-xl p-4 mb-6 relative animate-in fade-in slide-in-from-top-2 duration-500">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <span className="sr-only">Dismiss</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-start gap-4 pr-6">
        <div className="flex-shrink-0 w-12 h-12 bg-[#FF5E5B]/10 rounded-full flex items-center justify-center text-[#FF5E5B]">
          <Coffee size={24} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
            Enjoying JobTracker?
            <Heart size={16} className="text-[#FF5E5B] fill-[#FF5E5B]" />
          </h3>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            This project is open-source and free to use. If it helps you land your dream job, consider buying me a coffee to support development!
          </p>
          
          <a
            href="https://ko-fi.com/kaysarulanas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-[#FF5E5B]/20 group"
          >
            <span>Support on Ko-fi</span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default KoFiBanner;
