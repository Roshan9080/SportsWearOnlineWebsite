import React from 'react';
import { BRANDS } from '../data/categoriesAndBrands';
import { BrandType } from '../types';

interface ShopByBrandProps {
  onSelectBrand: (brand: BrandType) => void;
}

export const ShopByBrand: React.FC<ShopByBrandProps> = ({ onSelectBrand }) => {
  return (
    <section id="shop-by-brand" className="py-16 sm:py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-block text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-2">
              Official Gear Partners
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              SHOP BY BRAND
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-2 sm:mt-0">
            Engineered equipment from the world's most trusted sports manufacturers.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              id={`brand-card-${brand.name.toLowerCase()}`}
              onClick={() => onSelectBrand(brand.name)}
              className="group p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:translate-y-[-2px]"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-blue-600/20 flex items-center justify-center text-white mb-3 transition-colors">
                <span className="font-black text-lg tracking-tighter text-blue-400 group-hover:text-blue-300">
                  {brand.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-blue-400 transition-colors uppercase tracking-wider">
                {brand.name}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-1 italic line-clamp-1">
                "{brand.tagline}"
              </p>
              <span className="mt-3 text-[10px] text-slate-400 group-hover:text-slate-300 font-bold uppercase tracking-wider">
                {brand.specialty.split(' ')[0]} Gear →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
