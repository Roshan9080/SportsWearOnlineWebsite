import React from 'react';
import { Heart, Star, ShoppingCart, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
    >
      {/* Top Badges & Wishlist Heart */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {product.discount > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-extrabold text-[11px] tracking-wide shadow-sm">
              {product.discount}% OFF
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[10px] tracking-tight">
              Only {product.stock} Left
            </span>
          )}
        </div>

        <button
          type="button"
          id={`btn-wishlist-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-110'
              : 'bg-slate-950/70 text-slate-300 hover:text-rose-400 hover:bg-slate-900'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Product Image Container */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative h-56 w-full overflow-hidden bg-slate-950/80 cursor-pointer flex items-center justify-center p-4"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Product Details Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-slate-900">
        <div>
          {/* Brand & Sport */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-extrabold text-blue-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-slate-400 font-medium text-[11px] bg-slate-800 px-2 py-0.5 rounded">
              {product.sport}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-sm sm:text-base font-bold text-white hover:text-blue-400 transition-colors cursor-pointer line-clamp-1 mb-1.5 leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-300">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price Section */}
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Action Buttons: ADD TO CART & BUY NOW */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id={`btn-add-cart-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product, 1);
              }}
              disabled={product.stock <= 0}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-blue-400" />
              <span>ADD TO CART</span>
            </button>

            <button
              type="button"
              id={`btn-buy-now-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onBuyNow(product);
              }}
              disabled={product.stock <= 0}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>BUY NOW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
