import React, { useState, useEffect } from 'react';
import { Search, X, Gem, Globe, Image as ImageIcon, Settings, LayoutDashboard, ArrowRight } from 'lucide-react';
import { Product } from '../../types';

interface AdminCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigateView: (view: any) => void;
  onAddNewProduct: () => void;
}

export const AdminCommandPalette: React.FC<AdminCommandPaletteProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onNavigateView,
  onAddNewProduct
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle or open
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()) ||
      p.metal.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#181615] border border-[#2d2a26] shadow-2xl text-[#fcf9f2] overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-[#262422] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#e9c176] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search specimen, action, page, or SKU..."
            className="w-full bg-transparent text-sm font-jakarta text-white placeholder-[#7a746a] outline-none"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#211f1e] text-[#9c9589] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-4">
          {/* Quick Navigation Pages */}
          {!query && (
            <div>
              <span className="px-3 text-[10px] font-mono-code uppercase tracking-widest text-[#7a746a] font-semibold block mb-2">
                Atelier Consoles
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { view: 'admin-dashboard', label: 'Director Dashboard', icon: LayoutDashboard },
                  { view: 'admin-products', label: 'Objects & Products', icon: Gem },
                  { view: 'admin-homepage-editor', label: 'Homepage Live Editor', icon: Globe },
                  { view: 'admin-media', label: 'Supabase Media S3', icon: ImageIcon },
                  { view: 'admin-profile', label: 'Security & Governance', icon: Settings }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.view}
                      onClick={() => {
                        onNavigateView(item.view);
                        onClose();
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#1f1d1b] hover:bg-[#262320] text-xs font-jakarta text-[#9c9589] hover:text-[#e9c176] transition-colors cursor-pointer text-left"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#e9c176]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matched Products */}
          <div>
            <span className="px-3 text-[10px] font-mono-code uppercase tracking-widest text-[#7a746a] font-semibold block mb-2">
              Sculptural Specimens ({filteredProducts.length})
            </span>

            <div className="space-y-1">
              {filteredProducts.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#24211e] transition-colors cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.primaryImage}
                      alt={prod.title}
                      className="w-9 h-9 rounded-lg object-cover bg-black/40 border border-[#3d3832]"
                    />
                    <div>
                      <p className="text-xs font-medium text-white group-hover:text-[#e9c176] transition-colors font-playfair">
                        {prod.title}
                      </p>
                      <p className="text-[10px] font-mono-code text-[#7a746a]">
                        {prod.sku} · {prod.metal}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono-code text-xs text-[#e9c176] font-bold">
                      ${prod.salePrice || prod.regularPrice}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#7a746a] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}

              {filteredProducts.length === 0 && (
                <p className="text-center py-6 text-xs text-[#7a746a] font-jakarta">
                  No specimen matches "{query}"
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 border-t border-[#262422]">
            <button
              onClick={() => {
                onAddNewProduct();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#24211d] hover:bg-[#302b26] text-xs font-jakarta text-[#e9c176] transition-colors cursor-pointer"
            >
              <span>+ Register New Sculptural Specimen to Catalog</span>
              <span className="font-mono-code text-[10px] text-[#9c9589]">Vault SKU</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#121110] border-t border-[#262422] flex items-center justify-between text-[10px] font-mono-code text-[#6b645b]">
          <span>Navigate with arrows or click</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
