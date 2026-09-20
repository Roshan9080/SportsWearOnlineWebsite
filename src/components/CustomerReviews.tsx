import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data/sportsData';

export const CustomerReviews: React.FC = () => {
  return (
    <section id="customer-reviews" className="py-16 sm:py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-block text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-2">
              Athlete Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              CUSTOMER REVIEWS
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-3 sm:mt-0 text-amber-400 font-bold text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-white">4.9 / 5.0</span>
            <span className="text-slate-400 font-normal text-xs">(1,240+ Verified Athletes)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_REVIEWS.map((review) => (
            <div
              key={review.id}
              id={`review-card-${review.id}`}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-700" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-4">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{review.userName}</span>
                    <span title="Verified Buyer">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">Verified Sports Buyer</span>
                </div>
                <span className="text-[10px] text-slate-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
