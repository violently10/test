import React, { useState } from 'react';
import { useAtelierStore } from './state/atelierStore';
import { StorefrontHeader } from './components/storefront/StorefrontHeader';
import { HeroSection } from './components/storefront/HeroSection';
import { CuratedExhibitionSection } from './components/storefront/CuratedExhibitionSection';
import { StorySection } from './components/storefront/StorySection';
import { StorefrontFooter } from './components/storefront/StorefrontFooter';
import { ProductQuickViewModal } from './components/storefront/ProductQuickViewModal';
import { CartSlideOver } from './components/storefront/CartSlideOver';

// Admin Views
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminTopHeader } from './components/admin/AdminTopHeader';
import { AdminCommandPalette } from './components/admin/AdminCommandPalette';
import { DashboardView } from './components/admin/views/DashboardView';
import { ProductsCatalogView } from './components/admin/views/ProductsCatalogView';
import { HomepageEditorView } from './components/admin/views/HomepageEditorView';
import { MediaLibraryView } from './components/admin/views/MediaLibraryView';
import { AdminProfileView } from './components/admin/views/AdminProfileView';
import { InventoryVaultView } from './components/admin/views/InventoryVaultView';
import { SanctumLoginView } from './components/admin/views/SanctumLoginView';

// Global Components
import { NotificationToast } from './components/NotificationToast';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { Product } from './types';

