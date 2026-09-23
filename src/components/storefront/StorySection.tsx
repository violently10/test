import React from 'react';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story-section" className="relative w-full py-28 px-4 md:px-10 lg:px-16 bg-[#f5f2ea] border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Narrative Pillar */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebe7dc] border border-black/5 text-[#775a19] font-jakarta text-[10px] font-semibold uppercase tracking-[0.18em] mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Atelier Heritage</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#1c1c18] font-normal tracking-tight leading-[1.15] mb-6">
              Sculpted for eternity, forged for the human form.
            </h2>

            <p className="font-jakarta text-sm sm:text-base text-[#5e584f] font-normal leading-relaxed mb-6">
              Founded between Paris and Zurich, The Q operates as a private sculpture atelier rather than a conventional jeweler. We dispense with delicate ornamentation in favor of monolithic geometry, reflective curvature, and palpable tactile weight.
            </p>

            <p className="font-jakarta text-sm sm:text-base text-[#5e584f] font-normal leading-relaxed mb-8">
              Every curve is calculated using organic ergonomic camber, ensuring that heavy precious metals rest seamlessly against collarbones, wrists, and fingers with zero friction.
            </p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-4 border-t border-black/10">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ebe7dc] flex items-center justify-center text-[#775a19] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-playfair text-base text-[#1c1c18] font-medium mb-1">
                    Certified Metallurgy
                  </h4>
                  <p className="font-jakarta text-xs text-[#5e584f] leading-relaxed">
                    100% RJC-certified recycled 18k yellow gold and anti-tarnish Argentium silver alloys.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ebe7dc] flex items-center justify-center text-[#775a19] shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-playfair text-base text-[#1c1c18] font-medium mb-1">
                    Indefinite Lifespan
                  </h4>
                  <p className="font-jakarta text-xs text-[#5e584f] leading-relaxed">
                    Cast solid with lifetime sanctum repolishing and perpetual structural provenance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Main Atelier Lookbook Image */}
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-[#ebe7dc] shadow-2xl border border-black/5">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP4tFQ1ISoJJst5twV15CzkidNE2RlxOqDS4oSN8_sfgH_eJYCRPLqvRvAc21IEJZCx6foOy8J6T-yh9rDQsiLdvjdSfsF6UOIzk53tIPYtNjK20AUyiSoiTwaW0cDfmG-HVP8-WWINoN4N3kTxQoE90tXuVuWQPwUjTcB-50eZdGCW5a5nUuUzc1b4FtcvX57Q1ykIXhR-Re6xhJdEy3EDLt3RX9-MVQjkk4nKgIoy2ujJcKW37joQw"
                  alt="Artisan at work in The Q Sanctum Atelier"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Overlay Quote Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#fcf9f2]/90 backdrop-blur-xl border border-black/5">
                  <p className="font-playfair italic text-sm text-[#1c1c18]">
                    "Jewelry is small sculpture that lives with you every day."
                  </p>
                  <p className="font-jakarta text-[10px] uppercase tracking-wider text-[#775a19] font-semibold mt-1">
                    Place Vendôme Atelier Sanctum · Paris
                  </p>
                </div>
              </div>

              {/* Decorative accent element */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-28 h-28 rounded-full border border-[#e9c176]/40 -z-10 animate-pulse pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
