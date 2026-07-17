import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products?limit=100');
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data.products;
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description || '', // added
          category: item.category,
          price: item.price,
          originalPrice: null,
          rating: item.rating || 4.0,
          reviews: item.reviewsCount || 0,
          image: item.thumbnail || item.images?.[0] || '',
          images: item.images || [], // added for gallery
          inStock: item.stock > 0
        }));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default productsSlice.reducer;