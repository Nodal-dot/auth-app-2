import { configureStore } from '@reduxjs/toolkit'
import formDataReducer from '../../slices/registerSlice.ts'
import loadingReducer from '../../slices/loadingSlice.ts'
export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        register: formDataReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
