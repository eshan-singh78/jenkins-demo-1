import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { Search, X, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export const HeaderSearchModal: React.FC = () => {
  const {
    searchModalOpen,
    setSearchModalOpen,
    products,
    openProductDetail,
    formatPrice,
    addToCart,
    navigateTo,
  } = useShop();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  // Filtered products
  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularSearches = ['Wireless Audio', 'Desk Mat', 'MagSafe Charger', 'Leather Sleeve', 'Backpack'];

  return (
    <AnimatePresence>
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            id="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchModalOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            id="search-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10"
          >
            {/* Search Input Bar with Light Gradient Glow */}
            <div className="relative flex items-center px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-white">
              <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
              <input
                id="search-modal-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, materials, categories... (e.g. Headphones, Leather)"
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-base font-normal outline-none focus:outline-none"
                autoFocus
              />
              {query && (
                <button
                  id="search-clear-btn"
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-lg">
                ESC
              </kbd>
            </div>

            {/* Content Area */}
            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
              {!query.trim() && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Trending Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                      Featured Collections
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { title: 'Audio & Tech', cat: 'audio-tech', bg: 'from-indigo-50 to-purple-50' },
                        { title: 'Workspace', cat: 'workspace', bg: 'from-sky-50 to-slate-50' },
                        { title: 'Carry & Travel', cat: 'carry-travel', bg: 'from-amber-50 to-orange-50' },
                      ].map((c) => (
                        <button
                          key={c.cat}
                          onClick={() => {
                            setSearchModalOpen(false);
                            navigateTo('products', c.cat as any);
                          }}
                          className={`p-4 rounded-2xl bg-gradient-to-br ${c.bg} border border-slate-100 text-left hover:shadow-md transition-all group cursor-pointer`}
                        >
                          <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {c.title}
                          </p>
                          <span className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                            Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {query.trim() && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                    Found {results.length} {results.length === 1 ? 'match' : 'matches'}
                  </p>

                  {results.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <p className="text-base font-medium text-slate-700">No matching products found</p>
                      <p className="text-xs text-slate-400 mt-1">Try searching for "headphones", "bag", or "desk"</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {results.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div
                            className="flex-1 min-w-0 cursor-pointer"
                            onClick={() => {
                              setSearchModalOpen(false);
                              openProductDetail(product.id);
                            }}
                          >
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                              {product.categoryName}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs text-slate-500 truncate mt-0.5">{product.tagline}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-sm font-bold text-slate-900">{formatPrice(product.price)}</span>
                            <div className="mt-1 flex items-center gap-1">
                              <button
                                onClick={() => addToCart(product)}
                                className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-indigo-600 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <ShoppingBag className="w-3 h-3" /> Add
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer strip */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400 flex items-center justify-between px-6">
              <span>Press ESC or click backdrop to exit</span>
              <button
                onClick={() => {
                  setSearchModalOpen(false);
                  navigateTo('products');
                }}
                className="font-medium text-slate-700 hover:text-indigo-600 cursor-pointer"
              >
                View all products →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
