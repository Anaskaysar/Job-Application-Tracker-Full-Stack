import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            About <span className="text-blue-600">JobTracker</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our mission is to empower job seekers with the tools they need to organize, track, and land their dream jobs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">The Story</h2>
            <p className="text-slate-600 leading-relaxed">
              JobTracker was born out of frustration. Spreadsheets are clunky, and generic note apps aren't specialized enough. We wanted a dedicated space where every application, interview, and offer could be tracked with precision.
            </p>
            <p className="text-slate-600 leading-relaxed">
              What started as a personal tool has grown into a platform helping thousands of developers, designers, and professionals manage their career search efficiently.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
             <div className="aspect-video bg-linear-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-5xl mb-6">
                🚀
             </div>
             <div className="flex gap-4 justify-center">
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">100%</div>
                    <div className="text-sm text-slate-500">Free to Start</div>
                </div>
                <div className="w-px bg-slate-200"></div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">24/7</div>
                    <div className="text-sm text-slate-500">Availability</div>
                </div>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
