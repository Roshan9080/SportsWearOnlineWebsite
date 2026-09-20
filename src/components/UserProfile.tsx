import React, { useState } from 'react';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  LogOut,
  Calendar,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  ShoppingCart
} from 'lucide-react';
import { User, Order, Product } from '../types';

interface UserProfileProps {
  user: User;
  orders: Order[];
  wishlistProducts: Product[];
  onLogout: () => void;
  onAddToCart: (product: Product) => void;
  onRemoveWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  orders,
  wishlistProducts,
  onLogout,
  onAddToCart,
  onRemoveWishlist,
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'address'>('orders');

  return (
    <div id="user-profile-view" className="py-12 bg-[#0A0E17] min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-500/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {user.name}
                </h1>
                {user.role === 'admin' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 font-extrabold text-[11px] uppercase">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Member since {user.joinedDate || '2026'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-600/40 border border-slate-700 text-slate-300 text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-8 overflow-x-auto text-xs font-black uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
              activeTab === 'wishlist'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('address')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
              activeTab === 'address'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Address</span>
          </button>
        </div>

        {/* TAB 1: MY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  id={`user-order-${order.id}`}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm"
                >
                  {/* Order Top Bar */}
                  <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-slate-400">Order ID: </span>
                      <span className="font-mono font-bold text-blue-400">{order.id}</span>
                      <span className="text-slate-400 ml-3">Placed: {order.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : order.status === 'Shipped'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-white font-black text-sm">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-5 space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-xs">
                        <div className="w-14 h-14 rounded-xl bg-slate-950 p-1.5 shrink-0 border border-slate-800 flex items-center justify-center">
                          <img
                            src={item.image}
                            alt=""
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-blue-400 uppercase">
                            {item.brand}
                          </span>
                          <h4 className="font-bold text-white truncate">{item.name}</h4>
                          <p className="text-slate-400 text-[11px]">
                            Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                          </p>
                        </div>
                        <span className="font-bold text-white">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tracking & Courier Status */}
                  <div className="p-4 bg-slate-950/40 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-400" />
                      <span>
                        Estimated Delivery: <strong className="text-slate-200">{order.estimatedDeliveryDate}</strong>
                      </span>
                    </div>
                    <div>
                      Courier: <span className="text-white font-medium">{order.trackingCourier}</span> • Tracking #{' '}
                      <span className="text-blue-400 font-mono font-bold">{order.trackingNumber}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-12 rounded-2xl bg-slate-900 border border-slate-800">
                <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white uppercase">No Orders Placed Yet</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Once you order tournament equipment, your tracking details will appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
                  >
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="h-44 w-full bg-slate-950 rounded-xl p-4 flex items-center justify-center cursor-pointer mb-3"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase">
                        {product.brand}
                      </span>
                      <h4
                        onClick={() => onSelectProduct(product)}
                        className="text-xs font-bold text-white truncate cursor-pointer hover:text-blue-400"
                      >
                        {product.name}
                      </h4>
                      <p className="text-sm font-black text-white mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => onAddToCart(product)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                      <button
                        onClick={() => onRemoveWishlist(product)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-bold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 rounded-2xl bg-slate-900 border border-slate-800">
                <Heart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white uppercase">Your Wishlist is Empty</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click the heart icon on any gear card to save your favorite bats, rackets, and shoes!
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED ADDRESS */}
        {activeTab === 'address' && (
          <div className="max-w-xl p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Primary Delivery Address</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                DEFAULT
              </span>
            </div>
            <div className="space-y-1 text-slate-300">
              <p className="font-bold text-white text-sm">{user.name}</p>
              <p>{user.phone || '+91 9812345678'}</p>
              <p>{user.address?.street || 'Flat 402, Green Glen Layout, Outer Ring Road'}</p>
              <p>
                {user.address?.city || 'Bangalore'}, {user.address?.state || 'Karnataka'} -{' '}
                {user.address?.pincode || '560103'}
              </p>
              <p className="text-slate-400 pt-1">Country: India</p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-emerald-400 text-[11px]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified for 24-48 Hours Express Dispatch</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
