import React from 'react';
import { motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { CategoryId } from '../../types';
import { Headphones, Laptop, Briefcase, ArrowRight } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const { navigateTo } = useShop();

  const categories: {
    id: CategoryId;
    title: string;
    tagline: string;
    itemCount: string;
    image: string;
    icon: React.ReactNode;
    gradient: string;
  }[] = [
    {
      id: 'audio-tech',
      title: 'Audio & Tech',
      tagline: 'Precision acoustic drivers, noise cancellation & wireless power docks',
      itemCount: '14 Products',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      icon: <Headphones className="w-5 h-5 text-indigo-600" />,
      gradient: 'from-indigo-50/80 via-purple-50/50 to-white',
    },
    {
      id: 'workspace',
      title: 'Workspace & Living',
      tagline: 'Linear LED lamps, gasket-mount mechanical key decks & merino desk mats',
      itemCount: '18 Products',
      image: '/src/assets/images/category_workspace_lifestyle_1784698121846.jpg',
      icon: <Laptop className="w-5 h-5 text-sky-600" />,
      gradient: 'from-sky-50/80 via-blue-50/50 to-white',
    },
    {
      id: 'carry-travel',
      title: 'Carry & Travel',
      tagline: 'Weatherproof ballistic nylon daypacks, Tuscan leather folios & weekender duffels',
      itemCount: '12 Products',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      icon: <Briefcase className="w-5 h-5 text-amber-600" />,
      gradient: 'from-amber-50/80 via-orange-50/50 to-white',
    },
  ];

  return (
    <section className="py-20 bg-[#FAFBFD] font-sans border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
              Curated Universes
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight uppercase">
              Explore by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('products', 'all')}
            className="text-xs font-black uppercase tracking-[0.15em] text-neutral-900 hover:text-neutral-600 flex items-center gap-1.5 group cursor-pointer"
          >
            Browse All Categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigateTo('products', cat.id)}
              className="group relative bg-white rounded-xl border border-neutral-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-neutral-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                    {cat.icon}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 bg-neutral-100 px-3 py-1 rounded">
                    {cat.itemCount}
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase tracking-wide text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">{cat.tagline}</p>
              </div>

              {/* Image Area with Soft Gradient Hover Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 mt-2">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-1 group-hover:gap-2 transition-all">
                    Shop {cat.title} <ArrowRight className="w-4 h-4 text-white" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
