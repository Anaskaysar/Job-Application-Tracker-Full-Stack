import { ArrowLeft, Heart, Info, Shield, User } from "lucide-react";

const ProfileSection = ({ user, onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: User Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-black mb-4 shadow-lg shadow-blue-500/20">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">{user?.username}</h2>
              <p className="text-slate-500 text-sm mb-6 font-medium">{user?.email}</p>
              
              <div className="w-full space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <Shield size={18} className="text-blue-600" />
                  <div className="text-left leading-tight">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Status</p>
                    <p className="text-sm font-black text-slate-700 uppercase">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats or Tips in sidebar */}
          <div className="mt-6 p-6 bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl text-white">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-sm">
              <Info size={16} className="text-blue-400" />
              Pro Tip
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Keep your profile updated to get better AI-powered job matches in our upcoming feature release!
            </p>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <User size={18} className="text-blue-600" />
              </div>
              General Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Username</label>
                <p className="text-slate-900 font-black text-lg">{user?.username || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <p className="text-slate-900 font-black text-lg">{user?.email || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member Since</label>
                <p className="text-slate-900 font-black text-lg">February 2026</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform Role</label>
                <p className="text-slate-900 font-black text-lg">Professional User</p>
              </div>
            </div>
          </section>

          {/* Connected Accounts / Support Link */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-red-50 rounded-2xl">
                   <Heart size={24} className="text-red-500" />
                 </div>
                 <div>
                   <h4 className="font-black text-slate-900">Support the Project</h4>
                   <p className="text-sm text-slate-500 font-medium tracking-tight">Help us build better tools for everyone.</p>
                 </div>
               </div>
               <a 
                 href="/support"
                 className="px-6 py-3 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all text-center text-sm shadow-lg active:scale-95"
               >
                 Go to Support Center
               </a>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
