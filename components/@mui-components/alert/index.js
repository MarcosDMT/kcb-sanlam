
import { useState } from "react";
import PropTypes from "prop-types";
import Fade from "@mui/material/Fade";
import MKAlertRoot from "./alert-root";
import MKBox from "../box";
import MKAlertCloseIcon from "./alert-close-icon";


function MKAlert({ color, dismissible, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <MKAlertRoot ownerState={{ color }} {...rest}>
        <MKBox
          display="flex"
          alignItems="center"
          fontSize="1rem"
          fontWeight="regular"
          color={color === "light" ? "dark" : "white"}
        >
          {children}
        </MKBox>
        {dismissible ? (
          <MKAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</MKAlertCloseIcon>
        ) : null}
      </MKAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of alert
MKAlert.defaultProps = {
  color: "info",
  dismissible: false,
};

// Typechecking props of the alert
MKAlert.propTypes = {
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
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MKAlert;
