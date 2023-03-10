import MKBox from "../../../@mui-components/box";
import { useFormik} from "formik";
import * as Yup from 'yup';
import Grid from "@mui/material/Grid";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import MKTypography from "../../../@mui-components/typography";
import PaymentDeclarationSectionTwo from "./declaration-section-two";
import Disclaimer from "./disclaimer";
import SignatureSection from "./signature-section";
import {useState} from "react";
import DMTAlertModal from "../../../@dmt-components/alerts/modal-alert";
import {useDispatch } from "../../../../store";

import DMTBankBranches from "../../../@dmt-components/form/bank-branches-select";
import toast from "react-hot-toast";
import CommissionSection from "./commission-section";
import {Save} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {e} from "../../../../utils/helper-functions";
import MKButton from "../../../@mui-components/button";

const ReferralSection = props => {
    const {
        onSave,
        responsesDetails,
        resetValues,
        product,
    } = props;
    const dispatch = useDispatch();
    const initialValues ={
        fullNames:  responsesDetails.referralInfo?.fullNames ?? "",
        branchName: responsesDetails.referralInfo?.branchName ?? "",
        phoneNumber:  responsesDetails.referralInfo?.phoneNumber ?? "",
        code:  responsesDetails.referralInfo?.code ?? "",
        imageUrl: null,
    }
    const handleOnOk = () => {
        dispatch(resetValues());
        setOpenDialog(false);
    }
    const validationSchema = Yup.object({
        imageUrl: Yup.string().required('Signature is required!').nullable(),
    })
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit:async (values, helpers) => {
            const data = {...responsesDetails, referralInfo: {...values}};
            try {
                await onSave(data)
                setOpenDialog(true)
                helpers.resetForm();
            }
            catch (e) {
                toast.error(e.message)
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: e.message });
                helpers.setSubmitting(false);
            }

        }
    })

    const [openDialog, setOpenDialog] = useState(false);
    const handleOnChange = (name, value) => {
        formik.setFieldValue(name, e(value));
    }
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4} >
                    <Grid item xs={12} sm={12} md={6}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} md={12}>
                                <MKTypography sx={{ mt: 2}} variant={'h4'} color={'secondary'}>Relationship Manager</MKTypography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <DMTTextInput
                                    label={'Full Names'}
                                    fullWidth
                                    type={'text'}
                                    onChange={formik.handleChange}
                                    value={formik.values.fullNames}
                                    error={Boolean(formik?.touched.fullNames && formik?.errors.fullNames)}
                                    helperText={formik?.touched.fullNames && formik?.errors.fullNames}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Full Name'}
                                    name={'fullNames'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <DMTBankBranches {...{
                                    label: 'Branch Name',
                                    onChange: (value)=>handleOnChange('branchName', value),
                                    value: formik.values.branchName,
                                    error:Boolean(formik?.touched.branchName && formik?.errors.branchName),
                                    helperText:formik?.touched.branchName && formik?.errors.branchName,
                                    onBlur:formik.handleBlur,
                                    }}
                                />
                                {/*<DMTDropdown {...{*/}
                                {/*    onChange: (value)=>handleOnChange('branchName', value),*/}
                                {/*    value: formik.values.branchName,*/}
                                {/*    options: stanchartBranches,*/}
                                {/*    label: 'Branch',*/}
                                {/*    error:Boolean(formik?.touched.branchName && formik?.errors.branchName),*/}
                                {/*    helperText:formik?.touched.branchName && formik?.errors.branchName,*/}
                                {/*    onBlur:formik.handleBlur,*/}

                                {/*}}/>*/}
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <DMTTextInput
                                    label={'Mobile Number'}
                                    fullWidth
                                    type={'text'}
                                    onChange={formik.handleChange}
                                    value={formik.values.phoneNumber}
                                    error={Boolean(formik?.touched.phoneNumber && formik?.errors.phoneNumber)}
                                    helperText={formik?.touched.phoneNumber && formik?.errors.phoneNumber}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Mobile Number'}
                                    name={'phoneNumber'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <DMTTextInput
                                    label={'Staff ID'}
                                    fullWidth
                                    type={'text'}
                                    onChange={formik.handleChange}
                                    value={formik.values.code}
                                    error={Boolean(formik?.touched.code && formik?.errors.code)}
                                    helperText={formik?.touched.code && formik?.errors.code}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Staff ID'}
                                    name={'code'}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <CommissionSection product={product}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <MKTypography variant={'h4'} color={'secondary'}>Declaration</MKTypography>
                        <PaymentDeclarationSectionTwo/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <MKTypography variant={'h4'} color={'secondary'}>Disclaimer</MKTypography>
                        <Disclaimer/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <MKTypography variant={'h4'} color={'secondary'}>Signature</MKTypography>
                        <SignatureSection {...{imageURL: formik.values.imageUrl, onChange: value => handleOnChange('imageUrl', value)}}/>
                        <MKTypography color={'error'} variant={'caption'}>{formik.errors.imageUrl}</MKTypography>
                    </Grid>
                </Grid>


                <MKBox sx={{ display: 'flex', mt: 3, justifyContent: 'flex-end'}}>
                    {/*<MKButton  sx={{ml:1}} color={'secondary'} type={'submit'} >Finish</MKButton>*/}
                    <MKButton
                        // loading={formik.isSubmitting}
                        // loadingPosition="start"
                        startIcon={<Save />}
                        variant="contained"
                        color={'secondary'}
                        type={'submit'}
                    >
                        Finish
                    </MKButton>
                </MKBox>
            </form>
            <DMTAlertModal {...{open: openDialog, onClose: () => setOpenDialog(false), onOk: handleOnOk, product, referenceNo:responsesDetails?.referralInfo?.refNo}}/>
        </>
    )
}

export default ReferralSection;