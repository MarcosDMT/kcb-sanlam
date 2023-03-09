import {axiosInstance} from "./axios-instance";
import { APP_API_URL} from "../utils/api-endpoints";

import SimpleCrypto from  'simple-crypto-js'

const secretKey = new SimpleCrypto(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);

class UtilsApi {
    verifyAgent(agentCode) {
        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.VERIFY_AGENT, { agentCode}).then( res => {
                resolve(res.data);
            }).catch(e => {
                reject();
                console.log(e.message);
            })
        })
    }
    fetchAllBanks(){
        return new Promise((resolve, reject) => {
            axiosInstance.get(APP_API_URL.GET_BANKS).then( res => {
                resolve(res.data);
            }).catch(e => {
                reject();
                console.log(e.message);
            })
        })
    }
    fetchBranches(bankID){
        return new Promise((resolve, reject) => {
            axiosInstance.get(APP_API_URL.GET_BANK_BRANCHES).then( res => {
                resolve(res.data);
            }).catch(e => {
                reject();
                console.log(e.message);
            })
        })
    }

    fetchTerms(productId){
        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.GET_BANK_TERMS,{ productId: productId}).then( res => {
                if (res.data?.length > 0){
                    resolve(res.data.sort((a,b) => (a.term > b.term) ? 1 : (a.term < b.term) ? -1 : 0));
                }
                else{
                    reject()
                }
            }).catch(e => {
                reject();
                console.log(e.message);
            })
        })
    }
    fetchComputeRates(values){
        const data = {
            productId: values.productId,
            sumassured: parseFloat(values.sumAssured),
            termId: parseFloat(values.termId),
            age:  parseFloat(values.age),
            frequency : values.frequency?.replace(/ /g,'').toLowerCase(),
        }
        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.GET_RATES, data).then( res => {
                resolve(res.data);
            }).catch(e => {
                reject();
                console.log(e.message);
            })
        })
    }
    sendContactDetails(values){
        const data = {
            name: values.name,
            email: values.email,
            location: values.location,
        }
        const encryptedData = {
            data: secretKey.encrypt(data)
        };
        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.POST_CONTACT_DETAILS, encryptedData).then( response => {
                const data = secretKey.decrypt(response.data);
                if (data.success){
                    resolve(data.errorMsg);
                }
                else{
                    reject( new Error( "An error occurred! Try again"))
                }
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }

}

export const utilsApi = new UtilsApi();