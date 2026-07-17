import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../store/filterSlice';

const Navbar = () => {
  const cartCount = useSelector(state => state.cart.items.length); // 👈 changed
  const wishlistCount = useSelector(state => state.wishlist.items.length);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="logo">
        <i className="fas fa-store"></i> ShopDestination
      </div>
      <div className="nav-links">
        <a href="#" onClick={() => dispatch(setCategory('All'))}>
          <i className="fas fa-home"></i> Home
        </a>
        <a href="#wishlist">
          <i className="fas fa-heart"></i> Wishlist
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </a>
        <a href="#cart">
          <i className="fas fa-shopping-cart"></i> Cart
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;