import MKBox from "../../../@mui-components/box";
import PaymentForm from "./payment-form";
import ReferralSection from "./referral-section";
import {useState} from "react";

const PaymentSection = props => {
    const { handleOnPaymentSave,
        responsesDetails,
        handleOnReferralSave,
        resetValues,
        minPremium,
        maxPremium,
        product,
        productId,
    } = props;
    const [step, setStep] = useState(0);
    const handleOnStepChange = () => {
        setStep(1);
    }
    return (
        <>
            <MKBox
                component={'section'}
                sx={{
                    gap: 1,
                    minHeight: '500px',
                }}
            >
                { step === 0 && (
                    <PaymentForm {...{
                        responsesDetails,
                        onSave:handleOnPaymentSave,
                        minPremium,
                        maxPremium,
                        handleOnStepChange,
                        productId,
                    }}
                    />
                )}

                { step === 1 && (
                    <ReferralSection {...{
                        onSave: handleOnReferralSave,
                        resetValues,
                        responsesDetails,
                        product
                    }}/>
                )}

            </MKBox>
        </>
    )
}

export default PaymentSection;