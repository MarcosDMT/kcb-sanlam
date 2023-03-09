import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

export const Logo = styled((props) => {
  const { variant, ...other } = props;

  // if (variant === 'primary'){
  //   return  <img src={'/logo-white.png'} style={{maxWidth: '100px'}} alt={'Logo'}/>
  // }

  return (
    <img src={'/logo.png'} style={{maxWidth: '220px'}} alt={'Logo'}/>
  );
})``;

Logo.defaultProps = {
  variant: "primary",
};

Logo.propTypes = {
  variant: PropTypes.oneOf(["light", "primary"]),
};
