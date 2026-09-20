import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Subtotal calculation
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Discount calculation (10% if code SPORT40 or WINMORE)
  const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;

  // Free shipping above 999
  const shipping = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 99;

  const grandTotal = subtotal - discount + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SPORT40' || couponCode.trim().toUpperCase() === 'WINMORE') {
      setDiscountApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try "SPORT40" or "WINMORE"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        id="shopping-cart-drawer"
        className="relative z-10 w-full max-w-md bg-[#0B111E] border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl text-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              YOUR CART ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        {cartItems.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Free Shipping Progress Indicator */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              {subtotal >= 999 ? (
                <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Congratulations! You have unlocked FREE Express Delivery.</span>
                </p>
              ) : (
                <div>
                  <p className="text-slate-300">
                    Add <span className="text-blue-400 font-extrabold">₹{(999 - subtotal).toLocaleString('en-IN')}</span> more to qualify for <span className="text-emerald-400 font-bold">FREE SHIPPING</span>!
                  </p>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 999) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || 'def'}`}
                  id={`cart-item-${item.product.id}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-slate-950 p-2 shrink-0 flex items-center justify-center border border-slate-800">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold text-blue-400 uppercase">
                      {item.product.brand}
                    </span>
                    <h3 className="text-xs font-bold text-white truncate" title={item.product.name}>
                      {item.product.name}
                    </h3>
                    {item.selectedSize && (
                      <p className="text-[11px] text-slate-400">Size: {item.selectedSize}</p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-black text-white">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 text-xs text-slate-400 hover:text-white font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-[11px] font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 text-xs text-slate-400 hover:text-white font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="pt-2">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon Code (e.g. SPORT40)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-blue-500"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700"
                >
                  Apply
                </button>
              </div>
              {discountApplied && (
                <p className="text-[11px] text-emerald-400 mt-1.5 font-semibold">
                  ✓ Code applied! 10% instant sports discount.
                </p>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-400 mt-1.5 font-medium">{couponError}</p>
              )}
            </form>
          </div>
        ) : (
          /* EMPTY STATE */
          <div
            id="empty-cart-state"
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center text-slate-400 mb-4 border border-slate-800">
              <ShoppingBag className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">
              YOUR CART IS WAITING FOR SOME ACTION!
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mb-6">
              Looks like you haven't geared up yet. Explore our cricket, football, tennis, and sportswear collections.
            </p>
            <button
              onClick={() => {
                onClose();
                onContinueShopping();
              }}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}

        {/* Footer Order Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Sports Discount (10%)</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className={shipping === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between text-base font-black text-white">
                <span>Grand Total</span>
                <span className="text-blue-400">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              id="btn-proceed-checkout"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-600/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
