import {useFormik} from "formik";
import {Divider, Grid} from "@mui/material";
import DMTDropdown from "../../../@dmt-components/form/dropdown";
import DMTDatePicker from "../../../@dmt-components/form/datepicker";
import DMTNormalRadioButtons from "../../../@dmt-components/form/radio-button";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import * as Yup from "yup";
import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";
import MKTypography from "../../../@mui-components/typography";
import {benRelationships, genderOpts} from "../../../../api-requests/data/common-data";
import {e} from "../../../../utils/helper-functions";



const ChildrenForm = props => {
    const { index, setIndex, onSave, responsesDetails } = props;
    const initialValues = {
        surname: responsesDetails.childDetails[index]?.surname ?? "",
        otherNames: responsesDetails.childDetails[index]?.otherNames ?? "",
        gender: responsesDetails.childDetails[index]?.gender ?? "",
        dob: responsesDetails.childDetails[index]?.dob ?? "",
        relationship: responsesDetails.childDetails[index]?.relationship ?? "",
    }
    const validationSchema = Yup.object({
        surname:  Yup.string().required('Surname is required!'),
        otherNames:  Yup.string().required('At least one name is required!'),
        gender:  Yup.string().required('Please select gender'),
        relationship:  Yup.string().required('Relationship is required!'),
        dob:  Yup.string().required('Date of birth is required!'),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
          try {
              let newIndex = index;
              let data = [...responsesDetails.childDetails]
              if (index === null ){
                  data.push({...values});
                  newIndex = data.length > 0 ? data.length -1 : 0;
              }
              else{
                  data[index] = {...data[index], ...values}
              }
              const formData = {
                  ...responsesDetails,
                  childDetails: data,
              }
              await onSave(formData, newIndex)
              helpers.resetForm();
              setIndex(null);
            }
            catch (e) {
                console.log(e.message);
            }
        }
    })
    const handleOnChange = (name, value) => {
        formik.setFieldValue(name, e(value));
    }

    return (
        <MKBox >
            <MKBox
                sx={{

                    display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <MKBox>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Divider >
                                    <MKTypography variant={'h6'} color={'dark'}>Child Details</MKTypography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Surname'}
                                    fullWidth
                                    type={'text'}
                                    onChange={e => formik.setFieldValue('surname', e.target.value)}
                                    value={formik.values.surname}
                                    error={Boolean(formik?.touched.surname && formik?.errors.surname)}
                                    helperText={formik?.touched.surname && formik?.errors.surname}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Enter surname'}
                                    name={'surname'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Other Names'}
                                    fullWidth
                                    type={'text'}
                                    //onChange={formik.handleChange}
                                    onChange={e => formik.setFieldValue('otherNames', e.target.value)}
                                    value={formik.values.otherNames}
                                    error={Boolean(formik?.touched.otherNames && formik?.errors.otherNames)}
                                    helperText={formik?.touched.otherNames && formik?.errors.otherNames}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Enter other names'}
                                    name={'otherNames'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <DMTNormalRadioButtons {...{
                                    name: 'gender',
                                    options: genderOpts,
                                    label: 'Gender',
                                    value: formik.values.gender,
                                    error:Boolean(formik?.touched.gender && formik?.errors.gender),
                                    helperText:formik?.touched.gender && formik?.errors.gender,
                                    onChange: (value)=>handleOnChange('gender', value)
                                }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTDatePicker
                                    label={'Date of Birth'}
                                    fullWidth
                                    value = {formik.values.dob}
                                    required={true}
                                    onChange={(value)=>formik.setFieldValue('dob', value)}
                                    disableFuture={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTDropdown {...{
                                    onChange: (value)=>handleOnChange('relationship', value),
                                    value: formik.values.relationship,
                                    options: benRelationships,
                                    label: 'Relationship',
                                    error:Boolean(formik?.touched.relationship && formik?.errors.relationship),
                                    helperText:formik?.touched.relationship && formik?.errors.relationship,
                                    onBlur:formik.handleBlur,
                                    required:true,
                                    freeSolo: true,
                                }}/>
                            </Grid>
                        </Grid>
                    </MKBox>
                    <MKBox sx={{ display: 'flex', mt: 3, justifyContent: 'flex-end'}}>
                        <MKButton color={'error'} onClick={e => { setIndex(null);formik.resetForm()}} disabled={formik.isSubmitting}>Reset</MKButton>
                        <MKButton  sx={{ml:1}} color={'success'} type={'submit'} disabled={formik.isSubmitting}>Save</MKButton>
                    </MKBox>
            </form>
            </MKBox>

        </MKBox>
    )
}

export default ChildrenForm;