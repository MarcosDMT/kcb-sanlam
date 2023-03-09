import PropTypes from "prop-types";
import Link from 'next/link'
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";
import MKTypography from "../../../@mui-components/typography";
import MKBox from "../../../@mui-components/box";
import LinkGuard from "../../../../hocs/link-guard";


const  DefaultNavbarDropdown = props => {
  const { name, icon, children, collapseStatus, light,external, href, route, collapse, ...rest} = props
  return (
      <>
        <LinkGuard href={href}>
          <MKBox
              {...rest}
              mx={1}
              p={1}
              display="flex"
              alignItems="baseline"
              color={light ? "white" : "dark"}
              opacity={light ? 1 : 0.6}
              sx={{ cursor: "pointer", userSelect: "none" }}
          >
            <MKTypography
                variant="body2"
                lineHeight={1}
                color="inherit"
                sx={{ alignSelf: "center", "& *": { verticalAlign: "middle" } }}
            >
              {icon}
            </MKTypography>
            <MKTypography
                variant="button"
                fontWeight="regular"
                textTransform="capitalize"
                color={light ? "white" : "dark"}
                sx={{ fontWeight: "100%", ml: 1, mr: 0.25 }}
            >
              {name}
            </MKTypography>
            <MKTypography variant="body2" color={light ? "white" : "dark"} ml="auto">
              <Icon sx={{ fontWeight: "normal", verticalAlign: "middle" }}>
                {collapse && "keyboard_arrow_down"}
              </Icon>
            </MKTypography>
          </MKBox>
        </LinkGuard>
        {children && (
            <Collapse in={Boolean(collapseStatus)} timeout={400} unmountOnExit>
              {children}
            </Collapse>
        )}
      </>
  );
}

// Setting default values for the props of DefaultNavbarDropdown
DefaultNavbarDropdown.defaultProps = {
  children: false,
  collapseStatus: false,
  light: false,
  href: "",
  route: "",
};

// Typechecking props for the DefaultNavbarDropdown
DefaultNavbarDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node,
  collapseStatus: PropTypes.bool,
  light: PropTypes.bool,
  href: PropTypes.string,
  route: PropTypes.string,
  collapse: PropTypes.bool.isRequired,
};

export default DefaultNavbarDropdown;
