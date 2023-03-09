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



const BeneficiariesForm = props => {
    const { index, setIndex, onSave, responsesDetails } = props;
    const initialValues = {
        surname: responsesDetails.beneficiaryInfo[index]?.surname ?? "",
        otherNames: responsesDetails.beneficiaryInfo[index]?.otherNames ?? "",
        email: responsesDetails.beneficiaryInfo[index]?.email ?? "",
        phone: responsesDetails.beneficiaryInfo[index]?.phone ?? "",
        gender: responsesDetails.beneficiaryInfo[index]?.gender ?? "",
        percentage: responsesDetails.beneficiaryInfo[index]?.percentage ?? "",
        relationship: responsesDetails.beneficiaryInfo[index]?.relationship ?? "",
        idNumber: responsesDetails.beneficiaryInfo[index]?.idNumber ?? "",
        idType: responsesDetails.beneficiaryInfo[index]?.idType ?? "",
        dob: responsesDetails.beneficiaryInfo[index]?.dob ?? "",
        guardian:{
            surname: responsesDetails.beneficiaryInfo[index]?.guardian?.surname ?? "",
            otherNames: responsesDetails.beneficiaryInfo[index]?.guardian?.otherNames ?? "",
            email: responsesDetails.beneficiaryInfo[index]?.guardian?.email ?? "",
            phone: responsesDetails.beneficiaryInfo[index]?.guardian?.phone ?? "",
            dob: responsesDetails.beneficiaryInfo[index]?.guardian?.dob ?? "",
            gender: responsesDetails.beneficiaryInfo[index]?.guardian?.gender ?? "",
            idNumber: responsesDetails.beneficiaryInfo[index]?.guardian?.idNumber ?? "",
            idType: responsesDetails.beneficiaryInfo[index]?.guardian?.idType ?? "",
            relationship: responsesDetails.beneficiaryInfo[index]?.guardian?.relationship ?? ""
        }
    }
    const [showGuardian, setShowGuardian] = useState(false);
    const checkTotalPercentage = () =>{
        const data = [...responsesDetails.beneficiaryInfo]
        let totalPercentage = 0;
        data.map((datum, i) => {
            if (i===index){
                return;
            }
            totalPercentage+= parseFloat(datum.percentage)
        })
        return totalPercentage
    }
    const percentage = checkTotalPercentage();
    const checkValidPercentage = (value) => {
        const remaining = 100 - percentage;
        //console.log(value, percentage)
        if (value){
            return value <= remaining;
        }
        return true;
    }


    const guardianValidations  = Yup.object().shape({
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
    const validationSchema = Yup.object({
        surname:  Yup.string().required('Surname is required!'),
        otherNames:  Yup.string().required('At least one name is required!'),
        gender:  Yup.string().required('Please select gender'),
        idNumber: Yup.string()
            // .test('required', "ID number is required", value => value ==="" && calculateAge(formik.values.dob) < 18)
            .min(7, 'Should not be less than 7 characters')
            .test('is-policy-holder-id', "ID Number is similar to the policy holder",
                value => value !== "" && value !== responsesDetails.personalDetails?.idNumber),

        email:  Yup.string()
            .email('Invalid Email')
            .test("is-policy-holder-email", "Email is similar to the policy holder",
                value =>  value !== "" && value !== responsesDetails.personalDetails?.email),
        phone:  Yup.string()
            .min(7)
            .max(16)
            .test("is-policy-holder-phone", "Phone Number is similar to the policy holder",
                value => value !== "" && value !== responsesDetails.personalDetails?.phoneNumber),
        percentage:  Yup.number().required('Percentage is required')
            .max(100, 'Percentage cannot exceed 100')
            .min(0, 'Percentage cannot be less than 0')
            .test("is-beyond", `Percentage cannot exceed ${100-percentage}`,
               checkValidPercentage),
        relationship:  Yup.string().required('Relationship is required!'),
        dob:  Yup.string().required('Date of birth is required!'),
        guardian: showGuardian ? guardianValidations : null
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
          try {
              let newIndex = index;
              let data = [...responsesDetails.beneficiaryInfo];
              let updatedValues = {...values};
              if (!showGuardian){
                  updatedValues = { ...updatedValues, guardian: null}
              }

              if (index === null ){
                  data.push({...updatedValues});
                  //console.log('PUSHED DATA: ',data)
                  newIndex = data.length > 0 ? data.length -1 : 0;
              }
              else{
                  data[index] = {...data[index], ...updatedValues}
              }
              const formData = {
                  ...responsesDetails,
                  beneficiaryInfo: data,
              }

              await onSave(formData, newIndex)
              helpers.resetForm();
              setIndex(null);

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
    const getAge = () => {
        const age = calculateAge(formik.values.dob);
        if (age !== null && age < 18){
            setShowGuardian(true);
            formik.setFieldValue('idNumber','')
        }
        else{
            setShowGuardian(false);
            formik.setFieldValue('guardian', formik.initialValues.guardian)
            formik.setErrors({idNumber: 'ID is required'});
        }

    }

    useEffect(() => {
        getAge();
    },[formik.values.dob])

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
                                    <MKTypography variant={'h6'} color={'dark'}>Beneficiary Details</MKTypography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Surname'}
                                    fullWidth
                                    type={'text'}
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
                                    onChange={ e => handleOnChange('email', e.target.value)}
                                    value={formik.values.email}
                                    error={Boolean(formik?.touched.email && formik?.errors.email)}
                                    helperText={formik?.touched.email && formik?.errors.email}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Enter the email address'}
                                    name={'email'}
                                    required={false}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Phone Number (Optional)'}
                                    fullWidth
                                    type={'text'}
                                    onChange={ e => handleOnChange('phone', e.target.value)}
                                    value={formik.values.phone}
                                    error={Boolean(formik?.touched.phone && formik?.errors.phone)}
                                    helperText={formik?.touched.phone && formik?.errors.phone}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Enter the phone number'}
                                    name={'phone'}
                                    required={false}
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
                                <DMTDropdownText {...{
                                    options: idOps,
                                    placeholder: 'Identification',
                                    name: 'idNumber',
                                    fullWidth: true,
                                    disabled: calculateAge(formik.values.dob) < 18,
                                    required: calculateAge(formik.values.dob) >= 18,
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
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Percentage'}
                                    fullWidth
                                    type={'number'}
                                    //onChange={formik.handleChange}
                                    onChange={ e => handleOnChange('percentage', e.target.value)}
                                    value={formik.values.percentage}
                                    error={Boolean(formik?.touched.percentage && formik?.errors.percentage)}
                                    helperText={formik?.touched.percentage && formik?.errors.percentage}
                                    onBlur={formik.handleBlur}
                                    placeholder={'Enter the percentage'}
                                    name={'percentage'}
                                    required={true}
                                />
                            </Grid>

                        </Grid>

                    {
                        showGuardian && (
                            <MKBox mt={3}>
                                <GuardianSection {...{ handleOnChange, formik}}/>
                            </MKBox>
                        )
                    }
                    </MKBox>
                    <MKBox sx={{ display: 'flex', mt: 3, justifyContent: 'flex-end'}}>
                        <MKButton color={'error'} onClick={e => { setIndex(null);formik.resetForm()}} disabled={formik.isSubmitting}>Reset</MKButton>
                        <MKButton  sx={{ml:1}} color={'success'} type={'submit'} disabled={formik.isSubmitting}>Save Beneficiary</MKButton>
                    </MKBox>
            </form>
            </MKBox>

        </MKBox>
    )
}
const GuardianSection = props => {
    const {handleOnChange, formik} = props;
    return (
        <>
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
                        onChange={ e => handleOnChange('guardian.surname', e.target.value)}
                        value={formik.values.guardian.surname}
                        error={Boolean(formik?.touched.guardian?.surname && formik?.errors.guardian?.surname)}
                        helperText={formik?.touched.guardian?.surname && formik?.errors.guardian?.surname}
                        onBlur={formik.handleBlur}
                        placeholder={'Enter surname'}
                        name={'guardian.surname'}
                        required={true}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DMTTextInput
                        label={'Other Names'}
                        fullWidth
                        type={'text'}
                        //onChange={formik.handleChange}
                        onChange={ e => handleOnChange('guardian.otherNames', e.target.value)}
                        value={formik.values.guardian.otherNames}
                        error={Boolean(formik?.touched.guardian?.otherNames && formik?.errors.guardian?.otherNames)}
                        helperText={formik?.touched.guardian?.otherNames && formik?.errors.guardian?.otherNames}
                        onBlur={formik.handleBlur}
                        placeholder={'Enter other names'}
                        name={'guardian.otherNames'}
                        required={true}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DMTTextInput
                        label={'Email'}
                        fullWidth
                        type={'email'}
                        //onChange={formik.handleChange}
                        onChange={ e => handleOnChange('guardian.email', e.target.value)}
                        value={formik.values.guardian.email}
                        error={Boolean(formik?.touched.guardian?.email && formik?.errors.guardian?.email)}
                        helperText={formik?.touched.guardian?.email && formik?.errors.guardian?.email}
                        onBlur={formik.handleBlur}
                        placeholder={'Enter the email address'}
                        name={'guardian.email'}
                        required={true}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DMTTextInput
                        label={'Phone Number'}
                        fullWidth
                        type={'text'}
                        // onChange={formik.handleChange}
                        onChange={ e => handleOnChange('guardian.phone', e.target.value)}
                        value={formik.values.guardian.phone}
                        error={Boolean(formik?.touched.guardian?.phone && formik?.errors.guardian?.phone)}
                        helperText={formik?.touched.guardian?.phone && formik?.errors.guardian?.phone}
                        onBlur={formik.handleBlur}
                        placeholder={'Enter the phone number'}
                        name={'guardian.phone'}
                        required={true}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <DMTNormalRadioButtons {...{
                        name: 'guardian.gender',
                        options: genderOpts,
                        label: 'Gender',
                        value: formik.values.guardian.gender,
                        error:Boolean(formik?.touched.guardian?.gender && formik?.errors.guardian?.gender),
                        helperText:formik?.touched.guardian?.gender && formik?.errors.guardian?.gender,
                        onChange: (value)=>handleOnChange('guardian.gender', value)
                    }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DMTDatePicker
                        label={'Date of Birth'}
                        fullWidth
                        value = {formik.values.guardian.dob}
                        required={true}
                        onChange={(value)=>handleOnChange('guardian.dob', value)}
                        maxYears={18}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DMTDropdown {...{
                        onChange: (value)=>handleOnChange('guardian.relationship', value),
                        value: formik.values.guardian.relationship,
                        options: benRelationships ,
                        label: 'Relationship',
                        error:Boolean(formik?.touched.guardian?.relationship && formik?.errors.guardian?.relationship),
                        helperText:formik?.touched.guardian?.relationship && formik?.errors.guardian?.relationship,
                        onBlur:formik.handleBlur,
                        required:true,
                        freeSolo:true,
                    }}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <DMTDropdownText {...{
                        options: idOps,
                        placeholder: 'Identification',
                        name: 'guardian.idNumber',
                        fullWidth: true,
                        required: true,
                        onChange: (value)=>handleOnChange('guardian.idNumber', value),
                        onDropdownChange: (value)=>handleOnChange('guardian.idType', value),
                        error:Boolean(formik?.touched.guardian?.idNumber && formik?.errors.guardian?.idNumber),
                        helperText:formik?.touched.guardian?.idNumber && formik?.errors.guardian?.idNumber,
                        onBlur:formik.handleBlur,
                        value: formik.values.guardian?.idNumber,
                        dropdownName: 'guardian.idType',
                        dropdownValue: formik.values.guardian?.idType,
                    }}/>
                </Grid>
            </Grid>
        </>
    );
}
export default BeneficiariesForm;