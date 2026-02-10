import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import {
    BoardView,
    DashboardHeader,
    ListView,
    SearchControls,
    StatsSection
} from '../../components/dashcomp';
import ProfileSection from '../../components/dashcomp/ProfileSection';
import ReviewForm from '../../components/dashcomp/ReviewForm';
import EmailVerificationBanner from '../../components/EmailVerificationBanner';
import { useAuth } from '../../context/AuthContext';
import { sampleApplications } from './sampleData';

const DashBoard = ({ isDemo = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('board');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
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
    if (!isDemo && user) {
      fetchApplications();
    }
  }, [isDemo, user]);

  const fetchApplications = async () => {
    if (!user && !isDemo) return;
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

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Dashboard Header */}
      <DashboardHeader
        isDemo={isDemo}
        displayName={displayName}
        getInitials={getInitials}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        logout={logout}
        setActiveView={setActiveView}
      />

      {/* Demo Mode Banner */}
      {isDemo && (
        <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm font-medium">
          You're in Demo Mode. Results aren't saved. 
          <a href="/signup" className="ml-2 underline hover:text-blue-100">Sign up to save your progress</a>
        </div>
      )}

      {/* Stats Section - Hidden in Profile View */}
      {activeView !== 'profile' && (
        <StatsSection
          statuses={statuses}
          filteredApplications={filteredApplications}
          setShowAddModal={setShowAddModal}
        />
      )}

      {/* Main Content */}
      <div className={`${activeView === 'board' ? 'max-w-full lg:px-12' : 'max-w-7xl'} mx-auto px-4 sm:px-6 py-6 pb-24`}>
        {activeView !== 'profile' && (
          <>
            <SearchControls
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeView={activeView}
              setActiveView={setActiveView}
            />
            <EmailVerificationBanner user={user} />
          </>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          (() => {
            if (activeView === 'profile') {
              return <ProfileSection user={user} onBack={() => setActiveView('board')} />;
            }
            return activeView === 'board' ? (
              <BoardView
                statuses={statuses}
                filteredApplications={filteredApplications}
                setSelectedApp={setSelectedApp}
                getStatusColor={getStatusColor}
              />
            ) : (
              <ListView
                filteredApplications={filteredApplications}
                setSelectedApp={setSelectedApp}
                getStatusColor={getStatusColor}
              />
            );
          })()
        )}
      </div>

      {/* Demo Mode CTA */}
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

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full relative">
            <button
              onClick={() => setShowReviewForm(false)}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all z-10"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ReviewForm onSuccess={() => setShowReviewForm(false)} />
          </div>
        </div>
      )}

      {/* Floating Review Button */}
      {!isDemo && (
        <button
          onClick={() => setShowReviewForm(true)}
          className="fixed bottom-8 left-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-all flex items-center gap-2 z-40"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Share Your Feedback
        </button>
      )}
    </div>
  );
};

export default DashBoard;