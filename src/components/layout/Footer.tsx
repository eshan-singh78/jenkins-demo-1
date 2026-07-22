import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setSubscribed(true);
      showToast('Unlocked 10% off code: AURA10!', 'success');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 font-sans pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Newsletter Section with Light Gradient Card */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-800/90 via-indigo-950/40 to-slate-800/90 border border-slate-700/60 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              AURA Inner Circle
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Get $20 off your first order & private releases
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Join over 45,000 design lovers. Zero spam, unsubscribe anytime with one click.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-semibold text-sm">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span>You're in! Use code <strong className="text-white">AURA10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="px-5 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
                >
                  Join Circle <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Value Props Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-800">
          {[
            {
              icon: <Truck className="w-5 h-5 text-indigo-400" />,
              title: 'Express Worldwide',
              desc: 'Free on orders over $75',
            },
            {
              icon: <RefreshCw className="w-5 h-5 text-indigo-400" />,
              title: '30-Day Risk-Free',
              desc: 'Hassle-free easy returns',
            },
            {
              icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
              title: 'Lifetime Guarantee',
              desc: 'Crafted to endure decades',
            },
            {
              icon: <Award className="w-5 h-5 text-indigo-400" />,
              title: 'Carbon Neutral',
              desc: '100% offset manufacturing',
            },
          ].map((vp, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 flex-shrink-0">
                {vp.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{vp.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{vp.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-base shadow-md">
                A
              </div>
              <span className="text-xl font-black text-white tracking-tight">AURA</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Designing elevated everyday tools and objects. Defined by acoustic clarity, tactile aluminum engineering, and timeless modern aesthetics.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>San Francisco • Rotterdam • Tokyo</p>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Collection</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('products', 'all')} className="hover:text-white transition-colors cursor-pointer">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products', 'audio-tech')} className="hover:text-white transition-colors cursor-pointer">
                  Audio & Tech
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products', 'workspace')} className="hover:text-white transition-colors cursor-pointer">
                  Workspace & Living
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products', 'carry-travel')} className="hover:text-white transition-colors cursor-pointer">
                  Carry & Travel
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Support</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Studio
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Help Center & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Studio</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  Sustainability Report
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AURA Modern Goods Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-600">Secure Payments</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">Apple Pay</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">Google Pay</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">Visa / MC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
