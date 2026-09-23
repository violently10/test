import React from 'react';
import {
  TrendingUp,
  Gem,
  Percent,
  CircleDollarSign,
  Plus,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  HardDrive,
  Database,
  ArrowUpRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { Product, HomepageConfig, AuditLogEntry } from '../../../types';

interface DashboardViewProps {
  products: Product[];
  homepageConfig: HomepageConfig;
  auditLog: AuditLogEntry[];
  onAddNewProduct: () => void;
  onEditProduct: (product: Product) => void;
  onOpenHomepageEditor: () => void;
  onPublishStorefront: () => void;
  onToggleFeatured: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  homepageConfig,
  auditLog,
  onAddNewProduct,
  onEditProduct,
  onOpenHomepageEditor,
  onPublishStorefront,
  onToggleFeatured
}) => {
  const totalValuation = products.reduce((acc, p) => acc + (p.regularPrice * p.stock), 0);
  const lowStockCount = products.filter((p) => p.stockStatus === 'low_stock' || p.stock <= 3).length;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#fcf9f2]">
      
      {/* Top Banner: Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e9c176]/10 border border-[#e9c176]/30 text-[#e9c176] font-mono-code text-[10px] font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SANCTUM ACCESS LEVEL 01 · LIVE SYNC
            </span>
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-normal text-white">
            Atelier Director Console
          </h1>
          <p className="font-jakarta text-xs text-[#9c9589] mt-0.5">
            Real-time physical vault inventory, boutique telemetry, and Supabase CDN sync.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <select className="px-3.5 py-2 rounded-xl bg-[#1b1917] border border-[#2d2a26] text-xs font-jakarta text-[#a8a196] outline-none cursor-pointer">
            <option>Last 30 Days · Q3 2025</option>
            <option>Quarter to Date · Q3</option>
            <option>Year to Date 2025</option>
            <option>All Historical Ledger</option>
          </select>

          <button
            onClick={onAddNewProduct}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#e9c176] hover:bg-[#c5a059] text-[#141312] text-xs font-jakarta font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Object</span>
          </button>

          <button
            onClick={onPublishStorefront}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#24211d] hover:bg-[#332f2a] text-[#e9c176] text-xs font-jakarta border border-[#3d3832] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Publish to Storefront</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Revenue */}
        <div className="p-5 rounded-2xl bg-[#181615] border border-[#262422] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#9c9589] font-jakarta mb-2">
            <span>Gross Atelier Revenue</span>
            <div className="w-7 h-7 rounded-lg bg-[#211f1e] text-[#e9c176] flex items-center justify-center">
              <CircleDollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono-code text-2xl font-bold text-white mb-1">
              $148,920 <span className="text-xs text-[#7a746a] font-normal">USD</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-jakarta text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14.2% vs last month</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Objects */}
        <div className="p-5 rounded-2xl bg-[#181615] border border-[#262422] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#9c9589] font-jakarta mb-2">
            <span>Sculptural Objects</span>
            <div className="w-7 h-7 rounded-lg bg-[#211f1e] text-[#e9c176] flex items-center justify-center">
              <Gem className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono-code text-2xl font-bold text-white mb-1">
              {products.length} Active
            </div>
            <div className="text-xs font-jakarta text-[#a8a196] flex items-center gap-2">
              <span className="text-amber-400 font-medium">{lowStockCount} Low Stock</span>
              <span>·</span>
              <span>Valuation: ${(totalValuation / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Conversion */}
        <div className="p-5 rounded-2xl bg-[#181615] border border-[#262422] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#9c9589] font-jakarta mb-2">
            <span>Storefront Conversion</span>
            <div className="w-7 h-7 rounded-lg bg-[#211f1e] text-[#e9c176] flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono-code text-2xl font-bold text-white mb-1">
              3.42%
            </div>
            <div className="w-full h-1.5 bg-[#262422] rounded-full overflow-hidden mt-1.5">
              <div className="w-[34%] h-full bg-[#e9c176] rounded-full" />
            </div>
          </div>
        </div>

        {/* Metric 4: AOV */}
        <div className="p-5 rounded-2xl bg-[#181615] border border-[#262422] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#9c9589] font-jakarta mb-2">
            <span>Average Order Value</span>
            <div className="w-7 h-7 rounded-lg bg-[#211f1e] text-[#e9c176] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono-code text-2xl font-bold text-white mb-1">
              $685 <span className="text-xs text-[#7a746a] font-normal">USD</span>
            </div>
            <div className="text-xs font-jakarta text-[#a8a196]">
              +$48 MoM across Solid 18K
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Inventory Table & Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Object Inventory Flow (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#181615] border border-[#262422] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-playfair text-lg text-white font-medium">
                  Recent Object Sales & Inventory Flow
                </h3>
                <p className="font-jakarta text-xs text-[#7a746a]">
                  Synced directly with Swiss Bullion Vault & Supabase Postgres
                </p>
              </div>

              <button
                onClick={onAddNewProduct}
                className="text-xs font-jakarta text-[#e9c176] hover:underline cursor-pointer"
              >
                View Full Catalog ({products.length}) →
              </button>
            </div>

            {/* Specimen Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-jakarta">
                <thead>
                  <tr className="border-b border-[#262422] text-[#7a746a] font-mono-code text-[10px] uppercase">
                    <th className="pb-3 pl-2">Specimen / SKU</th>
                    <th className="pb-3">Metal</th>
                    <th className="pb-3">Collection</th>
                    <th className="pb-3">Cadence</th>
                    <th className="pb-3">Valuation</th>
                    <th className="pb-3">Sync</th>
                    <th className="pb-3 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#211f1e]">
                  {products.slice(0, 5).map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#1f1d1b]/60 transition-colors group">
                      {/* Thumbnail & Title */}
                      <td className="py-3.5 pl-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.primaryImage}
                            alt={prod.title}
                            className="w-10 h-10 rounded-lg object-cover bg-black/40 border border-[#332f2a]"
                          />
                          <div>
                            <div className="font-playfair text-sm text-white font-medium group-hover:text-[#e9c176] transition-colors">
                              {prod.title}
                            </div>
                            <div className="font-mono-code text-[10px] text-[#7a746a]">
                              {prod.sku}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Metal */}
                      <td className="py-3.5 text-[#a8a196]">
                        {prod.metal}
                      </td>

                      {/* Collection */}
                      <td className="py-3.5 text-[#9c9589]">
                        <span className="px-2 py-0.5 rounded bg-[#211f1e] text-[10px] text-[#a8a196]">
                          {prod.collectionName.split(' ')[0]}
                        </span>
                      </td>

                      {/* Stock Cadence */}
                      <td className="py-3.5">
                        {prod.stockStatus === 'in_stock' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-mono-code text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            In Stock ({prod.stock})
                          </span>
                        ) : prod.stockStatus === 'low_stock' ? (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-mono-code text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            Low ({prod.stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-sky-400 font-mono-code text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                            Pre-Order
                          </span>
                        )}
                      </td>

                      {/* Valuation */}
                      <td className="py-3.5 font-mono-code text-white font-bold">
                        ${prod.salePrice || prod.regularPrice}
                      </td>

                      {/* Sync status */}
                      <td className="py-3.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </td>

                      {/* Edit CTA */}
                      <td className="py-3.5 text-right pr-2">
                        <button
                          onClick={() => onEditProduct(prod)}
                          className="px-2.5 py-1 rounded-lg bg-[#24211d] hover:bg-[#332f2a] text-[#e9c176] text-[11px] font-medium transition-colors cursor-pointer border border-[#3d3832]"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-[#262422] flex items-center justify-between text-xs text-[#7a746a]">
            <span>Showing primary vault allocation specimens</span>
            <button
              onClick={onAddNewProduct}
              className="text-[#e9c176] hover:underline cursor-pointer"
            >
              + Register New Specimen
            </button>
          </div>
        </div>

        {/* Right Column: Hero CMS & Database Health (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Storefront Hero CMS Controls */}
          <div className="p-5 rounded-2xl bg-[#181615] border border-[#262422]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#e9c176]">
                Storefront Hero CMS
              </span>
              <button
                onClick={onOpenHomepageEditor}
                className="text-[11px] font-jakarta text-[#e9c176] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Edit CMS</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50 mb-3 border border-[#2d2a26]">
              <img
                src={homepageConfig.heroPosterUrl}
                alt="Storefront Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                <span className="text-[10px] font-mono-code text-[#e9c176] uppercase">
                  Active Headline
                </span>
                <p className="font-playfair text-xs text-white line-clamp-1">
                  "{homepageConfig.heroHeadline}"
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-jakarta text-[#9c9589]">
              <div className="flex justify-between">
                <span>Primary CTA:</span>
                <span className="text-white font-medium">{homepageConfig.heroPrimaryCtaLabel}</span>
              </div>
              <div className="flex justify-between">
                <span>Key Specimen:</span>
                <span className="font-mono-code text-[#e9c176]">{homepageConfig.keyPieceSku}</span>
              </div>
            </div>
          </div>

          {/* Database & Storage Health */}
          <div className="p-5 rounded-2xl bg-[#181615] border border-[#262422] space-y-4">
            <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#7a746a] block">
              Infrastructure Telemetry
            </span>

            <div className="flex items-center justify-between text-xs font-jakarta">
              <div className="flex items-center gap-2 text-[#a8a196]">
                <Database className="w-4 h-4 text-[#e9c176]" />
                <span>Postgres Query Latency</span>
              </div>
              <span className="font-mono-code text-emerald-400 font-bold">18 ms</span>
            </div>

            <div className="flex items-center justify-between text-xs font-jakarta">
              <div className="flex items-center gap-2 text-[#a8a196]">
                <HardDrive className="w-4 h-4 text-[#e9c176]" />
                <span>Supabase Media S3</span>
              </div>
              <span className="font-mono-code text-white">1.42 GB / 10 GB</span>
            </div>

            <div className="flex items-center justify-between text-xs font-jakarta">
              <div className="flex items-center gap-2 text-[#a8a196]">
                <Sparkles className="w-4 h-4 text-[#e9c176]" />
                <span>Active Vault Curators</span>
              </div>
              <span className="font-mono-code text-white">2 Online</span>
            </div>
          </div>

          {/* Recent Atelier Activity Audit Feed */}
          <div className="p-5 rounded-2xl bg-[#181615] border border-[#262422]">
            <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#7a746a] block mb-3">
              Sanctum Audit Stream
            </span>

            <div className="space-y-3">
              {auditLog.slice(0, 3).map((log) => (
                <div key={log.id} className="text-xs font-jakarta border-l-2 border-[#3d3832] pl-3 py-0.5">
                  <p className="text-white font-medium">
                    {log.actor} <span className="text-[#a8a196] font-normal">{log.action}</span>
                  </p>
                  <p className="text-[10px] font-mono-code text-[#7a746a] mt-0.5">
                    {log.timestamp} · {log.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
