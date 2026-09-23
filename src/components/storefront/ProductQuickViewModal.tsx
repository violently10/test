import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Scale, Ruler, Check } from 'lucide-react';
import { Product } from '../../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [hasAdded, setHasAdded] = useState(false);

  if (!product) return null;

  const allImages = [
    product.primaryImage,
    product.secondaryImage,
    ...(product.galleryImages || [])
  ].filter(Boolean);

  const handleAdd = () => {
    onAddToCart(product);
    setHasAdded(true);
    setTimeout(() => setHasAdded(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl rounded-3xl bg-[#fcf9f2] text-[#1c1c18] border border-black/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1c1c18] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Imagery Gallery */}
        <div className="md:w-1/2 p-6 bg-[#f5f2ea] flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/60 shadow-inner mb-4">
            <img
              src={allImages[activeImageIdx] || product.primaryImage}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIdx === idx ? 'border-[#775a19] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Specimen Dossier & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-code text-xs text-[#7a746a] tracking-widest uppercase">
                {product.sku}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ebe7dc] text-[#775a19] text-[10px] font-semibold uppercase tracking-wider font-jakarta">
                {product.collectionName}
              </span>
            </div>

            <h2 className="font-playfair text-2xl sm:text-3xl text-[#1c1c18] font-normal tracking-tight mb-2">
              {product.title}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-4">
              {product.salePrice && (
                <span className="font-mono-code text-sm text-[#7a746a] line-through">
                  ${product.regularPrice} USD
                </span>
              )}
              <span className="font-mono-code text-2xl font-bold text-[#1c1c18]">
                ${product.salePrice || product.regularPrice} USD
              </span>
              <span className="text-xs text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-full font-jakarta font-medium">
                {product.stockStatus === 'in_stock' ? 'In Vault · Immediate Release' : 'Made to Order · 14 Days'}
              </span>
            </div>

            {/* Narrative */}
            <p className="font-jakarta text-xs sm:text-sm text-[#5e584f] font-normal leading-relaxed mb-6">
              {product.narrative}
            </p>

            {/* Specimen Ledger Attributes */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-[#f5f2ea] border border-black/5 text-xs font-jakarta mb-6">
              <div className="flex items-center justify-between">
                <span className="text-[#7a746a] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#775a19]" />
                  <span>Purity & Alloy:</span>
                </span>
                <span className="font-medium text-[#1c1c18]">{product.metal}</span>
              </div>

              {product.weight && (
                <div className="flex items-center justify-between">
                  <span className="text-[#7a746a] flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#775a19]" />
                    <span>Calculated Mass:</span>
                  </span>
                  <span className="font-mono-code text-[#1c1c18]">{product.weight}</span>
                </div>
              )}

              {product.dimensions && (
                <div className="flex items-center justify-between">
                  <span className="text-[#7a746a] flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#775a19]" />
                    <span>Proportions:</span>
                  </span>
                  <span className="font-mono-code text-[#1c1c18]">{product.dimensions}</span>
                </div>
              )}

              {product.provenanceCert && (
                <div className="flex items-center justify-between pt-2 border-t border-black/5">
                  <span className="text-[#7a746a]">Provenance:</span>
                  <span className="font-mono-code text-[11px] text-[#775a19] font-medium">{product.provenanceCert}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAdd}
              className="w-full py-3.5 px-6 rounded-full bg-[#1c1c18] hover:bg-[#775a19] text-[#fcf9f2] font-jakarta text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {hasAdded ? (
                <>
                  <Check className="w-4 h-4 text-[#e9c176]" />
                  <span>Specimen Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Specimen</span>
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-[#7a746a] font-jakarta">
              Complimentary armored insured courier dispatch worldwide. 30-day returns.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
