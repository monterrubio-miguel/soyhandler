import { Link } from 'react-router-dom';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6">Soy Handler Meto Gol</h1>
        <div className="text-center mb-6 md:mb-8">
          <p className="text-base md:text-lg text-gray-600 mb-4">Tu podcast de Ultimate Frisbee en español.</p>
        </div>
        <div className="flex justify-center gap-6 md:gap-8 mb-8 md:mb-12">
          <a
            href="https://instagram.com/soyhandler_metogol"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 hover:text-blue-600 transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://twitter.com/HandlerMetoGol"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 hover:text-blue-600 transition-colors"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://youtube.com/@SoyHandlerMetoGolPodcast"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 hover:text-red-600 transition-colors"
            aria-label="YouTube"
          >
            <YouTubeIcon />
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
