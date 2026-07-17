import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/productsSlice';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import ProductDetailModal from './components/ProductDetailModal';

function App() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'cart') setActiveTab('cart');
      else if (hash === 'wishlist') setActiveTab('wishlist');
      else setActiveTab('home');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <ProductList onProductClick={setSelectedProduct} />;
      case 'cart': return <CartPage onProductClick={setSelectedProduct} />;
      case 'wishlist': return <WishlistPage onProductClick={setSelectedProduct} />;
      default: return <ProductList onProductClick={setSelectedProduct} />;
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <div className="tab-nav">
          <button className={activeTab === 'home' ? 'active' : ''} onClick={() => { setActiveTab('home'); window.location.hash = ''; }}>
            <i className="fas fa-th"></i> Products
          </button>
          <button className={activeTab === 'wishlist' ? 'active' : ''} onClick={() => { setActiveTab('wishlist'); window.location.hash = 'wishlist'; }}>
            <i className="fas fa-heart"></i> Wishlist
          </button>
          <button className={activeTab === 'cart' ? 'active' : ''} onClick={() => { setActiveTab('cart'); window.location.hash = 'cart'; }}>
            <i className="fas fa-shopping-cart"></i> Cart
          </button>
        </div>
        {renderContent()}
      </div>
      <div className="footer">
        &copy; 2026 <a href="#">ShopVerse</a> — Built with React & Redux
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default App;