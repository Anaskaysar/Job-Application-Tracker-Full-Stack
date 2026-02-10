import { Briefcase, ChevronDown, LogOut, Search, Settings, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardHeader = ({ 
  isDemo, 
  displayName, 
  getInitials, 
  isProfileOpen, 
  setIsProfileOpen, 
  searchQuery, 
  setSearchQuery, 
  user, 
  logout,
  setActiveView 
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clickable */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
              <Briefcase className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Job Tracker</h1>
            {isDemo && (
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Demo
              </span>
            )}
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Quick search..." 
                className="ml-2 bg-transparent border-none focus:outline-none text-sm w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {getInitials(displayName)}
                </div>
                <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                  {displayName.split(' ')[0]}
                </span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200 z-50">
                  <div className="px-4 py-3 border-b border-gray-50 mb-2">
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">User Account</p>
                     <p className="text-sm font-black text-gray-900 truncate">{displayName}</p>
                     {!isDemo && user && <p className="text-xs text-gray-500 truncate">{user.email}</p>}
                  </div>
                  
                  <button 
                    onClick={() => {
                      setActiveView('profile');
                      setIsProfileOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <User size={16} className="text-gray-400" /> Profile Settings
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Settings size={16} className="text-gray-400" /> Account Preferences
                  </button>

                  <div className="h-px bg-gray-100 my-2"></div>

                  {isDemo ? (
                    <button 
                      onClick={() => navigate('/login')}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <LogOut size={16} /> Exit Demo & Sign In
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
