import React from 'react';
import {
  Zap,
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  FileCode2
} from 'lucide-react';
import { SportType } from '../types';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onSelectSport: (sport: SportType) => void;
  onOpenCollegeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectSport,
  onOpenCollegeModal,
}) => {
  return (
    <footer id="main-footer" className="bg-[#070b14] text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* COL 1 & 2: BRAND & ABOUT */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-400 text-white shadow-lg shadow-blue-500/25">
                <Zap className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-white tracking-tight">
                  SPORT<span className="text-blue-500">ZONE</span>
                </div>
                <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                  Gear Up. Play Hard. Win More.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-6">
              SportZone is an online sports equipment and sportswear platform designed to help athletes and sports enthusiasts find quality products from multiple brands. Handcrafted for college sports clubs, competitive tournaments, and elite athletes.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenCollegeModal}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-950/70 hover:bg-blue-900/60 border border-blue-600/40 text-blue-300 text-xs font-semibold transition-all shadow-sm"
              >
                <FileCode2 className="w-4 h-4 text-blue-400" />
                <span>Download XAMPP PHP & MySQL Files</span>
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a href="#social" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#social" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#social" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="Twitter/X">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#social" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COL 3: QUICK LINKS & CUSTOMER SERVICE */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-blue-400 transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sports')} className="hover:text-blue-400 transition-colors">
                  Shop by Sports
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('brands')} className="hover:text-blue-400 transition-colors">
                  Brand Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="hover:text-blue-400 transition-colors">
                  Special Offers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">
                  About SportZone
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* COL 4: SPORTS CATEGORIES */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">
              SPORTS CATEGORIES
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {(['Cricket', 'Football', 'Badminton', 'Tennis', 'Fitness', 'Sportswear'] as SportType[]).map((sport) => (
                <li key={sport}>
                  <button
                    onClick={() => {
                      onSelectSport(sport);
                      onNavigate('products');
                    }}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {sport} Gear
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 5: CONTACT & TIMINGS */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">
              GET IN TOUCH
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>SportZone Sports Hub, Stadium Road, Bangalore, Karnataka 560001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91 (080) 4567-8900</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@sportzone.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 SportZone. All Rights Reserved. Full-Stack Web Development Project.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Return Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
