import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import type { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 5) {
      setQuantity(newQuantity);
    }
  };

  const handleBuyNow = () => {
    dispatch(addToCart());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="grid grid-cols-2 gap-6 p-6">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[300px] object-contain"
            />
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {product.title}
            </h2>
            
            <div className="flex items-center space-x-4 mb-3">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            <span className="text-blue-600 font-medium mb-4">In Stock</span>
            
            <p className="text-gray-600 mb-6 text-sm">{product.description}</p>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;