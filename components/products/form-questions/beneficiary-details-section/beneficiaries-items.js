import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import {alpha} from "@mui/material";
import {Cancel} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import Image from "next/image";
import beneficiaryImage from "../../../../public/static/images/beneficiaries.svg";

const BeneficiariesItems = props => {
    const { beneficiaries, handleSelect, handleDelete } = props;
    const handleOnDelete = (index, id) => {
        handleDelete(index, id);
    }
    return (
        <>
            {
                beneficiaries.length > 0 ? beneficiaries.map( (beneficiary, index) => (
                    <MKBox key={index} py={2}>
                        <Badge sx={{ width: '100%'}} badgeContent={<Cancel color={'error'} onClick={e => handleOnDelete(index, beneficiary.id)} fontSize={'small'} sx={{ cursor:'pointer'}}/>}>
                            <MKBox key={index} sx={{
                                height: '60px',
                                display:'flex',
                                alignItems: 'center',
                                width:'100%',
                                backgroundColor: 'light.main',
                                color:'dark.main',
                                boxShadow: 5,
                                borderRadius: 5,
                                py: 2,
                                px: 1,
                                cursor: 'pointer',
                            }} onClick={() => handleSelect(index)}>
                                <MKBox sx={{
                                    borderRadius: '50%',
                                    width:'45px',
                                    height: '45px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    color:'light.main',
                                    alignItems: 'center',
                                    backgroundColor: theme => alpha(theme.palette.primary.main, 1)
                                }} >
                                    <MKTypography sx={{ fontSize: '14px'}} align={'center'}>#{index+1}</MKTypography>
                                </MKBox>

                                <MKBox  sx={{flex:2, ml: 2}}>
                                    <MKTypography variant={'h6'} sx={{ fontSize: '14px'}}> {beneficiary.otherNames}</MKTypography>
                                    <MKTypography variant={'body1'} sx={{ display:{xs: 'none', md: 'block'}, fontSize: '12px'}}>{beneficiary.relationship}</MKTypography>
                                </MKBox>
                                <MKBox sx={{flex:0.5, ml:4}}>
                                    <MKTypography variant={'h4'}>{beneficiary.percentage}%</MKTypography>
                                </MKBox>
                            </MKBox>
                        </Badge>
                    </MKBox>
                )) : (
                    <>
                        <Image
                            // loader={myLoader}
                            src={beneficiaryImage}
                            alt="Step One"
                            width={300}
                            height={200}
                            //placeholder={'blur'}
                        />
                        <MKTypography variant={'h3'} color={'primary'}>Secure your family and friends today.</MKTypography>
                    </>
                )
            }

        </>
    )
}

export default BeneficiariesItems;