import React from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { CartItem } from '../../types';

interface StorefrontHeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onEnterSanctum: () => void;
  isAuthenticated: boolean;
  onNavigateSection: (sectionId: string) => void;
}

export const StorefrontHeader: React.FC<StorefrontHeaderProps> = ({
  cart,
  onOpenCart,
  onEnterSanctum,
  isAuthenticated,
  onNavigateSection
}) => {
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 px-4 md:px-10 lg:px-16 pt-5 transition-all duration-300">
      <div className="h-16 md:h-20 w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between rounded-full bg-[#fcf9f2]/80 backdrop-blur-xl border border-black/5 shadow-[0_2px_14px_rgba(0,0,0,0.03)]">
        {/* Brand Logo & Name */}
        <button
          onClick={() => onNavigateSection('hero-section')}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-7 h-7 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
            <svg className="w-6 h-6 text-[#1c1c18]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line strokeWidth="1.75" x1="16" x2="21" y1="16" y2="21" />
              <circle cx="11" cy="11" fill="currentColor" r="2.5" stroke="none" />
            </svg>
          </div>
          <span className="font-playfair text-xl tracking-tight text-[#1c1c18] font-medium ml-0.5">
            The Q
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigateSection('sculptural-exhibit')}
            className="font-jakarta text-[11px] uppercase tracking-[0.16em] text-[#4b4640] hover:text-[#1c1c18] transition-colors cursor-pointer font-medium"
          >
            Collections
          </button>
          <button
            onClick={() => onNavigateSection('sculptural-exhibit')}
            className="font-jakarta text-[11px] uppercase tracking-[0.16em] text-[#4b4640] hover:text-[#1c1c18] transition-colors cursor-pointer font-medium"
          >
            Objects
          </button>
          <button
            onClick={() => onNavigateSection('story-section')}
            className="font-jakarta text-[11px] uppercase tracking-[0.16em] text-[#4b4640] hover:text-[#1c1c18] transition-colors cursor-pointer font-medium"
          >
            Story
          </button>
          <button
            onClick={() => onNavigateSection('footer-vip')}
            className="font-jakarta text-[11px] uppercase tracking-[0.16em] text-[#4b4640] hover:text-[#1c1c18] transition-colors cursor-pointer font-medium"
          >
            Contact
          </button>
        </nav>

        {/* Action Group */}
        <div className="flex items-center gap-3">
          {/* Shop Collection Button */}
          <button
            onClick={() => onNavigateSection('sculptural-exhibit')}
            className="hidden sm:inline-flex px-6 py-2.5 rounded-full bg-[#121110] text-[#fcf9f2] font-jakarta text-[11px] uppercase tracking-[0.16em] hover:bg-[#775a19] transition-all duration-300 shadow-sm cursor-pointer"
          >
            Shop Collection
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative w-9 h-9 rounded-full bg-[#f1eee7] hover:bg-[#ebe8e1] flex items-center justify-center text-[#1c1c18] transition-colors cursor-pointer"
            title="Open Acquisition Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#775a19] text-white text-[10px] font-mono flex items-center justify-center font-bold animate-fade-in">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Atelier Sanctum / Studio Access Button */}
          <button
            onClick={onEnterSanctum}
            className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-[#121110] text-[#fcf9f2] hover:bg-[#775a19] transition-colors cursor-pointer shadow-sm group"
            title={isAuthenticated ? 'Open Atelier Director Console' : 'Curator Login (Atelier Sanctum)'}
          >
            <div className="w-7 h-7 rounded-full bg-[#211f1e] flex items-center justify-center text-[#e9c176]">
              <span className="material-symbols-outlined text-[16px]">
                {isAuthenticated ? 'admin_panel_settings' : 'lock'}
              </span>
            </div>
            <span className="font-jakarta text-[10px] uppercase tracking-[0.14em] font-medium hidden sm:inline-block">
              {isAuthenticated ? 'Studio' : 'Sanctum'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
