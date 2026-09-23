import React, { useState } from 'react';
import { ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product, HomepageConfig } from '../../types';

interface CuratedExhibitionSectionProps {
  products: Product[];
  config: HomepageConfig;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CuratedExhibitionSection: React.FC<CuratedExhibitionSectionProps> = ({
  products,
  config,
  onSelectProduct,
  onAddToCart
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'sculptural' | 'silver' | 'gold'>('all');

  const filteredProducts = products.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.collection === selectedFilter;
  });

  return (
    <section id="sculptural-exhibit" className="relative w-full py-24 px-4 md:px-10 lg:px-16 bg-[#fcf9f2] border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        {/* Exhibition Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebe7dc] border border-black/5 text-[#775a19] font-jakarta text-[10px] font-semibold uppercase tracking-[0.18em] mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Exhibition No. 01</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#1c1c18] font-normal tracking-tight">
              {config.exhibitHeadline}
            </h2>
            <p className="font-jakarta text-sm sm:text-base text-[#5e584f] font-normal leading-relaxed mt-4 max-w-xl">
              {config.exhibitSubtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Pieces' },
              { id: 'sculptural', label: 'Sculptural Forms' },
              { id: 'gold', label: 'Solid Gold 18K' },
              { id: 'silver', label: 'Monolithic Silver' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
                className={`px-4 py-2 rounded-full font-jakarta text-[11px] uppercase tracking-[0.14em] transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-[#1c1c18] text-[#fcf9f2] font-semibold shadow-sm'
                    : 'bg-[#ebe7dc]/60 hover:bg-[#ebe7dc] text-[#5e584f]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mosaic Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isLowStock = product.stockStatus === 'low_stock' || product.stock <= 3;
            const isPreorder = product.stockStatus === 'preorder';

            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between rounded-3xl bg-[#f5f2ea]/60 hover:bg-[#f5f2ea] border border-black/5 p-6 transition-all duration-500 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]"
              >
                {/* Specimen Header & Status Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-code text-[11px] text-[#7a746a] tracking-wider uppercase">
                    {product.sku}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {product.featured && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e9c176]/20 text-[#775a19] text-[10px] font-semibold uppercase tracking-wider font-jakarta">
                        Curated
                      </span>
                    )}
                    {isLowStock && (
                      <span className="px-2.5 py-0.5 rounded-full bg-red-100/70 text-red-700 text-[10px] font-semibold uppercase tracking-wider font-jakarta">
                        {product.stock} Left
                      </span>
                    )}
                    {isPreorder && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100/70 text-amber-800 text-[10px] font-semibold uppercase tracking-wider font-jakarta">
                        Pre-Order
                      </span>
                    )}
                  </div>
                </div>

                {/* Imagery Presentation Area */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#ebe7dc]/50 mb-6 cursor-pointer"
                >
                  <img
                    src={product.primaryImage}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.secondaryImage && (
                    <img
                      src={product.secondaryImage}
                      alt={`${product.title} perspective`}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  )}

                  {/* Hover Quick View Overlay Button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="px-5 py-2.5 rounded-full bg-white/95 text-[#1c1c18] font-jakarta text-xs uppercase tracking-wider font-medium shadow-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-[#775a19]" />
                      <span>Inspect Specimen</span>
                    </span>
                  </div>
                </div>

                {/* Details & Specifications */}
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-playfair text-xl text-[#1c1c18] font-medium hover:text-[#775a19] transition-colors cursor-pointer"
                    >
                      {product.title}
                    </h3>

                    <div className="flex items-baseline gap-1.5">
                      {product.salePrice && (
                        <span className="text-xs text-[#5e584f] line-through font-mono-code">
                          ${product.regularPrice}
                        </span>
                      )}
                      <span className="font-mono-code text-base font-bold text-[#1c1c18]">
                        ${product.salePrice || product.regularPrice}
                      </span>
                    </div>
                  </div>

                  <p className="font-jakarta text-xs text-[#7a746a] tracking-wide mb-3">
                    {product.metal}
                  </p>

                  <p className="font-jakarta text-xs text-[#5e584f] line-clamp-2 leading-relaxed mb-6 font-normal">
                    {product.narrative}
                  </p>
                </div>

                {/* Card Bottom CTA Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-black/5 mt-auto">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 py-3 px-4 rounded-full bg-[#1c1c18] hover:bg-[#775a19] text-[#fcf9f2] font-jakarta text-xs uppercase tracking-[0.14em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Acquire</span>
                  </button>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-11 h-11 rounded-full bg-[#ebe7dc] hover:bg-[#e2ded3] flex items-center justify-center text-[#1c1c18] transition-colors cursor-pointer"
                    title="View Full Provenance & Specifications"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
