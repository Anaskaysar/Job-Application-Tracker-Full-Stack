import { Briefcase, ChevronDown, LayoutGrid, LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Handle scroll if there's a hash in the URL
    if (location.pathname === "/" && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Small timeout to ensure the DOM is fully rendered
        setTimeout(() => {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [location]);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  // Helper: Get Initials (e.g., "John Doe" -> "JD")
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(/[ @._-]/).filter(p => p.length > 0);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const displayName = user?.display_name || user?.first_name || user?.username || "Account";

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // Height of the sticky navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`p-2 rounded-lg transition-colors ${isScrolled ? 'bg-blue-600' : 'bg-blue-600/10'}`}>
              <Briefcase className={isScrolled ? 'text-white' : 'text-blue-600'} size={24} />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
              Job Tracker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4 ml-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {getInitials(displayName)}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{displayName.split(' ')[0]}</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <LayoutGrid size={16} /> Dashboard
                      </Link>
                      <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <User size={16} /> Profile
                      </button>
                      <hr className="my-1 border-gray-50" />
                      <button 
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full w-full bg-white shadow-xl transition-all duration-300 transform ${
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3 px-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                    {getInitials(displayName)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 text-base font-semibold text-gray-700 text-center hover:bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center gap-2"
                >
                  <LayoutGrid size={18} /> Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 text-base font-semibold text-red-600 text-center hover:bg-red-50 rounded-lg border border-red-100 flex items-center justify-center gap-2"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 text-base font-semibold text-gray-700 text-center hover:bg-gray-50 rounded-lg border border-gray-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-base shadow-lg text-center"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
