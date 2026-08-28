import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-navy-800/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold-500 text-sm font-display font-semibold text-navy-800">
            H
          </span>
          <span className="font-display text-xl font-semibold text-navy-800">
            Havenstay
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/rooms"
                className="text-sm font-medium text-navy-800/80 hover:text-navy-800"
              >
                Rooms
              </Link>
              <Link
                to="/profile"
                className="text-sm font-medium text-navy-800/80 hover:text-navy-800"
              >
                Profile
              </Link>
              <button onClick={handleLogout} className="btn-secondary !px-4 !py-2 text-sm">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-navy-800/80 hover:text-navy-800"
              >
                Sign in
              </Link>
              <Link to="/register" className="btn-primary !px-4 !py-2 text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;