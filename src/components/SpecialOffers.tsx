import React from 'react';
import { Sparkles, ArrowRight, Tag, Percent } from 'lucide-react';

interface SpecialOffersProps {
  onShopOffers: () => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ onShopOffers }) => {
  return (
    <section id="special-offers" className="py-16 sm:py-20 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Container */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 border border-blue-600/40 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-blue-600/15">
          {/* Background subtle textures */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 p-8 opacity-10 hidden md:block">
            <Percent className="w-80 h-80 text-white" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-extrabold tracking-widest uppercase mb-4">
              <Tag className="w-3.5 h-3.5" />
              <span>LIMITED SEASON SALE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-[1.1] mb-4">
              GAME ON. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                PRICES DOWN.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Unlock unmatched value on tournament bats, pro match footballs, speed badminton rackets, and cushioned road trainers. Use promo code <span className="text-white font-mono font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">SPORT40</span> during checkout for instant savings.
            </p>

            {/* Offer Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-rose-400 font-extrabold text-xl">UP TO 40% OFF</span>
                <p className="text-xs text-slate-400 mt-0.5">Selected International Gear</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-blue-400 font-extrabold text-xl">CRICKET SALE</span>
                <p className="text-xs text-slate-400 mt-0.5">English Willow & Pads</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-emerald-400 font-extrabold text-xl">SHOES SALE</span>
                <p className="text-xs text-slate-400 mt-0.5">Cleats, Spikes & Court</p>
              </div>
            </div>

            <button
              id="btn-shop-offers"
              onClick={onShopOffers}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/40 hover:shadow-blue-500/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              <span>SHOP OFFERS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
