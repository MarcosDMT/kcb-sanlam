import * as Yup from "yup";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import LoadingButton from '@mui/lab/LoadingButton';
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import {Autocomplete,Divider,} from "@mui/material";
import DMTNormalRadioButtons from "../../../@dmt-components/form/radio-button";
import {calculateAge} from "../../../@dmt-components/form/datepicker";
import {paymentFrequencies} from "../../../../api-requests/data/payment-section-data";
import DMTBankBranches from "../../../@dmt-components/form/bank-branches-select";
import toast from "react-hot-toast";
import React, {useEffect, useState} from "react";
import DMTPaymentTerms from "../../../@dmt-components/form/payment-terms-select";
import {utilsApi} from "../../../../api-requests/utils-api";
import {e, getAutoCompleteValue} from "../../../../utils/helper-functions";
import {DatePicker} from "@mui/x-date-pickers";
import DMTDropdown from "../../../@dmt-components/form/dropdown";
import DMTBanks from "../../../@dmt-components/form/banks-select";
import MKButton from "../../../@mui-components/button";
import PaymentDeclarationSection from "./declaration-section";




const DEDUCTION_TYPE = [
    {
        id: 1,
        label: 'Bank Deduction',
        value: 'bank',
    },
    {
        id: 2,
        label: 'Salary Deduction',
        value: 'salary',
    },
    {
        id: 3,
        label: 'MPESA Deduction - Global VISA TBA',
        value: 'mpesa',
    }
];





