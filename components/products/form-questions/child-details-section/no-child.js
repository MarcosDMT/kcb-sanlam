import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import MKButton from "../../../@mui-components/button";
import Image from "next/image";
import childrenImage from "../../../../public/static/images/children.svg"
import {ArrowForward} from "@mui/icons-material";

const NoChild = props => {
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
                src={childrenImage}
                alt="Beneficiary Image"
                width={300}
                height={200}
            />
            <MKTypography  variant={'h3'} color={'secondary'} gutterBottom>Secure your family members</MKTypography>
            <MKTypography variant={'subtitle1'} gutterBottom>Family and friends are hidden treasures, seek them and enjoy their riches. </MKTypography>
            <MKBox sx={{mt: 2}}>
                <MKButton color={'secondary'} onClick={e => handleAdd()}>Add Child</MKButton>
                <MKButton color={'secondary'} variant={'outlined'} sx={{ ml:2 }} endIcon={<ArrowForward/>} onClick={e => handleSkip()}>Skip</MKButton>
            </MKBox>
        </MKBox>
    );
}

export default NoChild;