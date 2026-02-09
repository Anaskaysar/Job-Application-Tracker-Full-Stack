import { Plus } from 'lucide-react';

const StatsSection = ({ statuses, filteredApplications, setShowAddModal }) => {
  return (
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
            <div key={status} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 min-w-[140px] flex-1">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{status}</div>
              <div className="text-2xl font-black text-gray-900">
                {filteredApplications.filter(app => app.status === status).length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
