import React from 'react';
import {
  LayoutDashboard,
  Gem,
  Globe,
  Image as ImageIcon,
  ShieldAlert,
  Settings,
  ExternalLink,
  LogOut,
  Layers
} from 'lucide-react';

interface AdminSidebarProps {
  currentView: string;
  onSelectView: (view: any) => void;
  onViewLiveStore: () => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentView,
  onSelectView,
  onViewLiveStore,
  onLogout
}) => {
  return (
    <aside className="w-64 bg-[#141312] border-r border-[#262422] flex flex-col justify-between shrink-0 h-screen sticky top-0 text-[#fcf9f2] select-none z-30">
      
      {/* Brand & System Status */}
      <div className="p-6 border-b border-[#262422]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#211f1e] border border-[#3d3832] flex items-center justify-center text-[#e9c176]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line strokeWidth="1.75" x1="16" x2="21" y1="16" y2="21" />
                <circle cx="11" cy="11" fill="currentColor" r="2.5" stroke="none" />
              </svg>
            </div>
            <div>
              <h2 className="font-playfair text-lg font-medium tracking-tight text-white leading-tight">
                The Q
              </h2>
              <p className="font-mono-code text-[10px] text-[#9c9589] tracking-wider uppercase">
                Atelier Studio
              </p>
            </div>
          </div>

          <span className="px-1.5 py-0.5 rounded bg-[#e9c176]/10 text-[#e9c176] font-mono-code text-[10px] font-bold">
            PROD
          </span>
        </div>

        {/* Sync Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1b1917] border border-[#2d2a26]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono-code text-[10px] text-[#a8a196]">
            v2.4 Supabase Synced
          </span>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Core Atelier */}
        <div>
          <span className="px-3 font-mono-code text-[10px] uppercase tracking-widest text-[#7a746a] font-semibold block mb-2">
            Core Atelier
          </span>
          <div className="space-y-1">
            <button
              onClick={() => onSelectView('admin-dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs transition-colors cursor-pointer ${
                currentView === 'admin-dashboard'
                  ? 'bg-[#24211d] text-[#e9c176] font-medium border border-[#3d3832]'
                  : 'text-[#9c9589] hover:text-white hover:bg-[#1b1917]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#e9c176]" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onSelectView('admin-products')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs transition-colors cursor-pointer ${
                currentView === 'admin-products'
                  ? 'bg-[#24211d] text-[#e9c176] font-medium border border-[#3d3832]'
                  : 'text-[#9c9589] hover:text-white hover:bg-[#1b1917]'
              }`}
            >
              <Gem className="w-4 h-4 text-[#e9c176]" />
              <span>Products & Objects</span>
            </button>

            <button
              onClick={() => onSelectView('admin-vault')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs transition-colors cursor-pointer ${
                currentView === 'admin-vault'
                  ? 'bg-[#24211d] text-[#e9c176] font-medium border border-[#3d3832]'
                  : 'text-[#9c9589] hover:text-white hover:bg-[#1b1917]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#e9c176]" />
              <span>Vault & Bullion</span>
            </button>
          </div>
        </div>

        {/* Storefront & CMS */}
        <div>
          <span className="px-3 font-mono-code text-[10px] uppercase tracking-widest text-[#7a746a] font-semibold block mb-2">
            Storefront & CMS
          </span>
          <div className="space-y-1">
            <button
              onClick={() => onSelectView('admin-homepage-editor')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs transition-colors cursor-pointer ${
                currentView === 'admin-homepage-editor'
                  ? 'bg-[#24211d] text-[#e9c176] font-medium border border-[#3d3832]'
                  : 'text-[#9c9589] hover:text-white hover:bg-[#1b1917]'
              }`}
            >
              <Globe className="w-4 h-4 text-[#e9c176]" />
              <span>Homepage Editor</span>
            </button>

            <button
              onClick={() => onSelectView('admin-media')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs transition-colors cursor-pointer ${
                currentView === 'admin-media'
                  ? 'bg-[#24211d] text-[#e9c176] font-medium border border-[#3d3832]'
                  : 'text-[#9c9589] hover:text-white hover:bg-[#1b1917]'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#e9c176]" />
              <span>Media Library</span>
            </button>
          </div>
        </div>

        {/* System Governance */}
        <div>
          <span className="px-3 font-mono-code text-[10px] uppercase tracking-widest text-[#7a746a] font-semibold block mb-2">
            System & Security
          </span>
          <div className="space-y-1">
            <button
              onClick={() => onSelectView('admin-profile')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs transition-colors cursor-pointer ${
                currentView === 'admin-profile'
                  ? 'bg-[#24211d] text-[#e9c176] font-medium border border-[#3d3832]'
                  : 'text-[#9c9589] hover:text-white hover:bg-[#1b1917]'
              }`}
            >
              <Settings className="w-4 h-4 text-[#e9c176]" />
              <span>Governance & API</span>
            </button>

            <button
              onClick={() => onSelectView('admin-profile')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs text-[#9c9589] hover:text-white hover:bg-[#1b1917] transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-[#e9c176]" />
              <span>Sanctum Audit Trail</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Storage Telemetry & Logout */}
      <div className="p-4 border-t border-[#262422] bg-[#100f0e] space-y-4">
        {/* Storage bar */}
        <div className="space-y-1.5 px-2">
          <div className="flex justify-between text-[10px] font-mono-code text-[#a8a196]">
            <span>Supabase S3 Storage</span>
            <span>1.4 / 10 GB</span>
          </div>
          <div className="w-full h-1.5 bg-[#262422] rounded-full overflow-hidden">
            <div className="w-[14%] h-full bg-[#e9c176] rounded-full" />
          </div>
          <span className="font-mono-code text-[9px] text-[#6b645b] block">
            EU-Central · Latency 18ms
          </span>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#262422]">
          <button
            onClick={onViewLiveStore}
            className="flex-1 py-2 px-2.5 rounded-lg bg-[#24211d] hover:bg-[#332f2a] text-[#e9c176] text-[11px] font-jakarta font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#3d3832]"
            title="Switch to customer storefront view"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <button
            onClick={onLogout}
            className="w-8 h-8 rounded-lg bg-[#211f1e] hover:bg-red-950/40 hover:text-red-400 text-[#a8a196] flex items-center justify-center transition-colors cursor-pointer border border-[#3d3832]"
            title="Lock Sanctum & Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </aside>
  );
};
