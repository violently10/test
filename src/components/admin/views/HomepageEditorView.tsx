import React, { useState } from 'react';
import {
  Save,
  Monitor,
  Smartphone,
  Eye,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { HomepageConfig, Product } from '../../../types';

interface HomepageEditorViewProps {
  config: HomepageConfig;
  products: Product[];
  onSaveConfig: (updated: Partial<HomepageConfig>) => void;
  onPublishStorefront: () => void;
  onViewLiveStore: () => void;
}

export const HomepageEditorView: React.FC<HomepageEditorViewProps> = ({
  config,
  products,
  onSaveConfig,
  onPublishStorefront,
  onViewLiveStore
}) => {
  // Local editable draft state
  const [draft, setDraft] = useState<HomepageConfig>(config);
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [openSection, setOpenSection] = useState<'hero' | 'exhibit' | 'pills' | 'vip'>('hero');
  const [newPillText, setNewPillText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleUpdate = (patch: Partial<HomepageConfig>) => {
    const updated = { ...draft, ...patch };
    setDraft(updated);
    onSaveConfig(patch);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleAddPill = () => {
    if (newPillText.trim()) {
      const nextPills = [...draft.floatingPills, newPillText.trim()];
      handleUpdate({ floatingPills: nextPills });
      setNewPillText('');
    }
  };

  const handleRemovePill = (idx: number) => {
    const nextPills = draft.floatingPills.filter((_, i) => i !== idx);
    handleUpdate({ floatingPills: nextPills });
  };

  const keyPieceProduct = products.find((p) => p.sku === draft.keyPieceSku) || products[0];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto text-[#fcf9f2]">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono-code text-[11px] text-[#e9c176] uppercase tracking-widest">
              Storefront CMS Mirror
            </span>
            <span className="text-[#3d3832]">/</span>
            <span className="font-mono-code text-[11px] text-[#7a746a]">
              Bidirectional Sync
            </span>
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-normal text-white">
            Homepage Live Content & Sections
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onViewLiveStore}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1f1d1b] hover:bg-[#292623] text-white text-xs font-jakarta border border-[#2d2a26] transition-colors cursor-pointer"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#e9c176]" />
          </button>

          <button
            onClick={() => {
              onPublishStorefront();
              setIsSaved(true);
              setTimeout(() => setIsSaved(false), 2000);
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#e9c176] hover:bg-[#c5a059] text-[#141312] text-xs font-jakarta font-semibold transition-colors cursor-pointer shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      {/* Split View Container: Left Controls, Right Mirror */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: CMS Control Accordions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Section 1: Hero Cinematic Showcase */}
          <div className="rounded-2xl bg-[#181615] border border-[#262422] overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === 'hero' ? ('' as any) : 'hero')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#1f1d1b] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#24211d] text-[#e9c176] flex items-center justify-center font-mono-code text-xs">
                  01
                </span>
                <span className="font-playfair text-sm text-white font-medium">
                  Hero Cinematic Showcase
                </span>
              </div>
              {openSection === 'hero' ? <ChevronUp className="w-4 h-4 text-[#7a746a]" /> : <ChevronDown className="w-4 h-4 text-[#7a746a]" />}
            </button>

            {openSection === 'hero' && (
              <div className="p-4 pt-0 space-y-4 text-xs font-jakarta border-t border-[#262422]">
                <div>
                  <label className="block text-[#9c9589] mb-1">Display Headline</label>
                  <input
                    type="text"
                    value={draft.heroHeadline}
                    onChange={(e) => handleUpdate({ heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-white outline-none focus:border-[#e9c176] font-playfair text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#9c9589] mb-1">Narrative Subtitle</label>
                  <textarea
                    rows={3}
                    value={draft.heroSubtitle}
                    onChange={(e) => handleUpdate({ heroSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-white outline-none focus:border-[#e9c176] resize-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#9c9589] mb-1">Primary CTA Text</label>
                    <input
                      type="text"
                      value={draft.heroPrimaryCtaLabel}
                      onChange={(e) => handleUpdate({ heroPrimaryCtaLabel: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#9c9589] mb-1">Secondary CTA Text</label>
                    <input
                      type="text"
                      value={draft.heroSecondaryCtaLabel}
                      onChange={(e) => handleUpdate({ heroSecondaryCtaLabel: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-white outline-none"
                    />
                  </div>
                </div>

                {/* Key Piece Selector */}
                <div>
                  <label className="block text-[#9c9589] mb-1">Hero Key Piece Specimen</label>
                  <select
                    value={draft.keyPieceSku}
                    onChange={(e) => handleUpdate({ keyPieceSku: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-[#e9c176] outline-none cursor-pointer font-mono-code"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.sku}>
                        {p.title} ({p.sku}) — ${p.salePrice || p.regularPrice}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Video Media URL */}
                <div>
                  <label className="block text-[#9c9589] mb-1">Background Ambient Video (MP4)</label>
                  <input
                    type="url"
                    value={draft.heroVideoUrl}
                    onChange={(e) => handleUpdate({ heroVideoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-[#7a746a] outline-none font-mono-code text-[11px]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Floating Attribute Pills */}
          <div className="rounded-2xl bg-[#181615] border border-[#262422] overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === 'pills' ? ('' as any) : 'pills')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#1f1d1b] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#24211d] text-[#e9c176] flex items-center justify-center font-mono-code text-xs">
                  02
                </span>
                <span className="font-playfair text-sm text-white font-medium">
                  Floating Feature Badges ({draft.floatingPills.length})
                </span>
              </div>
              {openSection === 'pills' ? <ChevronUp className="w-4 h-4 text-[#7a746a]" /> : <ChevronDown className="w-4 h-4 text-[#7a746a]" />}
            </button>

            {openSection === 'pills' && (
              <div className="p-4 pt-0 space-y-3 text-xs font-jakarta border-t border-[#262422]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPillText}
                    onChange={(e) => setNewPillText(e.target.value)}
                    placeholder="New attribute (e.g. Sculptural Cast)..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddPill}
                    className="px-3.5 py-2 rounded-xl bg-[#24211d] hover:bg-[#332f2a] text-[#e9c176] font-medium border border-[#3d3832] cursor-pointer"
                  >
                    + Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {draft.floatingPills.map((pill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f1d1b] border border-[#2d2a26] text-white text-xs"
                    >
                      <span>{pill}</span>
                      <button
                        onClick={() => handleRemovePill(idx)}
                        className="text-[#7a746a] hover:text-red-400 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Exhibition Showcase */}
          <div className="rounded-2xl bg-[#181615] border border-[#262422] overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === 'exhibit' ? ('' as any) : 'exhibit')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#1f1d1b] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#24211d] text-[#e9c176] flex items-center justify-center font-mono-code text-xs">
                  03
                </span>
                <span className="font-playfair text-sm text-white font-medium">
                  Curated Exhibition Showcase
                </span>
              </div>
              {openSection === 'exhibit' ? <ChevronUp className="w-4 h-4 text-[#7a746a]" /> : <ChevronDown className="w-4 h-4 text-[#7a746a]" />}
            </button>

            {openSection === 'exhibit' && (
              <div className="p-4 pt-0 space-y-4 text-xs font-jakarta border-t border-[#262422]">
                <div>
                  <label className="block text-[#9c9589] mb-1">Exhibition Title</label>
                  <input
                    type="text"
                    value={draft.exhibitHeadline}
                    onChange={(e) => handleUpdate({ exhibitHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-white outline-none focus:border-[#e9c176] font-playfair"
                  />
                </div>

                <div>
                  <label className="block text-[#9c9589] mb-1">Exhibition Curatorial Statement</label>
                  <textarea
                    rows={2}
                    value={draft.exhibitSubtitle}
                    onChange={(e) => handleUpdate({ exhibitSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-white outline-none focus:border-[#e9c176] resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 4: VIP Allocation & Newsletter */}
          <div className="rounded-2xl bg-[#181615] border border-[#262422] overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === 'vip' ? ('' as any) : 'vip')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#1f1d1b] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#24211d] text-[#e9c176] flex items-center justify-center font-mono-code text-xs">
                  04
                </span>
                <span className="font-playfair text-sm text-white font-medium">
                  Private Allocation & Footer
                </span>
              </div>
              {openSection === 'vip' ? <ChevronUp className="w-4 h-4 text-[#7a746a]" /> : <ChevronDown className="w-4 h-4 text-[#7a746a]" />}
            </button>

            {openSection === 'vip' && (
              <div className="p-4 pt-0 space-y-4 text-xs font-jakarta border-t border-[#262422]">
                <div>
                  <label className="block text-[#9c9589] mb-1">VIP Banner Title</label>
                  <input
                    type="text"
                    value={draft.vipBannerTitle}
                    onChange={(e) => handleUpdate({ vipBannerTitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#9c9589] mb-1">VIP Subtitle</label>
                  <textarea
                    rows={2}
                    value={draft.vipBannerSubtitle}
                    onChange={(e) => handleUpdate({ vipBannerSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-white outline-none resize-none"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: LIVE MIRROR PREVIEW FRAME (7 cols) */}
        <div className="lg:col-span-7 sticky top-24 space-y-3">
          
          {/* Mirror Header & Device Selector */}
          <div className="p-3 rounded-2xl bg-[#181615] border border-[#262422] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono-code text-xs text-[#a8a196]">
                LIVE STOREFRONT MIRROR
              </span>
            </div>

            <div className="flex items-center gap-1 bg-[#1f1d1b] p-1 rounded-xl border border-[#2d2a26]">
              <button
                onClick={() => setActiveDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-jakarta transition-colors cursor-pointer ${
                  activeDevice === 'desktop' ? 'bg-[#2b2723] text-[#e9c176] font-semibold' : 'text-[#7a746a] hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop (1440px)</span>
              </button>

              <button
                onClick={() => setActiveDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-jakarta transition-colors cursor-pointer ${
                  activeDevice === 'mobile' ? 'bg-[#2b2723] text-[#e9c176] font-semibold' : 'text-[#7a746a] hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (375px)</span>
              </button>
            </div>
          </div>

          {/* Live Mirror Frame Container */}
          <div
            className={`mx-auto rounded-3xl overflow-hidden border border-[#3d3832] shadow-2xl transition-all duration-300 bg-[#fcf9f2] text-[#1c1c18] ${
              activeDevice === 'mobile' ? 'max-w-[375px] h-[720px]' : 'w-full h-[620px]'
            } flex flex-col overflow-y-auto`}
          >
            {/* Mirror Mini-Header */}
            <div className="p-4 border-b border-black/5 bg-[#fcf9f2]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
              <span className="font-playfair text-lg font-medium">The Q</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#121110] text-[#fcf9f2] text-[9px] uppercase font-jakarta">
                  Shop Collection
                </span>
              </div>
            </div>

            {/* Mirror Hero Viewport */}
            <div className="relative p-6 bg-gradient-to-b from-[#fcf9f2] to-[#f5f2ea] flex-1 flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ebe7dc] text-[#5e584f] text-[9px] uppercase tracking-wider inline-block mb-3">
                  Edition 01 / Autumn-Winter
                </span>
                
                <h2 className="font-playfair text-2xl font-normal leading-snug mb-3">
                  {draft.heroHeadline}
                </h2>

                <p className="font-jakarta text-xs text-[#5e584f] leading-relaxed mb-4">
                  {draft.heroSubtitle}
                </p>

                <div className="flex gap-2">
                  <span className="px-4 py-2 rounded-full bg-[#1c1c18] text-[#fcf9f2] text-[10px] uppercase font-jakarta">
                    {draft.heroPrimaryCtaLabel}
                  </span>
                  <span className="px-3 py-2 rounded-full border border-black/15 text-[10px] uppercase font-jakarta">
                    {draft.heroSecondaryCtaLabel}
                  </span>
                </div>
              </div>

              {/* Floating Key Piece Mirror Card */}
              {keyPieceProduct && (
                <div className="p-3.5 rounded-2xl bg-white/80 border border-black/5 shadow-sm mt-4 flex items-center gap-3">
                  <img
                    src={keyPieceProduct.primaryImage}
                    alt={keyPieceProduct.title}
                    className="w-14 h-14 rounded-xl object-cover bg-[#ebe7dc]"
                  />
                  <div>
                    <span className="text-[9px] uppercase font-mono-code text-[#775a19]">
                      Key Piece · {keyPieceProduct.sku}
                    </span>
                    <h4 className="font-playfair text-xs font-medium text-[#1c1c18]">
                      {keyPieceProduct.title}
                    </h4>
                    <span className="font-mono-code text-xs font-bold text-[#1c1c18]">
                      ${keyPieceProduct.salePrice || keyPieceProduct.regularPrice} USD
                    </span>
                  </div>
                </div>
              )}

              {/* Pills Preview */}
              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-black/5">
                {draft.floatingPills.map((p, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-full bg-[#ebe7dc] text-[9px] uppercase font-jakarta">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Mirror Exhibition Preview */}
            <div className="p-6 bg-[#fcf9f2] border-t border-black/5">
              <span className="text-[9px] font-mono-code uppercase text-[#775a19]">
                Exhibition No. 01
              </span>
              <h3 className="font-playfair text-lg font-medium mb-1">
                {draft.exhibitHeadline}
              </h3>
              <p className="font-jakarta text-[11px] text-[#5e584f] leading-relaxed">
                {draft.exhibitSubtitle}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
