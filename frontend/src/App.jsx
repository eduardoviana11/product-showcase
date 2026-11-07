import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Discos from './pages/Discos';
import Newsletter from './pages/Newsletter';
import ProductDetail from './pages/ProductDetail';
import CreatorProfile from './pages/CreatorProfile';
import Colecoes from './pages/Colecoes';
import Carrinho from './pages/Carrinho';
import { getProductId } from './utils/slug';

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [vinylRecords, setVinylRecords] = useState([]);
  const [sceneObjects, setSceneObjects] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch live catalog from Flask API /api/showcase
  useEffect(() => {
    fetch('/api/showcase')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API fetch failed');
      })
      .then((data) => {
        if (data.vinyl_records) {
          setVinylRecords(data.vinyl_records);
        }
        if (data.scene_objects) {
          setSceneObjects(data.scene_objects);
        }
        if (data.collections) {
          setCollections(data.collections);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching catalog from backend:', err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    const id = getProductId(product);
    setCartItems((prev) => {
      const existing = prev.find((item) => getProductId(item.product) === id);
      if (existing) {
        return prev.map((item) =>
          getProductId(item.product) === id
            ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setToastMessage(`Adicionado ao carrinho: ${product.name}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleChangeQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        getProductId(item.product) === id
          ? { ...item, quantity: Math.min(quantity, 99) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => getProductId(item.product) !== id));
  };

  const unifiedCatalogElement = (
    <Discos
      vinylRecords={vinylRecords}
      sceneObjects={sceneObjects}
      onAddToCart={handleAddToCart}
    />
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      {loading ? (
        <div className="min-h-screen bg-[#F4F2E9] text-[#141512] font-['Inter'] flex flex-col items-center justify-center selection:bg-[#C5F43B]">
          <div className="flex flex-col items-center gap-4 select-none">
            <span className="font-['Anton'] text-5xl sm:text-6xl tracking-widest uppercase text-[#141512]">
              ZUNO
            </span>
            <div className="w-16 h-1 bg-[#141512]/15 relative overflow-hidden rounded-full">
              <div className="absolute inset-y-0 left-0 w-1/2 bg-[#C5F43B] animate-pulse" />
            </div>
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.14em] text-[#141512]/60">
              Carregando catálogo...
            </span>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-[#F4F2E9] text-[#141512] font-['Inter'] selection:bg-[#C5F43B] selection:text-[#141512] flex flex-col">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-[#141512] text-[#F4F2E9] border-2 border-[#C5F43B] px-5 py-3 font-['IBM_Plex_Mono'] text-xs font-semibold shadow-[4px_4px_0px_#C5F43B]">
              {toastMessage}
            </div>
          )}

          {/* Global Header */}
          <Header
            cartCount={cartCount}
            vinylRecords={vinylRecords}
            sceneObjects={sceneObjects}
          />

          {/* Main Routed Content */}
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    vinylRecords={vinylRecords}
                    collections={collections}
                    sceneObjects={sceneObjects}
                    onAddToCart={handleAddToCart}
                  />
                }
              />
              <Route
                path="/colecoes"
                element={
                  <Colecoes
                    vinylRecords={vinylRecords}
                    collections={collections}
                    onAddToCart={handleAddToCart}
                  />
                }
              />
              {/* Unified Catalog & Search Screen with Generalized Filters */}
              <Route path="/discos" element={unifiedCatalogElement} />
              <Route path="/objetos" element={unifiedCatalogElement} />
              <Route path="/busca" element={unifiedCatalogElement} />
              <Route
                path="/newsletter"
                element={
                  <Newsletter
                    onAddToCart={handleAddToCart}
                  />
                }
              />
              <Route
                path="/carrinho"
                element={
                  <Carrinho
                    cartItems={cartItems}
                    onChangeQuantity={handleChangeQuantity}
                    onRemoveItem={handleRemoveItem}
                  />
                }
              />
              <Route
                path="/produto/:id"
                element={
                  <ProductDetail
                    vinylRecords={vinylRecords}
                    sceneObjects={sceneObjects}
                    onAddToCart={handleAddToCart}
                  />
                }
              />
              <Route
                path="/artista/:slug?"
                element={
                  <CreatorProfile
                    vinylRecords={vinylRecords}
                    sceneObjects={sceneObjects}
                    onAddToCart={handleAddToCart}
                  />
                }
              />
              <Route
                path="/loja/:slug?"
                element={
                  <CreatorProfile
                    vinylRecords={vinylRecords}
                    sceneObjects={sceneObjects}
                    onAddToCart={handleAddToCart}
                  />
                }
              />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
}
