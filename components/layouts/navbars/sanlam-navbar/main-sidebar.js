import {Box, Button, Drawer, Link, Menu, MenuItem, useMediaQuery} from "@mui/material";

import NextLink from "next/link";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {useEffect, useState} from "react";
import { useRouter } from "next/router";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";

const MainSidebarLink = styled(Link)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: "block",
  padding: theme.spacing(1.5),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const MainSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePathChange = () => {
    if (open) {
      onClose?.();
      handleClose();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={!lgUp && open}
      PaperProps={{ sx: { width: 256 } }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 100,
      }}
      variant="temporary"
    >
      <Box sx={{ p: 2 }}>
        <NextLink href="/" passHref>
          <MainSidebarLink
              color="textSecondary"
              underline="none"
              variant="subtitle2"
          >
            Home
          </MainSidebarLink>
        </NextLink>
          <MainSidebarLink
            color="textSecondary"
            underline="none"
            variant="subtitle2"
            onClick={handleMenu}
            aria-haspopup="true"
            sx={{
              cursor: 'pointer'
            }}
          >
             Our Products {Boolean(anchorEl) ? <ArrowDropUp/> : <ArrowDropDown/>}
          </MainSidebarLink>
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
          <MenuItem onClick={handleClose}>
            <NextLink href={'/products/educare-plan'} passHref>
              <Link
                  color="textSecondary"
                  sx={{ ml: 2 }}
                  underline="none"
                  variant="subtitle2"
              > EduCare
              </Link>
            </NextLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NextLink href={'/products/educare-plus'} passHref>
              <Link
                  color="textSecondary"
                  sx={{ ml: 2 }}
                  underline="none"
                  variant="subtitle2"
              >
                EduCare Plus
              </Link>
            </NextLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NextLink href={'/products/super-endowment-plus'} passHref>
              <Link
                  color="textSecondary"
                  sx={{ ml: 2 }}
                  underline="none"
                  variant="subtitle2"
              >
                Super Endowment Plus
              </Link>
            </NextLink>
          </MenuItem>
        </Menu>
        <NextLink href="/online-calculator" passHref>
          <MainSidebarLink
            color="textSecondary"
            underline="none"
            variant="subtitle2"
          >
            Online Calculator
          </MainSidebarLink>
        </NextLink>
      </Box>
    </Drawer>
  );
};

MainSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
