import { Mail, X } from "lucide-react";
import { useState } from "react";
import api from "../api/axios";

const EmailVerificationBanner = ({ user }) => {
  const [dismissed, setDismissed] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Don't show if email is verified or banner is dismissed
  if (user?.email_verified || dismissed) return null;

  const handleResendVerification = async () => {
    try {
      setSending(true);
      await api.post("/api/auth/registration/resend-email/");
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error("Failed to resend verification email", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6 relative animate-in fade-in slide-in-from-top-2 duration-500">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={18} />
      </button>
      
      <div className="flex items-start gap-3 pr-6">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Mail className="text-blue-600" size={20} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900 mb-1">
            Verify your email address
          </h3>
          <p className="text-xs text-gray-600 mb-3">
            We sent a verification link to <span className="font-semibold">{user?.email}</span>. 
            Please check your inbox to verify your account.
          </p>
          
          <button
            onClick={handleResendVerification}
            disabled={sending || sent}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition-colors"
          >
            {sent ? "✓ Email sent!" : sending ? "Sending..." : "Resend verification email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;
