import LandingHeader from "./header-section";
import ProductDetailsSection from "./product-details-section";
import StepsSection from "./steps-section";
import {useRef} from "react";
import {WhatsappButton} from "../whatsapp-button";

const LandingPage = () => {
    const products = useRef(null);
    const existingCustomer = useRef(null);

    const scrollToSection = (ref) => {
        window.scrollTo({
            top: ref.current?.offsetTop,
            behavior: 'smooth',
        })
    }


    return(
        <>
            <LandingHeader {...{ scrollToSection, products}}/>
            <StepsSection/>
            <div ref={products}>
                <ProductDetailsSection/>
            </div>
            <WhatsappButton/>
        </>
    )
}

export default LandingPage;