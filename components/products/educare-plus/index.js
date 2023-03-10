import MKBox from "../../@mui-components/box";
import Container from "@mui/material/Container";
import MKTypography from "../../@mui-components/typography";
import QuestionCategory from "../form-questions/question-category";
import PersonalDetailsSection from "../form-questions/personal-details-section";
import MKButton from "../../@mui-components/button";
import {ArrowBackIos} from "@mui/icons-material";
import Zoom from 'react-reveal/Zoom';
import {
    saveDetails,
    setActiveSection,
    setActiveQuestion,
    setSectionCompleted, addResponseDetails,  resetData
} from "../../../slices/educare-plus";
import {useDispatch, useSelector} from "../../../store";
import {useRouter} from "next/router";
import BeneficiariesDetailsSection from "../form-questions/beneficiary-details-section";
import {alpha} from "@mui/material";
import PaymentSection from "../form-questions/payment-section";
import Grid from "@mui/material/Grid";
import EducarePlusLottie from "../../lottie-files/educare-plus-lottie";
import {commonApis} from "../../../api-requests/common-apis";



const EducarePlusSection = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        activeSection,
        questionSections,
        customerId,
        productId,
        responsesDetails,
        activeQuestion,
    } = useSelector(({educarePlus}) => educarePlus);



    const handleOnSectionChange = value => {
        dispatch(setActiveSection(value));
    }

    const handleBack = () =>{
        handleOnSectionChange(null)
    }
    const handleOnDetailsSave = async (data) => {
        await dispatch(saveDetails(activeSection.section, customerId, productId, data))
    }
    const handleOnPaymentSave = async (data) => {
        await dispatch(saveDetails('paymentInfo',customerId, productId, data))
    }
    const handleOnReferralSave= async (data) => {
        await dispatch(saveDetails('referralInfo',customerId, productId, data))
    }
    const handleOnBeneficiarySave= async (data, index) => {
        await  dispatch(saveDetails("beneficiaryInfo", customerId, productId, data, index))
    }
    const handleOnBeneficiaryDelete = async (beneficiaryId) => {
        await commonApis.deleteBeneficiary(customerId, beneficiaryId).then( res => console.log(res) ).catch(e => {
            console.log(e)
        })
    }


    if (activeSection){
        return (
            <>
                <Zoom cascade spy={activeSection} duration={500}>
                    <MKBox component="header"  py={{ xs: 5, md: 5 }}  sx={{
                        minHeight: '100vh',
                        color: 'light.main',
                        background: `linear-gradient(25deg,#21cb5f,#1fb731 30%,#12d78e 60%)`,
                    }}>
                        <Container sx={{
                            mt: {md: 6, xs:8}
                        }}>
                            <MKBox sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <MKButton  variant={'outlined'} onClick={e => handleBack() } > <ArrowBackIos/>  Go Back</MKButton>
                                <MKTypography sx={{ ml:3}}>{'Flexisaver Plus'}</MKTypography>
                            </MKBox>

                            <MKBox sx={{
                                mt:2,
                                backgroundColor: theme => alpha(theme.palette.light.main,0.5),
                                //opacity: 0.1,
                                p:3,
                                borderRadius: 5,
                            }}>
                                <MKTypography  variant={'h3'} color={'secondary'}>{activeSection.name}</MKTypography>
                                <MKTypography color={'dark'} variant={'body1'}>
                                    {activeSection?.description}
                                </MKTypography>
                                <MKTypography color={'dark'} variant={'caption'} sx={{ fontSize: '16px'}}>{activeSection.additionalInfo}</MKTypography>
                                {(activeSection.section === 'personalDetails' || activeSection.section === 'healthInfo')  &&
                                    (
                                        <PersonalDetailsSection {...{
                                            activeSection,
                                            questionSections,
                                            questions: activeSection.questions,
                                            responsesDetails,
                                            activeQuestion,
                                            setActiveQuestion,
                                            setSectionCompleted,
                                            handleOnSave: handleOnDetailsSave,
                                            setActiveSection,
                                        }} />
                                    )
                                }
                                {activeSection.section === 'beneficiaryInfo' && (
                                    <BeneficiariesDetailsSection
                                        {...{
                                            responsesDetails,
                                            activeSection,
                                            questionSections,
                                            questions: activeSection.questions,
                                            addResponseDetails,
                                            setActiveSection,
                                            handleOnBeneficiarySave,
                                            handleOnBeneficiaryDelete
                                        }}
                                    />
                                )}

                                {activeSection.section === 'paymentInfo' &&
                                 (
                                      <PaymentSection {...{
                                          handleOnPaymentSave,
                                          responsesDetails,
                                          handleOnReferralSave,
                                          resetValues:resetData,
                                          minPremium: 300000,
                                          maxPremium: 20000000,
                                          product: "FlexiSaver Plus",
                                          productId: 'flexsaverplus',
                                      }}/>
                                )}
                            </MKBox>
                        </Container>
                    </MKBox>
                </Zoom>
            </>
        )
    }

    return(
        <>
            <Zoom spy={activeSection} duration={500}>
            <MKBox component="header"  py={{ xs: 5, md: 5 }}  sx={{
                minHeight: '100vh',
            }}>
                <Container sx={{
                    mt: {md: 6, xs:8}
                }}>
                    <MKTypography color={'primary'} variant={'h3'}>{'FlexiSaver Plus'}</MKTypography>
                    <MKBox sx={{ mt:{ md: 2, xs:4}}}>
                        <Grid container spacing={3}>
                            <Grid item md={7} xs={12}>
                                { questionSections?.map((questionSection, index) => {
                                    if (questionSection.hidden){
                                        return null;
                                    }
                                    return (
                                        <QuestionCategory
                                            name={questionSection.name}
                                            key={index}
                                            questionSections = {questionSections}
                                            totalQuestions={questionSection.totalQuestions}
                                            answeredQuestions={questionSection.answeredQuestions}
                                            background={questionSection.background}
                                            backgroundColor={questionSection.backgroundColor}
                                            section={questionSection}
                                            condition={questionSection.condition}
                                            onClick = {handleOnSectionChange}
                                        />
                                    )})}
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <MKBox sx={{
                                    display: {md: 'flex', sm:'none', xs:'none'},
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection:'column',
                                }}>
                                    <EducarePlusLottie/>
                                    <MKTypography sx={{ mt: 2}} variant={'h4'} color={'primary'} gutterBottom>{'Secure your child’s future today.'}</MKTypography>
                                    <MKTypography variant={'caption'} sx={{ fontSize: '16px'}} align={'center'}>
                                        {"This is a life insurance product with regular, guaranteed benefits to provide cash in the short term & security in the long term for you & your family."}
                                    </MKTypography>
                                </MKBox>

                            </Grid>
                        </Grid>
                    </MKBox>

                </Container>
            </MKBox>
            </Zoom>
        </>
    )
}

export default EducarePlusSection;