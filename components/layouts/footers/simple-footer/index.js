import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import MKTypography from "../../../@mui-components/typography";
import MKBox from "../../../@mui-components/box";
import typography from "../../../../theme/base/typography";


const SimpleFooter = ({ company, links, light }) => {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link, key) => (
      <MKBox
        key={link.name}
        component="li"
        pl={key === 0 ? 0 : 2}
        pr={key === links.length - 1 ? 0 : 2}
        lineHeight={1}
      >
        <Link href={link.href} target="_blank">
          <MKTypography variant="button" fontWeight="regular" color={light ? "white" : "text"}>
            {link.name}
          </MKTypography>
        </Link>
      </MKBox>
    ));

  return (
    <Container>
      <MKBox
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <MKBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color={light ? "white" : "text"}
          fontSize={size.sm}
        >
          &copy; {new Date().getFullYear()}, created by
          <Link href={href} target="_blank">
            <MKTypography variant="button" fontWeight="medium" color={light ? "white" : "dark"}>
              &nbsp;{name}&nbsp;
            </MKTypography>
          </Link>
        </MKBox>
        <MKBox
          component="ul"
          sx={({ breakpoints }) => ({
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            listStyle: "none",
            mt: 3,
            mb: 0,
            p: 0,

            [breakpoints.up("lg")]: {
              mt: 0,
            },
          })}
        >
          {renderLinks()}
        </MKBox>
      </MKBox>
    </Container>
  );
}

// Setting default values for the props of simple-footer
SimpleFooter.defaultProps = {
  company: { href: "#", name: "Sanlam Kenya" },
  links: [
  ],
  light: false,
};

// Typechecking props for the simple-footer
SimpleFooter.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
  light: PropTypes.bool,
};

export default SimpleFooter;
