import React from 'react';
import { CATEGORIES } from '../data/categoriesAndBrands';
import { SportType } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ShopBySportProps {
  onSelectSport: (sport: SportType) => void;
}

export const ShopBySport: React.FC<ShopBySportProps> = ({ onSelectSport }) => {
  return (
    <section id="shop-by-sport" className="py-16 sm:py-20 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-block text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-2">
              Sports Categories
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              SHOP BY SPORT
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-2 sm:mt-0">
            Engineered equipment, official match gear and precision accessories built for every discipline.
          </p>
        </div>

        {/* Categories Grid (8 sports) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              id={`sport-card-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectSport(cat.name)}
              className="group relative overflow-hidden rounded-2xl bg-slate-800/90 border border-slate-700/80 hover:border-blue-500/60 shadow-lg hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 cursor-pointer flex flex-col h-[340px]"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-bold uppercase tracking-wider text-blue-400">
                  {cat.subcategories.length} Gear Types
                </span>
              </div>

              {/* Content Box */}
              <div className="p-5 flex flex-col flex-grow justify-between bg-slate-900/95">
                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white uppercase tracking-wider">
                    Explore Gear
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-blue-600 flex items-center justify-center text-slate-300 group-hover:text-white transition-all transform group-hover:translate-x-1">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
