export interface Product {
  id: string;
  sku: string;
  title: string;
  narrative: string;
  regularPrice: number;
  salePrice?: number;
  collection: 'sculptural' | 'silver' | 'gold' | 'timeless' | 'raw';
  collectionName: string;
  metal: string;
  stock: number;
  stockStatus: 'in_stock' | 'low_stock' | 'preorder' | 'made_to_order' | 'archived';
  featured: boolean;
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  isHeroKeyPiece?: boolean;
  dimensions?: string;
  weight?: string;
  caratWeight?: string;
  purityMark?: string;
  provenanceCert?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  size: string;
  format: string;
  resolution: string;
  url: string;
  alt: string;
  category: 'all' | 'hero' | 'rings' | 'collars' | 'cuffs' | 'earrings' | 'editorial' | 'craftsmanship';
  liveLinksCount: number;
  productLink?: string;
  isVideo?: boolean;
  videoDuration?: string;
  colorProfile?: string;
  uploadedAt: string;
  needsWebP?: boolean;
}

export interface HomepageConfig {
  heroHeadline: string;
  heroSubtitle: string;
  heroVideoUrl: string;
  heroPosterUrl: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaUrl: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaUrl: string;
  floatingPills: string[];
  keyPieceSku: string;
  exhibitHeadline: string;
  exhibitSubtitle: string;
  exhibitSlot1Sku: string;
  exhibitSlot2Sku: string;
  exhibitSlot3Sku: string;
  vipBannerTitle: string;
  vipBannerSubtitle: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMetal?: string;
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  location: string;
  icon: string;
  type: 'price' | 'media' | 'product' | 'security' | 'publish';
}
