import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { ProductGridPage } from './components/products/ProductGridPage';
import { ProductDetailPage } from './components/products/ProductDetailPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { AccountPage } from './components/account/AccountPage';
import { AboutPage, ContactPage, FAQPage, LegalPage } from './components/pages/StaticPages';
import { HeaderSearchModal } from './components/common/HeaderSearchModal';
import { ToastNotification } from './components/common/ToastNotification';

const AppContent: React.FC = () => {
  const { activePage } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Active Page View */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'products' && <ProductGridPage />}
        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'cart' && <CartPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'account' && <AccountPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'faq' && <FAQPage />}
        {activePage === 'privacy' && <LegalPage title="Privacy Policy" />}
        {activePage === 'terms' && <LegalPage title="Terms of Service" />}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Global Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Global Command Palette Search Modal (⌘K) */}
      <HeaderSearchModal />

      {/* Global Toast Notification */}
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
