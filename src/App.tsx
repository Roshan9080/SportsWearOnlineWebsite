import React, { useState, useEffect } from 'react';
import { PromoBar } from './components/PromoBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopBySport } from './components/ShopBySport';
import { ShopByBrand } from './components/ShopByBrand';
import { SpecialOffers } from './components/SpecialOffers';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerReviews } from './components/CustomerReviews';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductListing } from './components/ProductListing';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { AdminPanel } from './components/AdminPanel';
import { CollegeProjectModal } from './components/CollegeProjectModal';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';

import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data/sportsData';
import { Product, CartItem, Order, User, FilterState, SportType, BrandType } from './types';
import { Check, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';

export default function App() {
  // Main Data States
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Super Admin',
      email: 'admin@sportzone.com',
      role: 'admin',
      joinedDate: '2025-01-10',
    },
    {
      id: 2,
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '9812345678',
      role: 'customer',
      joinedDate: '2026-02-14',
      address: {
        street: 'Flat 402, Green Glen Layout, Outer Ring Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560103',
      },
    },
  ]);

  // Current logged in user (defaults to Rahul Sharma for convenience in college demonstration)
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 2,
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '9812345678',
    role: 'customer',
    joinedDate: '2026-02-14',
    address: {
      street: 'Flat 402, Green Glen Layout, Outer Ring Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560103',
    },
  });

  // Shopping Cart & Wishlist
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0], // MRF Grand Edition Bat
      quantity: 1,
      selectedSize: 'Short Handle (Men)',
    },
    {
      product: INITIAL_PRODUCTS[2], // Nivia Storm Football
      quantity: 1,
      selectedSize: 'Size 5 (Official Match)',
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<number[]>([1, 4, 11]);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    'home' | 'products' | 'sports' | 'brands' | 'offers' | 'about' | 'contact' | 'profile' | 'admin'
  >('home');

  // Search & Filter State
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    sport: 'all',
    brand: [],
    priceRange: 'all',
    minRating: 0,
    availability: 'all',
    searchQuery: '',
    sortBy: 'recommended',
  });

  // Modal / Drawer toggles
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCollegeModalOpen, setIsCollegeModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          (!selectedSize || item.selectedSize === selectedSize)
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedSize: selectedSize || (product.sizes ? product.sizes[0] : undefined),
            selectedColor: selectedColor || (product.colors ? product.colors[0] : undefined),
          },
        ];
      }
    });

    showToast(`Added "${product.name}" to cart!`);
  };

  const handleBuyNow = (
    product: Product,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    handleAddToCart(product, 1, selectedSize, selectedColor);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((x): x is CartItem => x !== null)
    );
  };

  const handleRemoveCartItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist.`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist!`);
        return [...prev, product.id];
      }
    });
  };

  // Order Placement
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setConfirmedOrder(newOrder);
  };

  // Filters Reset
  const handleResetFilters = () => {
    setFilterState({
      category: 'all',
      sport: 'all',
      brand: [],
      priceRange: 'all',
      minRating: 0,
      availability: 'all',
      searchQuery: '',
      sortBy: 'recommended',
    });
  };

  // Sport selection from home cards or footer
  const handleSelectSport = (sport: SportType) => {
    setFilterState((prev) => ({ ...prev, sport, brand: [] }));
    setActiveTab('products');
  };

  // Brand selection
  const handleSelectBrand = (brand: BrandType) => {
    setFilterState((prev) => ({ ...prev, sport: 'all', brand: [brand] }));
    setActiveTab('products');
  };

  // Admin CRUD Actions
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added product "${newProduct.name}" to inventory.`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated product "${updated.name}".`);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog.');
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Order ${orderId} marked as ${status}.`);
  };

  // User Wishlist products array
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Related products for product details modal
  const relatedProducts = selectedProduct
    ? products.filter(
        (p) => p.sport === selectedProduct.sport && p.id !== selectedProduct.id
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#070B14] text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* 1. Promotional Announcement Bar */}
      <PromoBar onOpenCollegeProjectModal={() => setIsCollegeModalOpen(true)} />

      {/* 2. Sticky Athletic Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab: string) => {
          setActiveTab(tab as any);
          if (tab === 'offers') {
            setFilterState((prev) => ({ ...prev, priceRange: 'all', sport: 'all' }));
          }
        }}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setActiveTab('profile')}
        onOpenProfile={() => setActiveTab('profile')}
        onOpenCollegeModal={() => setIsCollegeModalOpen(true)}
        onSearch={(query: string) => {
          setFilterState((prev) => ({ ...prev, searchQuery: query }));
          if (activeTab !== 'products') setActiveTab('products');
        }}
        onLogout={() => {
          setCurrentUser(null);
          setActiveTab('home');
          showToast('You have been logged out.');
        }}
      />

      {/* 3. Main Body Views Routing */}
      <main className="flex-1">
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Banner with CTA */}
            <Hero
              onShopNow={() => setActiveTab('products')}
              onExploreSports={() => {
                const sportEl = document.getElementById('shop-by-sport');
                if (sportEl) {
                  sportEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveTab('sports');
                }
              }}
            />

            {/* Shop by Sport Category Cards */}
            <ShopBySport onSelectSport={handleSelectSport} />

            {/* Featured & Trending Tournament Equipment */}
            <section className="py-16 sm:py-20 bg-slate-950 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Season Best Sellers</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                      FEATURED SPORTS GEAR
                    </h2>
                  </div>

                  <button
                    onClick={() => setActiveTab('products')}
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-bold uppercase tracking-wider mt-3 sm:mt-0 transition-colors"
                  >
                    <span>View All Equipment ({products.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 6 Top Trending Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter((p) => p.isTrending || p.rating >= 4.8)
                    .slice(0, 6)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                        onSelectProduct={(p) => setSelectedProduct(p)}
                      />
                    ))}
                </div>
              </div>
            </section>

            {/* Shop by Brand Section */}
            <ShopByBrand onSelectBrand={handleSelectBrand} />

            {/* Special Offers Section */}
            <SpecialOffers
              onShopOffers={() => {
                setFilterState((prev) => ({
                  ...prev,
                  sport: 'all',
                  brand: [],
                  sortBy: 'recommended',
                }));
                setActiveTab('products');
              }}
            />

            {/* Why Choose SportZone */}
            <WhyChooseUs />

            {/* Customer Reviews & Testimonials */}
            <CustomerReviews />

            {/* Newsletter Subscription */}
            <Newsletter />
          </div>
        )}

        {/* VIEW: PRODUCTS CATALOG (SEARCH + FILTER SYSTEM) */}
        {activeTab === 'products' && (
          <ProductListing
            products={products}
            wishlistIds={wishlistIds}
            filterState={filterState}
            setFilterState={setFilterState}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* VIEW: SPORTS (CATEGORIES DIRECTORY) */}
        {activeTab === 'sports' && (
          <div>
            <div className="py-12 bg-slate-900 border-b border-slate-800 text-center">
              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-2">
                ALL SPORTS DISCIPLINES
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                Select your sport to view bats, footballs, rackets, cleats, protective equipment, and match apparel.
              </p>
            </div>
            <ShopBySport onSelectSport={handleSelectSport} />
          </div>
        )}

        {/* VIEW: BRANDS DIRECTORY */}
        {activeTab === 'brands' && (
          <div>
            <div className="py-12 bg-slate-900 border-b border-slate-800 text-center">
              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-2">
                OFFICIAL BRAND PARTNERS
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                Browse certified equipment from global athletic champions like MRF, SG, Yonex, Adidas, and Nike.
              </p>
            </div>
            <ShopByBrand onSelectBrand={handleSelectBrand} />
          </div>
        )}

        {/* VIEW: OFFERS */}
        {activeTab === 'offers' && (
          <div>
            <SpecialOffers
              onShopOffers={() => {
                setActiveTab('products');
              }}
            />
            <ProductListing
              products={products.filter((p) => p.discount >= 20)}
              wishlistIds={wishlistIds}
              filterState={filterState}
              setFilterState={setFilterState}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onResetFilters={handleResetFilters}
            />
          </div>
        )}

        {/* VIEW: ABOUT */}
        {activeTab === 'about' && <AboutView />}

        {/* VIEW: CONTACT */}
        {activeTab === 'contact' && <ContactView />}

        {/* VIEW: USER PROFILE */}
        {activeTab === 'profile' && currentUser && (
          <UserProfile
            user={currentUser}
            orders={orders.filter((o) => o.userId === currentUser.id || currentUser.role === 'admin')}
            wishlistProducts={wishlistProducts}
            onLogout={() => {
              setCurrentUser(null);
              setActiveTab('home');
              showToast('You have been logged out.');
            }}
            onAddToCart={handleAddToCart}
            onRemoveWishlist={handleToggleWishlist}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {/* VIEW: ADMIN PANEL */}
        {activeTab === 'admin' && (
          <AdminPanel
            products={products}
            orders={orders}
            users={users}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onBackToStore={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* 4. Comprehensive Footer */}
      <Footer
        onNavigate={(tab) => setActiveTab(tab as any)}
        onSelectSport={handleSelectSport}
        onOpenCollegeModal={() => setIsCollegeModalOpen(true)}
      />

      {/* 5. Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        relatedProducts={relatedProducts}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* 6. Shopping Cart Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onContinueShopping={() => setActiveTab('products')}
      />

      {/* 7. Checkout Process Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 8. Order Success Celebration Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onViewOrders={() => {
          setConfirmedOrder(null);
          setActiveTab('profile');
        }}
      />

      {/* 9. Authentication Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Welcome back, ${user.name}!`);
          if (user.role === 'admin') {
            setActiveTab('admin');
          } else {
            setActiveTab('profile');
          }
        }}
      />

      {/* 10. College Full-Stack Project Source & XAMPP Modal */}
      <CollegeProjectModal
        isOpen={isCollegeModalOpen}
        onClose={() => setIsCollegeModalOpen(false)}
      />

      {/* 11. Global Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-2xl shadow-blue-600/40 border border-blue-400 animate-slide-up">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
