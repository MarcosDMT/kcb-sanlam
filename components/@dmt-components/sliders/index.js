import {Slider} from "@mui/material";
import {styled} from "@mui/material/styles";
import boxShadow from "../../../theme/functions/boxShadow";
import colors from "../../../theme/base/colors";
const { grey, white, black, info } = colors;
export const DMTSlider = styled(Slider)({
    color: 'linear-gradient(25deg,#0075c9,#4188e7 20%,#25c1ed 90%)',
    height: 10,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 25,
        width: 25,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        "&:hover": {
            boxShadow: "none",
        },

        "&:active": {
            transform: "translate(-50%, -50%) scale(1.4)",
        },

        "&.Mui-active": { boxShadow: boxShadow([0, 0], [0, 14], info.main, 0.16) },
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        //background: 'linear-gradient(25deg,#0075c9,#4188e7 20%,#25c1ed 90%)',
        color: 'white',
    },
});
