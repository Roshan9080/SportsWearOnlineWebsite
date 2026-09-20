import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { Product, FilterState, SportType, BrandType } from '../types';
import { ProductCard } from './ProductCard';
import { BRANDS } from '../data/categoriesAndBrands';

interface ProductListingProps {
  products: Product[];
  wishlistIds: number[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onResetFilters: () => void;
}

export const ProductListing: React.FC<ProductListingProps> = ({
  products,
  wishlistIds,
  filterState,
  setFilterState,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onResetFilters,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const sportsList: SportType[] = [
    'Cricket',
    'Football',
    'Badminton',
    'Tennis',
    'Basketball',
    'Running',
    'Fitness',
    'Sportswear',
    'Sports Shoes',
  ];

  const brandNames: BrandType[] = BRANDS.map((b) => b.name);

  // Toggle brand in filter
  const handleToggleBrand = (b: string) => {
    setFilterState((prev) => {
      const exists = prev.brand.includes(b);
      const updated = exists
        ? prev.brand.filter((x) => x !== b)
        : [...prev.brand, b];
      return { ...prev, brand: updated };
    });
  };

  // Filtered and Sorted products logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query
      if (filterState.searchQuery) {
        const q = filterState.searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sport.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Sport filter
      if (filterState.sport && filterState.sport !== 'all') {
        if (p.sport !== filterState.sport) return false;
      }

      // Category filter
      if (filterState.category && filterState.category !== 'all') {
        if (p.category !== filterState.category) return false;
      }

      // Brand filter
      if (filterState.brand.length > 0) {
        if (!filterState.brand.includes(p.brand)) return false;
      }

      // Price range filter
      if (filterState.priceRange && filterState.priceRange !== 'all') {
        if (filterState.priceRange === 'under1k' && p.price > 1000) return false;
        if (filterState.priceRange === '1k-5k' && (p.price < 1000 || p.price > 5000))
          return false;
        if (filterState.priceRange === '5k-10k' && (p.price < 5000 || p.price > 10000))
          return false;
        if (filterState.priceRange === 'above10k' && p.price < 10000) return false;
      }

      // Rating filter
      if (filterState.minRating > 0) {
        if (p.rating < filterState.minRating) return false;
      }

      // Availability
      if (filterState.availability === 'inStock' && p.stock <= 0) return false;
      if (filterState.availability === 'outOfStock' && p.stock > 0) return false;

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'priceLowToHigh') return a.price - b.price;
      if (filterState.sortBy === 'priceHighToLow') return b.price - a.price;
      if (filterState.sortBy === 'highestRated') return b.rating - a.rating;
      if (filterState.sortBy === 'newest') return b.id - a.id;
      // Default: recommended (trending first, then ratings)
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.rating - a.rating;
    });
  }, [products, filterState]);

  const activeFilterCount =
    (filterState.sport && filterState.sport !== 'all' ? 1 : 0) +
    filterState.brand.length +
    (filterState.priceRange !== 'all' ? 1 : 0) +
    (filterState.minRating > 0 ? 1 : 0) +
    (filterState.availability !== 'all' ? 1 : 0) +
    (filterState.searchQuery ? 1 : 0);

  const FilterContent = (
    <div className="space-y-6 text-sm text-slate-300">
      {/* Active Filters Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-400" />
          <span className="font-extrabold uppercase tracking-wider text-white text-xs">
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </span>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Sport Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Sport Discipline
        </h4>
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 text-xs">
          <button
            onClick={() => setFilterState((prev) => ({ ...prev, sport: 'all' }))}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
              !filterState.sport || filterState.sport === 'all'
                ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>All Sports</span>
            <span className="text-[10px] text-slate-400">{products.length}</span>
          </button>
          {sportsList.map((sport) => {
            const count = products.filter((p) => p.sport === sport).length;
            const isSelected = filterState.sport === sport;
            return (
              <button
                key={sport}
                onClick={() => setFilterState((prev) => ({ ...prev, sport }))}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{sport}</span>
                <span className="text-[10px] text-slate-400">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Multi-Select */}
      <div className="pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Brands
        </h4>
        <div className="grid grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-1 text-xs">
          {brandNames.map((brand) => {
            const isChecked = filterState.brand.includes(brand);
            const count = products.filter((p) => p.brand === brand).length;
            return (
              <label
                key={brand}
                className={`flex items-center gap-2 p-1.5 rounded cursor-pointer select-none transition-colors ${
                  isChecked
                    ? 'bg-blue-950/60 text-blue-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleBrand(brand)}
                  className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                />
                <span className="truncate">{brand}</span>
                <span className="text-[10px] text-slate-400 ml-auto">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Price Range (₹)
        </h4>
        <div className="space-y-1 text-xs">
          {[
            { id: 'all', label: 'All Prices' },
            { id: 'under1k', label: '₹0 – ₹1,000' },
            { id: '1k-5k', label: '₹1,000 – ₹5,000' },
            { id: '5k-10k', label: '₹5,000 – ₹10,000' },
            { id: 'above10k', label: '₹10,000+' },
          ].map((range) => (
            <label
              key={range.id}
              className="flex items-center gap-2 py-1 cursor-pointer text-slate-400 hover:text-white"
            >
              <input
                type="radio"
                name="priceRange"
                checked={filterState.priceRange === range.id}
                onChange={() => setFilterState((prev) => ({ ...prev, priceRange: range.id }))}
                className="text-blue-600 bg-slate-900 border-slate-700 focus:ring-0 w-3.5 h-3.5"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Customer Rating
        </h4>
        <div className="space-y-1 text-xs">
          {[
            { stars: 0, label: 'All Ratings' },
            { stars: 4.5, label: '4.5 ★ & Above' },
            { stars: 4.0, label: '4.0 ★ & Above' },
            { stars: 3.0, label: '3.0 ★ & Above' },
          ].map((r) => (
            <label
              key={r.stars}
              className="flex items-center gap-2 py-1 cursor-pointer text-slate-400 hover:text-white"
            >
              <input
                type="radio"
                name="rating"
                checked={filterState.minRating === r.stars}
                onChange={() => setFilterState((prev) => ({ ...prev, minRating: r.stars }))}
                className="text-blue-600 bg-slate-900 border-slate-700 focus:ring-0 w-3.5 h-3.5"
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Availability
        </h4>
        <div className="space-y-1 text-xs">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'inStock', label: 'In Stock Only' },
            { id: 'outOfStock', label: 'Out of Stock' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2 py-1 cursor-pointer text-slate-400 hover:text-white"
            >
              <input
                type="radio"
                name="availability"
                checked={filterState.availability === item.id}
                onChange={() =>
                  setFilterState((prev) => ({
                    ...prev,
                    availability: item.id as 'all' | 'inStock' | 'outOfStock',
                  }))
                }
                className="text-blue-600 bg-slate-900 border-slate-700 focus:ring-0 w-3.5 h-3.5"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="products-section" className="py-12 bg-[#0A0E17] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Search Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-block text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-1">
                Official Catalog
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                SPORTS GEAR & APPAREL
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Showing <span className="text-white font-bold">{filteredProducts.length}</span> sports products
              </p>
            </div>

            {/* Search Input on Listing */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-72">
                <input
                  type="text"
                  value={filterState.searchQuery}
                  onChange={(e) =>
                    setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))
                  }
                  placeholder="Search MRF bat, Yonex racket, studs..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                {filterState.searchQuery && (
                  <button
                    onClick={() =>
                      setFilterState((prev) => ({ ...prev, searchQuery: '' }))
                    }
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Mobile Filter Toggle Button */}
              <button
                id="btn-mobile-filters"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold"
              >
                <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>
            </div>
          </div>

          {/* Active Tags & Sort Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
            {/* Active Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {filterState.searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-600/40 text-blue-300 text-xs">
                  <span>Search: "{filterState.searchQuery}"</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-white"
                    onClick={() => setFilterState((prev) => ({ ...prev, searchQuery: '' }))}
                  />
                </span>
              )}
              {filterState.sport && filterState.sport !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-600/40 text-blue-300 text-xs">
                  <span>Sport: {filterState.sport}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-white"
                    onClick={() => setFilterState((prev) => ({ ...prev, sport: 'all' }))}
                  />
                </span>
              )}
              {filterState.brand.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-600/40 text-indigo-300 text-xs"
                >
                  <span>{b}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-white"
                    onClick={() => handleToggleBrand(b)}
                  />
                </span>
              ))}
              {filterState.priceRange !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs">
                  <span>Price filtered</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-white"
                    onClick={() => setFilterState((prev) => ({ ...prev, priceRange: 'all' }))}
                  />
                </span>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 shrink-0 ml-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="sort-products-select" className="text-xs text-slate-400 font-semibold">Sort by:</label>
              <select
                id="sort-products-select"
                value={filterState.sortBy}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    sortBy: e.target.value as FilterState['sortBy'],
                  }))
                }
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
              >
                <option value="recommended">Recommended</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="highestRated">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid with Left Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              {FilterContent}
            </div>
          </aside>

          {/* Products Grid (3 cols on desktop) */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    onAddToCart={onAddToCart}
                    onBuyNow={onBuyNow}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            ) : (
              /* EMPTY STATE: NO PRODUCTS FOUND */
              <div
                id="empty-search-state"
                className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center my-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                  NO PRODUCTS FOUND.
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mb-6">
                  We couldn't find any equipment matching your current search or active filter combination.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="text-xs text-slate-400 self-center mr-1">Suggested Sports:</span>
                  {sportsList.slice(0, 5).map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        onResetFilters();
                        setFilterState((prev) => ({ ...prev, sport: s }));
                      }}
                      className="px-3 py-1 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white text-xs font-semibold text-slate-300 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <button
                  onClick={onResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <span className="font-extrabold uppercase text-white">Filter Products</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {FilterContent}
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-md"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