const PaymentDetailsForm = props => {
    const { handleOnStepChange, responsesDetails, onSave, minPremium, maxPremium, productId, handleBack } = props;
    const initialValues = {
        sumAssured: responsesDetails.paymentInfo?.sumAssured ?? "",
        coverPremium: responsesDetails.paymentInfo?.coverPremium ?? "",
        policyFee: responsesDetails.paymentInfo?.policyFee ?? "",
        term: responsesDetails.paymentInfo?.term  ?? "",
        termId: responsesDetails.paymentInfo?.term  ?? "",
        compensationLevy: responsesDetails.paymentInfo?.compensationLevy ?? "",
        totalPremiumPayable: responsesDetails.paymentInfo?.totalPremiumPayable ?? "",
        bankName: responsesDetails.paymentInfo?.bankName ?? "",
        branchName: responsesDetails.paymentInfo?.branchName ?? "",
        accountType: responsesDetails.paymentInfo?.accountType ?? "Current",
        accountName: responsesDetails.paymentInfo?.accountName ?? "",
        accountNumber: responsesDetails.paymentInfo?.accountNumber ?? "",
        amountDeducted: responsesDetails.paymentInfo?.amountDeducted ??"",
        deductionDate: responsesDetails.paymentInfo?.deductionDate ?? null,
        frequency: responsesDetails.paymentInfo?.frequency ?? "",
        deductionType: responsesDetails.paymentInfo?.deductionType ?? null,
        employer: responsesDetails.paymentInfo?.employer ?? "",
        staffNo: responsesDetails.paymentInfo?.staffNo ?? "",
        employerAddress: responsesDetails.paymentInfo?.employerAddress ?? ""
    }
    const validationSchema = Yup.object({
        sumAssured: Yup.number().required('Sum Assured is required').min(0, 'Amount should be more than equal to 0'),
        //coverPremium: Yup.number().required('Cover Premium is required').min(0, 'Amount should be more than equal to 0'),
        //policyFee: Yup.number().required('Policy Fee is required').min(0, 'Amount should be more than equal to 0'),
        term: Yup.number().required('Term is required').min(0, 'Term should be more than equal to 0'),
        termId: Yup.number(),
        //compensationLevy: Yup.number().required('Policy Compensation Levy is required').min(0, 'Amount should be more than equal to 0'),
        totalPremiumPayable: Yup.number().required('Total Premium is required')
            .min(minPremium, `Total Premium must be greater or equal to ${minPremium}`)
            .max(maxPremium ?? 1000000000000, `Total Premium must not exceed ${maxPremium ?? 1000000000000}`),
        branchName: Yup.string().required('Branch Name is required'),
        bankName: Yup.string().required('Bank Nam is required'),
        accountType: Yup.string().required('Account type is required'),
        accountName: Yup.string().required('Account Name is required'),
        accountNumber: Yup.string().required('Account Number is required').min(13,'Account Number should be 13 characters').max(13, 'Account Number should be 13 characters'),
        amountDeducted: Yup.string().required('Amount  is required'),
        frequency: Yup.string().required('Frequency is required'),
        deductionDate: Yup.string().required('Deduction Date is required').nullable(),
        deductionType: Yup.string().required('Deduction Type is required'),
    });

    const handleOnSave = async () => {
        try {
            const values = {...responsesDetails, paymentInfo: {...formik.values}};
            await onSave(values);
            handleOnClose();
            handleOnStepChange();
        }
        catch (e) {
            toast.error(e.message)
            formik.setStatus({ success: false });
            formik.setErrors({ submit: e.message });
            formik.setSubmitting(false);
        }

    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        //validationSchema,
        onSubmit: async (values, helpers) => {
              setOpenDialog(true);
        }
    })
    const handleOnChange = (name, value) => {
        formik.setFieldValue(name, e(value));
    }
    const [openDialog, setOpenDialog] = useState(false);

    const handleOnClose = () => {
        setOpenDialog(false);
    }


    useEffect(() => {
       formik.setFieldValue('amountDeducted', e(formik.values.totalPremiumPayable))
    }, [formik.values.totalPremiumPayable]);

    const computeRates = async () => {
        if (formik.values.sumAssured !== '' && formik.values.frequency !== '' && formik.values.termId !== ''){
            const dob = responsesDetails.personalDetails?.dob ?? 18;
            const age = calculateAge(dob);
            const values = {
                productId: productId,
                sumAssured: formik.values.sumAssured,
                age: age,
                termId: formik.values.termId,
                frequency: formik.values.frequency,
            }
            try{
                const res = await utilsApi.fetchComputeRates(values)
                if (res?.success){
                    formik.setFieldValue('coverPremium', res.coverPremium);
                    formik.setFieldValue('compensationLevy', res.compensationLevy);
                    formik.setFieldValue('totalPremiumPayable', res.totalPremium);
                    formik.setFieldValue('policyFee', res.policyFee);
                }
               // console.log(res);
            }catch (e) {
                console.log(e)
            }
        }else{
            formik.setFieldValue('coverPremium', formik.initialValues.coverPremium);
            formik.setFieldValue('compensationLevy', formik.initialValues.compensationLevy);
            formik.setFieldValue('totalPremiumPayable', formik.initialValues.totalPremiumPayable);
            formik.setFieldValue('policyFee', formik.initialValues.policyFee);
        }
    }

    useEffect(() => {
       computeRates();
    },[formik.values.frequency, formik.values.termId])

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid spacing={2} container alignItems={'center'} sx={{mt:1}}>
                    <Grid item sm={12} xs={12} md={2}></Grid>
                    <Grid item sm={12} xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} sm={12}>
                                <Divider >
                                    <MKTypography variant={'h6'} color={'dark'}>Premium Details</MKTypography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <DMTTextInput
                                    label={'Sum Assured'}
                                    fullWidth
                                    type={'number'}
                                    onChange={formik.handleChange}
                                    value={formik.values.sumAssured}
                                    error={Boolean(formik?.touched.sumAssured && formik?.errors.sumAssured)}
                                    helperText={formik?.touched.sumAssured && formik?.errors.sumAssured}
                                    onBlur={e => {
                                        formik.handleBlur(e);
                                        computeRates();
                                    }}
                                    placeholder={'Sum assured'}
                                    name={'sumAssured'}
                                    //required={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <DMTPaymentTerms {...{
                                    label:'Term (Years)',
                                    onChange: (value)=>{
                                        if (value){
                                            handleOnChange('term', value.term);
                                            handleOnChange('termId', value.id);
                                        }else {
                                            handleOnChange('term', "");
                                            handleOnChange('termId', "");
                                        }
                                        },
                                    value: formik.values.term,
                                    productId:productId,
                                    error:Boolean(formik?.touched.term && formik?.errors.term),
                                    helperText:formik?.touched.term && formik?.errors.term,
                                    onBlur:formik.handleBlur,
                                    //required: true,
                                }}
                                />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12} >
                                <DMTDropdown
                                    label={'Frequency'}
                                    onBlur={formik.handleBlur}
                                    //required={true}
                                    error = {Boolean(formik?.touched.frequency && formik?.errors.frequency)}
                                    helperText = {Boolean(formik?.touched.frequency && formik?.errors.frequency)}
                                    onChange={value => handleOnChange('frequency', value)}
                                    options={paymentFrequencies}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <DMTTextInput
                                    label={'Total Premium'}
                                    fullWidth
                                    type={'number'}
                                    onChange={formik.handleChange}
                                    value={formik.values.totalPremiumPayable}
                                    error={Boolean(formik?.touched.totalPremiumPayable && formik?.errors.totalPremiumPayable)}
                                    helperText={formik?.touched.totalPremiumPayable && formik?.errors.totalPremiumPayable}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Total Premium Payable'}
                                    name={'totalPremiumPayable'}
                                    //required={true}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item md={12} sm={12} xs={12}>
                                <MKTypography gutterBottom color={'primary'} variant={'h4'} sx={{ mt: 4}}>
                                    <Divider >
                                        <MKTypography variant={'h6'} color={'dark'}>Deduction Details</MKTypography>
                                    </Divider>
                                </MKTypography>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12} >
                                <DMTTextInput
                                    label={'Amount to be debited'}
                                    fullWidth
                                    type={'number'}
                                    onChange={formik.handleChange}
                                    value={formik.values.amountDeducted}
                                    error={Boolean(formik?.touched.amountDeducted && formik?.errors.amountDeducted)}
                                    helperText={formik?.touched.amountDeducted && formik?.errors.amountDeducted}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Enter amount'}
                                    name={'amountDeducted'}
                                    //required={true}
                                />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12} >
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    value={formik.values.deductionDate}
                                    onChange={(e, value)=>handleOnChange('deductionDate', value)}
                                    renderInput={(params) => <DMTTextInput
                                        {...params}
                                        label={'Deduction Date'}
                                        fullWidth
                                        //required
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'off', // disable autocomplete and autofill
                                        }}
                                    />}
                                />

                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <Autocomplete
                                    options={DEDUCTION_TYPE}
                                    autoHighlight
                                    onChange={(e, newValue) =>handleOnChange('deductionType', newValue?.value)}
                                    value={getAutoCompleteValue(DEDUCTION_TYPE, formik.values.deductionType, 'value')}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <DMTTextInput
                                            {...params}
                                            label="Deduction Method"
                                            //required={true}
                                            error={Boolean(formik.touched.deductionType && formik.errors.deductionType)}
                                            onBlur={formik.handleBlur}
                                            helperText={formik.touched.deductionType && formik.errors.deductionType}
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'off',

                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        { formik.values.deductionType === 'bank' && (
                            <>
                                <Grid container spacing={2} >
                                    <Grid item md={12} sm={12} xs={12}>
                                        <MKTypography gutterBottom color={'primary'} variant={'h4'} sx={{ mt: 4}}>
                                            <Divider >
                                                <MKTypography variant={'h6'} color={'dark'}>Bank Details</MKTypography>
                                            </Divider>
                                        </MKTypography>
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12} >
                                        <DMTBanks {...{
                                            label:'Bank Name',
                                            onChange: (value)=>handleOnChange('bankName', value),
                                            value: formik.values.bankName,
                                            error:Boolean(formik?.touched.bankName && formik?.errors.bankName),
                                            helperText:formik?.touched.bankName && formik?.errors.bankName,
                                            onBlur:formik.handleBlur,
                                            ////required: true,
                                        }}
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12} >
                                        <DMTBankBranches {...{
                                            label:'Branch Name',
                                            bankID: formik.values.bankName,
                                            onChange: (value)=>handleOnChange('branchName', value),
                                            value: formik.values.branchName,
                                            error:Boolean(formik?.touched.branchName && formik?.errors.branchName),
                                            helperText:formik?.touched.branchName && formik?.errors.branchName,
                                            onBlur:formik.handleBlur,
                                            //required: true,
                                        }}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <DMTNormalRadioButtons {...{
                                            name: 'accountType',
                                            options: ['Current'],
                                            label: 'Account Type',
                                            value: formik.values.accountType,
                                            error:Boolean(formik?.touched.accountType && formik?.errors.accountType),
                                            helperText:formik?.touched.accountType && formik?.errors.accountType,
                                            onChange: (value)=>handleOnChange('accountType', value)
                                        }}
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <DMTTextInput
                                            label={'Account Name'}
                                            fullWidth
                                            type={'text'}
                                            onChange={e => handleOnChange('accountName', e.target.value)}
                                            value={formik.values.accountName}
                                            error={Boolean(formik?.touched.accountName && formik?.errors.accountName)}
                                            helperText={formik?.touched.accountName && formik?.errors.accountName}
                                            onBlur={formik.handleBlur}
                                            placeholder={'Enter the account name'}
                                            name={'accountName'}
                                            //required={true}
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <DMTTextInput
                                            label={'Account Number'}
                                            fullWidth
                                            type={'text'}
                                            onChange={e =>  handleOnChange('accountNumber', e.target.value)}
                                            value={formik.values.accountNumber}
                                            error={Boolean(formik?.touched.accountNumber && formik?.errors.accountNumber)}
                                            helperText={formik?.touched.accountNumber && formik?.errors.accountNumber}
                                            onBlur={formik.handleBlur}
                                            placeholder={'Enter the account number'}
                                            name={'accountNumber'}
                                            //required={true}
                                        />
                                    </Grid>
                                </Grid>
                            </>
                        )}
                        { formik.values.deductionType === 'salary' && (
                            <>
                                <Grid container spacing={2} >
                                    <Grid item md={12} sm={12} xs={12}>
                                        <MKTypography gutterBottom color={'primary'} variant={'h4'} sx={{ mt: 4}}>
                                            <Divider >
                                                <MKTypography variant={'h6'} color={'dark'}>Employer Details</MKTypography>
                                            </Divider>
                                        </MKTypography>
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12} >
                                        <DMTTextInput
                                            label={'Employer/Business Name'}
                                            fullWidth
                                            onChange={e => handleOnChange('employer', e.target.value) }
                                            value={formik.values.employer}
                                            error={Boolean(formik?.touched.employer && formik?.errors.employer)}
                                            helperText={formik?.touched.employer && formik?.errors.employer}
                                            onBlur={formik.handleBlur}
                                            //placeholder={'Enter Emp'}
                                            name={'employer'}
                                            //required={true}
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12} >
                                        <DMTTextInput
                                            label={'Staff Number'}
                                            fullWidth
                                            onChange={e => handleOnChange('staffNo', e.target.value) }
                                            value={formik.values.staffNo}
                                            error={Boolean(formik?.touched.staffNo && formik?.errors.staffNo)}
                                            helperText={formik?.touched.staffNo && formik?.errors.staffNo}
                                            onBlur={formik.handleBlur}
                                            //placeholder={'Enter Emp'}
                                            name={'staffNo'}
                                            //required={true}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <DMTTextInput
                                            label={'Employer Address'}
                                            fullWidth
                                            multiline={true}
                                            minRows={2}
                                            onChange={e => handleOnChange('employerAddress', e.target.value) }
                                            value={formik.values.employerAddress}
                                            error={Boolean(formik?.touched.employerAddress && formik?.errors.employerAddress)}
                                            helperText={formik?.touched.employerAddress && formik?.errors.employerAddress}
                                            onBlur={formik.handleBlur}
                                            //placeholder={'Enter Emp'}
                                            name={'employerAddress'}
                                            ////required={true}
                                        />
                                    </Grid>
                                </Grid>
                            </>
                        )}

                        <MKBox
                            sx={{
                                display: 'flex',
                                justifyContent:'space-between',
                                mt:5
                            }}
                        >
                            <MKButton
                                sx={{ml:1}}
                                color={'primary'}
                                //onClick={handleBack}
                                disabled={true}
                            >
                                Back
                            </MKButton>
                            <LoadingButton
                                loading={formik.isSubmitting}
                                loadingPosition="start"
                                variant="contained"
                                color={'primary'}
                                type={'submit'}
                            >
                                Next
                            </LoadingButton>
                        </MKBox>
                    </Grid>
                </Grid>
            </form>
            <PaymentDeclarationSection {...{open: openDialog, onClose: handleOnClose, onSave: handleOnSave}}/>
        </>
    )

}

export default PaymentDetailsForm;