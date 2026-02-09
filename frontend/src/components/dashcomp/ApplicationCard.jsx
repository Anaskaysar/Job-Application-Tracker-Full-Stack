import { Calendar, Edit2, FileText } from 'lucide-react';

const ApplicationCard = ({ app, setSelectedApp, getStatusColor }) => {
  return (
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
};

export default ApplicationCard;
