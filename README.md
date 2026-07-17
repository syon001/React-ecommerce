# 🛍️ ShopDestination – E-Commerce Store

A modern, responsive e‑commerce web application built with React and Redux. ShopDestination lets users browse a rich product catalog, filter and sort items, manage a wishlist, and maintain a shopping cart with real‑time total calculation – all powered by a live product API.

## ✨ Features

- **Product listing** – Grid view with images, titles, prices, ratings, and original price (if discounted)  
- **Search** – Filter products by title or category in real‑time  
- **Category filter** – Dropdown to narrow products by category  
- **Sorting** – Sort by price (low‑to‑high / high‑to‑low) or average rating  
- **Wishlist** – Save favorite items with a heart toggle; badge count updates instantly  
- **Shopping cart** – Add/remove items, adjust quantities, and see the total sum update live  
- **Cart badge** – Shows the number of distinct products, not total quantity  
- **Product detail modal** – Click any product to view full description, larger image, wishlist toggle, and quantity selector (disables “Add to Cart” if already in cart)  
- **Pagination** – Products are paginated (6 per page) with numeric page controls  
- **Promotional banner** – Displays upcoming offers on the home page  
- **Fully responsive** – Optimized for desktop, tablet, and mobile devices  
- **State management** – Redux Toolkit with slices for products, cart, wishlist, and filters  
- **Async data fetching** – Retrieves products from the [DummyJSON API](https://dummyjson.com/products) using `createAsyncThunk`

## 🧰 Technologies Used

- **React 18** – UI library with functional components and hooks  
- **Redux Toolkit** – State management with slices, actions, and memoized selectors  
- **React‑Redux** – Connecting React components to the Redux store  
- **Axios** (or Fetch) – HTTP client for API requests  
- **CSS3** – Custom styles with flexbox, grid, animations, and glass‑morphism  
- **Font Awesome** – Icon library for a polished UI  
- **Vite** – Fast build tool and development server  
- **DummyJSON API** – Provides realistic product data (100+ items)
