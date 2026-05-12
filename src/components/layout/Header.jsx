import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartItemsCount = useSelector((state) => state.cart.totalQuantity || 0);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${searchTerm}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            Mack Kicks
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search sneakers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              >
                Search
              </button>
            </form>
            
            {/* Navigation Links */}
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-blue-600">
              Shop
            </Link>
            
            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600">
                  {user?.name || 'Account'} ▼
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-blue-600">
                  Register
                </Link>
              </div>
            )}
            
            {/* Cart Link */}
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 relative">
              🛒 Cart
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-3">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search sneakers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              >
                Search
              </button>
            </form>
            
            <Link to="/" className="block text-gray-700 hover:text-blue-600 py-2">
              Home
            </Link>
            <Link to="/shop" className="block text-gray-700 hover:text-blue-600 py-2">
              Shop
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block text-gray-700 hover:text-blue-600 py-2">
                  My Profile
                </Link>
                <Link to="/orders" className="block text-gray-700 hover:text-blue-600 py-2">
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-700 hover:text-blue-600 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 hover:text-blue-600 py-2">
                  Login
                </Link>
                <Link to="/register" className="block text-gray-700 hover:text-blue-600 py-2">
                  Register
                </Link>
              </>
            )}
            
            <Link to="/cart" className="block text-gray-700 hover:text-blue-600 py-2">
              Cart ({cartItemsCount})
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;