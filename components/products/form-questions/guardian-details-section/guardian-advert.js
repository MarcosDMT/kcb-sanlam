import React from 'react';
import Image from "next/image";
import beneficiaryImage from "../../../../public/static/images/beneficiaries.svg";
import MKTypography from "../../../@mui-components/typography";

const GuardianAdvert = () => {
    return (
        <>
            <Image
                // loader={myLoader}
                src={beneficiaryImage}
                alt="Guardian"
                width={300}
                height={200}
                //placeholder={'blur'}
            />
            <MKTypography variant={'h3'} color={'secondary'}>Secure your family and friends today.</MKTypography>
        </>
    )
}

export default React.memo(GuardianAdvert)