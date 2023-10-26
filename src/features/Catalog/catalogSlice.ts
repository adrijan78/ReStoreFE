import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: ProductParams;
}

const productsAdapter = createEntityAdapter<Product>();
const getAxiosParams = (productParams: ProductParams) => {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy);
  if (productParams.searchTerm)
    params.append("searchTerm", productParams.searchTerm);
  if (productParams.filterByBrand.length > 0)
    params.append("filterByBrand", productParams.filterByBrand.toString());
  if (productParams.filterByType.length > 0)
    params.append("filterByType", productParams.filterByType.toString());

  return params;
};

export const fetchProductsAsync = createAsyncThunk<
  {
    products: Product[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  },
  void,
  { state: RootState }
>("catalog/fetchProductsAsync", async (_, thunkApi) => {
  const params = getAxiosParams(thunkApi.getState().catalog.productParams);
  try {
    return await agent.Catalog.list(params);
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (id, thunkApi) => {
    try {
      return await agent.Catalog.details(id);
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchFilters = createAsyncThunk(
  "catalog/fetchFilters",
  async (_, thunkApi) => {
    try {
      return await agent.Catalog.fetchFilters();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

const initParams = () => {
  return {
    orderBy: "name",
    searchTerm: "",
    filterByBrand: [],
    filterByType: [],
    pageNumber: 1,
    pageSize: 6,
    totalPages: 0,
    totalCount: 0,
  };
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: initParams(),
  }),
  reducers: {
    setProductParams: (state, action) => {
      if (action.payload !== "pageNumber") {
        state.productParams.pageNumber = 1;
      }
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload.products);
      state.status = "idle";
      state.productsLoaded = true;
      state.productParams.totalCount = action.payload.totalCount;
      state.productParams.totalPages = action.payload.totalPages;
    });

    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
    builder.addCase(fetchFilters.pending, (state, action) => {
      console.log(action);
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filtersLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchFilters.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const productsSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const { setProductParams, resetProductParams } = catalogSlice.actions;
