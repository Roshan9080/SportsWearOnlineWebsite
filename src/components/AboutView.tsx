import React from 'react';
import { ShieldCheck, Target, Eye, HeartHandshake, Trophy, Users, Award } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div id="about-view" className="py-16 bg-[#0A0E17] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-2">
            The Story Behind SportZone
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            GEAR UP. PLAY HARD. WIN MORE.
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Founded with an unyielding passion for competitive athletics, SportZone started as a university sports initiative and has evolved into a dedicated online destination for athletes, tournament teams, and fitness enthusiasts.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-3">
                OUR MISSION
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                To empower every athlete—from aspiring school players to seasoned tournament professionals—with 100% genuine, performance-tested equipment and apparel from the world's most trusted sports manufacturers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-blue-400 font-bold">
              Authenticity Guaranteed • Direct Authorized Distribution
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-3">
                OUR VISION
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                To become India's premier multi-sport platform where players, coaches, and sports clubs can access cutting-edge gear, expert sizing assistance, and tournament equipment seamlessly at fair prices.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-emerald-400 font-bold">
              National Reach • Grassroots to Professional Leagues
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/30 via-slate-900 to-indigo-950/30 border border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              OUR CORE VALUES
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Guiding principles behind every piece of sports gear we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <ShieldCheck className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-extrabold text-white text-sm uppercase">100% Genuine</h3>
              <p className="text-slate-400 text-xs mt-1">Zero tolerance for counterfeit equipment or replica items.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <HeartHandshake className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-extrabold text-white text-sm uppercase">Athlete First</h3>
              <p className="text-slate-400 text-xs mt-1">Dedicated customer support for sizing, knocking, and racket stringing.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="font-extrabold text-white text-sm uppercase">Sportsmanship</h3>
              <p className="text-slate-400 text-xs mt-1">Supporting university teams, collegiate leagues, and local sports clubs.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-extrabold text-white text-sm uppercase">Match Standards</h3>
              <p className="text-slate-400 text-xs mt-1">Gear complying with ICC, FIFA, BWF, and ITF match standards.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
