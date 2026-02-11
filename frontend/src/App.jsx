import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
} from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DashBoard from "./pages/Dashboard/DashBoard";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SecurityPage from "./pages/SecurityPage";
import SignupPage from "./pages/SignupPage";
import SupportPage from "./pages/SupportPage";
import TermsConditions from "./pages/TermsConditions";

// A simple PrivateRoute component to protect the dashboard

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader variant="full-screen" />;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { loading } = useAuth();
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup", "/dashboard", "/demo"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  if (loading) {
    return <Loader variant="full-screen" />;
  }

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/demo" element={<DashBoard isDemo={true} />} />
        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
