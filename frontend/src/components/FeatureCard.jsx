const FeatureCard = ({ Icon, title, description, iconBgColor }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
      <div
        className={`w-14 h-14 ${iconBgColor} rounded-xl flex items-center justify-center mb-6`}
      >
        <Icon className="text-current" size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
