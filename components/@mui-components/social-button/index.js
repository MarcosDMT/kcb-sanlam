import { forwardRef } from "react";
import PropTypes from "prop-types";
import MKSocialButtonRoot from "./social-button-root";

const MKSocialButton = forwardRef(({ color, size, iconOnly, circular, children, ...rest }, ref) => (
  <MKSocialButtonRoot
    {...rest}
    ref={ref}
    variant="contained"
    color="primary"
    size={size}
    ownerState={{ color, size, iconOnly, circular }}
  >
    {children}
  </MKSocialButtonRoot>
));

// Setting default values for the props of social-button
MKSocialButton.defaultProps = {
  size: "medium",
  color: "facebook",
  iconOnly: false,
  circular: false,
};

// Typechecking props for the social-button
MKSocialButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "pinterest",
    "youtube",
    "github",
    "vimeo",
    "slack",
    "dribbble",
    "reddit",
    "tumblr",
  ]),
  iconOnly: PropTypes.bool,
  circular: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MKSocialButton;
