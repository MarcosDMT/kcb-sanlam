import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import MKTypography from "../../../@mui-components/typography";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import DMTBankBranches from "../../../@dmt-components/form/bank-branches-select";
import CommissionSection from "../payment-section/commission-section";
import PaymentDeclarationSectionTwo from "../payment-section/declaration-section-two";
import Disclaimer from "../payment-section/disclaimer";
import SignatureSection from "../payment-section/signature-section";
import MKBox from "../../../@mui-components/box";
import {LoadingButton} from "@mui/lab";
import {Save} from "@mui/icons-material";
import DMTAlertModal from "../../../@dmt-components/alerts/modal-alert";
import {useDispatch} from "../../../../store";
import * as Yup from "yup";
import {useFormik} from "formik";
import toast from "react-hot-toast";
import {e} from "../../../../utils/helper-functions";
import {Divider} from "@mui/material";
import MKButton from "../../../@mui-components/button";
import MpesaPaymentDialog from "./mpesa-payment-dialog";

const ConfirmationSection = props => {
    const {
        onSave,
        responsesDetails,
        resetValues,
        product,
        handleBack,
    } = props;
    const dispatch = useDispatch();
    const initialValues ={
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
                //await onSave(data)
                setOpenDialog(true)
                //helpers.resetForm();
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
        formik.setFieldValue(name, value);
    }
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4} mt={1} >
                    <Grid item xs={12} sm={12} md={12}>
                        <Divider >
                            <MKTypography variant={'h6'} color={'dark'}>Declaration</MKTypography>
                        </Divider>
                        <PaymentDeclarationSectionTwo/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Divider >
                            <MKTypography variant={'h6'} color={'dark'}>Disclaimer</MKTypography>
                        </Divider>
                        <Disclaimer/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <MKTypography variant={'h4'} color={'primary'}>Signature</MKTypography>
                        <SignatureSection {...{imageURL: formik.values.imageUrl, onChange: value => handleOnChange('imageUrl', value)}}/>
                        <MKTypography color={'error'} variant={'caption'}>{formik.errors.imageUrl}</MKTypography>
                    </Grid>
                </Grid>


                <MKBox sx={{ display: 'flex', mt: 3, justifyContent: 'space-between'}}>
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
                        startIcon={<Save />}
                        variant="contained"
                        color={'success'}
                        type={'submit'}
                    >
                        Finish
                    </LoadingButton>
                </MKBox>
            </form>
            <MpesaPaymentDialog {...{
                open: openDialog,
                onClose: () => setOpenDialog(false),
                responsesDetails,
                onOk: handleOnOk
            }}/>
                {/*<DMTAlertModal {...{open: openDialog, onClose: () => setOpenDialog(false), onOk: handleOnOk, product, referenceNo:responsesDetails?.referralInfo?.refNo}}/>*/}
            </>
    )
};

export default ConfirmationSection;