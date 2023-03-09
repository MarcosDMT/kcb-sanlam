import MKBox from "../../../@mui-components/box";
import {disclaimer} from "../../../../api-requests/data/payment-section-data";

const Disclaimer = () => {
    return(
        <MKBox sx={{
            backgroundColor: 'light.main',
            borderRadius: 5,
            p:2,
            mt:2,
        }}>
            {disclaimer.map((declaration, index) => (
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

export default Disclaimer;