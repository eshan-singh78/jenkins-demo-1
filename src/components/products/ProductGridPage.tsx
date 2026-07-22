import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CategoryId, FilterState } from '../../types';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const ProductGridPage: React.FC = () => {
  const { products, selectedCategory, navigateTo, formatPrice } = useShop();

  // Grid column density state
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  // Mobile Filter Drawer State
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: selectedCategory || 'all',
    minPrice: 0,
    maxPrice: 500,
    inStockOnly: false,
    minRating: 0,
    sortBy: 'featured',
  });

  // Sync if selectedCategory from props/context changed
  React.useEffect(() => {
    if (selectedCategory) {
      setFilters((prev) => ({ ...prev, category: selectedCategory }));
    }
  }, [selectedCategory]);

  const categoriesList: { id: CategoryId; name: string }[] = [
    { id: 'all', name: 'All Categories' },
    { id: 'audio-tech', name: 'Audio & Tech' },
    { id: 'workspace', name: 'Workspace & Living' },
    { id: 'carry-travel', name: 'Carry & Travel' },
  ];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (filters.category !== 'all' && p.category !== filters.category) return false;

        // Search query filter
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTagline = p.tagline.toLowerCase().includes(q);
          const matchCategory = p.categoryName.toLowerCase().includes(q);
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchTagline && !matchCategory && !matchTag) return false;
        }

        // Price filter
        if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;

        // In stock only filter
        if (filters.inStockOnly && !p.inStock) return false;

        // Rating filter
        if (p.rating < filters.minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price;
        if (filters.sortBy === 'price-high') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, filters]);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      minPrice: 0,
      maxPrice: 500,
      inStockOnly: false,
      minRating: 0,
      sortBy: 'featured',
    });
  };

  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.searchQuery ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 500 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <div className="w-full bg-slate-50/50 font-sans min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Hero Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-bold uppercase">
              {categoriesList.find((c) => c.id === filters.category)?.name || 'Catalog'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {filters.category === 'all'
                  ? 'All Goods'
                  : categoriesList.find((c) => c.id === filters.category)?.name}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Precision-engineered tools, acoustic instruments, and luxury carry.
              </p>
            </div>

            {/* Quick Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Filter catalog..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-medium outline-none focus:border-indigo-500 shadow-sm"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters({ ...filters, searchQuery: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Top Control Bar (Count, Mobile Filter Trigger, Grid Density, Sort) */}
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Result Count & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" /> Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <span className="text-xs font-bold text-slate-700">
              Showing <strong className="text-indigo-600">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'object' : 'objects'}
            </span>
          </div>

          {/* Right Controls: Grid Switcher & Sort */}
          <div className="flex items-center gap-4">
            {/* Column Density Switcher */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  gridCols === 2 ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="2 Columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  gridCols === 3 ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  gridCols === 4 ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-slate-500 font-semibold">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="px-3 py-2 rounded-xl bg-slate-100 border border-transparent hover:border-slate-300 text-xs font-bold text-slate-800 outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Desktop Sidebar + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm h-fit">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" /> Filters
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Category
              </label>
              <div className="space-y-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilters({ ...filters, category: cat.id })}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                      filters.category === cat.id
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {filters.category === cat.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Price Limit
                </label>
                <span className="text-xs font-extrabold text-slate-900">
                  Up to {formatPrice(filters.maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>$50</span>
                <span>$250</span>
                <span>$500+</span>
              </div>
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                In Stock Items Only
              </label>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Minimum Rating
              </label>
              <div className="flex gap-2">
                {[0, 4.5, 4.8].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setFilters({ ...filters, minRating: stars })}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      filters.minRating === stars
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {stars === 0 ? 'All' : `${stars}★+`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Cards Grid Display */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900">No objects match your filter</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search query, increasing price limit, or selecting "All Categories".
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridCols === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : gridCols === 3
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Slide-Over Modal */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="w-screen max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto space-y-6"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="text-lg font-black text-slate-900">Filter Objects</h3>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="p-1 text-slate-400 hover:text-slate-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mobile Categories */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Category</label>
                    <div className="space-y-1">
                      {categoriesList.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setFilters({ ...filters, category: cat.id })}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold ${
                            filters.category === cat.id
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">
                      Price up to {formatPrice(filters.maxPrice)}
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs"
                  >
                    Apply ({filteredProducts.length})
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
