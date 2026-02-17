import { Album, Calendar, Check, ChevronLeft, ChevronRight, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import AppSS1 from "../assets/app-ss-1.png";
import AppSS2 from "../assets/app-ss-2.png";
import AppSS3 from "../assets/app-ss-3.png";
import AppSS4 from "../assets/app-ss-4.png";
import AppSS5 from "../assets/app-ss-5.png";

const MobileAppBanner = () => {
    const screenshots = [AppSS1, AppSS2, AppSS3, AppSS4, AppSS5];
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % screenshots.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % screenshots.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(timer);
    }, [screenshots.length]);


    return (
        <div className="py-24 bg-linear-to-b from-slate-50 to-white overflow-hidden relative border-t border-slate-200">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                 <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[100px]"></div>
                 <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    
                    {/* Content Section */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
                            <Calendar size={16} className="text-blue-500" />
                            <span>Coming Soon to Android</span>
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Track Your Applications <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">On The Go</span>
                        </h2>
                        
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            We're putting the final touches on the mobile experience. Get ready to manage your job search from anywhere.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                            <button 
                                disabled
                                className="flex items-center gap-3 bg-gray-100 text-gray-400 px-6 py-3.5 rounded-xl cursor-not-allowed border-2 border-dashed border-gray-300"
                            >
                                <svg viewBox="0 0 24 24" className="w-8 h-8 shrink-0 grayscale opacity-50" fill="currentColor">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.128 2.128 0 0 1-2.456-2.915L3.609 1.814zM15.636 13.844l2.977-2.977a1.66 1.66 0 0 1 0-2.35l-2.977-2.977-11.2 11.199 11.201-2.895zM4.776 23.363l12.42-12.42 1.933 1.933-14.353 10.487zM4.776.637l14.353 10.487-1.933 1.933-12.42-12.42z"/>
                                </svg>
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">Coming Soon</div>
                                    <div className="text-lg font-bold -mt-1 font-sans">Google Play</div>
                                </div>
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-slate-500">
                           <div className="flex items-center gap-2">
                               <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                   <Album size={12} className="text-blue-600" />
                               </div>
                               <span>Preview Build</span>
                           </div>
                           <div className="flex items-center gap-2">
                               <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                   <Check size={12} className="text-green-600" />
                               </div>
                               <span>Real-time sync</span>
                           </div>
                           <div className="flex items-center gap-2">
                               <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                   <Check size={12} className="text-green-600" />
                               </div>
                               <span>Offline access</span>
                           </div>
                        </div>
                    </div>

                    {/* Visual Section - Mockup */}
                    <div className="flex-1 relative hidden md:flex justify-center items-center">
                        <button 
                            onClick={prevSlide}
                            className="absolute left-0 z-20 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white text-gray-700 transition-all hidden lg:block"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div className="relative mx-auto border-gray-900 bg-gray-900 border-[12px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl shadow-blue-200/50 flex flex-col items-center">
                            {/* Android Camera Hole */}
                            <div className="w-3 h-3 bg-black rounded-full absolute top-4 z-20"></div>
                            
                            {/* Screen Content */}
                            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                                {screenshots.map((ss, index) => (
                                    <img 
                                        key={index}
                                        src={ss} 
                                        alt={`JobTrackerr App Screen ${index + 1}`} 
                                        className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
                                            currentSlide === index ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                ))}
                                
                                {/* Overlay Gradient for "Coming Soon" effect (optional, keeping clean for now) */}
                            </div>
                            
                             {/* Android Bottom Bar Indicator */}
                             <div className="w-1/3 h-1 bg-gray-400/20 rounded-full absolute bottom-2 z-20"></div>
                        </div>

                        <button 
                            onClick={nextSlide}
                            className="absolute right-0 z-20 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white text-gray-700 transition-all hidden lg:block"
                        >
                            <ChevronRight size={24} />
                        </button>
                        
                        {/* Slide Indicators */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                            {screenshots.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        currentSlide === index ? "bg-blue-600 w-6" : "bg-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                        
                        {/* Floating Badge */}
                        <div className="absolute top-1/2 -right-4 lg:-right-12 glass-effect bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-xl animate-bounce duration-[3000ms]">
                           <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shadow-lg shadow-blue-100">
                                   <Smartphone size={20} />
                               </div>
                               <div>
                                   <div className="text-gray-900 font-bold text-sm">Coming Soon</div>
                                   <div className="text-slate-500 text-xs">Android App</div>
                               </div>
                           </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MobileAppBanner;
