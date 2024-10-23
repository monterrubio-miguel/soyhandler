import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

function BracketNav() {
  const location = useLocation();
  const isVaronil = location.pathname === '/varonil';

  return (
    <div className="flex justify-center gap-4 mb-8">
      <Link to="/" className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
        <Home size={18} className="mr-2" />
        Inicio
      </Link>
      <Link
        to={isVaronil ? '/femenil' : '/varonil'}
        className={`px-4 py-2 text-white rounded-lg transition-colors ${
          isVaronil ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        División {isVaronil ? 'Femenil' : 'Varonil'}
      </Link>
    </div>
  );
}

export default BracketNav;
