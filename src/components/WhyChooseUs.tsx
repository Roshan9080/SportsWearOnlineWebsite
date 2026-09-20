import React from 'react';
import { ShieldCheck, ShoppingBag, Lock, Zap } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'QUALITY PRODUCTS',
      description: 'Hand-curated, authentic gear sourced directly from authorized sports manufacturers.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: ShoppingBag,
      title: 'EASY SHOPPING',
      description: 'Streamlined search, category filters, responsive sizing guides, and one-click purchasing.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Lock,
      title: 'SECURE PAYMENT',
      description: 'Zero-risk checkout with instant UPI, simulated Credit/Debit authorization, and Cash on Delivery.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Zap,
      title: 'FAST DELIVERY',
      description: 'Reliable express logistics across all Indian PIN codes with live multi-stage order tracking.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <section id="why-choose-us" className="py-16 sm:py-20 bg-slate-900/50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-2">
            The SportZone Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            WHY CHOOSE SPORTZONE
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Everything an athlete, coach, or collegiate club needs to train at peak performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                id={`feature-card-${index}`}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col items-center text-center group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.bg} mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-base font-extrabold text-white uppercase tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
