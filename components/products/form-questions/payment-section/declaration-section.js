import {paymentDeclaration} from "../../../../api-requests/data/payment-section-data";
import MKBox from "../../../@mui-components/box";

const PaymentDeclarationSection = () => {
    return(
        <MKBox sx={{
            backgroundColor: 'light.main',
            borderRadius: 5,
            p:2,
            mt:2,
        }}>
            {paymentDeclaration.map((declaration, index) => (
                <MKBox
                    key={index}
                    sx={{
                        fontSize: '14px',
                        color: 'dark.main',
                        mt:1,
                        //fontWeight:'bold',
                        textAlign: 'justify',
                        letterSpacing: 'normal'
                    }}
                    component={'li'}>
                    {declaration.name}
                </MKBox>
            ))}
        </MKBox>
    )
}

export default PaymentDeclarationSection;