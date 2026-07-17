import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
    category: 'All',
    sort: 'default'
  },
  reducers: {
    setSearch: (state, action) => { state.search = action.payload; },
    setCategory: (state, action) => { state.category = action.payload; },
    setSort: (state, action) => { state.sort = action.payload; },
    resetFilters: (state) => {
      state.search = '';
      state.category = 'All';
      state.sort = 'default';
    }
  }
});

export const { setSearch, setCategory, setSort, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;