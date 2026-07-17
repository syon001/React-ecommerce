import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';

const ProductCard = ({ product, onProductClick }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);
  const cart = useSelector(state => state.cart.items);
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const inCart = cart.some(item => item.id === product.id);

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="img-wrap">
        <img src={product.image} alt={product.title} />
        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleWishlist(product));
          }}
        >
          <i className="fas fa-heart"></i>
        </button>
      </div>
      <div className="body">
        <div className="category">{product.category}</div>
        <div className="title">{product.title}</div>
        <div className="price">
          ${product.price.toFixed(2)}
          {product.originalPrice && <span>${product.originalPrice.toFixed(2)}</span>}
        </div>
        <div className="rating">
          <i className="fas fa-star"></i> {product.rating}
          <span>({product.reviews})</span>
        </div>
        <button
          className={`add-btn ${inCart ? 'in-cart' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!inCart) dispatch(addToCart(product));
          }}
          disabled={inCart}
        >
          {inCart ? <i className="fas fa-check"></i> : <i className="fas fa-plus"></i>}
          {inCart ? ' In Cart' : ' Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;