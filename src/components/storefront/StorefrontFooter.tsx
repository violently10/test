import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { HomepageConfig } from '../../types';

interface StorefrontFooterProps {
  config: HomepageConfig;
  onEnterSanctum: () => void;
  onSubscribeVip: (email: string) => void;
}

export const StorefrontFooter: React.FC<StorefrontFooterProps> = ({
  config,
  onEnterSanctum,
  onSubscribeVip
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribeVip(email.trim());
      setEmail('');
    }
  };

  return (
    <footer id="footer-vip" className="w-full bg-[#141312] text-[#fcf9f2] pt-20 pb-12 px-4 md:px-10 lg:px-16 border-t border-[#262422]">
      <div className="max-w-7xl mx-auto">
        
        {/* VIP Newsletter Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1b1917] border border-[#2d2a26] mb-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="font-mono-code text-[11px] uppercase tracking-widest text-[#e9c176]">
              Private Allocation
            </span>
            <h3 className="font-playfair text-3xl sm:text-4xl font-normal text-white mt-2 mb-3">
              {config.vipBannerTitle}
            </h3>
            <p className="font-jakarta text-xs sm:text-sm text-[#9c9589] leading-relaxed mb-6 font-normal">
              {config.vipBannerSubtitle}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your confidential email..."
                className="w-full sm:w-80 px-5 py-3.5 rounded-full bg-[#121110] border border-[#3d3832] focus:border-[#e9c176] text-[#fcf9f2] placeholder-[#6b645b] text-xs font-jakarta outline-none transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#e9c176] hover:bg-[#c5a059] text-[#141312] font-jakarta text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Decorative watermark */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 pointer-events-none text-white font-playfair text-9xl">
            Q
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16 text-xs font-jakarta">
          <div>
            <h4 className="font-mono-code text-[11px] uppercase tracking-widest text-[#e9c176] mb-4">
              Atelier
            </h4>
            <ul className="space-y-2.5 text-[#9c9589]">
              <li><a href="#sculptural-exhibit" className="hover:text-white transition-colors">Exhibition 01</a></li>
              <li><a href="#sculptural-exhibit" className="hover:text-white transition-colors">Monolithic Silver</a></li>
              <li><a href="#sculptural-exhibit" className="hover:text-white transition-colors">Solid 18K Gold</a></li>
              <li><a href="#sculptural-exhibit" className="hover:text-white transition-colors">Bespoke Commissions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-code text-[11px] uppercase tracking-widest text-[#e9c176] mb-4">
              Provenance
            </h4>
            <ul className="space-y-2.5 text-[#9c9589]">
              <li><a href="#story-section" className="hover:text-white transition-colors">Foundry & Hallmarks</a></li>
              <li><a href="#story-section" className="hover:text-white transition-colors">RJC Certified Alloys</a></li>
              <li><a href="#story-section" className="hover:text-white transition-colors">Lifetime Care Guarantee</a></li>
              <li><a href="#story-section" className="hover:text-white transition-colors">Certificate Registry</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-code text-[11px] uppercase tracking-widest text-[#e9c176] mb-4">
              Sanctuaries
            </h4>
            <ul className="space-y-2.5 text-[#9c9589]">
              <li className="text-[#9c9589]">Place Vendôme, Paris</li>
              <li className="text-[#9c9589]">Bahnhofstrasse, Zurich</li>
              <li className="text-[#9c9589]">Ginza 6-chome, Tokyo</li>
              <li className="text-[#9c9589]">By Private Appointment</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-code text-[11px] uppercase tracking-widest text-[#e9c176] mb-4">
              Curator Access
            </h4>
            <p className="text-[#9c9589] leading-relaxed mb-4">
              Authorized studio directors, appraisers, and atelier vault personnel.
            </p>
            <button
              onClick={onEnterSanctum}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#24211d] hover:bg-[#332f2a] text-[#e9c176] text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer border border-[#3d3832]"
            >
              <Lock className="w-3 h-3" />
              <span>Enter Sanctum</span>
            </button>
          </div>
        </div>

        {/* Bottom Rights Strip */}
        <div className="pt-8 border-t border-[#24211e] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6b645b] font-jakarta">
          <p>© {new Date().getFullYear()} The Q Haute Sculpture Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>TLS 1.3 Certified Sanctum</span>
            <span>Place Vendôme · Zurich</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
