import MKTypography from "../../@mui-components/typography";
import MKBox from "../../@mui-components/box";
import DMTTextInput from "../../@dmt-components/form/text-input";
import DMTRadioButton from "../../@dmt-components/form/custom-radio-input";
import DMTDatePicker from "../../@dmt-components/form/datepicker";
import DMTDropdownText from "../../@dmt-components/form/dropdown-text";
import DMTCountrySelect from "../../@dmt-components/form/country-dropdown";
import DMTCheckbox from "../../@dmt-components/form/checkboxes";
import Grid from "@mui/material/Grid";
import DMTNormalRadioButtons from "../../@dmt-components/form/radio-button";
import DMTDropdown from "../../@dmt-components/form/dropdown";
import {Divider} from "@mui/material";
import DMTPhoneSelect from "../../@dmt-components/form/phone-dropdown";
import {e} from "../../../utils/helper-functions";

const Question = props => {
    const { questionDetails, formik } = props

    const renderQuestion = () => {
        const { questionType, children, options, name,filter, placeholder, required, dropdownName, maxYears } = questionDetails;
        const handleOnChange = (value) => {
            formik.setFieldValue(name, e(value))
        }
        const handleOnDateChange = (value) => {
            formik.setFieldValue(name, value)
        }
        const handleOnDropdownChange = (value) => {
            formik.setFieldValue(dropdownName, e(value));
        }
        return (
            <>
            <MKTypography align={'center'} variant={'h3'}>{questionDetails?.question }</MKTypography>
            <MKBox mt={3} sx={{
                display:'grid',
                gap: 2,
                width: {md: '75%', xs: '100%'}
            }} >
                <Grid container spacing={2} >
                    {questionType === 'multiple-text' && children.map ( (quiz, index) =>{
                            const { placeholder, id, name, required, questionType, dropdownName} = quiz;

                            const handleOnChange = (value) => {
                                formik.setFieldValue(name, e(value))
                            }
                            const handleOnDateChange = (value) => {
                                formik.setFieldValue(name, value)
                            }
                            const handleOnDropdownChange = (value) => {
                                formik.setFieldValue(dropdownName, e(value));
                            }
                            const mdSize =  quiz.fullWidth ? 12 : 6;
                            if (quiz.hidden){
                                return null;
                            }
                            if (quiz.title){
                                return (
                                    <Grid item xs={12} sm={12} md={12} key={index}>
                                        <Divider >
                                           <MKTypography variant={'h6'}>{quiz.title}</MKTypography>
                                        </Divider>
                                        <MKTypography variant={'caption'}>{quiz.description}</MKTypography>
                                    </Grid>

                                )
                            }
                            return (
                                    <Grid item xs={12} sm={12} md={mdSize} key={index}>
                                        {questionType === 'dropdown-text' && (
                                            <DMTDropdownText {...{
                                                options:quiz.options,
                                                placeholder,
                                                name,
                                                fullWidth: true,
                                                required,
                                                onChange: handleOnChange,
                                                onDropdownChange: handleOnDropdownChange,
                                                error:Boolean(formik?.touched[name] && formik?.errors[name]),
                                                helperText:formik?.touched[name] && formik?.errors[name],
                                                onBlur:formik.handleBlur,
                                                value: formik.values[name],
                                                dropdownName: dropdownName,
                                                dropdownValue: formik.values[dropdownName],
                                            }}/>
                                        )}
                                        {questionType === 'dropdown'  && (
                                            <DMTDropdown {...{
                                                onChange: handleOnChange,
                                                value: formik.values[name],
                                                options: quiz.options,
                                                label: placeholder,
                                                error:Boolean(formik?.touched[name] && formik?.errors[name]),
                                                helperText:formik?.touched[name] && formik?.errors[name],
                                                onBlur:formik.handleBlur,
                                                required}}
                                            />
                                        )}
                                        {questionType === 'date'  && (
                                            <DMTDatePicker
                                                label={placeholder}
                                                fullWidth
                                                {...{ placeholder, required, value: formik.values[name],onChange: handleOnDateChange, disableFuture: quiz.disableFuture}}
                                            />
                                        )}
                                        {questionType === 'radio' && (
                                            <DMTNormalRadioButtons {...{
                                                name: name,
                                                options: quiz.options,
                                                label: placeholder,
                                                value: formik.values[name],
                                                error:Boolean(formik?.touched[name] && formik?.errors[name]),
                                                helperText:formik?.touched[name] && formik?.errors[name],
                                                onChange: handleOnChange
                                            }}
                                            />
                                        )
                                        }
                                        {questionType === 'phone-select' && (
                                            <DMTPhoneSelect {...{
                                                options:quiz.options,
                                                placeholder,
                                                name,
                                                fullWidth: true,
                                                required,
                                                onChange: handleOnChange,
                                                onDropdownChange: handleOnDropdownChange,
                                                error:Boolean(formik?.touched[name] && formik?.errors[name]),
                                                helperText:formik?.touched[name] && formik?.errors[name],
                                                onBlur:formik.handleBlur,
                                                value: formik.values[name],
                                                dropdownName: dropdownName,
                                                dropdownValue: formik.values[dropdownName],
                                        }}
                                        />
                                        )}

                                        {(questionType === 'number' || questionType === 'text' || questionType === 'email') && (
                                            <DMTTextInput
                                                label={placeholder}
                                                key={id}
                                                fullWidth
                                                type={questionType}
                                                onChange={e => handleOnChange(e.target.value)}
                                                value={formik.values[name]}
                                                error={Boolean(formik?.touched[name] && formik?.errors[name])}
                                                helperText={formik?.touched[name] && formik?.errors[name]}
                                                onBlur={formik.handleBlur}
                                                placeholder={placeholder}
                                                name={name}
                                                required={required}
                                            />
                                        )
                                        }
                                    </Grid>
                            )
                        }
                    )}
                </Grid>

                {questionType === 'radio' && (
                    <DMTRadioButton  {...{options,
                        error:Boolean(formik?.touched[name] && formik?.errors[name]),
                        helperText:formik?.touched[name] && formik?.errors[name],
                        active:formik.values[name],
                        onChange:handleOnChange,
                        }} />
                    )
                }
                {questionType === 'date'&& (
                    <DMTDatePicker
                        sx={{ backgroundColor: 'light.main' }}
                        label={placeholder}
                        {...{ placeholder, required, value: formik.values[name],onChange: handleOnDateChange}}
                    />
                )}
                {questionType === 'dob'&& (
                    <DMTDatePicker
                        sx={{ backgroundColor: 'light.main' }}
                        label={placeholder}

                        {...{ maxYears, showAge:true, placeholder, required, value: formik.values[name],onChange: handleOnDateChange}}
                    />
                )}
                {questionType === 'dropdown-text' && (
                    <DMTDropdownText {...{
                        options,
                        placeholder,
                        name,
                        required,
                        onChange: handleOnChange,
                        onDropdownChange: handleOnDropdownChange,
                        error:Boolean(formik?.touched[name] && formik?.errors[name]),
                        helperText:formik?.touched[name] && formik?.errors[name],
                        onBlur:formik.handleBlur,
                        value: formik.values[name],
                        dropdownName,
                        dropdownValue: formik.values[dropdownName],
                        size:'large',
                    }}/>
                )}
                {questionType === 'country-select' && (
                    <DMTCountrySelect {...{
                        onChange: handleOnChange,
                        value: formik.values[name],
                        filter: filter,
                        error:Boolean(formik?.touched[name] && formik?.errors[name]),
                        helperText:formik?.touched[name] && formik?.errors[name],
                        onBlur:formik.handleBlur,
                        required}}
                    />
                )}
                {questionType === 'text' && (
                    <DMTTextInput
                        label={questionDetails.placeholder}
                        type={questionDetails.type}
                        onChange={e => handleOnChange(e.target.value)}
                        value={formik.values[name]}
                        error={Boolean(formik?.touched[name] && formik?.errors[name])}
                        helperText={formik?.touched[name] && formik?.errors[name]}
                        onBlur={formik.handleBlur}
                        placeholder={placeholder}
                        multiline={questionDetails?.multiline ?? false}
                        minRows={questionDetails?.rows ?? 1}
                        name={name}
                        required={required}
                    />
                )}
                {questionType === 'multiple-checks' && questionDetails.children?.map( (opt, index) => {
                    const { name, placeholder } = opt;
                    const handleOnChange = value => {
                        formik.setFieldValue(name, e(value))
                    }
                    return (
                            <DMTCheckbox key={index} {...{
                                checked: formik.values[name],
                                label: placeholder,
                                handleOnChange: handleOnChange,
                            }}/>
                    )
                })
                }
            </MKBox>
            </>
        )
    }
    return (
        <MKBox sx={{
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: '350px',
            mb: 5,
            color:'dark.main'
        }}>

            {questionDetails ? renderQuestion() : ''}
        </MKBox>
    )
}

export default Question;