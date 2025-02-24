import React, { useEffect, useState } from 'react';
import { Store, ShoppingCart, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Search, ArrowLeft, User, Menu, X as XIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProductModal from '../components/ProductModal';
import type { RootState } from '../store';
import type { Product } from '../types';

const HomePage: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.count);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.category-dropdown')) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleCategorySearch = async (category: string) => {
    setLoading(true);
    setIsSearchActive(true);
    setSearchTerm(category);
    setShowCategoryDropdown(false);

    try {
      const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleCategorySearch(searchTerm);
    }
  };

  const handleBackToHome = () => {
    setIsSearchActive(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayedProducts = showAllProducts ? products : products.slice(0, 8);
  // const displayedProducts = showAllProducts ? products : products.slice(0, 6);

  if (isSearchActive) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="fixed top-0 left-0 right-0 bg-amber-400 shadow-md z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center">
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-2 text-black hover:text-gray-800 mr-12"
              >
                <ArrowLeft className="h-6 w-6" />
                <span className="text-lg font-medium">Back to Home</span>
              </button>

              <div className="flex-1 max-w-xl mx-8 relative">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </form>
              </div>

              <div className="hidden md:flex items-center space-x-6">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-black hover:text-gray-800" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <User className="h-6 w-6 text-black hover:text-gray-800" />
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 pt-24 pb-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {product.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-gray-600">
                          {product.rating.rate}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic here
                      }}
                      className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-amber-400 shadow-md z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-2"
              >
                <Store className="h-8 w-8 text-black" />
                <h1 className="text-2xl font-bold text-black">MyStore</h1>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black"
            >
              {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 flex-grow justify-end">
              <button
                onClick={handleBackToHome}
                className="text-black hover:text-gray-800 font-medium"
              >
                Home
              </button>

              <div className="relative category-dropdown">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="text-black hover:text-gray-800 font-medium"
                >
                  Categories
                </button>
                {showCategoryDropdown && (
                  <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        onClick={() => handleCategorySearch(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={scrollToFooter}
                className="text-black hover:text-gray-800 font-medium"
              >
                Contact Us
              </button>

              <form onSubmit={handleSearch} className="flex-grow max-w-xl relative mx-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </form>

              <div className="flex items-center space-x-6">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-black hover:text-gray-800" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <User className="h-6 w-6 text-black hover:text-gray-800" />
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <button
                onClick={handleBackToHome}
                className="block w-full text-left px-4 py-2 text-black hover:bg-amber-500"
              >
                Home
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="block w-full text-left px-4 py-2 text-black hover:bg-amber-500"
                >
                  Categories
                </button>
                {showCategoryDropdown && (
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          handleCategorySearch(category);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  scrollToFooter();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-black hover:bg-amber-500"
              >
                Contact Us
              </button>

              <form onSubmit={handleSearch} className="px-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* First Section - Welcome */}

      <section className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to MyStore
          </h1>
          <h2 className="text-2xl md:text-3xl text-amber-600 mb-8">
            Your Shopping Destination
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Discover an unparalleled shopping experience where quality meets convenience.
            We curate the finest products across multiple categories to bring you a
            selection that matches your lifestyle. From trendy fashion to cutting-edge
            electronics, we're your one-stop destination for all things exceptional.
          </p>
        </div>
      </section>






      {/* Black Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Elevate Your Shopping Experience</h2>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Discover the latest trends and exclusive deals tailored just for you.
              Join our community of savvy shoppers and stay ahead of the curve.
            </p>
            <div className="flex space-x-6">
              <button className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Shop
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.title}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating.rate}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic here
                    }}
                    className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllProducts(!showAllProducts)}
              className="bg-black text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              {showAllProducts ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
      </section>











      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>support@mystore.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>123 Store Street, City, Country</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button className="hover:text-amber-400">About Us</button></li>
                <li><button className="hover:text-amber-400">Privacy Policy</button></li>
                <li><button className="hover:text-amber-400">Terms & Conditions</button></li>
                <li><button className="hover:text-amber-400">FAQs</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <button className="hover:text-amber-400">
                  <Facebook className="h-6 w-6" />
                </button>
                <button className="hover:text-amber-400">
                  <Twitter className="h-6 w-6" />
                </button>
                <button className="hover:text-amber-400">
                  <Instagram className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2025 MyStore. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default HomePage;






