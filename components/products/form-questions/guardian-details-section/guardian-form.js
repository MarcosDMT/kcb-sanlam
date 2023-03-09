import {useFormik} from "formik";
import {Divider, Grid} from "@mui/material";
import DMTDropdownText from "../../../@dmt-components/form/dropdown-text";
import DMTDropdown from "../../../@dmt-components/form/dropdown";
import DMTDatePicker from "../../../@dmt-components/form/datepicker";
import DMTNormalRadioButtons from "../../../@dmt-components/form/radio-button";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import * as Yup from "yup";
import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";
import MKTypography from "../../../@mui-components/typography";
import {useEffect, useState} from "react";
import {calculateAge, e} from "../../../../utils/helper-functions";
import toast from "react-hot-toast";
import {benRelationships, genderOpts, idOps} from "../../../../api-requests/data/common-data";



const GuardianForm = props => {
    const { onSave, responsesDetails, onDelete } = props;
    const initialValues = {
        surname: responsesDetails.guardianDetails?.surname ?? "",
        otherNames: responsesDetails.guardianDetails?.otherNames ?? "",
        email: responsesDetails.guardianDetails?.email ?? "",
        phone: responsesDetails.guardianDetails?.phone ?? "",
        dob: responsesDetails.guardianDetails?.dob ?? "",
        gender: responsesDetails.guardianDetails?.gender ?? "",
        idNumber: responsesDetails.guardianDetails?.idNumber ?? "",
        idType: responsesDetails.guardianDetails?.idType ?? "",
        relationship: responsesDetails.guardianDetails?.relationship ?? ""
    }
    const validationSchema  = Yup.object().shape({
        surname:  Yup.string().required('Surname is required!'),
        otherNames:  Yup.string().required('At least one name is required!'),
        gender:  Yup.string().required('Please select gender'),
        email:  Yup.string()
            .required('Email is required!')
            .email('Invalid Email')
            .test("is-policy-holder-email", "Email is similar to the policy holder",
                    value => value !== responsesDetails.personalDetails?.email),
        phone:  Yup.string()
            .required('Phone Number is required')
            .min(7,'Phone number should not be less than 7 characters')
            .max(16, 'Should not exceed 16 characters')
            .test("is-policy-holder-phone", "Phone Number is similar to the policy holder",
            value => value !== responsesDetails.personalDetails?.phoneNumber),
        relationship:  Yup.string().required('Relationship is required!').nullable(),
        idNumber:  Yup.string()
            .required('ID is required')
            .min(7, 'Should not be less than 7 characters')
            .test("is-policy-holder-phone", "ID Number is similar to the policy holder",
                    value => value !== responsesDetails.personalDetails?.idNumber),
        idType:  Yup.string().required('Field is required'),
        dob:  Yup.string().required('Date of birth is required!'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
          try {
              const formData = {
                  ...responsesDetails,
                  guardianDetails: values,
              }
              await onSave(formData)
              //helpers.resetForm();
            }
            catch (e) {
                toast.error(e.message)
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: e.message });
                helpers.setSubmitting(false);
                //console.log(e.message);
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
                                    <MKTypography variant={'h6'} color={'dark'}>Guardian Details</MKTypography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Surname'}
                                    fullWidth
                                    type={'text'}
                                    // onChange={formik.handleChange}
                                    onChange={ e => handleOnChange('surname', e.target.value)}
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
                                    onChange={ e => handleOnChange('otherNames', e.target.value)}
                                    value={formik.values.otherNames}
                                    error={Boolean(formik?.touched.otherNames && formik?.errors.otherNames)}
                                    helperText={formik?.touched.otherNames && formik?.errors.otherNames}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Enter other names'}
                                    name={'otherNames'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Email'}
                                    fullWidth
                                    type={'email'}
                                    //onChange={formik.handleChange}
                                    onChange={ e => handleOnChange('email', e.target.value)}
                                    value={formik.values.email}
                                    error={Boolean(formik?.touched.email && formik?.errors.email)}
                                    helperText={formik?.touched.email && formik?.errors.email}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Enter the email address'}
                                    name={'email'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Phone Number'}
                                    fullWidth
                                    type={'text'}
                                    // onChange={formik.handleChange}
                                    onChange={ e => handleOnChange('phone', e.target.value)}
                                    value={formik.values.phone}
                                    error={Boolean(formik?.touched.phone && formik?.errors.phone)}
                                    helperText={formik?.touched.phone && formik?.errors.phone}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Enter the phone number'}
                                    name={'phone'}
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
                                    onChange={(value)=>handleOnChange('dob', value)}
                                    maxYears={18}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTDropdown {...{
                                    onChange: (value)=>handleOnChange('relationship', value),
                                    value: formik.values.relationship,
                                    options: benRelationships ,
                                    label: 'Relationship',
                                    error:Boolean(formik?.touched.relationship && formik?.errors.relationship),
                                    helperText:formik?.touched.relationship && formik?.errors.relationship,
                                    onBlur:formik.handleBlur,
                                    required:true,
                                    freeSolo:true,
                                }}/>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <DMTDropdownText {...{
                                    options: idOps,
                                    placeholder: 'Identification',
                                    name: 'idNumber',
                                    fullWidth: true,
                                    required: true,
                                    onChange: (value)=>handleOnChange('idNumber', value),
                                    onDropdownChange: (value)=>handleOnChange('idType', value),
                                    error:Boolean(formik?.touched.idNumber && formik?.errors.idNumber),
                                    helperText:formik?.touched.idNumber && formik?.errors.idNumber,
                                    onBlur:formik.handleBlur,
                                    value: formik.values.idNumber,
                                    dropdownName: 'idType',
                                    dropdownValue: formik.values.idType,
                                }}/>
                            </Grid>
                        </Grid>
                    </MKBox>
                    <MKBox sx={{ display: 'flex', mt: 3, justifyContent: 'flex-end'}}>
                        <MKButton color={'error'} onClick={e => { onDelete() }} disabled={formik.isSubmitting}>Cancel</MKButton>
                        <MKButton  sx={{ml:1}} color={'success'} type={'submit'} disabled={formik.isSubmitting}>Save & Proceed</MKButton>
                    </MKBox>
            </form>
            </MKBox>

        </MKBox>
    )
}

export default GuardianForm;