import React from  'react';
import {Divider, Grid} from "@mui/material";
import {useFormik} from "formik";
import toast from "react-hot-toast";
import {e} from "../../../../utils/helper-functions";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import MKBox from "../../../@mui-components/box";
import {LoadingButton} from "@mui/lab";
import MKTypography from "../../../@mui-components/typography";
import MKButton from "../../../@mui-components/button";

const AgentDetailsSection = props => {
    const {
        onSave,
        responsesDetails,
        handleOnStepChange,
        handleBack
    } = props;

    const formik = useFormik({
        initialValues: {
            fullNames: responsesDetails.referralInfo?.fullNames ?? "",
            phoneNumber: responsesDetails.referralInfo?.phoneNumber ??  "",
            code: responsesDetails.referralInfo?.code ?? "",
        },
        onSubmit: async (values, helpers) => {
            try {
                const data = {...responsesDetails, referralInfo: {...values}};
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
    });

    const handleOnChange = (name, value) => {
        formik.setFieldValue(name, e(value));
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4} mt={1}>
                    <Grid item xs={12} sm={12} md={2}>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Divider >
                                    <MKTypography variant={'h6'} color={'dark'}>Agent Details</MKTypography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <DMTTextInput
                                    label={'Agent Code'}
                                    fullWidth
                                    onChange={e => handleOnChange('code', e.target.value)}
                                    value={formik.values.code}
                                    error={Boolean(formik?.touched.code && formik?.errors.code)}
                                    helperText={formik?.touched.code && formik?.errors.code}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Enter Agent Code'}
                                    name={'code'}
                                />
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
                            <Grid item xs={12} sm={12} md={12}>
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

export default AgentDetailsSection;