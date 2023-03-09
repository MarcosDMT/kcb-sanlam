import {Alert, alpha, Skeleton, Tab, Table, TableBody, TableContainer, Tabs} from "@mui/material";
import MKBox from "../@mui-components/box";
import MKTypography from "../@mui-components/typography";
import {DMTSlider} from "../@dmt-components/sliders";
import {useState} from "react";
import TextField from "../@mui-components/text-field";
import DMTDatePicker, {calculateAge} from "../@dmt-components/form/datepicker";
import Grid from "@mui/material/Grid";
import DMTPaymentTerms from "../@dmt-components/form/payment-terms-select";
import DMTNormalRadioButtons from "../@dmt-components/form/radio-button";
import {paymentFrequencies} from "../../api-requests/data/payment-section-data";
import MKButton from "../@mui-components/button";
import {useFormik} from "formik";
import * as Yup from 'yup';
import Container from "@mui/material/Container";
import {utilsApi} from "../../api-requests/utils-api";
import {StyledTableCell, StyledTableRow} from "../@dmt-components/tables";
import OnlineCalculator from "../lottie-files/calculator-lottie";
import toast from "react-hot-toast";
import {WhatsappButton} from "../whatsapp-button";

const CurrencyFormat = require('react-currency-format');

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
function valueLabelFormat(value) {
    let scaledValue = value * 100000;

    return `${scaledValue}`;
}
function formattedValue(value){
    return (
        <CurrencyFormat
            displayType={'text'}
            value={valueLabelFormat(value)}
            thousandSeparator={true}
            prefix={currency}
            decimalScale={2}
        />
    )
}
function calculateValue(value) {
    return value;
}
const currency = 'Kes ';
const productsOptions = [
    {
        id: 2,
        name: 'EduCare',
        maxAmount: 20000,
        minAmount: 0,
    },
    {
        id: 3,
        name: 'EduCare Plus',
        maxAmount: null,
        minAmount: 20000,
    },
    {
        id: 1,
        name: 'Super Endowment Plus',
        maxAmount: null,
        minAmount: 15000
    },
];

const getProductById = (products, productId) => {
    if (products && productId){
        return  products.find(product => product.id === productId)
    }
    return null
}


