import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import ProductCard from './ProductCard';
import Banner from './Banner';
import Pagination from './Pagination';
import { setSearch, setCategory, setSort, resetFilters } from '../store/filterSlice';

const ITEMS_PER_PAGE = 20;

const selectFilteredProducts = createSelector(
  [(state) => state.products.items, (state) => state.filters],
  (products, filters) => {
    let result = [...products];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }

    switch (filters.sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }
);

const ProductList = ({ onProductClick }) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const filteredProducts = useSelector(selectFilteredProducts);
  const allProducts = useSelector(state => state.products.items);

  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, filters.category, filters.sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const categories = ['All', ...new Set(allProducts.map(p => p.category))];

  return (
    <div>
      {/* Banner at top of home page */}
      <Banner />

      <div className="toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <button><i className="fas fa-search"></i></button>
        </div>
        <div className="filters">
          <select value={filters.category} onChange={(e) => dispatch(setCategory(e.target.value))}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={filters.sort} onChange={(e) => dispatch(setSort(e.target.value))}>
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
          <button className="clear-btn" onClick={() => {
            dispatch(resetFilters());
            setCurrentPage(1);
          }}>
            <i className="fas fa-times"></i> Clear
          </button>
        </div>
      </div>

      <div className="product-grid">
        {paginatedProducts.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <i className="fas fa-box-open"></i>
            <h3>No products found</h3>
            <p>Try adjusting your filters.</p>
          </div>
        ) : (
          paginatedProducts.map(p => (
            <ProductCard key={p.id} product={p} onProductClick={onProductClick} />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;