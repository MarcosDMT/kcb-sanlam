import { InputAdornment, MenuItem } from "@mui/material";
import DMTTextInput from "./text-input";
import {useEffect} from "react";
import {ArrowDropDown} from "@mui/icons-material";

const DMTDropdownText = props => {
    const {options, dropdownName, error,onBlur, helperText, value, dropdownValue, name, onChange, onDropdownChange, disabled = false, ...other} = props;
    const handleOnChange = e => {
        const { value} = e.target;
        onChange(value);
    }

    const handleOnDropdownChange = e => {
        onDropdownChange(e.target.value);
    }

    useEffect(() => {
        if (dropdownValue === ''){
            onDropdownChange(options[0]);
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
                disabled = {disabled}
                {...other}
                placeholder={`Enter ${dropdownValue}`}
                InputProps={{
                    autoComplete: 'off',
                    startAdornment:
                        <InputAdornment  position={"start"}>
                        <DMTTextInput
                            sx={{
                                minWidth: '40%'
                            }}
                            variant={'standard'}
                            name={dropdownName}
                            onChange={handleOnDropdownChange}
                            title={'Click to select options'}
                            select
                            disabled = {disabled}
                            value={dropdownValue || ''}
                            InputProps={{
                                disableUnderline: true,
                                autoComplete: 'off',
                                endAdornment:  <InputAdornment position={"end"}>
                                    <ArrowDropDown size={'large'} color={'primary'}/>
                                </InputAdornment>
                            }}
                        >
                            {options?.map( (opt, index) => (
                                <MenuItem key={index} value={opt}>
                                    {opt}
                                </MenuItem>
                                ))}
                        </DMTTextInput>
                    </InputAdornment>
                }}

            />
        </>
    )
}

export default DMTDropdownText;