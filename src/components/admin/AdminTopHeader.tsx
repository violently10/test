import React, { useState } from 'react';
import { Search, Bell, ExternalLink, RefreshCw, CheckCircle2, Shield } from 'lucide-react';

interface AdminTopHeaderProps {
  onOpenCommandPalette: () => void;
  onViewLiveStore: () => void;
  onPublishToStorefront: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  onSelectProfile: () => void;
}

export const AdminTopHeader: React.FC<AdminTopHeaderProps> = ({
  onOpenCommandPalette,
  onViewLiveStore,
  onPublishToStorefront,
  onOpenNotifications,
  unreadCount = 2,
  onSelectProfile
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [justPublished, setJustPublished] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setJustPublished(true);
      onPublishToStorefront();
      setTimeout(() => setJustPublished(false), 2400);
    }, 900);
  };

  return (
    <header className="h-16 bg-[#181615] border-b border-[#262422] px-6 flex items-center justify-between sticky top-0 z-20 text-[#fcf9f2]">
      {/* Search trigger with ⌘K */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] hover:border-[#454039] text-[#9c9589] hover:text-[#e9c176] text-xs font-jakarta transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-[#e9c176] group-hover:scale-110 transition-transform" />
            <span className="text-xs">Search catalog, specimen tags, gemological SKU...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#2b2723] border border-[#3d3832] text-[10px] font-mono-code text-[#a8a196]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Publish To Storefront Button */}
        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-jakarta text-xs font-medium transition-all cursor-pointer shadow-sm ${
            justPublished
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
              : 'bg-[#24211d] hover:bg-[#332f2a] text-[#e9c176] border border-[#3d3832]'
          }`}
          title="Push pending CMS edits to public storefront CDN"
        >
          {isPublishing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#e9c176]" />
              <span>Deploying to Edge...</span>
            </>
          ) : justPublished ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Edge Synced</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5 text-[#e9c176]" />
              <span className="hidden sm:inline">Sync Storefront</span>
            </>
          )}
        </button>

        {/* View Live Store Button */}
        <button
          onClick={onViewLiveStore}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1f1d1b] hover:bg-[#292623] text-white text-xs font-jakarta border border-[#2d2a26] transition-colors cursor-pointer"
        >
          <span className="hidden sm:inline">View Live Store</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#e9c176]" />
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative w-9 h-9 rounded-xl bg-[#1f1d1b] hover:bg-[#292623] border border-[#2d2a26] flex items-center justify-center text-[#9c9589] hover:text-white transition-colors cursor-pointer"
          title="Atelier Audit Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e9c176] text-[#141312] text-[9px] font-bold font-mono flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Curator Profile Trigger */}
        <button
          onClick={onSelectProfile}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#1f1d1b] hover:bg-[#292623] border border-[#2d2a26] transition-colors cursor-pointer group text-left"
        >
          <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#2d2a26] shrink-0 border border-[#4a443c]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP4tFQ1ISoJJst5twV15CzkidNE2RlxOqDS4oSN8_sfgH_eJYCRPLqvRvAc21IEJZCx6foOy8J6T-yh9rDQsiLdvjdSfsF6UOIzk53tIPYtNjK20AUyiSoiTwaW0cDfmG-HVP8-WWINoN4N3kTxQoE90tXuVuWQPwUjTcB-50eZdGCW5a5nUuUzc1b4FtcvX57Q1ykIXhR-Re6xhJdEy3EDLt3RX9-MVQjkk4nKgIoy2ujJcKW37joQw"
              alt="Curator Sarah"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block leading-tight">
            <p className="text-xs font-jakarta font-medium text-white group-hover:text-[#e9c176] transition-colors">
              Curator Sarah
            </p>
            <p className="text-[10px] font-mono-code text-[#7a746a] flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 text-[#e9c176]" />
              <span>Tier-0 Vault</span>
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};
