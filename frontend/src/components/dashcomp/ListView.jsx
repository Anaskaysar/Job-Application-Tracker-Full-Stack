import { MoreHorizontal } from 'lucide-react';

const ListView = ({ filteredApplications, setSelectedApp, getStatusColor }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Position</th>
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
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(app.applied_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-blue-600 transition-all">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
