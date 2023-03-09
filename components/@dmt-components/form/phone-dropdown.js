import DMTTextInput from "./text-input";
import {Autocomplete, Box, InputAdornment, Link, Menu, MenuItem, Popover} from "@mui/material";
import {useEffect, useState} from "react";
import countries from "../../../api-requests/data/countries";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import MKBox from "../../@mui-components/box";
import Popper from "@mui/material/Popper";

const getValue = (options, value) => {
    return options.find(opt => opt.dialCode === value) ?? null;
}
const applyFilter = (countries, query) => countries.map((option) => {
    if (query){

    }
    return false
})
const DMTPhoneSelect = props => {
    const {options, dropdownName, error,onBlur, helperText, value, dropdownValue, name, onChange, onDropdownChange, ...other} = props;
    const handleOnChange = e => {
        const { value, name} = e.target;
        onChange(value);
    }
    const handleOnDropdownChange = (e, value) => {
        if (value){
            onDropdownChange(value.dialCode)
        }
        else{
            onDropdownChange(null);
        }

    }
    const [anchorEl, setAnchorEl] = useState(null);
    const selectedValue = getValue(countries, dropdownValue);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (dropdownValue === ''){
            onDropdownChange(getValue(countries, 'KE')?.dialCode);
        }
    },[dropdownValue])

    return (
     <>
         <DMTTextInput
             name={name}
             value={value}
             onChange={handleOnChange}
             error={error}
             helperText={helperText}
             onBlur={onBlur}
             {...other}
             placeholder={`Enter Phone Number`}
             InputProps={{
                 startAdornment:
                     <InputAdornment  position={"start"}>
                         <Link
                             color="text"
                             sx={{
                             cursor: 'pointer',
                             }}
                             width={100}
                             underline="none"
                             variant="subtitle2"
                             onClick={handleMenu}
                             aria-haspopup="true"
                         >
                             {selectedValue?.dialCode} {Boolean(anchorEl) ? <ArrowDropUp/> : <ArrowDropDown/>}
                         </Link>

                         <Popover
                             id={"menu-country-code"}
                             open={Boolean(anchorEl)}
                             anchorEl={anchorEl}
                             onClose={handleClose}
                             anchorOrigin={{
                                 vertical: 'bottom',
                                // horizontal: 'right',
                             }}
                         >
                             <MKBox sx={{ backgroundColor: 'background.paper',}}>
                                 <DMTTextInput
                                     label={'Search...'}
                                     size={'small'}
                                 />
                             </MKBox>
                             <MKBox sx={{
                                 height: 100
                             }}>
                                 {countries.map((option, index)=> (
                                     <MenuItem key={index} value={option.dialCode} sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                                         <img
                                             loading="lazy"
                                             width="20"
                                             src={`https://flagcdn.com/w20/${option?.isoCode.toLowerCase()}.png`}
                                             srcSet={`https://flagcdn.com/w40/${option?.isoCode.toLowerCase()}.png 2x`}
                                             alt={''}
                                         />
                                         {option.dialCode}
                                     </MenuItem>
                                 ))}
                             </MKBox>
                         </Popover>
                     </InputAdornment>
             }}
     />
         </>
    )
}

export default DMTPhoneSelect;