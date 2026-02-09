import { LayoutGrid, List as ListIcon, Search } from 'lucide-react';

const SearchControls = ({ searchQuery, setSearchQuery, activeView, setActiveView }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 w-full sm:w-96 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search companies or positions..." 
          className="ml-3 bg-transparent border-none focus:outline-none w-full text-sm text-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
        <button
          onClick={() => setActiveView('board')}
          className={`p-2 rounded-lg transition-all ${activeView === 'board' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
          title="Board View"
        >
          <LayoutGrid size={20} />
        </button>
        <button
          onClick={() => setActiveView('list')}
          className={`p-2 rounded-lg transition-all ${activeView === 'list' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
          title="List View"
        >
          <ListIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchControls;
