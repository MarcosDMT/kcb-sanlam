import MKBox from "../@mui-components/box";
import MKTypography from "../@mui-components/typography";
import MKButton from "../@mui-components/button";
import {Dialog, DialogContent, DialogTitle, IconButton, Slide} from "@mui/material";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {ArrowBack, Close, QuestionMark} from "@mui/icons-material";
import {useFormik} from "formik";
import * as Yup from "yup";
import DMTTextInput from "../@dmt-components/form/text-input";
import {utilsApi} from "../../api-requests/utils-api";


const ExistingCustomer = props => {
    const { open, onClose, link   } = props;
    const [openOverlay, setOpenOverlay] = useState(false);
    const containerRef = useRef(null);
    const [count, setCount] = useState(0);

    const handleOnYes = () => {
        setOpenOverlay(true);
    }
    const handleOnBack = () => {
        setOpenOverlay(false)
    }

    const formik = useFormik({
        initialValues: {
            agentCode: "",
            submit: null,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            agentCode: Yup.string().required('Please Enter Agent Code')
        }),
        onSubmit: async (values, helpers) => {
            try {
                const data = await utilsApi.verifyAgent(values.agentCode);
                console.log(data);
            }
            catch (e) {
               console.log(e.message)
            }
        }
    })

    useEffect(() => {
        setOpenOverlay(false)
    },[open])

    const applicationText = () => {
        return (
            <>
                <Slide  direction="left"  in={openOverlay} container={containerRef.current}>
                    <form onSubmit={formik.handleSubmit}>
                        <IconButton onClick={handleOnBack}>
                            <ArrowBack/>
                        </IconButton>
                        <MKBox sx={{ display: 'flex', flexDirection: 'column', gap:1}}>
                            <MKTypography variant={'caption'}>
                                {'Please provide an agent code.'}
                            </MKTypography>

                            <DMTTextInput
                                label={'Agent Code'}
                                fullWidth
                                onChange={formik.handleChange}
                                value={formik.values.agentCode}
                                error={Boolean(formik?.touched.agentCode && formik?.errors.agentCode)}
                                helperText={formik?.touched.agentCode && formik?.errors.agentCode}
                                onBlur={formik.handleBlur}
                                name={'agentCode'}
                                required
                            />
                        </MKBox>

                        <MKBox sx={{ display:'flex', justifyContent:'center', gap:2, mt:2 }}>
                            <MKButton
                                variant={'contained'}
                                color={'primary'}
                                type={'submit'}
                            >
                                Proceed
                            </MKButton>
                        </MKBox>
                    </form>
                </Slide>

            </>
        )
    }

    return(
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth={'sm'}
                scroll={'body'}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
                    <MKTypography>
                        {""}
                    </MKTypography>
                    <IconButton onClick={onClose}>
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent >
                    <MKBox sx={{ px:2, pt:1, pb:2, overflowX: 'hidden', minHeight: '200px'}}  ref={containerRef}>

                            {!openOverlay ? (
                                <>
                                    <MKTypography align={'center'} color={'warning'}>
                                        <QuestionMark fontSize={'large'}/>
                                    </MKTypography>
                                    <MKTypography align={'center'} variant={'h6'}>
                                        {'Have you been referred by an agent?'}
                                    </MKTypography>
                                    <MKBox sx={{ display:'flex', mt:3, justifyContent:'center', gap:2}}>
                                        <MKButton
                                            size={'large'}
                                            variant={'contained'}
                                            color={'primary'}
                                            onClick={handleOnYes}
                                        >
                                            Yes
                                        </MKButton>
                                        <Link href={link} passHref>
                                            <MKButton  size={'large'} variant={'contained'} color={'primary'}>No</MKButton>
                                        </Link>
                                    </MKBox>
                                </>
                            ): applicationText()}


                    </MKBox>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ExistingCustomer;