import { createSlice } from '@reduxjs/toolkit';
import  {FormData} from "../../shared/types/register/types.ts";
import {fetchFormData} from "../actions/formDataActions.ts";
import {RootState} from "../providers/store/store.ts";
import {Option} from "../../features/Select/Select.tsx";

interface RegisterState {
    formData: FormData[];
    userData: { [key: string]: string | Option }[];

    error: string | null;
}

const initialState: RegisterState = {
    formData: [],
    userData:[],
    error: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData =  action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFormData.fulfilled, (state, action) => {
            state.formData = action.payload;
        });
    },
});
export const { setUserData } = registerSlice.actions;

export const selectFormData = (state: RootState) => state.register.formData;
export const selectUserData = (state: RootState) => state.register.userData;

export default registerSlice.reducer;
