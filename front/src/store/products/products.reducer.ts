import { ActionCreatorWithoutPayload, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { Product } from "generated/types";
import { AsyncState, FetchStatus } from "types/asyncState";
import {
    createProductAction,
    deleteProductAction,
    getProductByIdAction,
    getProductListAction,
    getSearchProductListAction,
} from "./products.actions";

export interface ProductState extends AsyncState {
    tobacco?: Product;
    tobaccos?: Product[];
    availableBrands?: (string | undefined)[];
    error: unknown;
}

const initialState: ProductState = {
    tobacco: undefined,
    tobaccos: [],
    status: FetchStatus.IDLE,
    availableBrands: [],
    error: undefined,
};

const tobaccoSlice = createSlice<ProductState, SliceCaseReducers<ProductState>>({
    name: "tobacco",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(createProductAction.pending, (state) => {
            state.status = FetchStatus.PENDING;
            state.error = null;
        });
        builder.addCase(createProductAction.fulfilled, (state, { payload }) => {
            state.status = FetchStatus.FULFILLED;
            state.tobacco = payload;
            state.tobaccos = [...(state?.tobaccos ?? []), payload];
        });
        builder.addCase(createProductAction.rejected, (state, { error }) => {
            state.status = FetchStatus.REJECTED;
            state.error = error;
        });

        builder.addCase(getProductListAction.pending, (state) => {
            state.status = FetchStatus.PENDING;
            state.error = null;
        });
        builder.addCase(getProductListAction.fulfilled, (state, { payload }) => {
            state.status = FetchStatus.FULFILLED;
            const availableBrands: (string | undefined)[] = [];
            payload?.forEach(
                (product) => !availableBrands.includes(product.brand) && availableBrands.push(product.brand)
            );
            state.availableBrands = availableBrands;
            state.tobaccos = payload;
        });
        builder.addCase(getProductListAction.rejected, (state, { error }) => {
            state.status = FetchStatus.REJECTED;
            state.error = error;
        });

        builder.addCase(getSearchProductListAction.pending, (state) => {
            state.status = FetchStatus.PENDING;
            state.error = null;
        });
        builder.addCase(getSearchProductListAction.fulfilled, (state, { payload }) => {
            state.status = FetchStatus.FULFILLED;
            state.tobaccos = payload;
        });
        builder.addCase(getSearchProductListAction.rejected, (state, { error }) => {
            state.status = FetchStatus.REJECTED;
            state.error = error;
        });

        builder.addCase(getProductByIdAction.pending, (state) => {
            state.status = FetchStatus.PENDING;
            state.error = null;
        });
        builder.addCase(getProductByIdAction.fulfilled, (state, { payload }) => {
            state.status = FetchStatus.FULFILLED;
            state.tobacco = payload;
        });
        builder.addCase(getProductByIdAction.rejected, (state, { error }) => {
            state.status = FetchStatus.REJECTED;
            state.error = error;
        });

        builder.addCase(deleteProductAction.pending, (state) => {
            state.error = null;
        });
        builder.addCase(deleteProductAction.fulfilled, (state, action) => {
            state.tobaccos = state.tobaccos?.filter((tobacco) => tobacco.id !== action.meta.arg);
        });
        builder.addCase(deleteProductAction.rejected, (state, { error }) => {
            state.status = FetchStatus.REJECTED;

            state.error = error;
        });
    },
});

export const resetProductState = tobaccoSlice.actions.reset as ActionCreatorWithoutPayload<string>;
export const { filterProducts } = tobaccoSlice.actions;
export const tobaccoReducer = tobaccoSlice.reducer;
