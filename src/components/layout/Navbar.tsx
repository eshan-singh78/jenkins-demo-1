import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { CurrencyCode, CategoryId } from '../../types';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    activePage,
    selectedCategory,
    currency,
    setCurrencyCode,
    setCartDrawerOpen,
    setSearchModalOpen,
    navigateTo,
  } = useShop();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    '✦ Free Express Shipping on orders over $75',
    '✦ Use code AURA10 for 10% off your first order',
    '✦ 30-Day Risk-Free Home Trial & Lifetime Warranty',
  ];

  // Auto-cycle announcement bar every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Track scroll position for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const currenciesList: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

  const navLinks: { label: string; page: any; category?: CategoryId }[] = [
    { label: 'Shop All', page: 'products', category: 'all' },
    { label: 'Audio & Tech', page: 'products', category: 'audio-tech' },
    { label: 'Workspace', page: 'products', category: 'workspace' },
    { label: 'Carry & Travel', page: 'products', category: 'carry-travel' },
    { label: 'About', page: 'about' },
    { label: 'FAQ', page: 'faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full font-sans">
      {/* Announcement Bar with soft gradient background */}
      <div className="brand-gradient text-white text-[10px] font-extrabold uppercase tracking-[0.25em] py-2 px-4 text-center overflow-hidden border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[18px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={announcementIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="truncate"
            >
              {announcements[announcementIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 backdrop-blur-xl ${
          scrolled
            ? 'bg-white/95 border-b border-neutral-200 shadow-sm py-3.5'
            : 'bg-[#FDFDFD]/90 border-b border-neutral-100 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-neutral-900 hover:text-black rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo Mark with Bold Typography Theme */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigateTo('home')}
          >
            <div className="w-9 h-9 rounded bg-neutral-900 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform tracking-wider">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-[0.25em] text-neutral-900 leading-none uppercase">
                AURA
              </span>
              <span className="text-[9px] font-extrabold tracking-[0.3em] text-neutral-500 uppercase mt-0.5">
                Modern Goods
              </span>
            </div>
          </div>

          {/* Desktop Nav Links with Bold Typography */}
          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive =
                activePage === link.page &&
                (link.page !== 'products' || selectedCategory === (link.category || 'all'));

              return (
                <button
                  key={link.label}
                  onClick={() => navigateTo(link.page, link.category)}
                  className={`text-xs uppercase tracking-[0.18em] font-extrabold transition-all relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-neutral-900 font-black'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Currency Selector Dropdown */}
            <div className="relative hidden sm:block">
              <button
                id="currency-selector-btn"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>{currency.code}</span>
                <span className="text-slate-400">({currency.symbol})</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              <AnimatePresence>
                {currencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-28 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 overflow-hidden"
                  >
                    {currenciesList.map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrencyCode(code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between hover:bg-indigo-50 transition-colors cursor-pointer ${
                          currency.code === code ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>{code}</span>
                        <span className="text-slate-400">
                          {code === 'USD' ? '$' : code === 'EUR' ? '€' : code === 'GBP' ? '£' : code === 'JPY' ? '¥' : 'CA$'}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Trigger Button */}
            <button
              id="search-trigger-btn"
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 p-2 text-slate-700 hover:text-indigo-600 bg-slate-100/70 hover:bg-slate-200/70 rounded-xl transition-colors cursor-pointer"
              title="Search Products (⌘K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline-block text-xs font-medium text-slate-500 pr-1">
                Search <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 font-semibold ml-1">⌘K</kbd>
              </span>
            </button>

            {/* Wishlist Button */}
            <button
              id="wishlist-btn"
              onClick={() => navigateTo('account')}
              className="relative p-2 text-slate-700 hover:text-indigo-600 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account Button */}
            <button
              id="account-btn"
              onClick={() => navigateTo('account')}
              className="p-2 text-slate-700 hover:text-indigo-600 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer"
              title="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Slide-out Button */}
            <button
              id="cart-drawer-trigger"
              onClick={() => setCartDrawerOpen(true)}
              className="relative flex items-center gap-2 pl-3.5 pr-4 py-2 rounded brand-gradient hover:brand-gradient-hover text-white text-xs font-black tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="px-2 py-0.5 bg-white text-neutral-900 rounded font-black text-[10px] min-w-[20px] text-center">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      navigateTo(link.page, link.category);
                      setMobileMenuOpen(false);
                    }}
                    className="p-3 rounded-2xl bg-slate-50 text-left text-sm font-bold text-slate-900 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold">Select Currency:</span>
                <div className="flex gap-2">
                  {currenciesList.map((code) => (
                    <button
                      key={code}
                      onClick={() => setCurrencyCode(code)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        currency.code === code ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
