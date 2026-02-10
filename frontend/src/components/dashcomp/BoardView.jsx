import { Plus } from 'lucide-react';
import ApplicationCard from './ApplicationCard';

const BoardView = ({ statuses, filteredApplications, setSelectedApp, getStatusColor, onEdit, onDelete }) => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-8 pr-12 h-[calc(100vh-280px)] min-h-[500px]">
      {statuses.map(status => (
        <div key={status} className="flex-shrink-0 w-72 flex flex-col h-full">
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
          <div className="space-y-1 overflow-y-auto flex-1 pr-2 custom-scrollbar">
            {filteredApplications
              .filter(app => app.status === status)
              .map(app => (
                <ApplicationCard 
                  key={app.id} 
                  app={app} 
                  setSelectedApp={setSelectedApp}
                  getStatusColor={getStatusColor}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
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
};

export default BoardView;
