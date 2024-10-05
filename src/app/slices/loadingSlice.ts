import { createSlice } from '@reduxjs/toolkit';
import {fetchFormData} from "../actions/formDataActions.ts";

const initialState = {
    loading: false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFormData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchFormData.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchFormData.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
