import {Dialog, DialogContent, DialogTitle, Divider, IconButton} from "@mui/material";
import MKBox from "../../../@mui-components/box";
import {useFormik} from "formik";
import * as Yup from "yup";
import MKTypography from "../../../@mui-components/typography";
import TextField from "@mui/material/TextField";
import {e} from "../../../../utils/helper-functions";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import {Close, Edit} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import React from "react";
import CurrencyFormat from "react-currency-format";
import Badge from "@mui/material/Badge";

const currency = 'Kes ';

const MpesaPaymentDialog = props => {
    const { open, onClose, responsesDetails } = props;
    const formik = useFormik({
        initialValues: {
            phoneNumber: responsesDetails.personalDetails?.phoneNumber ?? "",
            amount:  responsesDetails.paymentInfo?.totalPremiumPayable ?? "",
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string().required("Phone Number is required!"),
            amount: Yup.number().required("Amount is required!"),
        }),
        enableReinitialize: true,
        onSubmit: async (values, helpers) => {
            try {
                console.log(values);
            }
            catch (e) {
                console.log(e.message);
            }
        }
    });

    const handleOnChange = (name, value) => {
        formik.setFieldValue(name, e(value));
    }


    return (
        <>
            <Dialog
                open={open}
                //onClose={onClose}
                maxWidth={'xs'}
                fullWidth
                scroll={'body'}
            >
                <form onSubmit={formik.handleSubmit}>
                <DialogTitle sx={{ minHeight:'150px', background: 'linear-gradient(25deg,#0075c9,#4188e7 20%,#25c1ed 90%)', color: 'light.main'}}>
                    <MKBox sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <MKTypography variant={'inherit'}>
                           Mpesa Payment
                        </MKTypography>
                        <IconButton color={'inherit'} onClick={onClose}>
                            <Close/>
                        </IconButton>
                    </MKBox>
                    <MKBox sx={{ mt:2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap:1}}>
                        <MKTypography variant={'h6'}>
                            {'Total Amount'}
                        </MKTypography>
                        <Badge
                            badgeContent={<IconButton><Edit fontSize={'small'}/></IconButton>}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MKTypography variant={'h5'} sx={{ mx:2}}>
                                <CurrencyFormat
                                    displayType={'text'}
                                    value= {formik.values.amount}
                                    thousandSeparator={true}
                                    prefix={currency}
                                    decimalScale={2}
                                />
                            </MKTypography>
                        </Badge>

                    </MKBox>

                </DialogTitle>
                <DialogContent>
                        <MKBox sx={{ display: 'flex', mt:1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap:1}}>
                            <MKTypography variant={'h6'}>
                                {'Phone Number'}
                            </MKTypography>
                            <DMTTextInput
                                name={'phoneNumber'}
                                size={'small'}
                                value={formik.values.phoneNumber}
                                onChange={e => handleOnChange('phoneNumber', e.target.value)}
                                onBlur={formik.handleBlur}
                                error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                inputProps={{
                                    style: { fontSize: '18px', textAlign: 'center', fontWeight:'bold'}
                                }}
                            />
                            <MKTypography sx={{ mt:1 }} variant={'caption'} fontWeight={'bold'}>
                                {`A payment request will be sent to the number provided above.`}
                            </MKTypography>
                            <MKBox sx={{ display: 'flex', my:2, justifyContent: 'flex-end'}}>
                                <LoadingButton
                                    loading={formik.isSubmitting}
                                    loadingPosition="start"
                                    variant="contained"
                                    color={'primary'}
                                    type={'submit'}
                                >
                                    Pay Now
                                </LoadingButton>
                            </MKBox>
                        </MKBox>
                </DialogContent>
                </form>
            </Dialog>
        </>
    )
}

export default MpesaPaymentDialog;