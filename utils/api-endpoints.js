export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_URL = {
    POST_CREATE_PRODUCT: '/api/postdata/createproduct',
    POST_BIO_DATA: '/api/postdata/registercustomerexist',
    POST_HEALTH_DATA: '/api/postdata/createcustomerhealth',
    POST_BENEFICIARY_DATA: '/api/postdata/addbeneficiary',
    DELETE_BENEFICIARY: '/api/postdata/removebeneficiary',
    POST_CHILD_DATA: '/api/postdata/addchild',
    DELETE_CHILD: '/api/postdata/removechild',
    POST_PAYMENT_DATA: '/api/postdata/addpayments',
    POST_REFERRAL_DATA: '/api/postdata/addreferal',
    POST_COMPLETE_DATA: '/api/postdata/postcomplete',
    VERIFY_AGENT: '/api/agents/verifyagent',

    //-----------------------Utils------------------------//
    GET_BANK_BRANCHES: '/api/postdata/getbranches',
    GET_BANKS: '//api/postdata/getbanks',
    GET_BANK_TERMS: '/api/postdata/getterms',
    GET_RATES: '/api/postdata/calculaterates',
    POST_CONTACT_DETAILS: '/api/postdata/createnewcustomer'
}

export const APP_API_URL = {
    POST_CREATE_PRODUCT: '/api/product',
    POST_BIO_DATA: '/api/personal-details',
    POST_HEALTH_DATA: '/api/health',
    POST_BENEFICIARY_DATA: '/api/beneficiary',
    POST_CHILD_DATA: '/api/children',
    POST_PAYMENT_DATA: '/api/payment',
    POST_REFERRAL_DATA: '/api/referral',
    POST_COMPLETE_DATA: '/api/complete',
    VERIFY_AGENT: '/api/agent',

    //-----------------------Utils------------------------//
    GET_BANKS: '/api/banks',
    GET_BANK_BRANCHES: '/api/branches',
    GET_BANK_TERMS: '/api/terms',
    GET_RATES: '/api/compute-rates',
    POST_CONTACT_DETAILS: '/api/contact-us'
}

export const API_METHODS = {
    GET:'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}
