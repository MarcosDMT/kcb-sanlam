import { createSlice } from '@reduxjs/toolkit'
import {commonApis} from "../api-requests/common-apis";

const initialState = {
    customerId: 0,
    productId: null,
    responsesDetails: {
        personalDetails: {},
        healthInfo: {},
        beneficiaryInfo: [],
        paymentInfo:{},
        referralInfo:{},
    },
    activeSection:null,
    activeQuestion:null,
    questionSections: null,
}

const superEndowmentSlice = createSlice({
    name: 'super-endowment',
    initialState,
    reducers: {
        setCustomerId: (state, action) => {
          state.customerId = action.payload;
        },
        setProductId: (state, action) => {
          state.productId = action.payload;
        },
        fetchQuestions: (state, action) => {
            state.questionSections = action.payload;
        },
        addResponseDetails: (state, action) => {
            state.responsesDetails = action.payload;
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
        setActiveQuestion: (state, action) => {
            state.activeQuestion = action.payload;
        },
        setSectionCompleted: (state, action) => {
            const section = action.payload;
            let data;
            state.questionSections = state.questionSections.map((quiz) => {
                if (quiz.section === section){
                    data = {...quiz, completed: true};
                    return data;
                }
                return quiz
            })
        },
        resetValues: (state, action) => {
            state.customerId = initialState.customerId;
            state.responsesDetails = initialState.responsesDetails;
            state.activeSection = initialState.activeSection;
            state.activeQuestion =  initialState.activeQuestion;
            state.productId = initialState.productId;
            state.questionSections = initialState.questionSections;
        }
    }
});


export const {
    fetchQuestions,
    addResponseDetails,
    setActiveQuestion,
    setActiveSection,
    setCustomerId,
    resetValues,
    setSectionCompleted,
    setProductId,

} = superEndowmentSlice.actions;

export const getQuestions = () => async dispatch => {
    const data = await commonApis.fetchSuperEndowmentQuestions();
    dispatch(fetchQuestions(data));
}

export const saveDetails = (section, customerId, productId, details, index=0) => async dispatch => {
    // if (details.personalDetails?.email){
    //     const productName = 'endowment';
    //     if (section === 'personalDetails'){
    //         const values = {...details.personalDetails}
    //         const data = await commonApis.updateBioDataDetails(customerId, values);
    //         //update the biodata details
    //         if (data?.id){
    //             dispatch(setCustomerId(data.id));
    //             if (!productId){
    //                 const product = await commonApis.createEducarePlusProduct(data.id, productName);
    //                 if (product?.id){
    //                     dispatch(setProductId(product.id));
    //                 }
    //             }
    //             details.personalDetails = {...data}
    //         }
    //     }
    //     if (section === 'healthInfo'){
    //         const values = {...details.healthInfo}
    //         const data = await commonApis.updateHealthQuestions(customerId, productId, values);
    //         //update the health details
    //         if (data?.id){
    //             details.healthInfo = {...data}
    //         }
    //     }
    //     if (section === 'beneficiaryInfo'){
    //         const values = {...details.beneficiaryInfo[index]}
    //         const data = await commonApis.updateBeneficiary(customerId, productId, values);
    //         if (data?.beneficiary.id){
    //             details.beneficiaryInfo[index] = {...data.beneficiary,
    //                 dob: data.beneficiary.date_of_birth,
    //                 guardian: {...data.guardian}}
    //         }
    //     }
    //     if (section === 'paymentInfo'){
    //         const values = {...details.paymentInfo}
    //         const data = await commonApis.updatePaymentDetails(customerId, productId, values);
    //         if (data?.id){
    //             details.paymentInfo = {...data}
    //         }
    //     }
    //     if (section === 'referralInfo'){
    //         const values = {...details.referralInfo}
    //         const data = await commonApis.updateReferralDetails(customerId, productId, values);
    //         if (data){
    //             details.referralInfo = {...data}
    //         }
    //     }
    // }
    dispatch(addResponseDetails(details));
}
export const resetData = () => async dispatch => {
    dispatch(resetValues());
    dispatch(getQuestions());
}



export default superEndowmentSlice.reducer