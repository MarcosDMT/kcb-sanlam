import { forwardRef } from "react";
import PropTypes from "prop-types";
import MKInputRoot from "./input-root";

const MKInput = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <MKInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

// Setting default values for the props of text-field
MKInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the text-field
MKInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MKInput;
