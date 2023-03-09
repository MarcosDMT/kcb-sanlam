import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "../@mui-components/typography";
import MKBox from "../@mui-components/box";
import MKButton from "../@mui-components/button";
import {useFormik} from "formik";
import * as Yup from 'yup';
import DMTTextInput from "../@dmt-components/form/text-input";
import {utilsApi} from "../../api-requests/utils-api";
import toast from "react-hot-toast";
import {e} from "../../utils/helper-functions";


const ContactUs = () =>  {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema:  Yup.object({
            name: Yup.string().required('Name is required!'),
            email: Yup.string().required('Email is required!').email('Invalid email provided!')
        }),
        onSubmit: async (values, helpers) => {
            try{
               const message =  await utilsApi.sendContactDetails(values)
                toast.success(message);
                helpers.resetForm()
            } catch (e) {
                console.log(e.message);
            }

        }
    })
    return (
        <MKBox component="section" py={12}  width={{xs:'100%', md: '50%'}} >
            <Container
                sx={{
                    borderStyle: 'solid',
                    borderColor: 'primary.main',
                    borderRadius: 5,
                }}
            >
                <Grid
                    container
                    item
                    justifyContent="center"
                    mt={6}
                    xs={12}
                    lg={12}
                    mx="auto"
                    mb={{ xs: 0, md: 4 }}
                    textAlign="center"
                >
                    <MKTypography variant="h3" color={'secondary'} mb={1}>
                        Stay in the know with all matters Life Insurance
                    </MKTypography>
                    {/*<MKTypography variant="caption" color="text">*/}
                    {/*    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +*/}
                    {/*        'Bibendum sagittis ridiculus vitae ante faucibus est.'}*/}
                    {/*</MKTypography>*/}
                </Grid>
                <Grid container item xs={12} lg={12} sx={{ mx: "auto" }}>
                    <MKBox width="100%" component="form" method="post" autoComplete="off" onSubmit={formik.handleSubmit}>
                        <MKBox p={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <DMTTextInput
                                        label="Full Name"
                                        required
                                        error={Boolean(formik.touched.name && formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        onBlur={formik.handleBlur}
                                        name={'name'}
                                        value={formik.values.name}
                                        onChange={event => formik.setFieldValue('name', e(event.target.value))}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DMTTextInput
                                        type="email"
                                        label="Email"
                                        required
                                        error={Boolean(formik.touched.email && formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur}
                                        onChange={event => formik.setFieldValue('email', e(event.target.value))}
                                        name={'email'}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item justifyContent="center" xs={12} my={6}>
                                <MKButton disabled={formik.isSubmitting} type="submit" fullWidth color="primary">
                                    Get Started
                                </MKButton>
                            </Grid>
                        </MKBox>
                    </MKBox>
                </Grid>
            </Container>
        </MKBox>
    );
}

export default ContactUs;