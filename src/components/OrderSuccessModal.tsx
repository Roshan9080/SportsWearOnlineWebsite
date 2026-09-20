import React from 'react';
import { CheckCircle, Truck, Package, ArrowRight } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onViewOrders: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onViewOrders,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Container */}
      <div
        id="order-success-modal"
        className="relative z-10 w-full max-w-2xl bg-[#0B111E] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-center text-slate-200 overflow-hidden"
      >
        {/* Animated Celebration Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold tracking-wider mb-2">
          ORDER ID: {order.id}
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2">
          THANK YOU FOR YOUR ORDER!
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
          Your gear has been reserved and is being prepped for dispatch. We've sent an order confirmation with live status to <span className="text-white font-medium">{order.customerEmail}</span>.
        </p>

        {/* Order Details Card */}
        <div className="text-left rounded-2xl bg-slate-950 border border-slate-800 p-5 mb-6 space-y-4 text-xs">
          {/* Dispatch info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Truck className="w-4 h-4" />
              <span>Est. Delivery: {order.estimatedDeliveryDate}</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              Tracking: <span className="text-blue-400">{order.trackingNumber}</span> ({order.trackingCourier})
            </div>
          </div>

          {/* Ordered Products Items */}
          <div className="space-y-2.5 max-h-36 overflow-y-auto pr-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <Package className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="text-white font-semibold truncate">{item.name}</span>
                  <span className="text-slate-400">×{item.quantity}</span>
                </div>
                <span className="font-bold text-white shrink-0 ml-2">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Delivery Address & Payment */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row justify-between text-[11px] text-slate-400 gap-2">
            <div>
              <p className="font-bold text-slate-300">Deliver To:</p>
              <p>{order.customerName}</p>
              <p className="truncate max-w-xs">{order.address.street}, {order.address.city}, {order.address.pincode}</p>
            </div>
            <div className="sm:text-right">
              <p className="font-bold text-slate-300">Total Paid ({order.paymentMethod}):</p>
              <p className="text-base font-black text-blue-400">
                ₹{order.totalAmount.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {
              onClose();
              onViewOrders();
            }}
            className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            VIEW IN MY PROFILE
          </button>

          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
