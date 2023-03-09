import {createSlice} from "@reduxjs/toolkit";
import {utilsApi} from "../api-requests/utils-api";

const initialState = {
    banks: [],
    branches: [],
    terms: [],
}
const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        fetchBranches: (state, action) => {
            state.branches= action.payload;
        },
        fetchBanks: (state, action) => {
          state.banks = action.payload;
        },
        fetchTerms: (state, action) => {
            state.terms= action.payload;
        },
    }
});

export const {
    fetchBranches,
    fetchBanks,
    fetchTerms,
} = utilsSlice.actions;

export const fetchBankBranches = (bankID) => async  dispatch => {
    const data = await utilsApi.fetchBranches(bankID);
    dispatch(fetchBranches(data))
}
export const fetchAllBanks = () => async  dispatch => {
    const data = await utilsApi.fetchAllBanks();
    dispatch(fetchBanks(data))
}
export const fetchPaymentTerms = (productId) => async  dispatch => {
    const data = await utilsApi.fetchTerms(productId);
    dispatch(fetchTerms(data))
}



export default utilsSlice.reducer