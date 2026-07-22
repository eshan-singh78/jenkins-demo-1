import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { ShieldCheck, Cpu, Layers, Feather, ArrowRight } from 'lucide-react';

export const CraftsmanshipStory: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeMaterial, setActiveMaterial] = useState(0);

  const materials = [
    {
      title: '6061 Aerospace Aluminum',
      icon: <Cpu className="w-5 h-5 text-indigo-600" />,
      desc: 'Precision CNC-milled from solid monolithic billets, then bead-blasted and anodized for an indestructible matte finish.',
      stats: 'Zero Flex • 100% Recyclable',
    },
    {
      title: 'Tuscan Full-Grain Leather',
      icon: <Layers className="w-5 h-5 text-amber-600" />,
      desc: 'Vegetable-tanned in Florence using natural oak extracts. Develops a personal golden patina unique to your journey.',
      stats: 'Non-Toxic • Hand Finished',
    },
    {
      title: 'Pure Beryllium Acoustic Foils',
      icon: <Feather className="w-5 h-5 text-indigo-600" />,
      desc: 'Ultra-lightweight metallic foils delivering zero-distortion micro-detail across 10Hz to 40,000Hz frequency response.',
      stats: 'Micro-Detail • Lossless Studio',
    },
    {
      title: '100% Bavarian Merino Felt',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      desc: 'Dense, soft virgin wool felt harvested sustainably in Germany, backed with acoustic non-slip cork.',
      stats: 'Water Repellent • Anti-Static',
    },
  ];

  return (
    <section className="py-24 brand-gradient text-white font-sans relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
            Design Ethos
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Built for Decades, Not Seasons
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal max-w-2xl mx-auto">
            We reject disposable plastic consumerism. Every AURA object begins with raw materials chosen for structural integrity, tactile satisfaction, and circular sustainability.
          </p>
        </div>

        {/* Interactive Material Callout Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Material Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {materials.map((mat, idx) => (
              <button
                key={mat.title}
                onClick={() => setActiveMaterial(idx)}
                className={`w-full p-5 rounded text-left border transition-all duration-300 cursor-pointer ${
                  activeMaterial === idx
                    ? 'bg-neutral-800 border-white text-white shadow-xl scale-102'
                    : 'bg-neutral-900/60 border-neutral-800 hover:bg-neutral-800/60 text-neutral-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-black border border-neutral-800">
                    {mat.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-white">{mat.title}</h4>
                    <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-widest">{mat.stats}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Material Showcase Display */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeMaterial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 rounded-xl bg-neutral-900/90 border border-neutral-700/80 shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded bg-neutral-800 border border-neutral-700 text-white">
                  {materials[activeMaterial].icon}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400">
                    Material Specification 0{activeMaterial + 1}
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-wide text-white">
                    {materials[activeMaterial].title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                {materials[activeMaterial].desc}
              </p>

              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Tested under ISO 9001 studio standards
                </span>
                <button
                  onClick={() => navigateTo('about')}
                  className="text-xs font-black uppercase tracking-widest text-white hover:text-neutral-300 flex items-center gap-1 cursor-pointer"
                >
                  Full Manifesto <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
