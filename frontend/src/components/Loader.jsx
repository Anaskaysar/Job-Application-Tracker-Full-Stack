const Loader = ({ variant = "inline", size = "md", color = "blue" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const colorClasses = {
    blue: "border-blue-600 border-t-transparent",
    white: "border-white border-t-transparent",
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
    />
  );

  if (variant === "full-screen") {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <span className="text-gray-600 font-medium">JobTrackerr!</span>
        </div>
      </div>
    );
  }

  return spinner;
};

export default Loader;
