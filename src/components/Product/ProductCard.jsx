import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import Button from '../UI/Button';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0], // Default size
      quantity: 1,
    }));
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>
          <Button onClick={handleAddToCart} variant="primary" size="sm">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;