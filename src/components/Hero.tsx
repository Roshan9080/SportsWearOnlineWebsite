import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Award, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onExploreSports: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onExploreSports }) => {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-slate-950 border-b border-slate-800">
      {/* Background Image with Athletic Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1920&auto=format&fit=crop"
          alt="Sports stadium track and athletes"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b14] via-[#0b1220]/90 to-[#070b14]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
      </div>

      {/* Decorative dynamic grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          {/* Energy Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-bold tracking-wider uppercase mb-6 shadow-inner">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Official Sports Authority • 2026 Edition</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05] mb-6">
            GEAR UP FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
              YOUR GAME
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl">
            Premium sports equipment and sportswear from trusted international brands. Built for cricketers, footballers, runners, and champions who settle for nothing less than victory.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-14">
            <button
              id="btn-hero-shop-now"
              onClick={onShopNow}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base tracking-wide shadow-lg shadow-blue-600/35 hover:shadow-blue-500/50 hover:translate-y-[-2px] active:translate-y-[0px] transition-all"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              id="btn-hero-explore-sports"
              onClick={onExploreSports}
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-bold text-base tracking-wide hover:border-slate-500 transition-all"
            >
              <span>EXPLORE SPORTS</span>
            </button>
          </div>

          {/* Trust Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 text-slate-300 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">100% Genuine Gear</p>
                <p className="text-slate-400 text-xs">Direct Brand Warranties</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Pan-India Delivery</p>
                <p className="text-slate-400 text-xs">Free Above ₹999</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <div className="p-2 rounded-lg bg-amber-600/10 border border-amber-500/20 text-amber-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Match Standard</p>
                <p className="text-slate-400 text-xs">Pro & Club Tournaments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
