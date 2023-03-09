import {useFormik} from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import DMTFileInput from "../../../@dmt-components/form/file-input";
import toast from "react-hot-toast";
import {e} from "../../../../utils/helper-functions";
import {Divider} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {Save} from "@mui/icons-material";
import MKButton from "../../../@mui-components/button";
import React from "react";


const ALLOWED_DOCUMENTS = {
    error: 'File format is unsupported.',
    formats: ['.pdf', '.png',
        '.jpg', '.jpeg', '.xls', '.xlsx',],
    accept: ".pdf, .png, .jpg, .jpeg, .xls, .xlsx"
}

const checkIfValid = (file) => {
    if (file){
        return ALLOWED_DOCUMENTS.formats.includes(file.extension);
    }
    return true
}

const FileAttachment = props => {
    const {
        handleOnStepChange,
        responsesDetails,
        onSave,
        productId,
        handleBack,
    } = props;
    const initialValues = {
        sumAssured: responsesDetails.paymentInfo?.sumAssured ?? "",
        coverPremium: responsesDetails.paymentInfo?.coverPremium ?? "",
        policyFee: responsesDetails.paymentInfo?.policyFee ?? "",
        term: responsesDetails.paymentInfo?.term  ?? "",
        termId: responsesDetails.paymentInfo?.term  ?? "",
        compensationLevy: responsesDetails.paymentInfo?.compensationLevy ?? "",
        totalPremiumPayable: responsesDetails.paymentInfo?.totalPremiumPayable ?? "",
        branchName: responsesDetails.paymentInfo?.branchName ?? "",
        accountType: responsesDetails.paymentInfo?.accountType ?? "Current",
        accountName: responsesDetails.paymentInfo?.accountName ?? "",
        accountNumber: responsesDetails.paymentInfo?.accountNumber ?? "",
        amountDeducted: responsesDetails.paymentInfo?.amountDeducted ??"",
        deductionDate: responsesDetails.paymentInfo?.deductionDate ?? "",
        frequency: responsesDetails.paymentInfo?.frequency ?? "",
        document1: responsesDetails.paymentInfo?.document1 ?? null,
        document2: responsesDetails.paymentInfo?.document2 ?? null,
        document3: responsesDetails.paymentInfo?.document3 ?? null,
        document4: responsesDetails.paymentInfo?.document4 ?? null,
        document5: responsesDetails.paymentInfo?.document5 ?? null,
    }

    const validationSchema = Yup.object({
        document1: Yup.object().required('Upload a document').nullable().test('type',ALLOWED_DOCUMENTS.error, checkIfValid),
        document2: Yup.object().nullable().test('type',ALLOWED_DOCUMENTS.error, checkIfValid),
        document3: Yup.object().nullable().test('type',ALLOWED_DOCUMENTS.error, checkIfValid),
        document4: Yup.object().nullable().test('type',ALLOWED_DOCUMENTS.error, checkIfValid),
        document5: Yup.object().nullable().test('type',ALLOWED_DOCUMENTS.error, checkIfValid),
    });

    const handleOnChange = (name, value) => {
        formik.setFieldValue(name, value);
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            const data = {...responsesDetails, paymentInfo: {...values}};
            try {
                await onSave(data);
                handleOnStepChange();
            }
            catch (e) {
                toast.error(e.message)
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: e.message });
                helpers.setSubmitting(false);
            }
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Grid container spacing={2} alignItems={'center'} sx={{mt:1}}>
                    <Grid item sm={12} xs={12} md={2}></Grid>
                    <Grid item sm={12}  xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Divider >
                                    <MKTypography variant={'h6'} color={'dark'}>File Attachments</MKTypography>
                                </Divider>
                            </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <DMTFileInput
                                        label={'Policy holder National ID/Passport'}
                                        fullWidth
                                        onChange={(value)=>handleOnChange('document1', value)}
                                        value={formik.values?.document1?.name}
                                        error={Boolean(formik?.touched.document1 && formik?.errors.document1)}
                                        helperText={formik?.touched.document1 && formik?.errors.document1}
                                        onBlur={formik.handleBlur}
                                        placeholder={'Choose Document'}
                                        name={'document1'}
                                        required={true}
                                        inputProps={{
                                            accept: ALLOWED_DOCUMENTS.accept
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <DMTFileInput
                                        label={'MID'}
                                        fullWidth
                                        onChange={(value)=>handleOnChange('document2', value)}
                                        value={formik.values?.document2?.name}
                                        error={Boolean(formik?.touched.document2 && formik?.errors.document2)}
                                        helperText={formik?.touched.document2 && formik?.errors.document2}
                                        onBlur={formik.handleBlur}
                                        placeholder={'Choose Document'}
                                        name={'document2'}
                                        inputProps={{
                                            accept: ALLOWED_DOCUMENTS.accept
                                        }}
                                        // required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <DMTFileInput
                                        label={'IFNA'}
                                        fullWidth
                                        onChange={(value)=>handleOnChange('document3', value)}
                                        value={formik.values?.document3?.name}
                                        error={Boolean(formik?.touched.document3 && formik?.errors.document3)}
                                        helperText={formik?.touched.document3 && formik?.errors.document3}
                                        onBlur={formik.handleBlur}
                                        placeholder={'Choose Document'}
                                        name={'document3'}
                                        inputProps={{
                                            accept: ALLOWED_DOCUMENTS.accept
                                        }}
                                        // required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <DMTFileInput
                                        label={'Bronchure'}
                                        fullWidth
                                        onChange={(value)=>handleOnChange('document4', value)}
                                        value={formik.values.document4?.name}
                                        error={Boolean(formik?.touched.document4 && formik?.errors.document4)}
                                        helperText={formik?.touched.document4 && formik?.errors.document4}
                                        onBlur={formik.handleBlur}
                                        placeholder={'Choose Document'}
                                        name={'document4'}
                                        inputProps={{
                                            accept: ALLOWED_DOCUMENTS.accept
                                        }}
                                        // required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <DMTFileInput
                                        label={'Other documents '}
                                        fullWidth
                                        onChange={(value)=>handleOnChange('document5', value)}
                                        value={formik.values?.document5?.name}
                                        error={Boolean(formik?.touched.document5 && formik?.errors.document5)}
                                        helperText={formik?.touched.document5 && formik?.errors.document5}
                                        onBlur={formik.handleBlur}
                                        placeholder={'Choose Document'}
                                        name={'document5'}
                                        inputProps={{
                                            accept: ALLOWED_DOCUMENTS.accept
                                        }}
                                        // required={true}
                                    />
                                </Grid>

                            <Grid item xs={12} sm={12} md={12}>
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
                                        onClick={handleBack}
                                    >
                                        Back
                                    </MKButton>
                                    <LoadingButton
                                        loading={formik.isSubmitting}
                                        loadingPosition="start"
                                        //startIcon={<Save />}
                                        variant="contained"
                                        color={'primary'}
                                        type={'submit'}
                                    >
                                        Next
                                    </LoadingButton>
                                </MKBox>
                            </Grid>

                            </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default FileAttachment;