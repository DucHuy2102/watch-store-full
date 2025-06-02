import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../interfaces/product.interface';
import { toast } from 'react-toastify';

interface IProductState {
    productCompare: IProduct[];
}

const initialState: IProductState = { productCompare: [] };

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProductCompare: (state, action: PayloadAction<IProduct>) => {
            const productInList = state.productCompare.find((p) => p._id === action.payload._id);
            if (productInList) {
                toast.error('Product already in compare list');
            } else {
                state.productCompare.push(action.payload);
            }
        },
        removeProductCompare: (state, action: PayloadAction<IProduct>) => {
            state.productCompare = state.productCompare.filter(
                (product) => product._id !== action.payload._id
            );
        },
        clearProductCompare: (state) => {
            state.productCompare = [];
        },
    },
});

export const { addProductCompare, removeProductCompare, clearProductCompare } =
    productSlice.actions;
export default productSlice.reducer;
