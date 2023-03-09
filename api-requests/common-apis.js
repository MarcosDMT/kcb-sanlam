import educarePlusQuestions from "./data/educare-plus-data";
import {axiosInstance} from "./axios-instance";
import {API_URL, APP_API_URL} from "../utils/api-endpoints";
import moment from "moment";
import sanlamEducareQuestions from "./data/sanlam-educare-data";
import superEndowmentData from "./data/super-endowment-data";
import SimpleCrypto from  'simple-crypto-js'

const secretKey = new SimpleCrypto(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);

class CommonApis {
    fetchEducarePlusQuestions(){
        return new Promise((resolve, reject) => {
            resolve(educarePlusQuestions);
        })
    }
    fetchSanlamEducareQuestions(){
        return new Promise((resolve, reject) => {
            resolve(sanlamEducareQuestions);
        })
    }
    fetchSuperEndowmentQuestions () {
        return new Promise((resolve, reject) => {
            resolve(superEndowmentData);
        })
    }
    createEducarePlusProduct (customerId, product){
        const data = {
            id: 0,
            product: product,
            customerId: customerId,
        }
        const encryptedData = {
            data: secretKey.encrypt(data)
        };

        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.POST_CREATE_PRODUCT, encryptedData).then( response => {
                const data = secretKey.decrypt(response.data);
                if (data.success){
                    resolve(data.result);
                }
                else{
                    reject( new Error(data.errorMsg ?? "An error occurred! Try again"))
                }
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    updateBioDataDetails(customerId, values) {
        const data ={
            id: customerId,
            surname: values.surname ?? null,
            otherNames: values.otherNames ?? null,
            email: values.email ?? null,
            taxIdNumber: values.taxIdNumber ?? null,
            pin: values.pin ?? null,
            phoneNumber: values.phoneNumber.toString() ?? null,
            usAddress: values.usAddress ?? null,
            dob: values.dob ? moment(values.dob).format('DD-MMM-YYYY') : null,
            gender: values.gender ?? null,
            idNumber: values.idNumber?.toString() ?? null,
            idType: values.idType ?? null,
            nationality: values.nationality ?? null,
            residency: values.residency ?? null,
            occupation: values.occupation ?? null,
            employerName: values.employerName ?? null,
            role: values.role ?? null,
            employmentTerms: values.employmentTerms ?? null,
            businessname: values.businessname ?? null,
            natureofbusiness: values.natureofbusiness ?? null,
            roleinbusiness: values.roleinbusiness ?? null,
            stage: "biodata",
            step: 0
        }
        const encryptedData = {
            data: secretKey.encrypt(data)
        };
        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.POST_BIO_DATA,encryptedData).then( response => {
                const data = secretKey.decrypt(response.data);
                if (data?.success){
                    resolve(data?.result);
                }
                else{
                   reject( new Error(data?.errorMsg ?? "An error occurred! Try again"))
                }
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    updateHealthQuestions (customerId, productId, values){
        const data = {
            id: values.id ?? 0,
            customerId: customerId,
            productId: productId,
            qst1: values.qst1 ?? null,
            qst2: values.qst2 ?? null,
            qst3: values.qst3 ?? null,
            qst4: null,
            qst4_1: values.qst4_1 ?? null,
            qst4_2: values.qst4_2 ?? null,
            qst4_3: values.qst4_3 ?? null,
            qst4_4: values.qst4_4 ?? null,
            qst4_5: values.qst4_5 ?? null,
            qst4_6: values.qst4_6 ?? null,
            qst4_7: values.qst4_7 ?? null,
            qst4_8: values.qst4_8 ?? null,
            qst4_9: values.qst4_9 ?? null,
            qst4_10: values.qst4_10 ?? null,
            qst5_2: values.qst5_2 ?? null,
            qst5_1: values.qst5_1 ?? null,
            qst6:  values.qst6 ?? null,
            qst7_1: values.qst7_1 ? values.qst7_1.toString() : null,
            qst7_2: values.qst7_2 ? values.qst7_2.toString()  : null,
            qst7_3: values.qst7_3 ?? null,
            qst7_4: values.qst7_4 ?? null,
            qst8: values.qst8 ?? null,
            qst8_1: values.qst8_1 ?? null,
            qst8_2: values.qst8_2 ?? null,
            qst8_3: values.qst8_3 ?? null,
            qst8_4: values.qst8_4 ?? null,
            qst8_5: values.qst8_5 ?? null,
            qst8_6: values.qst8_6 ? values.qst8_6.toString()  : null,
            qst9: values.qst9 ?? null,
            qst10: values.qst10 ?? null,
            qst11: values.qst11 ?? null
        }
        const encryptedData = { data: secretKey.encrypt(data)};
        return new Promise((resolve, reject) => {
            axiosInstance.put(APP_API_URL.POST_HEALTH_DATA, encryptedData).then( response => {
                const data = secretKey.decrypt(response.data);
                if (data?.success){
                    resolve(data?.result);
                }
                else{
                    reject( new Error(data?.errorMsg ?? "An error occurred! Try again"))
                }
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    }
    updateChildDetails(customerId, productId, values){
        const data = {
            id: values.id ?? 0,
            customerId: customerId,
            productId: productId,
            surname: values.surname,
            otherNames: values.otherNames,
            gender: values.gender,
            dob: values.dob ? moment(values.dob).format('DD-MMM-YYYY') : null,
            relationship: values.relationship,
        }
        const encryptedData = {
            data: secretKey.encrypt(data)
        }

        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.POST_CHILD_DATA,encryptedData).then( res => {
                const data = secretKey.decrypt(res.data);
                if (data?.success){
                    resolve(data.result);
                }
                else{
                    reject( new Error(data.errorMsg ?? "An error occurred"))
                }
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    }
    //delete child
    deleteChild(customerId, childId) {
        const data ={
            customerId,
            childId,
        }
        const encryptedData = {
            data: secretKey.encrypt(data)
        }
        return new Promise((resolve, reject) => {
            axiosInstance.put(APP_API_URL.POST_CHILD_DATA,encryptedData).then( res => {
                const data = secretKey.decrypt(res.data);
                if (data?.success){
                    resolve(data.result);
                }
                else{
                    reject( new Error(data.errorMsg ?? "An error occurred"))
                }
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    }
    updateBeneficiary(customerId, productId, values){
        let guardianDetails = values.guardian;
        if (guardianDetails){
            guardianDetails = {
                ...guardianDetails,
                id: values.guardian.id ?? 0,
                beneficiaryId: values.id ?? 0,
                dob:  values.dob ? moment(values.guardian.dob).format('DD-MMM-YYYY'): ""
            }
        }
        const data = {
            beneficiary: {
                id: values.id ?? 0,
                customerId: customerId,
                productId: productId,
                surname: values.surname,
                otherNames: values.otherNames,
                email: values.email,
                date_of_birth: values.dob ? moment(values.dob).format('DD-MMM-YYYY') : "" ,
                phone: values.phone.toString(),
                gender: values.gender,
                percentage: values.percentage,
                relationship: values.relationship,
                idNumber: values.idNumber.toString(),
                idType: values.idType,
            },
            guardian: guardianDetails,
        }
        const encryptedData = {
            data: secretKey.encrypt(data)
        }

        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.POST_BENEFICIARY_DATA,encryptedData).then( res => {
                const data = secretKey.decrypt(res.data);
                if (data.success){
                    resolve(data.result);
                }
                else{
                    reject( new Error(data.errorMsg ?? "An error occurred! Try again"))
                }
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    //delete beneficiary
    deleteBeneficiary(customerId, beneficiaryId) {
        const data ={
            customerId,
           beneficiaryId,
        }
        const encryptedData = {
            data: secretKey.encrypt(data)
        }
        return new Promise((resolve, reject) => {
            axiosInstance.put(APP_API_URL.POST_BENEFICIARY_DATA,encryptedData).then( res => {
                const data = secretKey.decrypt(res.data);
                if (data?.success){
                    resolve(data.result);
                }
                else{
                    reject( new Error(data.errorMsg ?? "An error occurred"))
                }
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    }
    updatePaymentDetails(customerId, productId, values){
        const data ={
            id: values.id ?? 0,
            productId: productId,
            customerId: customerId,
            sumAssured: values.sumAssured,
            coverPremium: values.coverPremium,
            policyFee: values.policyFee,
            term: values.term,
            compensationLevy: values.compensationLevy,
            totalPremiumPayable: values.totalPremiumPayable,
            branchName: values.branchName,
            accountType: values.accountType,
            accountName: values.accountName,
            accountNumber: values.accountName,
            amountDeducted: values.amountDeducted,
            frequency: values.frequency,
            deductionDate: values.deductionDate ? moment(values.deductionDate).format('DD-MMM-YYYY') : "",
            ...values
        }
        const encryptedData = {
            data: secretKey.encrypt(data)
        }
        return new Promise((resolve, reject) => {
            axiosInstance.put(APP_API_URL.POST_PAYMENT_DATA,encryptedData).then( res => {
                const data = secretKey.decrypt(res.data);
                if (data.success){
                    resolve(data.result);
                }
                else{
                    reject( new Error(data.errorMsg ?? "An error occurred! Try again"))
                }
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    updateReferralDetails(customerId, productId, values){
        const data ={
            id: values.id ?? 0,
            customerId: customerId,
            productId: productId,
            fullNames: values.fullNames,
            branchName: values.branchName,
            phoneNumber: values.phoneNumber,
            code: values.code
        }
        const encryptedData = {
            data: secretKey.encrypt(data)
        }
        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.POST_REFERRAL_DATA,encryptedData).then( async res => {
                const data = secretKey.decrypt(res.data);
                if (data.success) {
                    //resolve(data.result);
                    try{
                      const res =  await this.completeRegistration(customerId, productId, values)
                        resolve(res);
                    }catch (e) {
                        reject(e.message)
                    }
                } else {
                    reject(new Error(data.errorMsg ?? "An error occurred! Try again"))
                }
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    completeRegistration(customerId, productId, values){
        const data = {
            customerId: customerId,
            signature: values.imageUrl,
            productId: productId,
            complete: true,
        }
        const encryptedData = {
            data: secretKey.encrypt(data)
        }
        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.POST_COMPLETE_DATA,encryptedData).then( res => {
                const data = secretKey.decrypt(res.data);

                if (data.success){
                    resolve(data.result);
                }
                else{
                    reject( new Error(data.errorMsg ?? "An error occurred! Try again"))
                }
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
}

export const commonApis = new CommonApis();