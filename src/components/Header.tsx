import React, { useState, useEffect } from 'react';
import { ShoppingCart, Store, Search, ArrowLeft, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface HeaderProps {
  onCategorySearch: (query: string) => void;
  onBackToHome: () => void;
  isSearchActive: boolean;
  currentCategory: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onCategorySearch, 
  onBackToHome, 
  isSearchActive,
  currentCategory 
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const cartCount = useSelector((state: RootState) => state.cart.count);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onCategorySearch(searchTerm);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (category: string) => {
    setShowCategoryDropdown(false);
    onCategorySearch(category);
  };

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          {/* Logo and Store Name */}
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 mr-12"
          >
            <Store className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">MyStore</h1>
          </button>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-8 mr-12">
            <button
              onClick={onBackToHome}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Home
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Categories
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={scrollToFooter}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Contact Us
            </button>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </form>

          {/* Icons */}
          <div className="flex items-center space-x-6 ml-8">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <User className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
          </div>
        </div>

        {/* Category indicator */}
        {isSearchActive && currentCategory && (
          <div className="mt-2 text-sm text-gray-600">
            Showing results for: <span className="font-medium">{currentCategory}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;