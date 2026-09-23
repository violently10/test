import React, { useState } from 'react';
import {
  Search,
  Plus,
  Star,
  Copy,
  Trash2,
  Edit,
  GripVertical,
  CheckCircle2,
  AlertTriangle,
  X,
  UploadCloud,
  Image as ImageIcon,
  Save,
  ArrowUpDown
} from 'lucide-react';
import { Product } from '../../../types';

interface ProductsCatalogViewProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (data: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onDuplicateProduct: (id: string) => void;
  onReorderProducts: (fromIdx: number, toIdx: number) => void;
  onToggleFeatured: (id: string) => void;
  editingProductFromExternal?: Product | null;
  onClearEditingProduct?: () => void;
}

export const ProductsCatalogView: React.FC<ProductsCatalogViewProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onDuplicateProduct,
  onReorderProducts,
  onToggleFeatured,
  editingProductFromExternal,
  onClearEditingProduct
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionFilter, setCollectionFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');
  const [isReorderMode, setIsReorderMode] = useState(false);

  // Inspector Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeEditingProduct, setActiveEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State for Drawer
  const [formTitle, setFormTitle] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formNarrative, setFormNarrative] = useState('');
  const [formRegularPrice, setFormRegularPrice] = useState(0);
  const [formSalePrice, setFormSalePrice] = useState<number | undefined>(undefined);
  const [formCollection, setFormCollection] = useState<Product['collection']>('sculptural');
  const [formMetal, setFormMetal] = useState('');
  const [formStock, setFormStock] = useState(10);
  const [formStockStatus, setFormStockStatus] = useState<Product['stockStatus']>('in_stock');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formPrimaryImage, setFormPrimaryImage] = useState('');
  const [formSecondaryImage, setFormSecondaryImage] = useState('');
  const [formGalleryImages, setFormGalleryImages] = useState<string[]>([]);
  const [formDimensions, setFormDimensions] = useState('');
  const [formWeight, setFormWeight] = useState('');
  const [formPurityMark, setFormPurityMark] = useState('');
  const [formProvenanceCert, setFormProvenanceCert] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Handle opening external product
  React.useEffect(() => {
    if (editingProductFromExternal) {
      openDrawerForEdit(editingProductFromExternal);
      if (onClearEditingProduct) onClearEditingProduct();
    }
  }, [editingProductFromExternal]);

  const openDrawerForNew = () => {
    setActiveEditingProduct(null);
    setFormTitle('New Sculptural Form');
    setFormSku('SKU-NEW-' + Math.floor(100 + Math.random() * 900));
    setFormNarrative('Poured minimalist silhouette with polished interior camber.');
    setFormRegularPrice(490);
    setFormSalePrice(undefined);
    setFormCollection('sculptural');
    setFormMetal('Solid 18K Yellow Gold');
    setFormStock(12);
    setFormStockStatus('in_stock');
    setFormFeatured(false);
    setFormPrimaryImage(products[0]?.primaryImage || '');
    setFormSecondaryImage(products[0]?.secondaryImage || '');
    setFormGalleryImages([]);
    setFormDimensions('Internal diameter: 60mm');
    setFormWeight('28.4g');
    setFormPurityMark('AU 750 / Stamped');
    setFormProvenanceCert('Sanctum Vault Cert #991-NEW');
    setDrawerOpen(true);
  };

  const openDrawerForEdit = (prod: Product) => {
    setActiveEditingProduct(prod);
    setFormTitle(prod.title);
    setFormSku(prod.sku);
    setFormNarrative(prod.narrative);
    setFormRegularPrice(prod.regularPrice);
    setFormSalePrice(prod.salePrice);
    setFormCollection(prod.collection);
    setFormMetal(prod.metal);
    setFormStock(prod.stock);
    setFormStockStatus(prod.stockStatus);
    setFormFeatured(prod.featured);
    setFormPrimaryImage(prod.primaryImage);
    setFormSecondaryImage(prod.secondaryImage || '');
    setFormGalleryImages(prod.galleryImages || []);
    setFormDimensions(prod.dimensions || '');
    setFormWeight(prod.weight || '');
    setFormPurityMark(prod.purityMark || '');
    setFormProvenanceCert(prod.provenanceCert || '');
    setDrawerOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const collectionNames: Record<Product['collection'], string> = {
      sculptural: 'Curated Sculptural Forms',
      silver: 'Monolithic Silver',
      gold: 'Solid Gold 18K',
      timeless: 'Timeless Collection',
      raw: 'Raw Geometrics'
    };

    const productPayload: Product = {
      id: activeEditingProduct ? activeEditingProduct.id : 'prod-' + Date.now(),
      sku: formSku,
      title: formTitle,
      narrative: formNarrative,
      regularPrice: Number(formRegularPrice),
      salePrice: formSalePrice ? Number(formSalePrice) : undefined,
      collection: formCollection,
      collectionName: collectionNames[formCollection] || 'Curated Sculptural Forms',
      metal: formMetal,
      stock: Number(formStock),
      stockStatus: formStockStatus,
      featured: formFeatured,
      primaryImage: formPrimaryImage,
      secondaryImage: formSecondaryImage,
      galleryImages: formGalleryImages,
      dimensions: formDimensions,
      weight: formWeight,
      purityMark: formPurityMark,
      provenanceCert: formProvenanceCert
    };

    if (activeEditingProduct) {
      onUpdateProduct(productPayload);
    } else {
      onAddProduct(productPayload);
    }

    setDrawerOpen(false);
  };

  const handleAddGalleryImage = () => {
    if (newImageUrl.trim()) {
      setFormGalleryImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveGalleryImage = (idx: number) => {
    setFormGalleryImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Filter & Sort
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.metal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollection = collectionFilter === 'all' || p.collection === collectionFilter;
    const matchesStock = stockFilter === 'all' || p.stockStatus === stockFilter;
    const matchesFeatured = !featuredOnly || p.featured;
    return matchesSearch && matchesCollection && matchesStock && matchesFeatured;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-high') return (b.salePrice || b.regularPrice) - (a.salePrice || a.regularPrice);
    if (sortOrder === 'price-low') return (a.salePrice || a.regularPrice) - (b.salePrice || b.regularPrice);
    if (sortOrder === 'title-az') return a.title.localeCompare(b.title);
    return 0;
  });

  const aggregateValuation = products.reduce((acc, p) => acc + p.regularPrice * p.stock, 0);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto text-[#fcf9f2]">
      
      {/* Telemetry Strip Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono-code text-[11px] text-[#e9c176] uppercase tracking-widest">
              Catalog Master Ledger
            </span>
            <span className="text-[#3d3832]">/</span>
            <span className="font-mono-code text-[11px] text-[#7a746a]">
              Postgres Schema v3.1
            </span>
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-normal text-white">
            Atelier Objects & Sculptures
          </h1>
        </div>

        {/* Global Valuation Telemetry Badge */}
        <div className="flex flex-wrap items-center gap-4 bg-[#181615] px-4 py-2.5 rounded-2xl border border-[#262422]">
          <div>
            <span className="text-[10px] font-mono-code text-[#7a746a] uppercase block">
              Active Vault SKUs
            </span>
            <span className="font-mono-code text-sm font-bold text-white">
              {products.length} Objects
            </span>
          </div>

          <div className="h-6 w-px bg-[#262422]" />

          <div>
            <span className="text-[10px] font-mono-code text-[#7a746a] uppercase block">
              Aggregate Vault Valuation
            </span>
            <span className="font-mono-code text-sm font-bold text-[#e9c176]">
              ${aggregateValuation.toLocaleString()} USD
            </span>
          </div>

          <div className="h-6 w-px bg-[#262422]" />

          <button
            onClick={openDrawerForNew}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#e9c176] hover:bg-[#c5a059] text-[#141312] text-xs font-jakarta font-semibold transition-colors cursor-pointer shadow-sm ml-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Object</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Matrix Bar */}
      <div className="p-4 rounded-2xl bg-[#181615] border border-[#262422] space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Search Input (5 cols) */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-[#7a746a] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specimen title, alloy, or SKU..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] focus:border-[#e9c176] text-xs font-jakarta text-white placeholder-[#7a746a] outline-none"
            />
          </div>

          {/* Collection Filter (3 cols) */}
          <div className="lg:col-span-3">
            <select
              value={collectionFilter}
              onChange={(e) => setCollectionFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-jakarta text-[#a8a196] outline-none cursor-pointer"
            >
              <option value="all">All Collections ({products.length})</option>
              <option value="sculptural">Curated Sculptural Forms</option>
              <option value="silver">Monolithic Silver</option>
              <option value="gold">Solid Gold 18K</option>
              <option value="timeless">Timeless Collection</option>
            </select>
          </div>

          {/* Stock Filter (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-jakarta text-[#a8a196] outline-none cursor-pointer"
            >
              <option value="all">All Cadence</option>
              <option value="in_stock">In Stock Only</option>
              <option value="low_stock">Low Stock Only</option>
              <option value="preorder">Pre-Order Only</option>
            </select>
          </div>

          {/* Sort Filter (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-jakarta text-[#a8a196] outline-none cursor-pointer"
            >
              <option value="default">Default Sequence</option>
              <option value="price-high">Valuation: High to Low</option>
              <option value="price-low">Valuation: Low to High</option>
              <option value="title-az">Alphabetical A-Z</option>
            </select>
          </div>
        </div>

        {/* Secondary Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#211f1e] text-xs font-jakarta">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-[#a8a196] cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={(e) => setFeaturedOnly(e.target.checked)}
                className="rounded bg-[#1f1d1b] border-[#3d3832] text-[#e9c176] focus:ring-0"
              />
              <span>Featured on Homepage Carousel Only</span>
            </label>

            <button
              onClick={() => setIsReorderMode(!isReorderMode)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                isReorderMode
                  ? 'bg-[#e9c176] text-[#141312] font-semibold'
                  : 'bg-[#1f1d1b] text-[#9c9589] hover:text-white border border-[#2d2a26]'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{isReorderMode ? 'Reorder Mode Active' : 'Drag Reorder'}</span>
            </button>
          </div>

          <span className="text-[11px] font-mono-code text-[#7a746a]">
            Displaying {sortedProducts.length} of {products.length} Specimens
          </span>
        </div>
      </div>

      {/* Product Rows List */}
      <div className="space-y-3">
        {sortedProducts.map((product, idx) => (
          <div
            key={product.id}
            className="p-4 rounded-2xl bg-[#181615] hover:bg-[#1b1917] border border-[#262422] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
          >
            {/* Left: Drag Handle, Image, Title & SKU */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {isReorderMode && (
                <div className="flex flex-col gap-1 text-[#7a746a] cursor-grab">
                  <GripVertical className="w-4 h-4" />
                </div>
              )}

              {/* Imagery with Primary Badge */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-[#332f2a] shrink-0">
                <img
                  src={product.primaryImage}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono-code text-[#e9c176] font-semibold">
                  PRIMARY
                </span>
              </div>

              {/* Title, SKU & Metallurgy */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3
                    onClick={() => openDrawerForEdit(product)}
                    className="font-playfair text-base font-medium text-white group-hover:text-[#e9c176] transition-colors truncate cursor-pointer"
                  >
                    {product.title}
                  </h3>

                  {product.isHeroKeyPiece && (
                    <span className="px-2 py-0.5 rounded-full bg-[#e9c176]/15 text-[#e9c176] text-[10px] font-mono-code font-bold">
                      KEY PIECE
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-jakarta text-[#7a746a]">
                  <span className="font-mono-code text-[11px] text-[#a8a196]">{product.sku}</span>
                  <span>·</span>
                  <span>{product.metal}</span>
                  <span>·</span>
                  <span className="px-2 py-0.5 rounded bg-[#211f1e] text-[10px] text-[#a8a196]">
                    {product.collectionName}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Valuation, Stock Cadence, Star Toggle & Actions */}
            <div className="flex items-center gap-6 justify-between md:justify-end shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#211f1e]">
              
              {/* Valuation */}
              <div className="text-right">
                <div className="flex items-baseline gap-1.5 justify-end">
                  {product.salePrice && (
                    <span className="text-xs text-[#7a746a] line-through font-mono-code">
                      ${product.regularPrice}
                    </span>
                  )}
                  <span className="font-mono-code text-base font-bold text-white">
                    ${product.salePrice || product.regularPrice}
                  </span>
                </div>
                <span className="text-[10px] font-mono-code text-[#7a746a] block">
                  USD Exclusive Tax
                </span>
              </div>

              {/* Stock Cadence */}
              <div className="w-28 text-left md:text-right">
                {product.stockStatus === 'in_stock' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-[11px] font-mono-code">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Vault ({product.stock})
                  </span>
                ) : product.stockStatus === 'low_stock' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-800 text-amber-300 text-[11px] font-mono-code">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Low ({product.stock})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-950/60 border border-sky-800 text-sky-300 text-[11px] font-mono-code">
                    Pre-Order
                  </span>
                )}
              </div>

              {/* Homepage Feature Star Toggle */}
              <button
                onClick={() => onToggleFeatured(product.id)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  product.featured
                    ? 'bg-[#e9c176]/20 border-[#e9c176] text-[#e9c176]'
                    : 'bg-[#1f1d1b] border-[#2d2a26] text-[#7a746a] hover:text-white'
                }`}
                title={product.featured ? 'Curated on Storefront (Click to unpin)' : 'Pin to Storefront Carousel'}
              >
                <Star className={`w-4 h-4 ${product.featured ? 'fill-current' : ''}`} />
              </button>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openDrawerForEdit(product)}
                  className="p-2 rounded-xl bg-[#24211d] hover:bg-[#332f2a] text-[#e9c176] border border-[#3d3832] transition-colors cursor-pointer"
                  title="Inspect / Edit Specimen"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDuplicateProduct(product.id)}
                  className="p-2 rounded-xl bg-[#1f1d1b] hover:bg-[#292623] text-[#9c9589] hover:text-white border border-[#2d2a26] transition-colors cursor-pointer"
                  title="Duplicate Specimen Ledger"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(product.id)}
                  className="p-2 rounded-xl bg-[#1f1d1b] hover:bg-red-950/40 text-[#7a746a] hover:text-red-400 border border-[#2d2a26] transition-colors cursor-pointer"
                  title="Purge Specimen from Database"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Slide-over Specimen Inspector Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setDrawerOpen(false)} />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xl bg-[#181615] text-[#fcf9f2] border-l border-[#262422] shadow-2xl flex flex-col justify-between overflow-y-auto">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#262422] flex items-center justify-between sticky top-0 bg-[#181615] z-10">
                <div>
                  <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#e9c176]">
                    Specimen Dossier
                  </span>
                  <h3 className="font-playfair text-xl text-white font-medium">
                    {activeEditingProduct ? `Edit ${activeEditingProduct.title}` : 'Register New Sculptural Specimen'}
                  </h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#211f1e] hover:bg-[#2b2723] text-[#9c9589] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Form Body */}
              <form id="specimen-form" onSubmit={handleSaveProduct} className="p-6 space-y-6 flex-1">
                
                {/* Title & SKU */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                      Specimen Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-jakarta text-white outline-none focus:border-[#e9c176]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                      Gemological SKU *
                    </label>
                    <input
                      type="text"
                      required
                      value={formSku}
                      onChange={(e) => setFormSku(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-mono-code text-white outline-none focus:border-[#e9c176]"
                    />
                  </div>
                </div>

                {/* Narrative Description */}
                <div>
                  <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                    Sculptural Narrative & Provenance Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formNarrative}
                    onChange={(e) => setFormNarrative(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-jakarta text-white outline-none focus:border-[#e9c176] resize-none"
                  />
                </div>

                {/* Prices: Regular & Sale */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                      Regular Valuation ($ USD) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formRegularPrice}
                      onChange={(e) => setFormRegularPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-mono-code text-white outline-none focus:border-[#e9c176]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                      Sale Valuation ($ USD, Optional)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formSalePrice || ''}
                      onChange={(e) => setFormSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Leave empty for standard"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-mono-code text-white outline-none focus:border-[#e9c176]"
                    />
                  </div>
                </div>

                {/* Collection & Metallurgy */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                      Assigned Collection
                    </label>
                    <select
                      value={formCollection}
                      onChange={(e) => setFormCollection(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-jakarta text-white outline-none cursor-pointer"
                    >
                      <option value="sculptural">Curated Sculptural Forms</option>
                      <option value="silver">Monolithic Silver</option>
                      <option value="gold">Solid Gold 18K</option>
                      <option value="timeless">Timeless Collection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                      Metal & Alloy
                    </label>
                    <input
                      type="text"
                      value={formMetal}
                      onChange={(e) => setFormMetal(e.target.value)}
                      placeholder="e.g. Solid 18K Honey Gold"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-jakarta text-white outline-none focus:border-[#e9c176]"
                    />
                  </div>
                </div>

                {/* Stock Vault Count & Cadence */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                      Physical Vault Quantity
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formStock}
                      onChange={(e) => setFormStock(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-mono-code text-white outline-none focus:border-[#e9c176]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                      Stock Cadence
                    </label>
                    <select
                      value={formStockStatus}
                      onChange={(e) => setFormStockStatus(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-jakarta text-white outline-none cursor-pointer"
                    >
                      <option value="in_stock">In Stock (Immediate Release)</option>
                      <option value="low_stock">Low Stock Allocation</option>
                      <option value="preorder">Pre-Order (14 Days Cast)</option>
                    </select>
                  </div>
                </div>

                {/* Dimensions, Mass & Provenance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                      Physical Dimensions
                    </label>
                    <input
                      type="text"
                      value={formDimensions}
                      onChange={(e) => setFormDimensions(e.target.value)}
                      placeholder="Internal diameter: 62mm"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-jakarta text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                      Calculated Mass (Weight)
                    </label>
                    <input
                      type="text"
                      value={formWeight}
                      onChange={(e) => setFormWeight(e.target.value)}
                      placeholder="86.2g"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-mono-code text-white outline-none"
                    />
                  </div>
                </div>

                {/* Supabase CDN Imagery Vault */}
                <div className="p-4 rounded-2xl bg-[#141312] border border-[#262422] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#e9c176]">
                      Supabase CDN Imagery Vault
                    </span>
                    <span className="text-[10px] text-[#7a746a]">S3 Bucket v3</span>
                  </div>

                  {/* Primary Image URL */}
                  <div>
                    <label className="block text-[11px] font-jakarta text-[#9c9589] mb-1">
                      Primary Presentation URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formPrimaryImage}
                      onChange={(e) => setFormPrimaryImage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#1b1917] border border-[#2d2a26] text-xs font-mono-code text-[#e9c176] outline-none"
                    />
                  </div>

                  {/* Secondary Image URL */}
                  <div>
                    <label className="block text-[11px] font-jakarta text-[#9c9589] mb-1">
                      Secondary Hover Flip URL
                    </label>
                    <input
                      type="url"
                      value={formSecondaryImage}
                      onChange={(e) => setFormSecondaryImage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#1b1917] border border-[#2d2a26] text-xs font-mono-code text-[#a8a196] outline-none"
                    />
                  </div>

                  {/* Additional Gallery List */}
                  <div>
                    <label className="block text-[11px] font-jakarta text-[#9c9589] mb-1">
                      Additional Perspective Angles ({formGalleryImages.length})
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="Paste image CDN URL..."
                        className="flex-1 px-3 py-1.5 rounded-xl bg-[#1b1917] border border-[#2d2a26] text-xs font-mono-code text-white outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddGalleryImage}
                        className="px-3 py-1.5 rounded-xl bg-[#24211d] hover:bg-[#332f2a] text-[#e9c176] text-xs font-jakarta font-medium border border-[#3d3832] cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formGalleryImages.map((img, idx) => (
                        <div key={idx} className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#3d3832] group">
                          <img src={img} alt="angle" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="absolute inset-0 bg-red-950/80 text-red-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Curated on Homepage Carousel */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26]">
                  <input
                    type="checkbox"
                    id="form-featured"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="rounded bg-[#141312] border-[#3d3832] text-[#e9c176]"
                  />
                  <label htmlFor="form-featured" className="text-xs font-jakarta text-white cursor-pointer select-none">
                    Curated Homepage Specimen (Featured on Exhibition Showcase)
                  </label>
                </div>

              </form>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-[#262422] bg-[#141312] flex items-center justify-between sticky bottom-0">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#211f1e] hover:bg-[#2b2723] text-[#9c9589] hover:text-white text-xs font-jakarta transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="specimen-form"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#e9c176] hover:bg-[#c5a059] text-[#141312] text-xs font-jakarta font-semibold transition-colors cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save to Supabase</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-[#181615] border border-[#3d3832] p-6 text-[#fcf9f2] space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950/50 border border-red-800 text-red-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-playfair text-lg text-white font-medium">
                Purge Specimen from Vault?
              </h4>
              <p className="font-jakarta text-xs text-[#9c9589] mt-1 leading-relaxed">
                This action permanently purges the SKU ledger entry and invalidates all active provenance certificates.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#211f1e] hover:bg-[#2b2723] text-xs font-jakarta text-[#9c9589] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-800 hover:bg-red-700 text-xs font-jakarta font-semibold text-white cursor-pointer"
              >
                Confirm Purge
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
