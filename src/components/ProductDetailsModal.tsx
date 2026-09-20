import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingCart,
  Zap,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  isWishlisted: boolean;
  relatedProducts: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onBuyNow: (product: Product, size?: string, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isWishlisted,
  relatedProducts,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  onSelectProduct,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors ? product.colors[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    'description' | 'specifications' | 'brand' | 'reviews' | 'delivery'
  >('description');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const images = [product.image, ...(product.additionalImages || [])];

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode)) {
      setPincodeStatus('Available! Express Delivery by 24-48 Hours with Free Shipping.');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code (e.g. 560001).');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        id="product-details-modal"
        className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-200"
      >
        {/* Header with Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0B111E]">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-400 font-bold">{product.sport}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-200 font-semibold truncate max-w-xs">{product.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Top Section: Images + Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* LEFT: IMAGES */}
            <div className="flex flex-col items-center">
              {/* Main Image */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-center p-6 overflow-hidden">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300"
                />
                {product.discount > 0 && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-rose-600 text-white font-black text-xs uppercase tracking-wider">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-slate-950 p-1 transition-all ${
                        activeImage === img
                          ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/20'
                          : 'border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: DETAILS */}
            <div className="flex flex-col justify-between space-y-5">
              <div>
                {/* Brand & Title */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-black text-blue-400 tracking-wider uppercase">
                    {product.brand}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
                  {product.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({product.reviewCount} customer reviews)
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 mb-5">
                  <span className="text-3xl font-black text-white tracking-tight">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs font-extrabold text-emerald-400 ml-auto">
                    Inclusive of all GST taxes
                  </span>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 text-xs mb-5">
                  <span className="font-bold text-slate-300">Availability:</span>
                  {product.stock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      In Stock ({product.stock} units ready for immediate dispatch)
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold">Out of Stock</span>
                  )}
                </div>

                {/* Sizes Selection if available */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Available Sizes: <span className="text-blue-400">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            selectedSize === s
                              ? 'bg-blue-600 text-white border border-blue-500 shadow-md shadow-blue-600/30'
                              : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors Selection if available */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Colors: <span className="text-blue-400">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            selectedColor === c
                              ? 'bg-indigo-600 text-white border border-indigo-400'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Quantity:
                  </span>
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(product.stock || 10, q + 1))
                      }
                      className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons: ADD TO CART, BUY NOW, WISHLIST */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity, selectedSize, selectedColor);
                      onClose();
                    }}
                    disabled={product.stock <= 0}
                    className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm tracking-wide border border-slate-700 transition-all hover:scale-[1.01]"
                  >
                    <ShoppingCart className="w-4 h-4 text-blue-400" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={() => {
                      onBuyNow(product, selectedSize, selectedColor);
                      onClose();
                    }}
                    disabled={product.stock <= 0}
                    className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01]"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>BUY NOW</span>
                  </button>
                </div>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    isWishlisted
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                      : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isWishlisted ? 'IN YOUR WISHLIST' : 'ADD TO WISHLIST'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Description, Specifications, Brand Info, Reviews, Delivery */}
          <div className="pt-8 border-t border-slate-800">
            {/* Tab Headers */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs font-extrabold uppercase tracking-wider">
              {[
                { id: 'description', label: 'Product Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'brand', label: 'Brand Information' },
                { id: 'delivery', label: 'Delivery & Returns' },
                { id: 'reviews', label: `Reviews (${product.reviewCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id as 'description' | 'specifications' | 'brand' | 'reviews' | 'delivery'
                    )
                  }
                  className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Panels */}
            <div className="py-6 text-sm text-slate-300 leading-relaxed">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                      <span className="text-xs">100% Genuine Certified Sport Merchandise</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                      <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-xs">Inspected & Dispatched in Protective Packaging</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                      <RotateCcw className="w-5 h-5 text-amber-400 shrink-0" />
                      <span className="text-xs">7 Days Hassle-Free Sports Equipment Return</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950/40">
                  <table className="w-full text-xs text-left">
                    <tbody>
                      {product.specifications ? (
                        Object.entries(product.specifications).map(([key, val], idx) => (
                          <tr
                            key={key}
                            className={idx % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-950/60'}
                          >
                            <td className="px-4 py-3 font-bold text-white w-1/3 border-b border-slate-800">
                              {key}
                            </td>
                            <td className="px-4 py-3 text-slate-300 border-b border-slate-800">
                              {val}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="px-4 py-3 text-slate-400">Standard match specifications apply.</td>
                        </tr>
                      )}
                      <tr className="bg-slate-900/60">
                        <td className="px-4 py-3 font-bold text-white">Brand</td>
                        <td className="px-4 py-3 text-slate-300">{product.brand}</td>
                      </tr>
                      <tr className="bg-slate-950/60">
                        <td className="px-4 py-3 font-bold text-white">Category</td>
                        <td className="px-4 py-3 text-slate-300">{product.category} ({product.sport})</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'brand' && (
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <h4 className="text-base font-extrabold text-white uppercase">
                    About {product.brand}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {product.brand} is globally recognized for tournament grade athletics, championship sports equipment, and durable athletic performance accessories. All {product.brand} gear purchased through SportZone includes full verifiable manufacturer serial holograms.
                  </p>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-6">
                  <form onSubmit={handlePincodeCheck} className="flex items-center gap-3 max-w-md">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Enter 6-digit PIN code (e.g. 560001)"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase"
                    >
                      Check
                    </button>
                  </form>

                  {pincodeStatus && (
                    <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>{pincodeStatus}</span>
                    </p>
                  )}

                  <div className="text-xs text-slate-400 space-y-2">
                    <p>• Free Delivery on all prepaid and COD orders over ₹999.</p>
                    <p>• Standard delivery timeframe: 2 to 4 working days across India.</p>
                    <p>• Real-time courier tracking number provided immediately upon dispatch.</p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Arjun K. (Verified Purchase)</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 mt-2">
                      Exceptional quality product! Exactly what was described. Used it in our club match this weekend and performed remarkably.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Carousel / Grid */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-slate-800">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-4">
                You May Also Like In {product.sport}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedProducts.slice(0, 4).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="h-28 w-full flex items-center justify-center p-2 mb-2">
                      <img src={rel.image} alt={rel.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-blue-400 uppercase">{rel.brand}</span>
                      <h4 className="text-xs font-bold text-white truncate">{rel.name}</h4>
                      <p className="text-xs font-black text-white mt-1">₹{rel.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
