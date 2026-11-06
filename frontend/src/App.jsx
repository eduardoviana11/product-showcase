import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {
  fallbackVinylRecords,
  fallbackSceneObjects,
  showcaseCollections,
} from './data/showcaseData';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Discos from './pages/Discos';
import Newsletter from './pages/Newsletter';
import ProductDetail from './pages/ProductDetail';
import CreatorProfile from './pages/CreatorProfile';
import Colecoes from './pages/Colecoes';

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [vinylRecords, setVinylRecords] = useState(fallbackVinylRecords);
  const [sceneObjects, setSceneObjects] = useState(fallbackSceneObjects);
  const [collections, setCollections] = useState(showcaseCollections);
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch live catalog from Flask API /api/showcase
  useEffect(() => {
    fetch('/api/showcase')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API fetch failed');
      })
      .then((data) => {
        if (data.vinyl_records && data.vinyl_records.length > 0) {
          setVinylRecords(data.vinyl_records);
        }
        if (data.scene_objects && data.scene_objects.length > 0) {
          setSceneObjects(data.scene_objects);
        }
        if (data.collections && data.collections.length > 0) {
          setCollections(data.collections);
        }
      })
      .catch((err) => {
        console.info('Operating with built-in showcase catalog data:', err.message);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    setToastMessage(`Adicionado ao carrinho: ${product.name}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleCartClick = () => {
    setToastMessage(`Carrinho: ${cartCount} ${cartCount === 1 ? 'item adicionado' : 'itens adicionados'}.`);
    setTimeout(() => setToastMessage(''), 3000);
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
          onCartClick={handleCartClick}
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
              path="/artista/:slug"
              element={
                <CreatorProfile
                  vinylRecords={vinylRecords}
                  sceneObjects={sceneObjects}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/loja/:slug"
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
    </BrowserRouter>
  );
}
