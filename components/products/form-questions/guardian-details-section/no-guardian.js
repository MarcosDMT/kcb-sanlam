import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import MKButton from "../../../@mui-components/button";
import Image from "next/image";
import beneficiaryImage from "../../../../public/static/images/beneficiaries.svg"

const NoGuardian = props => {
    const { handleAdd, handleSkip } = props;
    return (
        <MKBox sx={{
            display: 'flex',
            alignItems: 'center',
            width:'100%',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'dark.main',
            flexDirection: 'column',
            px:4,
            py:2,
        }}>
            <Image
                src={beneficiaryImage}
                alt="Beneficiary Image"
                width={300}
                height={200}
            />
            <MKTypography  variant={'h3'} color={'primary'} gutterBottom>Secure your family members</MKTypography>
            <MKTypography variant={'subtitle1'} gutterBottom>Family and friends are hidden treasures, seek them and enjoy their riches. </MKTypography>
            <MKTypography variant={'h4'} gutterBottom>Who would you like to add to your cover?</MKTypography>
            <MKBox sx={{mt: 2}}>
                <MKButton color={'success'} onClick={e => handleAdd()}>Add Beneficiary</MKButton>
            </MKBox>
        </MKBox>
    );
}

export default NoGuardian;