import MKBox from "../../@mui-components/box";
import Container from "@mui/material/Container";
import MKTypography from "../../@mui-components/typography";
import MKButton from "../../@mui-components/button";
import {ArrowBackIos} from "@mui/icons-material";
import Zoom from 'react-reveal/Zoom';
import {useDispatch, useSelector} from "../../../store";
import {alpha} from "@mui/material";
import PaymentSection from "../form-questions/payment-section";
import Grid from "@mui/material/Grid";
import PersonalDetailsSection from "../form-questions/personal-details-section";
import BeneficiariesDetailsSection from "../form-questions/beneficiary-details-section";
import QuestionCategory from "../form-questions/question-category";
import {
    saveDetails,
    setActiveSection,
    addResponseDetails,
    setActiveQuestion,
    setSectionCompleted, resetData
} from "../../../slices/sanlam-educare";
import SanlamEducareLottie from "../../lottie-files/sanlam-educare-lottie";
import {commonApis} from "../../../api-requests/common-apis";
import ChildDetailsSection from "../form-questions/child-details-section";
import GuardianDetailsSection from "../form-questions/guardian-details-section";
import PaymentDetailsSection from "../form-questions/payment-details-section";
import { light } from "@mui/material/styles/createPalette";

const SanlamEducareSection = () => {
    const dispatch = useDispatch();
    const {
        activeSection,
        questionSections,
        customerId,
        productId,
        responsesDetails,
        activeQuestion,
    } = useSelector(({sanlamEducare}) => sanlamEducare);


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
    const handleOnGuardianSave = async (data) => {
        await  dispatch(saveDetails("guardianDetails", customerId, productId, data))
    }
    const handleOnChildSave= async (data, index) => {
        try {
            await  dispatch(saveDetails("childDetails", customerId, productId, data,  index))
            //toast.success("Child Saved Successfully!")
        }
        catch (e) {
            console.log(e);
        }

    }
    const handleOnChildDelete = async (childId) => {
        await commonApis.deleteChild(customerId, childId).then( res => console.log(res) ).catch(e => {
            console.log(e)
        })
    }
    const handleOnBeneficiaryDelete = async (beneficiaryId) => {
        await commonApis.deleteBeneficiary(customerId, beneficiaryId).then( res => console.log(res) ).catch(e => {
            console.log(e)
        })
    }


    if (activeSection){
        return (
            <>
                <Zoom spy={activeSection} duration={500}>
                    <MKBox component="header"  py={{ xs: 5, md: 5 }}  sx={{
                        minHeight: '100vh',
                        color: 'dark.main',
                        // background: `linear-gradient(25deg,#0c78c5,#5da4ff 30%,#00c7ff 60%)`,
                        background: 'linear-gradient(25deg,#21cb5f,#1fb731 30%,#12d78e 60%)'
                    }}>
                        <Container sx={{
                            mt: {md: 6, xs:8}
                        }}>
                            <MKBox sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <MKButton color={'light.main'}  variant={'outlined'} onClick={e => handleBack() } > <ArrowBackIos/>  Go Back</MKButton>
                                <MKTypography sx={{ ml:3}}>{'FlexiEducator Plus'}</MKTypography>
                            </MKBox>

                            <MKBox sx={{
                                mt:2,
                               backgroundColor: theme => alpha(theme.palette.light.main,0.5),
                                //opacity: 0.1,
                                p:3,
                                borderRadius: 5,
                            }}>
                                <MKTypography color={'secondary'}  variant={'h3'}>{activeSection.name}</MKTypography>
                                <MKTypography color={'dark'} variant={'body1'}>
                                    {activeSection?.description}
                                </MKTypography>
                                <MKTypography color={'light.main'} variant={'caption'} sx={{ fontSize: '16px'}}>{activeSection.additionalInfo}</MKTypography>
                                {(activeSection.section === 'personalDetails' || activeSection.section === 'healthInfo' || activeSection.section === 'occupationDetails')  &&
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
                                {activeSection.section === 'childDetails' && (
                                    <ChildDetailsSection
                                        {...{
                                            responsesDetails,
                                            activeSection,
                                            questionSections,
                                            questions: activeSection.questions,
                                            addResponseDetails,
                                            setActiveSection,
                                            handleOnChildSave,
                                            handleOnChildDelete
                                        }}
                                    />
                                )}
                                {activeSection.section === 'guardianDetails' && (
                                    <GuardianDetailsSection
                                        {...{
                                            responsesDetails,
                                            activeSection,
                                            questionSections,
                                            questions: activeSection.questions,
                                            addResponseDetails,
                                            setActiveSection,
                                            handleOnGuardianSave,
                                            handleOnBeneficiaryDelete
                                        }}
                                    />
                                )}

                                {activeSection.section === 'paymentInfo' &&
                                    (
                                        <PaymentDetailsSection {...{
                                            handleOnPaymentSave,
                                            responsesDetails,
                                            handleOnReferralSave,
                                            resetValues: resetData,
                                            product: "EduCare",
                                            maxPremium: 20000,
                                            minPremium: 0,
                                            productId: 2,
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
                        <MKTypography color={'primary'} variant={'h3'}>{'FlexiEducator Plus'}</MKTypography>
                        <MKBox sx={{ mt:{ md: 2, xs:4}}}>
                            <Grid container spacing={3}>
                                <Grid item md={5} xs={12}>
                                    <MKBox sx={{
                                        display: {md: 'flex', sm:'none', xs:'none'},
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection:'column',
                                    }}>
                                        <SanlamEducareLottie/>
                                        <MKTypography sx={{ mt: 2}} variant={'h4'} color={'primary'} gutterBottom>{'Secure your child’s future today'}</MKTypography>
                                        <MKTypography variant={'caption'} sx={{ fontSize: '16px'}} align={'center'}>
                                            {"Put some money away regularly and guarantee cash payments for your children's education. They focus on their grades as you focus on giving them a bright future."}
                                        </MKTypography>
                                    </MKBox>

                                </Grid>
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

                            </Grid>
                        </MKBox>
                        {/*<MKBox sx={{ mt: 5, backgroundColor:'secondary.main', minHeight:'50vh'}} >*/}
                        {/*    <MKTypography>{'Related Products'}</MKTypography>*/}
                        {/*    <ProductSummarySection/>*/}
                        {/*</MKBox>*/}

                    </Container>
                </MKBox>
            </Zoom>
        </>
    )
}

export default SanlamEducareSection;