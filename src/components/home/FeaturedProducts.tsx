import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../products/ProductCard';
import { ArrowRight, Sparkles, Flame, Star } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState<'bestseller' | 'new' | 'featured'>('bestseller');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'bestseller') return p.isBestseller || p.rating >= 4.8;
    if (activeTab === 'new') return p.isNew || p.badge === 'New' || p.badge === 'Sale';
    return p.isFeatured;
  }).slice(0, 8);

  return (
    <section className="py-20 bg-white font-sans border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-neutral-800" /> Iconic Objects
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
              Featured Goods
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg w-fit">
            {[
              { id: 'bestseller', label: 'Best Sellers', icon: <Flame className="w-3.5 h-3.5" /> },
              { id: 'new', label: 'New Arrivals', icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: 'featured', label: 'Staff Picks', icon: <Star className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded text-[10px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'brand-gradient text-white shadow-md'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-6">
          <button
            onClick={() => navigateTo('products')}
            className="px-8 py-4 rounded brand-gradient hover:brand-gradient-hover text-white font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 inline-flex items-center gap-2 shadow-md cursor-pointer"
          >
            Explore Complete Catalog ({products.length} Products)
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
