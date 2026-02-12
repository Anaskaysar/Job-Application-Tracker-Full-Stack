import { Briefcase } from "lucide-react";

const Logo = ({ size = "md", variant = "gradient", showText = true, className = "" }) => {
  const sizeClasses = {
    sm: { container: "w-8 h-8 rounded-lg", icon: 18, text: "text-lg" },
    md: { container: "w-10 h-10 rounded-xl", icon: 24, text: "text-xl" },
    lg: { container: "w-14 h-14 rounded-2xl", icon: 32, text: "text-2xl" },
    xl: { container: "w-20 h-20 rounded-3xl", icon: 44, text: "text-4xl" },
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  const variants = {
    gradient: "bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20",
    light: "bg-blue-50 text-blue-600",
    white: "bg-white/20 backdrop-blur-md border border-white/30",
    solid: "bg-blue-600 text-white",
  };

  const selectedVariant = variants[variant] || variants.gradient;

  return (
    <div className={`flex items-center gap-3 transition-all group ${className}`}>
      <div className={`${selectedSize.container} ${selectedVariant} flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95`}>
        <Briefcase 
          className={variant === "light" ? "text-blue-600" : "text-white"} 
          size={selectedSize.icon} 
        />
      </div>
      {showText && (
        <span className={`${selectedSize.text} font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600`}>
          JobTrackerr!
        </span>
      )}
    </div>
  );
};

export default Logo;