const OnlineInsuranceCalculator = props => {
    const [value, setValue] = useState(0);
    const [product, setProduct] = useState(productsOptions[0].id);
    const [results, setResults] = useState(null);
    const [sumAssured,setSumAssured] = useState(0);

    const activeProduct = getProductById(productsOptions, product);

    const formik = useFormik({
        initialValues: {
            sumAssured: 0,
            dob: '',
            term: '',
            termId: '',
            frequency: 'Monthly',
            age: '',
        },
        validationSchema: Yup.object({
            sumAssured: Yup.number().required('Sum Assured is required!'),
            dob: Yup.string().required('Enter date of birth'),
            term: Yup.number().required('Please select term'),
            frequency: Yup.string().required('Please select frequency')
        }),
        onSubmit: async (values, helpers) => {
            const data = {
                sumAssured: values.sumAssured,
                age: values.age,
                termId: values.termId,
                frequency: values.frequency,
                productId:product,
            }
            try{
                const res = await utilsApi.fetchComputeRates(data)
                if (res?.success){
                    setResults({
                        coverPremium: res.coverPremium,
                        compensationLevy: res.compensationLevy,
                        totalPremium: res.totalPremium,
                        discount: res.discount,
                        policyFee: res.policyFee,
                        sumAssured: values.sumAssured,
                        term: values.term,
                        age: values.age,
                        frequency: values.frequency,
                    })
                }
                console.log(res);
            }catch (e) {
                toast.error('An error occurred!')
                console.log(e.message)
            }
        }
    });

    const validatePremiumAmount  = () => {

        if (!results){
            return null;
        }
        const getMessage = () => {
            let message = null;
            if (results.totalPremium && activeProduct){
                if (activeProduct.minAmount && results.totalPremium <= activeProduct.minAmount){
                    message =  `The Premium amount is below ${activeProduct.minAmount}`;
                }
                if (activeProduct.maxAmount && results.totalPremium > activeProduct.maxAmount){
                    message =  `The Premium amount cannot exceed ${activeProduct.maxAmount}`;
                }
            }
            return message;
        }
        // get message from function;
        const message = getMessage();

        if (!message){
            return null;
        }
        return (
            <>
                <Alert severity="error">{message}</Alert>
            </>
        )
    }

    const handleOnTabChange = (event, newValue) => {
        setProduct(newValue)
        formik.setFieldValue('termId', '' )
        formik.setFieldValue('term', '' )
        setResults(null);
    }

    const handleChange = (event, newValue) => {
        if (typeof newValue === 'number') {
            setValue(newValue);
            formik.setFieldValue('sumAssured', valueLabelFormat(newValue))
        }
    };

    const handleOnChange = (values) => {
        const newValue = Number(values.value);
        if (typeof newValue === 'number') {
            setValue(newValue/100000);
            formik.setFieldValue('sumAssured',newValue);
            setSumAssured(newValue)
        }
    }

    const handleFieldChange = (field, value) => {
        formik.setFieldValue(field, value);
    }

    const handleDobChange = (value) =>{
        const age = calculateAge(value);
        handleFieldChange('dob', value)
        handleFieldChange('age', age );
    }

    return (
        <>
            <MKBox component="header"
                   sx={{
                minHeight: '100vh',
                mb:3,
            }}>
                <Container py={{ xs: 6, md: 6 }} sx={{ mb:3, backgroundColor: 'background.paper',}}>
                    <MKTypography variant={'h3'} py={3}>{'Insurance Calculator'}</MKTypography>
                    <Grid spacing={3} container>
                        <Grid item xs={12} md={6}>
                            <Tabs
                                value={product}
                                onChange={handleOnTabChange}
                                variant="fullWidth"
                            >
                                {productsOptions.map((option)=>(
                                    <Tab key={option.id} value={option.id} label={option.name}  {...a11yProps(option.id)}  />
                                ))}
                            </Tabs>
                            <MKBox sx={{
                                p:5
                            }}>
                                <form onSubmit={formik.handleSubmit} autoComplete="off">
                                    <MKBox sx={{
                                        width: '100%'
                                    }}>
                                        <MKBox sx={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                                            <MKTypography align={'center'} gutterBottom>Total Premium</MKTypography>
                                            {formik.isSubmitting ? (
                                                <MKBox sx={{ display:'flex', justifyContent:'center'}}>
                                                    <Skeleton variant="text" sx={{ width:'20%', fontSize: '1.25rem' }} />
                                                </MKBox>
                                            ) : (
                                                <MKTypography variant={'h4'} align={'center'}>
                                                    <CurrencyFormat
                                                        displayType={'text'}
                                                        value={results?.totalPremium ?? 0}
                                                        thousandSeparator={true}
                                                        prefix={currency}
                                                        decimalScale={2}
                                                    />
                                                </MKTypography>
                                            )}

                                            <MKBox>
                                                {validatePremiumAmount()}
                                            </MKBox>

                                            <MKBox sx={{
                                                mt:5
                                            }}>
                                                <MKBox sx={{display:'flex', mb:5, justifyContent:'space-between', alignItems:'center'}}>
                                                    <MKTypography variant={'h6'} id="non-linear-slider">Sum Assured</MKTypography>
                                                    <CurrencyFormat
                                                        value={valueLabelFormat(value)}
                                                        allowNegative={false}
                                                        onValueChange={handleOnChange}
                                                        isNumericString={true}
                                                        decimalScale={0}
                                                        thousandSeparator={true}
                                                        prefix={currency}
                                                        customInput={TextField}
                                                        inputProps={{
                                                            style: { fontSize: '18px', textAlign: 'right', fontWeight:'bold'}
                                                        }}
                                                        //name={'sumAssured'}
                                                        //onBlur={formik.handleBlur}
                                                    />
                                                </MKBox>
                                                <DMTSlider
                                                    value={value}
                                                    min={0}
                                                    step={5}
                                                    max={100}
                                                    scale={calculateValue}
                                                    getAriaValueText={formattedValue}
                                                    valueLabelFormat={formattedValue}
                                                    onChange={handleChange}
                                                    valueLabelDisplay="auto"
                                                    aria-labelledby="non-linear-slider"
                                                />
                                            </MKBox>
                                            <MKBox>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={12}>
                                                        <MKBox sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                                            <MKTypography variant={'h6'}>Date of birth</MKTypography>
                                                            <DMTDatePicker {...{
                                                                value: formik.values.dob,
                                                                label:'',
                                                                name: 'dob',
                                                                error:Boolean(formik?.touched.dob && formik?.errors.dob),
                                                                helperText:formik?.touched.dob && formik?.errors.dob,
                                                                onChange: handleDobChange,
                                                                maxYears: 18,
                                                                minYears: 65,
                                                                showAge: false,
                                                                required: true,
                                                                onBlur: formik.handleBlur ,
                                                                variant: 'outlined',
                                                                size:'normal',
                                                            }}/>
                                                        </MKBox>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MKBox sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                                            <MKTypography variant={'h6'}>Term in years</MKTypography>
                                                            <DMTPaymentTerms
                                                                {...{
                                                                    onChange: (value) => {
                                                                        if(value){
                                                                            handleFieldChange('termId', value.id)
                                                                            handleFieldChange('term', value.term)
                                                                        }
                                                                        else{
                                                                            handleFieldChange('termId', '')
                                                                            handleFieldChange('term', '')
                                                                        }
                                                                    },
                                                                    fullWidth: true,
                                                                    label:'',
                                                                    productId:product,
                                                                    value: formik.values.term,
                                                                    required: true,
                                                                    name: 'term',
                                                                    error:Boolean(formik?.touched.term && formik?.errors.term),
                                                                    helperText:formik?.touched.term && formik?.errors.term,
                                                                    onBlur: formik.handleBlur ,
                                                                    variant: 'outlined',
                                                                }}
                                                            />
                                                        </MKBox>
                                                    </Grid>
                                                    <Grid item md={12} sm={12} xs={12} >
                                                        <DMTNormalRadioButtons {...{
                                                            name: 'frequency',
                                                            options: paymentFrequencies,
                                                            label: 'Frequency',
                                                            value: formik.values.frequency,
                                                            error:Boolean(formik?.touched.frequency && formik?.errors.frequency),
                                                            helperText:formik?.touched.frequency && formik?.errors.frequency,
                                                            onChange: (value)=>handleFieldChange('frequency', value)
                                                        }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                            </MKBox>
                                            <MKBox sx={{ display: 'flex', justifyContent:'flex-end'}} mt={2}>
                                                <MKButton color={'success'} type={'submit'} disable={formik.isSubmitting} variant={'contained'}>
                                                    {formik.isSubmitting ? 'Calculating...' : 'Calculate'}
                                                </MKButton>
                                            </MKBox>
                                        </MKBox>
                                    </MKBox>
                                </form>
                            </MKBox>
                        </Grid>
                        <Grid item  xs={12} md={6}>

                            { results ? (
                                <>
                                    <MKBox mb={3}>
                                        <MKTypography variant={'h5'} align={'center'}>Results</MKTypography>
                                    </MKBox>
                                    <MKBox>
                                        <TableContainer>
                                            <Table sx={{
                                                backgroundColor: theme=> alpha(theme.palette.light.main, 0.3)
                                            }}>
                                                <TableBody>
                                                    <StyledTableRow>
                                                        <StyledTableCell >
                                                            <MKTypography variant={'body2'}>{'Sum Assured'}</MKTypography>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {formik.isSubmitting ? (
                                                                <Skeleton variant="text" sx={{ width:'50%', fontSize: '1rem' }} />
                                                            ): (
                                                                <MKTypography variant={'body2'}>
                                                                    <CurrencyFormat
                                                                        displayType={'text'}
                                                                        value={results.sumAssured}
                                                                        thousandSeparator={true}
                                                                        prefix={currency}
                                                                        decimalScale={2}
                                                                    />
                                                                </MKTypography>
                                                            )}
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                    <StyledTableRow>
                                                        <StyledTableCell>
                                                            <MKTypography variant={'body2'}> {'Age (Years)'}</MKTypography>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {formik.isSubmitting ? (
                                                                <Skeleton variant="text" sx={{ width:'50%', fontSize: '1rem' }} />
                                                            ): (
                                                                <MKTypography variant={'body2'}>
                                                                    {results.age}
                                                                </MKTypography>
                                                                )}
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                    <StyledTableRow>
                                                        <StyledTableCell>
                                                            <MKTypography variant={'body2'}>
                                                                {'Frequency'}
                                                            </MKTypography>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {formik.isSubmitting ? (
                                                                <Skeleton variant="text" sx={{ width:'50%', fontSize: '1rem' }} />
                                                            ): (
                                                            <MKTypography variant={'body2'}>
                                                                {results.frequency}
                                                            </MKTypography>)}
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                    <StyledTableRow>
                                                        <StyledTableCell>
                                                            <MKTypography variant={'body2'}>
                                                                {'Term (Years)'}
                                                            </MKTypography>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {formik.isSubmitting ? (
                                                                <Skeleton variant="text" sx={{ width:'50%', fontSize: '1rem' }} />
                                                            ): (
                                                            <MKTypography variant={'body2'}>
                                                                {results.term}
                                                            </MKTypography>)}
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                    <StyledTableRow>
                                                        <StyledTableCell>
                                                            <MKTypography variant={'body2'}>
                                                                {'Cover Premium'}
                                                            </MKTypography>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {formik.isSubmitting ? (
                                                                <Skeleton variant="text" sx={{ width:'50%', fontSize: '1rem' }} />
                                                            ): (
                                                            <MKTypography variant={'body2'}>
                                                                <CurrencyFormat
                                                                    displayType={'text'}
                                                                    value={results.coverPremium}
                                                                    thousandSeparator={true}
                                                                    prefix={currency}
                                                                    decimalScale={2}
                                                                />
                                                            </MKTypography>)}
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                    <StyledTableRow>
                                                        <StyledTableCell>
                                                            <MKTypography variant={'body2'}>
                                                                {'Compensation Levy'}
                                                            </MKTypography>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {formik.isSubmitting ? (
                                                                <Skeleton variant="text" sx={{ width:'50%', fontSize: '1rem' }} />
                                                                ): (
                                                            <MKTypography variant={'body2'}>
                                                                <CurrencyFormat
                                                                    displayType={'text'}
                                                                    value={results.compensationLevy}
                                                                    thousandSeparator={true}
                                                                    prefix={currency}
                                                                    decimalScale={2}
                                                                />
                                                            </MKTypography>)}
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                    <StyledTableRow>
                                                        <StyledTableCell>
                                                            <MKTypography variant={'body2'}>
                                                                {'Policy Fee'}
                                                            </MKTypography>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {formik.isSubmitting ? (
                                                                <Skeleton variant="text" sx={{ width:'50%', fontSize: '1rem' }} />
                                                            ): (
                                                                <MKTypography variant={'body2'}>
                                                                    <CurrencyFormat
                                                                        displayType={'text'}
                                                                        value={results.policyFee}
                                                                        thousandSeparator={true}
                                                                        prefix={currency}
                                                                        decimalScale={2}
                                                                    />
                                                                </MKTypography>)}
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                    <StyledTableRow>
                                                        <StyledTableCell>
                                                            <MKTypography variant={'body2'}>
                                                                {'Discount'}
                                                            </MKTypography>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {formik.isSubmitting ? (
                                                                <Skeleton variant="text" sx={{ width:'50%', fontSize: '1rem' }} />
                                                            ): (
                                                                <MKTypography variant={'body2'}>
                                                                    <CurrencyFormat
                                                                        displayType={'text'}
                                                                        value={results.discount}
                                                                        thousandSeparator={true}
                                                                        prefix={currency}
                                                                        decimalScale={2}
                                                                    />
                                                                </MKTypography>)}
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                    <StyledTableRow>
                                                        <StyledTableCell>
                                                            <MKTypography variant={'h6'}>
                                                                {'Total Premium'}
                                                            </MKTypography>
                                                        </StyledTableCell>
                                                        <StyledTableCell width={'40%'}>
                                                            {formik.isSubmitting ? (
                                                                <Skeleton variant="text" sx={{ width:'50%', fontSize: '1rem' }} />
                                                                ): (
                                                            <MKTypography variant={'h6'}>

                                                                <CurrencyFormat
                                                                    displayType={'text'}
                                                                    value={results.totalPremium}
                                                                    thousandSeparator={true}
                                                                    prefix={currency}
                                                                    decimalScale={2}
                                                                />

                                                            </MKTypography>   )}
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </MKBox>
                                </>
                            ) : (<>
                                <MKBox sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}>
                                    <OnlineCalculator/>
                                    <MKTypography variant={'h6'}>
                                        {'No results to show!'}
                                    </MKTypography>
                                    <MKTypography variant={'body2'}>
                                        {'Please enter the required fields to calculate.'}
                                    </MKTypography>
                                </MKBox>

                            </>)}

                        </Grid>
                    </Grid>
                </Container>
            </MKBox>
            <WhatsappButton/>
        </>
    )
}

export default OnlineInsuranceCalculator;