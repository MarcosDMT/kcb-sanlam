import MKBox from "../../../@mui-components/box";
import {useState} from "react";
import {Step, StepLabel, Stepper} from "@mui/material";
import PaymentDetailsForm from "./payment-details-form";
import FileAttachment from "./file-attachment";
import ConfirmationSection from "./confirmation-section";
import AgentDetailsSection from "./agent-details-section";

const steps = [
    {
        label: 'Payment Details',
    },
    {
        label: 'File Attachments',
    },
    {
        label: 'Agent Details (optional)',
    },
    {
        label: 'Confirmation & Finish',
    }
];
const PaymentSectionDetails = props => {
    const { handleOnPaymentSave,
        responsesDetails,
        handleOnReferralSave,
        resetValues,
        minPremium,
        maxPremium,
        product,
        productId,
    } = props;
    const [activeStep, setActiveStep] = useState(0);

    const handleOnStepChange = () => {
        setActiveStep(prevState => prevState + 1);
    }

    const handleBack = () => {
        setActiveStep((prevState) => prevState - 1);
    };
    return (
        <>
            <MKBox
                component={'section'}
                sx={{
                    gap: 1,
                    minHeight: '50vh',
                    width:'100%',
                    my:1,
                }}
            >
                <Stepper sx={{ display: { xs: 'none', sm: 'none', md: 'flex'}}} activeStep={activeStep}>
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>
                                {step.label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 && (
                    <>
                        <PaymentDetailsForm
                            {...{
                                responsesDetails,
                                onSave:handleOnPaymentSave,
                                minPremium,
                                maxPremium,
                                handleOnStepChange,
                                productId,
                                handleBack,
                            }}
                        />
                    </>
                )}
                {
                    activeStep === 1 && (
                        <>
                            <FileAttachment
                                {...{
                                    responsesDetails,
                                    onSave:handleOnPaymentSave,
                                    minPremium,
                                    maxPremium,
                                    handleOnStepChange,
                                    productId,
                                    handleBack,
                                }}
                            />
                        </>
                    )
                }
                {
                    activeStep === 2 && (
                        <>
                            <AgentDetailsSection
                                {...{
                                    onSave: handleOnReferralSave,
                                    responsesDetails,
                                    handleOnStepChange,
                                    product,
                                    handleBack
                                }}
                            />
                        </>
                    )
                }
                {
                    activeStep === 3 && (
                        <>
                            <ConfirmationSection
                                {...{
                                    onSave: handleOnReferralSave,
                                    resetValues,
                                    responsesDetails,
                                    product,
                                    handleBack
                                }}
                            />
                        </>
                    )
                }

            </MKBox>
        </>
    )
}

export default PaymentSectionDetails;