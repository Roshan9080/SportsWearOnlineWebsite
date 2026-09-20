import React, { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section id="newsletter-section" className="py-16 bg-gradient-to-r from-blue-950/40 via-slate-900 to-blue-950/40 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-4">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3">
          STAY IN THE GAME
        </h2>

        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
          Subscribe to receive updates about new pro arrivals, match day drops, flash discounts, and member-only coupons.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm">
            <Check className="w-4 h-4" />
            <span>Thank you for subscribing! Welcome to Team SportZone.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full sm:w-80 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              id="btn-subscribe"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>SUBSCRIBE</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-slate-400 mt-4">
          No spam, ever. Unsubscribe anytime with one click.
        </p>
      </div>
    </section>
  );
};
