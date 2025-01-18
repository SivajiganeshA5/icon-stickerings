import { Link } from 'react-router-dom';

export default function Header() {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  
  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/';
  };

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">ICON STICKERING</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/admin" className="hover:text-gray-300">Admin</Link>
                <button 
                  onClick={handleLogout}
                  className="hover:text-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-gray-300">Admin Login</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}