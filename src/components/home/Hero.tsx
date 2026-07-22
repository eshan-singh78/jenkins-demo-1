import React from 'react';
import { motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Sparkles, Award, ShieldCheck, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F4F8] via-[#FDFDFD] to-white pt-10 pb-16 lg:pt-16 lg:pb-28">
      {/* Light Soft Glow Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-radial from-indigo-100/40 via-slate-100/30 to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left Text Content with Massive Bold Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 text-center lg:text-left space-y-6"
          >
            {/* Tagline / Eyebrow */}
            <div className="text-xs font-black tracking-[0.3em] uppercase text-neutral-500 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-6 h-0.5 bg-neutral-900 inline-block" />
              <span>Curated Minimalist Goods</span>
            </div>

            {/* Massive Hero Title */}
            <h1 className="text-6xl sm:text-8xl lg:text-[92px] font-black tracking-[-0.035em] text-neutral-900 uppercase leading-[0.86] my-2">
              PURE<br />FORM
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
              Experience a sanctuary of design. We believe that the objects surrounding you should be as intentional as the life you lead.
            </p>

            {/* CTAs with Brand Gradient */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-primary-cta"
                onClick={() => navigateTo('products')}
                className="w-full sm:w-auto px-10 py-5 rounded brand-gradient hover:brand-gradient-hover text-white font-black text-xs tracking-[0.2em] uppercase shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer active:scale-98"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={() => navigateTo('about')}
                className="w-full sm:w-auto px-8 py-5 rounded bg-white hover:bg-neutral-50 text-neutral-900 font-extrabold text-xs tracking-[0.15em] uppercase border border-neutral-300 shadow-sm transition-all flex items-center justify-center cursor-pointer"
              >
                Design Philosophy
              </button>
            </div>

            {/* Rating / Social Proof */}
            <div className="pt-6 border-t border-neutral-200/80 flex items-center justify-center lg:justify-start gap-6">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-left text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-neutral-900 font-black ml-1">4.9/5</span>
                </div>
                <p className="text-neutral-500 font-semibold mt-0.5 uppercase tracking-wider text-[10px]">
                  14,000+ Verified Studio Reviews
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual / Monolith Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-xl bg-gradient-to-br from-[#F5F7FA] to-[#C3CFE2] p-8 flex flex-col justify-between shadow-2xl border border-neutral-200/80 overflow-hidden">
              {/* Top Limited Edition Badge */}
              <div className="flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 bg-white text-neutral-900 border border-neutral-200 text-[10px] font-black tracking-[0.2em] uppercase rounded shadow-sm">
                  Limited Edition
                </span>
                <span className="text-[10px] font-black tracking-[0.25em] text-neutral-500 uppercase">
                  Series 2026
                </span>
              </div>

              {/* Product Spotlight Image Stage */}
              <div className="relative my-auto w-full aspect-[4/3] rounded bg-white shadow-xl overflow-hidden p-3 border border-neutral-100 group cursor-pointer" onClick={() => navigateTo('product-detail')}>
                <img
                  src="/src/assets/images/hero_modern_goods_1784698107657.jpg"
                  alt="AURA Modern Goods Hero"
                  className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom Label Box */}
              <div className="bg-white/90 backdrop-blur-md p-4 rounded border border-neutral-200 flex items-center justify-between z-10 shadow-md">
                <div>
                  <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                    The Monolith
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-semibold tracking-wide">
                    Anodized Sound Arc Vessel
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('product-detail')}
                  className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-[10px] font-black uppercase tracking-widest rounded transition-colors cursor-pointer"
                >
                  View Object
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
