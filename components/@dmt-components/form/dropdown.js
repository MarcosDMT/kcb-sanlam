import {Autocomplete} from "@mui/material";
import DMTTextInput from "./text-input";



const DMTDropdown = props => {
    const {  onChange, label, options, value, required, error, onBlur, helperText, ...other} = props;

    const handleOnChange = (e, value) => {
       onChange(value);
    }

    return (
        <>
            <Autocomplete
                options={options}
                autoHighlight
                onChange={handleOnChange}
                value={value}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <DMTTextInput
                        {...params}
                        label={label}
                        required={required}
                        error={error}
                        onBlur={onBlur}
                        helperText={helperText}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill

                        }}
                    />
                )}
                {...other}
            />
        </>
    )
}

export default DMTDropdown;