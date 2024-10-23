import { Link } from 'react-router-dom';
import { Instagram, Twitter, Home } from 'lucide-react';

function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6">Soy Handler Meto Gol</h1>
        <div className="text-center mb-6 md:mb-8">
          <p className="text-base md:text-lg text-gray-600 mb-4">Tu podcast de Ultimate Frisbee en español.</p>
        </div>
        <div className="flex justify-center gap-4 md:gap-6 mb-8 md:mb-12">
          <a
            href="https://instagram.com/soyhandlermetogol"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:text-blue-600 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://twitter.com/HandlerMetoGol"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:text-blue-600 transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={24} />
          </a>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
          <Link
            to="/varonil"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            USAU Nationals 2024 División Varonil
          </Link>
          <Link
            to="/femenil"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center"
          >
            USAU Nationals 2024 División Femenil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
