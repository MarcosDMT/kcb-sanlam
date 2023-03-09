import SanlamFooter from "./footers/sanlam-footer";
import {styled} from "@mui/material/styles";
import {useState} from "react";
import {MainNavbar} from "./navbars/sanlam-navbar/main-navbar";
import {MainSidebar} from "./navbars/sanlam-navbar/main-sidebar";
import PropTypes from "prop-types";

const SanlamRoot = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    height: "100%",
    //paddingTop: 64,
}));

const DefaultLayout = props => {
    const { children, color='text.main', position='relative' } = props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return(
        <SanlamRoot>
            {/*<DefaultNavbar*/}
            {/*    brand={<Logo/>}*/}

            {/*    routes={menuItems}*/}
            {/*    sticky={true}*/}
            {/*    //relative={true}*/}
            {/*    dark*/}
            {/*/>*/}
            <MainNavbar color={color} position={position} transparent={true}  onOpenSidebar={() => setIsSidebarOpen(true)} />
            <MainSidebar
                onClose={() => setIsSidebarOpen(false)}
                open={isSidebarOpen}
            />
            { children }
            <SanlamFooter />
        </SanlamRoot>
    )
}

export const AppLayout =  props => {
    const { children, color='text.main' } = props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return(
        <SanlamRoot>
            <MainNavbar color={color} position={'absolute'} transparent={true}  onOpenSidebar={() => setIsSidebarOpen(true)} />
            <MainSidebar
                onClose={() => setIsSidebarOpen(false)}
                open={isSidebarOpen}
            />
            { children }
        </SanlamRoot>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};
export default DefaultLayout;