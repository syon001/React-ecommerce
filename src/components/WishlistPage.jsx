import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../store/wishlistSlice';

const WishlistPage = ({ onProductClick }) => {
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  if (wishlistItems.length === 0) {
    return (
      <div className="page-section">
        <div className="empty-state">
          <i className="fas fa-heart"></i>
          <h3>Wishlist is empty</h3>
          <p>Save your favorite items here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">
      <h2><i className="fas fa-heart" style={{ color: '#e74c3c' }}></i> Your Wishlist</h2>
      {wishlistItems.map(item => (
        <div className="wishlist-item" key={item.id}>
          <div className="wishlist-item-clickable" onClick={() => onProductClick && onProductClick(item)}>
            <img src={item.image} alt={item.title} />
            <div className="info">
              <h4>{item.title}</h4>
              <div className="price">${item.price.toFixed(2)}</div>
            </div>
          </div>
          <button className="remove-btn" onClick={() => dispatch(removeFromWishlist(item.id))}>
            <i className="fas fa-times-circle"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;