import {configureStore } from '@reduxjs/toolkit'
import reducers from "../slices";
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from "react-redux";

export const store = configureStore({
    reducer: {...reducers},
    middleware:  getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }
    ),
})

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();
