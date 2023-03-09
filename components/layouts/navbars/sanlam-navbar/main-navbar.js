import {
    AppBar,
    Container,
    IconButton, Link, MenuItem,
    Toolbar,
    Menu,
} from "@mui/material";

import NextLink from "next/link";
import PropTypes from "prop-types";
import {Logo} from "../../../logo";
import {ArrowDropDown, ArrowDropUp, Menu as MenuIcon} from "@mui/icons-material";
import MKBox from "../../../@mui-components/box";
import {useState} from "react";
import MKButton from "../../../@mui-components/button";
import MKTypography from "../../../@mui-components/typography";

export const MainNavbar = (props) => {
  const { onOpenSidebar, position='sticky', transparent= false, color } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleMenu2 = (event) => {
      setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };
const handleClose2 = () => {
      setAnchorEl2(null);
  };


  return (
    <AppBar
      elevation={0}
      position={position}
      sx={{
        backgroundColor: transparent ? 'transparent': "background.paper",
        borderBottomColor: transparent ? ''  : "divider",
        borderBottomStyle: transparent ? ''  : "solid",
        borderBottomWidth: transparent ? ''  : 1,
        color: color,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <IconButton
            color="inherit"
            onClick={onOpenSidebar}
            sx={{
              display: {
                md: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
            <NextLink href="/" passHref>
            <a>
                <Logo/>
            </a>
        </NextLink>
          <MKBox
            sx={{
              alignItems: "center",
              display: {
                md: "flex",
                xs: "none",
              },
                ml: 5
            }}
          >
              <NextLink href="/" passHref>
                  <Link
                      sx={{ ml: 3 }}
                      underline="none"
                      variant="subtitle2"
                  >
                      Home
                  </Link>
              </NextLink>
              <Link color="text" sx={{
                  cursor: 'pointer',
                  ml: 3
              }} underline="none" variant="subtitle2" onClick={handleMenu} aria-haspopup="true">
                Our Products {Boolean(anchorEl) ? <ArrowDropUp/> : <ArrowDropDown/>}
              </Link>
              <NextLink href="/online-calculator" passHref>
                  <Link
                      sx={{ ml: 3 }}
                      underline="none"
                      variant="subtitle2"
                  >
                      Insurance Calculator
                  </Link>
              </NextLink>

                  <Link
                      component="a"
                      href="https://www.sanlam.co.za/kenya/contact/Pages/default.aspx"
                      target="_blank"
                      rel="noreferrer"
                      sx={{ ml: 3 }}
                      underline="none"
                      variant="subtitle2"
                  >
                      Contact
                  </Link>

          </MKBox>
            <MKBox sx={{ flexGrow: 1 }} />
            <MKButton color={'secondary'} size={'small'} sx={{ ml:2, display: { xs: 'none', md:'flex' } }} onClick={handleMenu2} aria-haspopup="true">
                Learn More {Boolean(anchorEl2) ? <ArrowDropUp/> : <ArrowDropDown/>}
            </MKButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem  onClick={handleClose}>
                    <NextLink  href={'/products/flexieducator-plus'} passHref>
                        <Link

                            sx={{ ml: 2 }}
                            underline="none"
                            variant="subtitle2"
                        > FlexiEducator Plus
                        </Link>
                    </NextLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <NextLink href={'/products/flexisaver-plus'} passHref>
                        <Link

                            sx={{ ml: 2 }}
                            underline="none"
                            variant="subtitle2"
                        >
                            FlexiSaver Plus
                        </Link>
                    </NextLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <NextLink href={'/products/sanlam-fadhili'} passHref>
                        <Link

                            sx={{ ml: 2 }}
                            underline="none"
                            variant="subtitle2"
                        >
                            Sanlam Fadhili
                        </Link>
                    </NextLink>
                </MenuItem>
            </Menu>
            <Menu
                id="menu-appbar2"
                anchorEl={anchorEl2}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
            >
                <MenuItem onClick={handleClose2}>
                    <MKTypography

                        sx={{ ml: 2 , fontSize:'14px'}}
                        underline="none"
                        variant="subtitle2"
                        component={'a'}
                        href={'/brochures/EDUCARE_BROCHURE.pdf'}
                        download
                    >
                        EduCare Brochure
                    </MKTypography>
                </MenuItem>
                <MenuItem onClick={handleClose2}>
                    <MKTypography

                        sx={{ ml: 2 , fontSize:'14px'}}
                        underline="none"
                        component={'a'}
                        href={'/brochures/EDUCARE_PLUS_BROCHURE.pdf'}
                        download
                    >
                        EduCare Plus Brochure
                    </MKTypography>
                </MenuItem>
                <MenuItem onClick={handleClose2}>
                    <MKTypography

                        sx={{ ml: 2 , fontSize:'14px'}}
                        underline="none"
                        variant="subtitle2"
                        component={'a'}
                        href={'/brochures/SUPER_ENDOWMENT_BROCHURE.pdf'}
                        download
                    >
                        Super Endowment Plus Brochure
                    </MKTypography>
                </MenuItem>
            </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