export function App() {
  const {
    products,
    homepageConfig,
    mediaAssets,
    auditLog,
    cart,
    isAuthenticated,
    activeView,
    previewModalProduct,
    cartDrawerOpen,
    notificationsOpen,
    quickToast,
    setActiveView,
    setPreviewModalProduct,
    setCartDrawerOpen,
    setNotificationsOpen,
    showToast,
    updateProduct,
    addProduct,
    deleteProduct,
    duplicateProduct,
    reorderProducts,
    toggleProductFeatured,
    updateHomepageConfig,
    addMediaAsset,
    deleteMediaAsset,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    login,
    logout
  } = useAtelierStore();

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [editingProductFromExternal, setEditingProductFromExternal] = useState<Product | null>(null);

  // Key piece product for storefront hero
  const keyPiece = products.find((p) => p.sku === homepageConfig.keyPieceSku) || products[0];

  const handleNavigateSection = (sectionId: string) => {
    setActiveView('storefront');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleEnterSanctum = () => {
    if (isAuthenticated) {
      setActiveView('admin-dashboard');
    } else {
      setActiveView('sanctum-login');
    }
  };

  const handleSubscribeVip = (email: string) => {
    showToast(`Invitation sent to ${email}. Check your confidential inbox.`, 'mark_email_read');
  };

  const handleCheckout = () => {
    showToast('Order secured. Armored courier transfer manifest initiated.', 'verified');
    clearCart();
    setCartDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-[#1c1c18]">
      {/* Toast Notification Container */}
      <NotificationToast toast={quickToast} />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        auditLog={auditLog}
      />

      {/* Command Palette for ⌘K */}
      <AdminCommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        products={products}
        onSelectProduct={(p) => {
          setActiveView('admin-products');
          setEditingProductFromExternal(p);
        }}
        onNavigateView={(view) => setActiveView(view)}
        onAddNewProduct={() => {
          setActiveView('admin-products');
          addProduct({});
        }}
      />

      {/* ======================================================== */}
      {/* 1. PUBLIC STOREFRONT VIEW                                */}
      {/* ======================================================== */}
      {activeView === 'storefront' && (
        <div className="flex flex-col min-h-screen">
          {/* Quick Studio Switcher Bar for Reviewers & Curators */}
          <div className="bg-[#141312] text-[#e9c176] text-[11px] font-mono-code py-1.5 px-4 flex items-center justify-between border-b border-[#262422] z-50">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>THE Q · HAUTE SCULPTURE ATELIER</span>
              <span className="hidden sm:inline text-[#7a746a]">| Place Vendôme · Paris</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleEnterSanctum}
                className="hover:underline flex items-center gap-1 text-white font-jakarta text-[11px] cursor-pointer"
              >
                <span>{isAuthenticated ? 'Open Atelier Studio Console →' : 'Curator Login (Atelier Sanctum) →'}</span>
              </button>
            </div>
          </div>

          {/* Floating Navigation Header */}
          <StorefrontHeader
            cart={cart}
            onOpenCart={() => setCartDrawerOpen(true)}
            onEnterSanctum={handleEnterSanctum}
            isAuthenticated={isAuthenticated}
            onNavigateSection={handleNavigateSection}
          />

          {/* Main Content */}
          <main className="flex-1">
            {/* Hero Section */}
            <HeroSection
              config={homepageConfig}
              keyPiece={keyPiece}
              onSelectProduct={(p) => setPreviewModalProduct(p)}
              onShopClick={() => handleNavigateSection('sculptural-exhibit')}
              onStoryClick={() => handleNavigateSection('story-section')}
              onSubscribeVip={handleSubscribeVip}
            />

            {/* Curated Sculptural Exhibition */}
            <CuratedExhibitionSection
              products={products}
              config={homepageConfig}
              onSelectProduct={(p) => setPreviewModalProduct(p)}
              onAddToCart={(p) => addToCart(p)}
            />

            {/* Atelier Story Section */}
            <StorySection />
          </main>

          {/* Storefront Footer */}
          <StorefrontFooter
            config={homepageConfig}
            onEnterSanctum={handleEnterSanctum}
            onSubscribeVip={handleSubscribeVip}
          />

          {/* Specimen Quick View Modal */}
          <ProductQuickViewModal
            product={previewModalProduct}
            onClose={() => setPreviewModalProduct(null)}
            onAddToCart={(p) => addToCart(p)}
          />

          {/* Acquisition Bag Slide-Over Drawer */}
          <CartSlideOver
            isOpen={cartDrawerOpen}
            onClose={() => setCartDrawerOpen(false)}
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. ATELIER SANCTUM LOGIN GATEWAY                         */}
      {/* ======================================================== */}
      {activeView === 'sanctum-login' && (
        <SanctumLoginView
          onLogin={login}
          onReturnStorefront={() => setActiveView('storefront')}
          onShowToast={showToast}
        />
      )}

      {/* ======================================================== */}
      {/* 3. ATELIER STUDIO ADMIN SUITE                            */}
      {/* ======================================================== */}
      {activeView.startsWith('admin-') && (
        <div className="flex h-screen overflow-hidden bg-[#100f0e] text-[#fcf9f2]">
          {/* Studio Sidebar */}
          <AdminSidebar
            currentView={activeView}
            onSelectView={(v) => setActiveView(v)}
            onViewLiveStore={() => setActiveView('storefront')}
            onLogout={logout}
          />

          {/* Main Panel */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {/* Top Command Bar */}
            <AdminTopHeader
              onOpenCommandPalette={() => setCommandPaletteOpen(true)}
              onViewLiveStore={() => setActiveView('storefront')}
              onPublishToStorefront={() => showToast('Storefront synced to Supabase Edge CDN.')}
              onOpenNotifications={() => setNotificationsOpen(true)}
              unreadCount={auditLog.length}
              onSelectProfile={() => setActiveView('admin-profile')}
            />

            {/* Sub-Views */}
            <div className="flex-1 pb-16">
              {activeView === 'admin-dashboard' && (
                <DashboardView
                  products={products}
                  homepageConfig={homepageConfig}
                  auditLog={auditLog}
                  onAddNewProduct={() => {
                    setActiveView('admin-products');
                  }}
                  onEditProduct={(p) => {
                    setActiveView('admin-products');
                    setEditingProductFromExternal(p);
                  }}
                  onOpenHomepageEditor={() => setActiveView('admin-homepage-editor')}
                  onPublishStorefront={() => showToast('All pending adjustments pushed to production.')}
                  onToggleFeatured={toggleProductFeatured}
                />
              )}

              {activeView === 'admin-products' && (
                <ProductsCatalogView
                  products={products}
                  onUpdateProduct={updateProduct}
                  onAddProduct={addProduct}
                  onDeleteProduct={deleteProduct}
                  onDuplicateProduct={duplicateProduct}
                  onReorderProducts={reorderProducts}
                  onToggleFeatured={toggleProductFeatured}
                  editingProductFromExternal={editingProductFromExternal}
                  onClearEditingProduct={() => setEditingProductFromExternal(null)}
                />
              )}

              {activeView === 'admin-homepage-editor' && (
                <HomepageEditorView
                  config={homepageConfig}
                  products={products}
                  onSaveConfig={updateHomepageConfig}
                  onPublishStorefront={() => showToast('Homepage CMS deployed to live storefront!')}
                  onViewLiveStore={() => setActiveView('storefront')}
                />
              )}

              {activeView === 'admin-media' && (
                <MediaLibraryView
                  assets={mediaAssets}
                  onAddAsset={addMediaAsset}
                  onDeleteAsset={deleteMediaAsset}
                />
              )}

              {activeView === 'admin-profile' && (
                <AdminProfileView
                  auditLog={auditLog}
                  onShowToast={showToast}
                />
              )}

              {activeView === 'admin-vault' && (
                <InventoryVaultView
                  products={products}
                  onShowToast={showToast}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
