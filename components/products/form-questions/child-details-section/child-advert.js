import React from 'react';
import Image from "next/image";
import childImage from "../../../../public/static/images/children.svg";
import MKTypography from "../../../@mui-components/typography";

const ChildAdvert = () => {
    return (
        <>
            <Image
                // loader={myLoader}
                src={childImage}
                alt="Child"
                width={300}
                height={200}
                //placeholder={'blur'}
            />
            <MKTypography variant={'h3'} color={'primary'}>Secure your family and friends today.</MKTypography>
        </>
    )
}

export default React.memo(ChildAdvert)