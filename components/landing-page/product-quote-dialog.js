import {Modal, Slide} from "@mui/material";
import MKBox from "../@mui-components/box";
import MKTypography from "../@mui-components/typography";
import MKButton from "../@mui-components/button";
import Link from "next/link";
import PropTypes from "prop-types";

const CloseIcon = () => {
    return null;
}

CloseIcon.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    onClick: PropTypes.any,
    fontSize: PropTypes.string,
    sx: PropTypes.shape({ cursor: PropTypes.string }),
};

const ProductQuoteDialog = props => {
    const { open, onClose, title } = props;
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                sx={{ display: "grid", placeItems: "center" }}
            >
                <Slide direction="down" in={open} timeout={500}>
                    <MKBox
                        position="relative"
                        width="500px"
                        display="flex"
                        flexDirection="column"
                        borderRadius="xl"
                        bgColor="white"
                        shadow="xl"
                    >
                        <MKBox display="flex" alignItems="center" flexDirection="column" p={2}>
                            <MKTypography variant="h5" color="info">
                                {`Get Started Now with ${title}`}
                            </MKTypography>
                            <MKTypography variant="body2">
                                { 'Are you an existing Standard Chartered Bank Customer?' }
                            </MKTypography>
                            <CloseIcon
                                fontSize="medium"
                                sx={{ cursor: "pointer" }}
                                onClick={onClose}
                            />
                        </MKBox>
                        <MKBox display="flex" p={1.5}>
                            <MKButton
                                variant="gradient"
                                color="warning"
                                component="a"
                                href="https://www.sc.com/ke/open-account/"
                                target="_blank"
                                //onClick={onClose}
                            >
                                No, Register Now!
                            </MKButton>
                            <MKBox m={1} />
                            <Link href={'#'}>
                                <MKButton
                                    variant="gradient"
                                    color="info"
                                >
                                    Yes, Proceed
                                </MKButton>
                            </Link>

                        </MKBox>
                    </MKBox>
                </Slide>
            </Modal>
        </>
    )
}

ProductQuoteDialog.Prototypes = {
    open: PropTypes.bool.isRequired,
    onClose:  PropTypes.func.isRequired,
    title: PropTypes.string,
}



export default ProductQuoteDialog;