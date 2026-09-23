import React from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types';

interface CartSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartSlideOver: React.FC<CartSlideOverProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.regularPrice;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcf9f2] text-[#1c1c18] shadow-2xl border-l border-black/10 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-black/5 flex items-center justify-between">
            <div>
              <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#775a19]">
                Sanctum Ledger
              </span>
              <h3 className="font-playfair text-xl text-[#1c1c18] font-medium">
                Acquisition Bag ({cart.reduce((a, c) => a + c.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f1eee7] hover:bg-[#ebe8e1] flex items-center justify-center text-[#1c1c18] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body: Items or Empty */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#f1eee7] flex items-center justify-center text-[#7a746a] mb-4">
                  <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                </div>
                <h4 className="font-playfair text-lg text-[#1c1c18] font-medium mb-1">
                  Your bag is currently empty
                </h4>
                <p className="font-jakarta text-xs text-[#7a746a] max-w-xs mb-6">
                  Explore our Exhibition No. 01 and select a sculptural specimen to acquire.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#1c1c18] text-[#fcf9f2] font-jakarta text-xs uppercase tracking-wider hover:bg-[#775a19] transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const price = item.product.salePrice || item.product.regularPrice;
                return (
                  <div
                    key={item.product.id}
                    className="p-4 rounded-2xl bg-[#f5f2ea] border border-black/5 flex gap-4 items-center"
                  >
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-xl object-cover bg-white shrink-0 shadow-inner"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-playfair text-sm text-[#1c1c18] font-medium truncate">
                        {item.product.title}
                      </h4>
                      <p className="font-jakarta text-[11px] text-[#7a746a] truncate">
                        {item.product.metal}
                      </p>
                      <span className="font-mono-code text-xs font-bold text-[#1c1c18]">
                        ${price} USD
                      </span>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#7a746a] hover:text-red-700 transition-colors p-1 cursor-pointer"
                        title="Remove specimen"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-white/80 rounded-full px-2 py-0.5 border border-black/10">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="text-[#1c1c18] hover:text-[#775a19] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono-code text-xs px-1 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-[#1c1c18] hover:text-[#775a19] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer: Summary & Dispatch */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-black/5 bg-[#f5f2ea]/60 space-y-4">
              <div className="space-y-1.5 text-xs font-jakarta">
                <div className="flex justify-between text-[#7a746a]">
                  <span>Subtotal</span>
                  <span className="font-mono-code text-[#1c1c18] font-medium">${subtotal} USD</span>
                </div>
                <div className="flex justify-between text-[#7a746a]">
                  <span>Armored Insured Courier</span>
                  <span className="text-emerald-800 font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#1c1c18] text-sm pt-2 border-t border-black/10 font-bold font-playfair">
                  <span>Total Due</span>
                  <span className="font-mono-code">${subtotal} USD</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-[#7a746a] font-jakarta">
                <ShieldCheck className="w-3.5 h-3.5 text-[#775a19] shrink-0" />
                <span>Encrypted checkout via Swiss bullion escrow. Certificate included.</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 px-6 rounded-full bg-[#1c1c18] hover:bg-[#775a19] text-[#fcf9f2] font-jakarta text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Secure Allocation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
