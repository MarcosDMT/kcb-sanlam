import {useEffect, useRef, useState} from "react";
import SignaturePad from "react-signature-canvas";
import {alpha, Dialog, DialogContent, DialogTitle, IconButton, Modal, Slide} from "@mui/material";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import MKButton from "../../../@mui-components/button";
import PropTypes from "prop-types";
import DMTFileInput from "../../../@dmt-components/form/file-input";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Close} from "@mui/icons-material";
const SignatureSection = props => {
    const { imageURL, onChange} = props;
    const [open, setOpen] = useState(false);
    const handleOnOpen = () => {
        setOpen(true)
    }
    const handleOnClose = () => {
        setOpen(false)
    }




    return (
        <>
            <MKBox
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    width: {md: '20%', xs:'100%'}
                }}
            >
                {imageURL ? (<>

                        <img
                            src={imageURL}
                            alt="my signature"
                            onClick={handleOnOpen}
                            style={{
                                margin: "0 auto",
                                border: "1px solid ",
                                borderRadius: 5,
                                backgroundColor: 'white',
                                width: "150px"
                            }}
                        />
                            <MKButton sx={{ mt:2}} onClick={handleOnOpen} fullWidth color={'primary'} variant={'outlined'}>Click to change signature</MKButton>
                    </>

            ) :
                    <MKBox onClick={handleOnOpen} sx = {{
                        border: "1px solid ",
                        borderRadius: 5,
                        backgroundColor: 'light.main',
                        display: 'flex',
                        justifyContent:'center',
                        alignItems: 'center',
                        width: "150px",
                        height: "150px"
                    }}>
                        <MKTypography variant={'caption'} color={'dark'}>
                            Click here to add signature
                        </MKTypography>
                    </MKBox>
                }
            </MKBox>
            <SignatureModal {...{open, onClose: handleOnClose, imageURL, onChange}}/>
        </>
    )
}

const SignatureModal = props => {
    const sigCanvas = useRef(null);
    const { open, onClose,   onChange} = props;
    const VALID_FILES = {
        error: 'File type not supported',
        format: ['.png', '.jpeg', '.jpg'],
        accept: '.png, .jpeg, .jpg',
    }
    const checkIfValid = file => {
        if (file){
            return VALID_FILES.format.includes(file.extension);
        }
        return true;
    }

    const formik = useFormik({
        initialValues: {
            signature: '',
        },
        validationSchema: Yup.object({
            signature: Yup.object().nullable().test('is-invalid', VALID_FILES.error, checkIfValid)
        }),
        onSubmit: (values, helpers) => {

            const { height, width} = sigCanvas.current?.getTrimmedCanvas();
            if (height > 1 && width >1){
                const canvas = sigCanvas.current.getTrimmedCanvas().toDataURL("image/jpeg", 1);
                onChange(canvas);}
            else{
                onChange(values.signature?.data)
            }
            helpers.resetForm();
            onClose();
        }
    })


    const handleOnClear = () =>{
        if (sigCanvas){
            sigCanvas.current?.clear();
        }
        formik.resetForm();
    }

    useEffect(() => {
        if (sigCanvas){
            sigCanvas.current?.clear();
        }
    }, [formik.values.signature]);


    return (
        <>
            <Dialog
                //onClose={onClose}
                open={open}
                fullWidth
                maxWidth={'sm'}
            >
                <DialogTitle>
                    <MKBox sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
                        <MKTypography variant={'h6'}> e-signature</MKTypography>
                        <IconButton color={'error'} onClick={onClose} title={'Click here to close'}>
                            <Close/>
                        </IconButton>
                    </MKBox>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <MKBox sx={{
                            width:"100%",
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'column',
                            backgroundColor: theme => alpha(theme.palette.common.black, 0.1)
                        }}>
                            <MKTypography>Sign Here</MKTypography>
                            <div style={{
                                backgroundColor:'white',
                                margin: 5
                            }}>
                                <SignaturePad
                                    ref={sigCanvas}
                                    backgroundColor={'#fff'}
                                    canvasProps={{
                                        width: 'inherit',
                                        height: 'inherit',
                                    }}
                                />
                            </div>
                            <MKTypography>Or</MKTypography>
                            <MKBox p={2}>
                                <label htmlFor={'signature'}>
                                    <DMTFileInput
                                        id={'signature'}
                                        label={''}
                                        sx={{
                                            display: 'none'
                                        }}
                                        onChange={(value)=> formik.setFieldValue('signature', value)}
                                        value={formik.values?.signature?.name}
                                        name={'signature'}
                                        inputProps={{
                                            accept: VALID_FILES.accept,
                                        }}
                                    />
                                    <MKButton component="span" color={'primary'} >Choose Signature Instead</MKButton>
                                </label>
                            </MKBox>
                            <MKBox>
                                {
                                    formik.values.signature?.name && (
                                        <MKTypography variant={'h6'} gutterBottom>{formik.values.signature.name}</MKTypography>
                                    )
                                }
                                {
                                    formik.touched.signature && formik?.errors.signature ? (
                                        <MKTypography varianr={'caption'}>{formik?.touched.signature && formik?.errors.signature}</MKTypography>
                                    ): null
                                }
                            </MKBox>

                            <MKBox sx={{
                                display: 'flex',
                                gap: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                p:2,
                            }}>
                                <MKButton  type={'submit'} color={'success'} fullWidth variant={'outlined'}>Save</MKButton>
                                <MKButton  onClick={handleOnClear} color={'warning'} variant={'outlined'} fullWidth>Clear</MKButton>
                            </MKBox>
                        </MKBox>
                    </form>

                </DialogContent>
            </Dialog>
        </>
    )
}
const CloseIcon = () => {
    return null;
}

CloseIcon.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    onClick: PropTypes.any,
    fontSize: PropTypes.string,
    sx: PropTypes.shape({ cursor: PropTypes.string }),
};

export default SignatureSection;