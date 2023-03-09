import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import {Divider, Icon, IconButton} from "@mui/material";
import {ExpandLessOutlined, ExpandMoreOutlined} from "@mui/icons-material";
import {useState} from "react";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import Link from "next/link";
import MKButton from "../../@mui-components/button";
import ExistingCustomer from "../../landing-page/existing-customer";


const DMTAccordion = props => {
    const { title, content, active, color, link,  ...other} = props;
    const [ isOpened, setIsOpened ] = useState(active);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleOnExpand = e => {
        e.preventDefault();
        setIsOpened(!isOpened);
    }
    return (
        <>
            <MKBox {...other}>
                <MKBox  onClick={handleOnExpand}  sx={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems: 'center',
                }}>
                    <MKTypography  color={'secondary'}  sx={{ cursor: 'pointer', fontSize: {md:'30px',  xs: '25px'}, fontWeight: 'light'}}>
                        {/*<Icon fontSize={'medium'}>family_restroom</Icon> */}
                        {title}
                    </MKTypography>
                    <IconButton color={'secondary'} size={'large'} onClick={handleOnExpand}>
                        {isOpened ? <ExpandLessOutlined fontSize={'large'}/> : <ExpandMoreOutlined fontSize={'large'}/> }
                    </IconButton>
                </MKBox>
                {
                    isOpened && (
                        <Collapse in={Boolean(isOpened)}  unmountOnExit>
                            <MKBox py={2}>
                                { content }
                                <MKBox sx={{ display:'flex', justifyContent:'flex-end'}}>

                                    <Link href={link}>
                                    <MKButton color={"secondary"}>
                                        Apply Now
                                    </MKButton>
                                    </Link>
                                   
                                </MKBox>
                            </MKBox>
                        </Collapse>
                    )
                }
                <Divider sx={{ borderColor:`${color}.main`}}/>
            </MKBox>
            <ExistingCustomer {...{open, onClose: handleClose, link}}/>
        </>

    )
}
DMTAccordion.propTypes = {
    active: PropTypes.bool,
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "light",
        "dark",
    ]),
    content: PropTypes.any,
    title: PropTypes.string.isRequired,
}
DMTAccordion.defaultProps = {
    color: "primary",
    active: false,
};
export default DMTAccordion;