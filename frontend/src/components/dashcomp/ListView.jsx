
import { Edit2, ExternalLink, Trash2 } from 'lucide-react';

const ListView = ({ filteredApplications, setSelectedApp, getStatusColor, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Position</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">URL</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applied</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredApplications.map(app => (
            <tr key={app.id} className="hover:bg-blue-50/50 cursor-pointer transition-colors" onClick={() => setSelectedApp(app)}>
              <td className="px-6 py-4">
                <div className="font-bold text-gray-900">{app.company_name}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{app.position_title}</td>
              <td className="px-6 py-4">
                {app.job_post_url ? (
                  <a 
                    href={app.job_post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 inline-flex items-center justify-center hover:bg-green-50 rounded-lg text-gray-400 hover:text-green-600 transition-colors"
                    title={app.job_post_url}
                  >
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <span className="text-gray-300">-</span>
                )}
              </td>
              <td className="px-6 py-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(app.applied_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onEdit(app); }}
                    className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-all"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(app); }}
                    className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
