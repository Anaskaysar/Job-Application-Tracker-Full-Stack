import {
  Briefcase,
  ChevronDown,
  LayoutGrid, List as ListIcon,
  LogOut,
  Plus,
  Search,
  Settings,
  User
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { sampleApplications } from './sampleData';

const DashBoard = ({ isDemo = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('board');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [applications, setApplications] = useState(isDemo ? sampleApplications : []);
  const [loading, setLoading] = useState(!isDemo);
  const [searchQuery, setSearchQuery] = useState('');

  const statuses = ["Applied", "Interview", "Offer", "Rejected"];

  // Helper: Get Initials (e.g., "John Doe" -> "JD")
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(/[ @._-]/).filter(p => p.length > 0);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const displayName = user?.display_name || user?.first_name || user?.username || (isDemo ? "Demo User" : "Account");

  useEffect(() => {
    if (!isDemo) {
      fetchApplications();
    }
  }, [isDemo]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/applications/');
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      "Applied": "bg-blue-100 text-blue-700 border-blue-200",
      "Interview": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Offer": "bg-green-100 text-green-700 border-green-200",
      "Rejected": "bg-red-100 text-red-700 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const filteredApplications = applications.filter(app => 
    app.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.position_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ApplicationCard = ({ app }) => (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-4 mb-3 hover:shadow-lg transition-all cursor-pointer group relative"
      onClick={() => setSelectedApp(app)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{app.company_name}</h3>
          <p className="text-sm text-gray-600">{app.position_title}</p>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600">
            <Edit2 size={14} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <Calendar size={12} />
        <span>Applied {new Date(app.applied_at).toLocaleDateString()}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {app.files?.map((file, idx) => (
            <div key={idx} className="w-6 h-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400" title={file.file_type}>
              <FileText size={12} />
            </div>
          ))}
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getStatusColor(app.status)}`}>
          {app.status}
        </span>
      </div>
    </div>
  );

  const BoardView = () => (
    <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
      {statuses.map(status => (
        <div key={status} className="flex-shrink-0 w-80">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              {status}
              <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                {filteredApplications.filter(app => app.status === status).length}
              </span>
            </h2>
            <button className="text-gray-400 hover:text-gray-600">
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-1 min-h-[500px]">
            {filteredApplications
              .filter(app => app.status === status)
              .map(app => (
                <ApplicationCard key={app.id} app={app} />
              ))}
            {filteredApplications.filter(app => app.status === status).length === 0 && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <p className="text-xs text-gray-400">No applications</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Position</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applied</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredApplications.map(app => (
            <tr key={app.id} className="hover:bg-blue-50/50 cursor-pointer transition-colors" onClick={() => setSelectedApp(app)}>
              <td className="px-6 py-4">
                <div className="font-bold text-gray-900">{app.company_name}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{app.position_title}</td>
              <td className="px-6 py-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(app.applied_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-blue-600 transition-all">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Dashboard Navbar / Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Now Clickable */}
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

              {/* Profile / Account Toggle - Now with Dropdown */}
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
                    
                    <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
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

      {/* Top Banner for Demo Mode */}
      {isDemo && (
        <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm font-medium">
          You're in Demo Mode. Results aren't saved. 
          <a href="/signup" className="ml-2 underline hover:text-blue-100">Sign up to save your progress</a>
        </div>
      )}

      {/* Hero Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900">Applications</h1>
              <p className="text-gray-500 mt-1">Track and manage your job search journey</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-bold transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
              >
                <Plus size={20} />
                New Application
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {statuses.map(status => (
              <div key={status} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{status}</div>
                <div className="text-2xl font-black text-gray-900">
                  {filteredApplications.filter(app => app.status === status).length}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 w-full sm:w-96 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search companies or positions..." 
              className="ml-3 bg-transparent border-none focus:outline-none w-full text-sm text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
            <button
              onClick={() => setActiveView('board')}
              className={`p-2 rounded-lg transition-all ${activeView === 'board' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
              title="Board View"
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`p-2 rounded-lg transition-all ${activeView === 'list' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
              title="List View"
            >
              <ListIcon size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          activeView === 'board' ? <BoardView /> : <ListView />
        )}
      </div>

      {/* Simple Footer Link for Demo */}
      {isDemo && (
        <div className="fixed bottom-8 right-8 z-50">
          <a 
            href="/signup" 
            className="bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <User size={18} />
            Create Account
          </a>
        </div>
      )}
    </div>
  );
};

export default DashBoard;