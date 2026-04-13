import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductState {
  items: Product[];
  filteredItems: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
  sortBy: string;
  currentPage: number;
  itemsPerPage: number;
}

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products",
      );
    }
  },
);

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  status: "idle",
  error: null,
  searchTerm: "",
  sortBy: "name-asc",
  currentPage: 1,
  itemsPerPage: 8,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
      state.filteredItems = applyFilters(state);
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      state.filteredItems = applyFilters(state);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = applyFilters(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

const applyFilters = (state: ProductState): Product[] => {
  let result = [...state.items];

  // Search filter
  if (state.searchTerm) {
    result = result.filter((item) =>
      item.title.toLowerCase().includes(state.searchTerm.toLowerCase()),
    );
  }

  // Sorting
  switch (state.sortBy) {
    case "name-asc":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return result;
};

export const { setSearchTerm, setSortBy, setCurrentPage } =
  productSlice.actions;

export default productSlice.reducer;
