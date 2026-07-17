import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQty, decrementQty, clearCart } from '../store/cartSlice';

const CartPage = ({ onProductClick }) => {
  const cartItems = useSelector(state => state.cart.items);
  const total = useSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="page-section">
        <div className="empty-state">
          <i className="fas fa-shopping-cart"></i>
          <h3>Your cart is empty</h3>
          <p>Start adding some products!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">
      <h2><i className="fas fa-shopping-cart"></i> Your Cart</h2>
      {cartItems.map(item => (
        <div className="cart-item" key={item.id}>
          <div className="cart-item-clickable" onClick={() => onProductClick && onProductClick(item)}>
            <img src={item.image} alt={item.title} />
            <div className="info">
              <h4>{item.title}</h4>
              <div className="price">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
          <div className="qty-control">
            <button onClick={() => dispatch(decrementQty(item.id))}>
              <i className="fas fa-minus"></i>
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(incrementQty(item.id))}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      ))}
      <div className="cart-total">
        Total: <span>${total.toFixed(2)}</span>
        <br />
        <button onClick={() => dispatch(clearCart())} style={{ marginTop: '0.8rem', padding: '0.5rem 2rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          <i className="fas fa-trash"></i> Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;