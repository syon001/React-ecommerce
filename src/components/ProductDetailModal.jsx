import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartWithQty } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';

const ProductDetailModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const wishlist = useSelector(state => state.wishlist.items);
  const cart = useSelector(state => state.cart.items);
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const inCart = cart.some(item => item.id === product.id);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!inCart) {
      dispatch(addToCartWithQty({ product, quantity }));
    }
  };

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-grid">
          <img src={product.image} alt={product.title} className="modal-image" />
          <div className="modal-info">
            <h2>{product.title}</h2>
            <p className="modal-category">{product.category}</p>
            <p className="modal-description">{product.description}</p>
            <div className="modal-price">
              ${product.price.toFixed(2)}
              {product.originalPrice && <span>${product.originalPrice.toFixed(2)}</span>}
            </div>
            <div className="modal-rating">
              <i className="fas fa-star"></i> {product.rating} ({product.reviews} reviews)
            </div>

            <button 
              className={`modal-wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={handleWishlistToggle}
            >
              <i className="fas fa-heart"></i> {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>

            {/* Quantity selector – disabled if already in cart */}
            {/* <div className="modal-quantity">
              <label>Quantity:</label>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={inCart}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} disabled={inCart}>+</button>
            </div> */}

            <button 
              className={`modal-add-btn ${inCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
              disabled={inCart}
            >
              <i className={inCart ? "fas fa-check" : "fas fa-cart-plus"}></i> 
              {inCart ? ' Already in Cart' : ` Add to Cart (${quantity})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
