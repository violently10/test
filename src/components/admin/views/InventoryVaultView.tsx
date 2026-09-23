import React, { useState } from 'react';
import { Layers, ShieldCheck, MapPin, Scale, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { Product } from '../../../types';

interface InventoryVaultViewProps {
  products: Product[];
  onShowToast: (msg: string, icon?: string) => void;
}

export const InventoryVaultView: React.FC<InventoryVaultViewProps> = ({
  products,
  onShowToast
}) => {
  const [activeTransferModal, setActiveTransferModal] = useState(false);
  const [selectedVault, setSelectedVault] = useState('Paris');

  const totalVaultUnits = products.reduce((acc, p) => acc + p.stock, 0);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTransferModal(false);
    onShowToast(`Armored courier transfer manifest generated for ${selectedVault} vault.`, 'local_shipping');
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#fcf9f2]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono-code text-[11px] text-[#e9c176] uppercase tracking-widest">
              Physical Sanctum Vaults
            </span>
            <span className="text-[#3d3832]">/</span>
            <span className="font-mono-code text-[11px] text-[#7a746a]">
              Triple Node Redundancy
            </span>
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-normal text-white">
            Precious Bullion & Vault Allocation
          </h1>
          <p className="font-jakarta text-xs text-[#9c9589] mt-0.5">
            Physical bullion weights, safe deposit ledgers, and bonded armored logistics.
          </p>
        </div>

        <button
          onClick={() => setActiveTransferModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e9c176] hover:bg-[#c5a059] text-[#141312] text-xs font-jakarta font-semibold transition-colors cursor-pointer shadow-sm"
        >
          <Scale className="w-4 h-4" />
          <span>Dispatch Armored Transfer</span>
        </button>
      </div>

      {/* Bullion Reserve Meters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#181615] border border-[#262422] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-jakarta text-[#9c9589]">Solid 18K Honey Gold</span>
            <span className="px-2 py-0.5 rounded bg-[#24211d] text-[#e9c176] font-mono-code text-[10px]">
              AU 750
            </span>
          </div>
          <div className="font-mono-code text-3xl font-bold text-white">
            14.820 <span className="text-sm font-normal text-[#7a746a]">kg</span>
          </div>
          <p className="text-[11px] font-jakarta text-[#7a746a]">
            100% RJC Fairmined certified granular casting grain. Insured with Lloyd’s.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#181615] border border-[#262422] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-jakarta text-[#9c9589]">Argentium 935 Silver</span>
            <span className="px-2 py-0.5 rounded bg-[#24211d] text-[#a8a196] font-mono-code text-[10px]">
              AG 935
            </span>
          </div>
          <div className="font-mono-code text-3xl font-bold text-white">
            22.450 <span className="text-sm font-normal text-[#7a746a]">kg</span>
          </div>
          <p className="text-[11px] font-jakarta text-[#7a746a]">
            High-purity anti-tarnish germanium alloy for monolithic cuffs & chokers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#181615] border border-[#262422] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-jakarta text-[#9c9589]">Satin Platinum 950</span>
            <span className="px-2 py-0.5 rounded bg-[#24211d] text-[#e9c176] font-mono-code text-[10px]">
              PT 950
            </span>
          </div>
          <div className="font-mono-code text-3xl font-bold text-white">
            6.210 <span className="text-sm font-normal text-[#7a746a]">kg</span>
          </div>
          <p className="text-[11px] font-jakarta text-[#7a746a]">
            Dense noble metal reserved for droplet pendants and bespoke commissions.
          </p>
        </div>
      </div>

      {/* Tri-Sanctuary Distribution Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            city: 'Paris',
            name: 'Place Vendôme Vault #01',
            status: 'Operational · Armored Tier-5',
            specimens: Math.ceil(totalVaultUnits * 0.45),
            valuation: '$74,200 USD',
            temp: '19.2°C · 42% Humidity'
          },
          {
            city: 'Zurich',
            name: 'Bahnhofstrasse Sanctum #04',
            status: 'Operational · Deep Subterranean',
            specimens: Math.ceil(totalVaultUnits * 0.35),
            valuation: '$52,100 USD',
            temp: '18.4°C · 38% Humidity'
          },
          {
            city: 'Tokyo',
            name: 'Ginza Sanctuary #09',
            status: 'Operational · Private Salon',
            specimens: Math.floor(totalVaultUnits * 0.20),
            valuation: '$22,620 USD',
            temp: '20.1°C · 40% Humidity'
          }
        ].map((vault) => (
          <div key={vault.city} className="p-6 rounded-2xl bg-[#181615] border border-[#262422] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#e9c176]" />
                <h3 className="font-playfair text-lg text-white font-medium">{vault.city}</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 text-[10px] font-mono-code border border-emerald-800">
                ACTIVE
              </span>
            </div>

            <p className="text-xs font-jakarta text-[#a8a196]">{vault.name}</p>

            <div className="space-y-2 pt-2 border-t border-[#262422] text-xs font-jakarta">
              <div className="flex justify-between">
                <span className="text-[#7a746a]">Allocated Specimens:</span>
                <span className="font-mono-code text-white font-bold">{vault.specimens} Units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a746a]">Vault Valuation:</span>
                <span className="font-mono-code text-[#e9c176]">{vault.valuation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a746a]">Atmospheric Sensors:</span>
                <span className="font-mono-code text-[#7a746a]">{vault.temp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Armored Transfer Modal */}
      {activeTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#181615] border border-[#3d3832] p-6 text-[#fcf9f2] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-playfair text-lg text-white font-medium">
                Dispatch Armored Vault Courier
              </h3>
              <button
                onClick={() => setActiveTransferModal(false)}
                className="text-[#7a746a] hover:text-white cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleTransfer} className="space-y-4 text-xs font-jakarta">
              <div>
                <label className="block text-[#9c9589] mb-1">Destination Sanctuary</label>
                <select
                  value={selectedVault}
                  onChange={(e) => setSelectedVault(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-white outline-none cursor-pointer"
                >
                  <option value="Paris">Place Vendôme, Paris</option>
                  <option value="Zurich">Bahnhofstrasse, Zurich</option>
                  <option value="Tokyo">Ginza 6-chome, Tokyo</option>
                </select>
              </div>

              <div>
                <label className="block text-[#9c9589] mb-1">Specimen Allocation</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-white outline-none cursor-pointer">
                  {products.map((p) => (
                    <option key={p.id}>
                      {p.title} ({p.sku}) — {p.metal}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-[#7a746a] text-[11px] leading-relaxed">
                Transfers are protected under $2,000,000 USD Brink’s global bullion transit escrow.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTransferModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#211f1e] text-[#9c9589] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#e9c176] hover:bg-[#c5a059] text-[#141312] font-semibold cursor-pointer"
                >
                  Authorize Manifest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
