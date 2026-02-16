import { Mail, MapPin, MessageSquare } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions, feedback, or need support? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Email Support</h3>
            <p className="text-slate-500 mb-4">For general inquiries and support</p>
            <a href="mailto:support@jobtrackerr.com" className="text-blue-600 font-semibold hover:underline">
              support@jobtrackerr.com
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Social Media</h3>
            <p className="text-slate-500 mb-4">Follow us for updates</p>
            <div className="flex justify-center gap-4">
                <a href="https://linkedin.com/in/kaysarulanas" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-800 transition-colors">LinkedIn</a>
                <a href="https://github.com/Anaskaysar" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-gray-900 transition-colors">GitHub</a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Location</h3>
            <p className="text-slate-500 mb-4">Based in</p>
            <p className="text-slate-900 font-medium">Dhaka, Bangladesh</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
