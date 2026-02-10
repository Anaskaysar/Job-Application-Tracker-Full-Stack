import { Calendar, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../api/axios';

const ApplicationFormModal = ({ isOpen, onClose, onSuccess, initialData = null }) => {
  const [formData, setFormData] = useState({
    company_name: '',
    position_title: '',
    status: 'Applied',
    job_post_url: '',
    applied_at: new Date().toISOString().split('T')[0],
    job_requirements: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        company_name: initialData.company_name || '',
        position_title: initialData.position_title || '',
        status: initialData.status || 'Applied',
        job_post_url: initialData.job_post_url || '',
        applied_at: initialData.applied_at || new Date().toISOString().split('T')[0],
        job_requirements: initialData.job_requirements || '',
        notes: initialData.notes || ''
      });
    } else {
      setFormData({
        company_name: '',
        position_title: '',
        status: 'Applied',
        job_post_url: '',
        applied_at: new Date().toISOString().split('T')[0],
        job_requirements: '',
        notes: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (initialData) {
        await api.put(`/api/applications/${initialData.id}/`, formData);
      } else {
        await api.post('/api/applications/', formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error saving application:', err);
      const errorData = err.response?.data;
      if (errorData) {
        if (typeof errorData === 'object') {
           const messages = Object.entries(errorData).map(([key, val]) => {
             const fieldError = Array.isArray(val) ? val.join(', ') : val;
             return `${key}: ${fieldError}`;
           }).join(' | ');
           setError(`Failed: ${messages}`);
        } else {
           setError(`Failed: ${JSON.stringify(errorData)}`);
        }
      } else {
        setError('Failed to save application. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Application' : 'Add New Application'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="overflow-y-auto flex-1 p-6 custom-scrollbar">
          <form id="applicationForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-4 col-span-full">
                {error}
              </div>
            )}

            <div className="space-y-1.5 context-input-group">
              <label className="text-xs font-bold text-gray-700">Company Name *</label>
              <input
                required
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="e.g., TechCorp"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5 context-input-group">
              <label className="text-xs font-bold text-gray-700">Position Title *</label>
              <input
                required
                type="text"
                name="position_title"
                value={formData.position_title}
                onChange={handleChange}
                placeholder="e.g., Senior Frontend Engineer"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Job Post URL</label>
              <input
                type="url"
                name="job_post_url"
                value={formData.job_post_url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Status *</label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Applied Date *</label>
              <div className="relative">
                <input
                  type="date"
                  name="applied_at"
                  value={formData.applied_at}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-1.5 col-span-full">
              <label className="text-xs font-bold text-gray-700">Job Requirements</label>
              <textarea
                name="job_requirements"
                value={formData.job_requirements}
                onChange={handleChange}
                rows="3"
                placeholder="Skills, experience, qualifications..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"
              />
            </div>

            <div className="space-y-1.5 col-span-full">
              <label className="text-xs font-bold text-gray-700">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Your thoughts, interview notes, etc."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"
              />
            </div>

            <div className="space-y-1.5 col-span-full">
              <label className="text-xs font-bold text-gray-700">Upload Files</label>
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 bg-blue-50/30 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors">
                <Upload className="text-blue-400 mb-2" size={24} />
                <p className="text-sm font-medium text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">Resume, Cover Letter, etc.</p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-3 bg-white z-10">
          <button
            type="submit"
            form="applicationForm"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
               initialData ? 'Save Changes' : 'Add Application'
            )}
          </button>
           <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFormModal;
