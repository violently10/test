import React, { useState } from 'react';
import {
  UploadCloud,
  Folder,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  ZoomIn,
  Video,
  FileImage,
  Sparkles,
  HardDrive,
  Info
} from 'lucide-react';
import { MediaAsset } from '../../../types';

interface MediaLibraryViewProps {
  assets: MediaAsset[];
  onAddAsset: (asset: MediaAsset) => void;
  onDeleteAsset: (id: string) => void;
}

export const MediaLibraryView: React.FC<MediaLibraryViewProps> = ({
  assets,
  onAddAsset,
  onDeleteAsset
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(assets[0] || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadCategory, setUploadCategory] = useState<MediaAsset['category']>('rings');

  const filteredAssets = assets.filter((asset) => {
    if (selectedCategory === 'all') return true;
    return asset.category === selectedCategory;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl.trim() || !uploadName.trim()) return;

    const newAsset: MediaAsset = {
      id: 'media-' + Date.now(),
      name: uploadName.endsWith('.jpg') || uploadName.endsWith('.png') || uploadName.endsWith('.webp') ? uploadName : `${uploadName}.webp`,
      size: '2.40 MB',
      format: 'WEBP / Lossless',
      resolution: '2800 × 2800 px (1:1)',
      url: uploadUrl.trim(),
      alt: `High resolution atelier photography of ${uploadName}`,
      category: uploadCategory,
      liveLinksCount: 1,
      colorProfile: 'Display P3 · D65',
      uploadedAt: 'Just now'
    };

    onAddAsset(newAsset);
    setSelectedAsset(newAsset);
    setUploadName('');
    setUploadUrl('');
    setIsUploading(false);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto text-[#fcf9f2]">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono-code text-[11px] text-[#e9c176] uppercase tracking-widest">
              Supabase Storage v3
            </span>
            <span className="text-[#3d3832]">/</span>
            <span className="font-mono-code text-[11px] text-[#7a746a]">
              Frankfurt (eu-central-1)
            </span>
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-normal text-white">
            Atelier CDN Media Vault
          </h1>
        </div>

        {/* Storage Bar Gauge */}
        <div className="flex items-center gap-6 bg-[#181615] px-5 py-3 rounded-2xl border border-[#262422]">
          <div>
            <div className="flex justify-between text-xs font-jakarta text-[#a8a196] mb-1">
              <span>Bucket Capacity</span>
              <span className="font-mono-code text-[#e9c176]">1.42 GB / 10 GB</span>
            </div>
            <div className="w-40 h-2 bg-[#262422] rounded-full overflow-hidden">
              <div className="w-[14%] h-full bg-[#e9c176] rounded-full" />
            </div>
          </div>

          <button
            onClick={() => setIsUploading(!isUploading)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e9c176] hover:bg-[#c5a059] text-[#141312] text-xs font-jakarta font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Asset</span>
          </button>
        </div>
      </div>

      {/* Upload Dropzone Collapse */}
      {isUploading && (
        <form onSubmit={handleUploadSubmit} className="p-6 rounded-2xl bg-[#181615] border border-[#e9c176]/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono-code text-xs text-[#e9c176] uppercase">
              Upload High-Res Media to Supabase CDN Bucket
            </span>
            <button
              type="button"
              onClick={() => setIsUploading(false)}
              className="text-xs text-[#7a746a] hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-jakarta text-[#9c9589] mb-1">File Name</label>
              <input
                type="text"
                required
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                placeholder="e.g. torus_ring_macro_angle.webp"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs text-white outline-none focus:border-[#e9c176]"
              />
            </div>

            <div>
              <label className="block text-xs font-jakarta text-[#9c9589] mb-1">Media CDN URL</label>
              <input
                type="url"
                required
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                placeholder="https://images... or data:image..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs text-white outline-none focus:border-[#e9c176]"
              />
            </div>

            <div>
              <label className="block text-xs font-jakarta text-[#9c9589] mb-1">Storage Folder</label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs text-[#a8a196] outline-none"
              >
                <option value="rings">rings/</option>
                <option value="collars">collars/</option>
                <option value="cuffs">cuffs/</option>
                <option value="earrings">earrings/</option>
                <option value="hero">hero/</option>
                <option value="editorial">editorial/</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#e9c176] hover:bg-[#c5a059] text-[#141312] text-xs font-jakarta font-semibold cursor-pointer"
            >
              Push to Bucket
            </button>
          </div>
        </form>
      )}

      {/* Main 3-Column Layout: Folders | Grid | Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Storage Folders (3 cols) */}
        <div className="lg:col-span-3 p-4 rounded-2xl bg-[#181615] border border-[#262422] space-y-2">
          <span className="px-3 font-mono-code text-[10px] uppercase tracking-widest text-[#7a746a] font-semibold block mb-2">
            Storage Tree
          </span>

          {[
            { id: 'all', label: 'All Media Assets', count: assets.length },
            { id: 'hero', label: 'hero_media_4k/', count: assets.filter((a) => a.category === 'hero').length },
            { id: 'rings', label: 'rings_and_bands/', count: assets.filter((a) => a.category === 'rings').length },
            { id: 'collars', label: 'collars_and_chokers/', count: assets.filter((a) => a.category === 'collars').length },
            { id: 'cuffs', label: 'cuffs_monolithic/', count: assets.filter((a) => a.category === 'cuffs').length },
            { id: 'earrings', label: 'earrings_drops/', count: assets.filter((a) => a.category === 'earrings').length },
            { id: 'editorial', label: 'editorial_lookbook/', count: assets.filter((a) => a.category === 'editorial').length }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-jakarta transition-colors cursor-pointer ${
                selectedCategory === item.id
                  ? 'bg-[#24211d] text-[#e9c176] font-medium border border-[#3d3832]'
                  : 'text-[#9c9589] hover:text-white hover:bg-[#1b1917]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Folder className="w-3.5 h-3.5 text-[#e9c176] shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
              <span className="font-mono-code text-[10px] text-[#7a746a]">
                {item.count}
              </span>
            </button>
          ))}
        </div>

        {/* Center Column: Asset Gallery Grid (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className={`group p-3 rounded-2xl bg-[#181615] border transition-all cursor-pointer ${
                  selectedAsset?.id === asset.id
                    ? 'border-[#e9c176] shadow-[0_0_15px_rgba(233,193,118,0.15)] bg-[#1e1b19]'
                    : 'border-[#262422] hover:border-[#3d3832]'
                }`}
              >
                {/* Thumbnail Preview */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 border border-[#332f2a] mb-2.5">
                  {asset.isVideo ? (
                    <div className="w-full h-full flex items-center justify-center bg-[#1f1d1b] text-[#e9c176]">
                      <Video className="w-8 h-8" />
                    </div>
                  ) : (
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Format pill */}
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 font-mono-code text-[9px] text-[#e9c176]">
                    {asset.format.split('/')[0]}
                  </span>
                </div>

                {/* File info */}
                <p className="font-playfair text-xs font-medium text-white truncate mb-0.5">
                  {asset.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono-code text-[#7a746a]">
                  <span>{asset.size}</span>
                  <span className="text-[#a8a196]">{asset.liveLinksCount} link{asset.liveLinksCount > 1 ? 's' : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Asset Inspector & CDN Details (4 cols) */}
        {selectedAsset ? (
          <div className="lg:col-span-4 p-5 rounded-2xl bg-[#181615] border border-[#262422] space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#e9c176]">
                Asset Inspector
              </span>
              <button
                onClick={() => onDeleteAsset(selectedAsset.id)}
                className="text-[#7a746a] hover:text-red-400 p-1 cursor-pointer"
                title="Delete from bucket"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* High-res Image Preview */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 border border-[#332f2a]">
              {selectedAsset.isVideo ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#1b1917] p-4 text-center">
                  <Video className="w-10 h-10 text-[#e9c176] mb-2" />
                  <span className="font-mono-code text-xs text-white">{selectedAsset.videoDuration}</span>
                </div>
              ) : (
                <img
                  src={selectedAsset.url}
                  alt={selectedAsset.alt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Specs Dossier */}
            <div className="space-y-2 text-xs font-jakarta">
              <div className="flex justify-between py-1 border-b border-[#211f1e]">
                <span className="text-[#7a746a]">File Name:</span>
                <span className="font-mono-code text-white truncate max-w-[180px]">{selectedAsset.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#211f1e]">
                <span className="text-[#7a746a]">Resolution:</span>
                <span className="font-mono-code text-white">{selectedAsset.resolution}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#211f1e]">
                <span className="text-[#7a746a]">Weight:</span>
                <span className="font-mono-code text-white">{selectedAsset.size}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#211f1e]">
                <span className="text-[#7a746a]">Color Profile:</span>
                <span className="font-mono-code text-[#e9c176]">{selectedAsset.colorProfile}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#211f1e]">
                <span className="text-[#7a746a]">Active Link:</span>
                <span className="text-white truncate max-w-[180px]">{selectedAsset.productLink || 'None'}</span>
              </div>
            </div>

            {/* CDN Endpoint & Copy Button */}
            <div>
              <span className="block text-[11px] font-jakarta text-[#9c9589] mb-1.5">
                Supabase CDN Endpoint
              </span>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#1f1d1b] border border-[#2d2a26]">
                <input
                  type="text"
                  readOnly
                  value={selectedAsset.url}
                  className="bg-transparent text-[11px] font-mono-code text-[#a8a196] w-full outline-none select-all truncate"
                />
                <button
                  onClick={() => handleCopyUrl(selectedAsset.url, selectedAsset.id)}
                  className="p-1.5 rounded-lg bg-[#24211d] hover:bg-[#332f2a] text-[#e9c176] cursor-pointer shrink-0 transition-colors"
                  title="Copy CDN URL"
                >
                  {copiedId === selectedAsset.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Alt Text */}
            <div>
              <span className="block text-[11px] font-jakarta text-[#9c9589] mb-1">
                ADA & SEO Alt Descriptor
              </span>
              <p className="text-[11px] font-jakarta text-[#7a746a] leading-relaxed bg-[#1b1917] p-2.5 rounded-xl border border-[#262422]">
                {selectedAsset.alt}
              </p>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-4 p-8 rounded-2xl bg-[#181615] border border-[#262422] text-center text-xs text-[#7a746a]">
            Select an asset to view its CDN specifications.
          </div>
        )}

      </div>

    </div>
  );
};
