import React, { useState } from 'react';
import {
  Search,
  User as UserIcon,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Zap,
  Shield,
  FileCode2,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenProfile: () => void;
  onOpenCollegeModal: () => void;
  onSearch: (query: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  currentUser,
  onOpenAuth,
  onOpenCart,
  onOpenWishlist,
  onOpenProfile,
  onOpenCollegeModal,
  onSearch,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setActiveTab('products');
      setSearchOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'sports', label: 'Sports' },
    { id: 'brands', label: 'Brands' },
    { id: 'products', label: 'Products' },
    { id: 'offers', label: 'Offers' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 bg-[#0B111E]/95 backdrop-blur-md border-b border-slate-800 shadow-xl transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LEFT: SPORTZONE LOGO */}
          <div className="flex items-center gap-3">
            <button
              id="header-logo"
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
              style={{ minWidth: '160px', maxWidth: '190px' }}
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-400 text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
                <Zap className="w-5 h-5 fill-white text-white" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B111E]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center tracking-tight font-extrabold text-xl sm:text-2xl text-white">
                  SPORT<span className="text-blue-500">ZONE</span>
                </div>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 -mt-1 group-hover:text-slate-300">
                  Play Hard • Win More
                </span>
              </div>
            </button>

            {/* College Project / PHP XAMPP Quick Badge */}
            <button
              id="btn-college-project"
              onClick={onOpenCollegeModal}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-600/40 text-blue-300 text-xs font-semibold hover:bg-blue-900/60 hover:text-white transition-all shadow-sm"
              title="College Project: View PHP Source Code, MySQL schema & Viva Guide"
            >
              <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
              <span>PHP / MySQL Project</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </button>
          </div>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: ICONS (Search, User, Wishlist, Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Toggle / Input */}
            <div className="relative">
              {searchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center bg-slate-900 border border-blue-500/50 rounded-lg px-2.5 py-1.5 shadow-inner"
                >
                  <Search className="w-4 h-4 text-blue-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search bats, shoes, rackets..."
                    className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-36 sm:w-48"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-slate-400 hover:text-white ml-1 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  id="btn-search-trigger"
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Search Products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button with Badge */}
            <button
              id="btn-wishlist"
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-[#0B111E]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button with Badge */}
            <button
              id="btn-cart"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span
                id="cart-badge-count"
                className="bg-white text-blue-700 font-extrabold text-xs px-1.5 py-0.5 rounded-full ml-0.5 leading-none"
              >
                {cartCount}
              </span>
            </button>

            {/* User Account / Login */}
            <div className="relative">
              {currentUser ? (
                <div className="relative">
                  <button
                    id="btn-user-menu"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center text-xs font-bold">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div className="hidden sm:flex flex-col text-left leading-tight">
                      <span className="text-xs font-bold truncate max-w-[90px]">{currentUser.name.split(' ')[0]}</span>
                      <span className="text-[10px] text-blue-400 capitalize">{currentUser.role}</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-800">
                        <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={onOpenProfile}
                        className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-blue-400" />
                        <span>My Account & Orders</span>
                      </button>
                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => setActiveTab('admin')}
                          className="w-full text-left px-4 py-2 text-xs text-emerald-400 hover:bg-slate-800 flex items-center gap-2 font-semibold"
                        >
                          <Shield className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Admin Dashboard</span>
                        </button>
                      )}
                      <button
                        onClick={onOpenCollegeModal}
                        className="w-full text-left px-4 py-2 text-xs text-blue-400 hover:bg-slate-800 flex items-center gap-2"
                      >
                        <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>XAMPP / PHP / SQL Export</span>
                      </button>
                      <div className="border-t border-slate-800 my-1" />
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/40 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  id="btn-login-header"
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all"
                >
                  <UserIcon className="w-4 h-4 text-blue-400" />
                  <span>Login</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              id="btn-mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE EXPANDED MENU */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sports gear, brands..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </form>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                activeTab === item.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                onOpenCollegeModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-blue-950/60 border border-blue-700/40 text-blue-300 text-sm font-semibold"
            >
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-blue-400" />
                <span>PHP & MySQL College Files</span>
              </div>
              <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded">XAMPP</span>
            </button>

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => {
                  setActiveTab('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 text-sm font-semibold flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
