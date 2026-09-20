import React, { useState, useEffect } from 'react';
import { Sparkles, Truck, Tag, ShieldCheck } from 'lucide-react';

const PROMO_MESSAGES = [
  { icon: Truck, text: 'FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE ₹999' },
  { icon: Tag, text: 'UP TO 40% OFF ON SELECTED CRICKET & FOOTBALL GEAR — USE CODE: SPORT40' },
  { icon: Sparkles, text: 'NEW 2026 INTERNATIONAL SPORTS COLLECTION NOW IN STOCK' },
  { icon: ShieldCheck, text: '100% GENUINE MERCHANDISE GUARANTEED DIRECT FROM CERTIFIED BRANDS' },
];

interface PromoBarProps {
  onOpenCollegeProjectModal?: () => void;
}

export const PromoBar: React.FC<PromoBarProps> = ({ onOpenCollegeProjectModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = PROMO_MESSAGES[currentIndex].icon;

  return (
    <div id="promo-bar" className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-slate-200 text-xs py-2 px-4 border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0 overflow-hidden text-center transition-all duration-500">
          <CurrentIcon className="w-3.5 h-3.5 text-blue-400 shrink-0 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase text-[11px] sm:text-xs text-slate-200">
            {PROMO_MESSAGES[currentIndex].text}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400 font-medium">
          {onOpenCollegeProjectModal && (
            <button
              onClick={onOpenCollegeProjectModal}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>🎓 College Project (SQL & PHP)</span>
            </button>
          )}
          <span>•</span>
          <span className="hover:text-blue-400 cursor-pointer transition-colors">Track Order</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">Live Stock: 50+ Items</span>
        </div>
      </div>
    </div>
  );
};
