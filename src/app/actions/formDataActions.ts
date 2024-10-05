import { createAsyncThunk } from '@reduxjs/toolkit';
import {getFormData} from "../../shared/api/register.ts";

export const fetchFormData = createAsyncThunk(
    'register/fetchFormData',
    async () => {
        const response = await getFormData();
        return response.data;
    }
);
