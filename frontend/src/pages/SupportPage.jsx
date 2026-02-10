import { ExternalLink, Github, Globe, Heart, Linkedin, Mail } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const SupportPage = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden pt-20">
      {/* Premium Background System */}
      <div className="fixed inset-0 -z-10 bg-slate-50">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px)`, 
            backgroundSize: '24px 24px' 
          }}>
        </div>
      </div>

      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold uppercase tracking-wider mb-2">
              <Heart size={16} fill="currentColor" />
              Support the Mission
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Fuel the development of <span className="text-blue-600">JobTracker</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              JobTracker is a passion project built to simplify the career hunt. Your support helps keep the servers running and the features growing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* About the Developer */}
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  KA
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Kaysarul Anas</h2>
                  <p className="text-indigo-600 font-medium tracking-tight">Full-Stack Architect</p>
                </div>
              </div>
              
              <p className="text-slate-600 leading-relaxed">
                Hi! I'm Anas, a developer passionate about building tools that solve real-world problems. JobTracker started as a way to manage my own job hunt and evolved into a full-stack ecosystem to help others land their dream roles.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="https://github.com/Anaskaysar" target="_blank" className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100 group">
                  <Github size={20} className="text-slate-600 group-hover:text-black" />
                </a>
                <a href="https://linkedin.com/in/kaysarulanas" target="_blank" className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100 group">
                  <Linkedin size={20} className="text-slate-600 group-hover:text-blue-600" />
                </a>
                <a href="https://jobtracker.kaysarulanas.me" target="_blank" className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100 group">
                  <Globe size={20} className="text-slate-600 group-hover:text-blue-600" />
                </a>
                <a href="mailto:anas@example.com" className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100 group">
                  <Mail size={20} className="text-slate-600 group-hover:text-red-500" />
                </a>
              </div>
            </div>

            {/* Support/Donation Card */}
            <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-xl shadow-blue-500/20 text-white relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Heart size={160} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  Make a Donation
                </h3>
                <p className="text-blue-50 mb-8 leading-relaxed">
                  Every contribution, no matter the size, goes directly into maintaining infrastructure and adding new AI-powered tools to the platform.
                </p>
                
                <div className="space-y-4">
                  <a 
                    href="https://ko-fi.com/anaskaysar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-all shadow-lg active:scale-[0.98]"
                  >
                    Buy me a Coffee
                    <ExternalLink size={18} />
                  </a>
                  <p className="text-center text-xs text-blue-200/60 font-medium">Secured by Ko-fi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white shadow-sm border border-slate-200 rounded-3xl p-8 md:p-12 text-center space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">What your support enables:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-blue-600 font-black text-3xl">🎛️</div>
                <h4 className="font-bold text-slate-800">Server Costs</h4>
                <p className="text-sm text-slate-500">Keeping the high-performance AWS infrastructure live 24/7.</p>
              </div>
              <div className="space-y-2">
                <div className="text-indigo-600 font-black text-3xl">🤖</div>
                <h4 className="font-bold text-slate-800">New Features</h4>
                <p className="text-sm text-slate-500">Developing AI resume analysis and automated job matching.</p>
              </div>
              <div className="space-y-2">
                <div className="text-purple-600 font-black text-3xl">📱</div>
                <h4 className="font-bold text-slate-800">App Store</h4>
                <p className="text-sm text-slate-500">Deploying the iOS and Android versions to global stores.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SupportPage;
