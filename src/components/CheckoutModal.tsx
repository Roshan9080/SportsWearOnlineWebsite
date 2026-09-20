import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { CartItem, Order, User } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentUser: User | null;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currentUser,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  // Form state
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || 'Rahul Sharma',
    email: currentUser?.email || 'rahul@example.com',
    phone: currentUser?.phone || '9812345678',
    street: currentUser?.address?.street || 'Flat 402, Green Glen Layout, Outer Ring Road',
    city: currentUser?.address?.city || 'Bangalore',
    state: currentUser?.address?.state || 'Karnataka',
    pincode: currentUser?.address?.pincode || '560103',
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('rahul@okhdfcbank');
  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8821',
    expiry: '12/28',
    cvv: '842',
    nameOnCard: 'RAHUL SHARMA',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Financial calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = 0;
  const shipping = subtotal >= 999 ? 0 : 99;
  const grandTotal = subtotal - discount + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `SZ-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        userId: currentUser ? currentUser.id : 2,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        items: cartItems.map((c) => ({
          productId: c.product.id,
          name: c.product.name,
          brand: c.product.brand,
          price: c.product.price,
          quantity: c.quantity,
          image: c.product.image,
          selectedSize: c.selectedSize,
        })),
        subtotal,
        discount,
        shipping,
        totalAmount: grandTotal,
        paymentMethod,
        status: 'Confirmed',
        createdAt: new Date().toISOString().split('T')[0],
        estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        trackingNumber: `SZ-TRACK-${Math.floor(10000000 + Math.random() * 90000000)}`,
        trackingCourier: 'BlueDart Express',
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        id="checkout-modal"
        className="relative z-10 w-full max-w-4xl bg-[#0B111E] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              SECURE CHECKOUT
            </h2>
            <span className="text-[11px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
              SSL 256-BIT ENCRYPTED
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Body Form */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT 7 COLS: CUSTOMER & PAYMENT DETAILS */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Customer & Shipping Info */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>DELIVERY & CONTACT INFORMATION</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">
                      Street / Flat / Colony Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formData.street}
                      onChange={(e) =>
                        setFormData({ ...formData, street: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={formData.pincode}
                        onChange={(e) =>
                          setFormData({ ...formData, pincode: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Payment Method Selector */}
              <div className="pt-6 border-t border-slate-800">
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>SELECT PAYMENT METHOD</span>
                </h3>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { id: 'UPI', label: 'Instant UPI', icon: QrCode },
                    { id: 'Card', label: 'Credit/Debit', icon: CreditCard },
                    { id: 'COD', label: 'Cash on Deliv.', icon: Banknote },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as 'UPI' | 'Card' | 'COD')}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-400' : ''}`} />
                        <span className="text-xs font-bold">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Payment Sub-Views */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
                  {paymentMethod === 'UPI' && (
                    <div className="space-y-3">
                      <p className="text-slate-300 font-semibold">
                        Pay instantly via PhonePe, Google Pay, Paytm or BHIM UPI.
                      </p>
                      <div>
                        <label className="block text-slate-400 mb-1">Enter UPI Virtual ID:</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@bank"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono"
                        />
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium">
                        ✓ Demo UPI Simulation: Verification will automatically succeed upon placing order.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'Card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-slate-400 mb-1">Card Number:</label>
                        <input
                          type="text"
                          value={cardData.cardNumber}
                          onChange={(e) =>
                            setCardData({ ...cardData, cardNumber: e.target.value })
                          }
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1">Expiry (MM/YY):</label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) =>
                              setCardData({ ...cardData, expiry: e.target.value })
                            }
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">CVV:</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardData.cvv}
                            onChange={(e) =>
                              setCardData({ ...cardData, cvv: e.target.value })
                            }
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 italic">
                        * College Project Demo Note: Simulated transaction. Real card numbers are never charged or stored.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'COD' && (
                    <div className="space-y-2">
                      <p className="text-slate-300 font-semibold">
                        Pay cash or scan QR at your doorstep upon receiving your equipment.
                      </p>
                      <p className="text-[11px] text-amber-400">
                        • Please keep exact change ready for the delivery executive.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT 5 COLS: ORDER SUMMARY */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-white pb-3 border-b border-slate-800">
                  ORDER SUMMARY ({cartItems.length} ITEMS)
                </h3>

                {/* Items Mini List */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex items-center gap-3 text-xs"
                    >
                      <div className="w-12 h-12 rounded-lg bg-slate-900 p-1 shrink-0 border border-slate-800 flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt=""
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white truncate">{item.product.name}</p>
                        <p className="text-slate-400 text-[11px]">
                          Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                        </p>
                      </div>
                      <span className="font-bold text-white">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-4 border-t border-slate-800 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="text-white font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span className={shipping === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800 text-base font-black text-white">
                    <span>Grand Total</span>
                    <span className="text-blue-400">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Submit Place Order Button */}
                <button
                  type="submit"
                  id="btn-confirm-place-order"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-600/40 flex items-center justify-center gap-2 transition-all"
                >
                  {isSubmitting ? (
                    <span>PROCESSING ORDER...</span>
                  ) : (
                    <>
                      <span>CONFIRM & PLACE ORDER</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>7-Day Return Policy • Free Exchange Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
