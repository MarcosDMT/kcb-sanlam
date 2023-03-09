import {Autocomplete} from "@mui/material";
import countries, { EACountries } from "../../../api-requests/data/countries";
import {Box} from "@mui/material";
import DMTTextInput from "./text-input";

const getValue = (options, value) => {
    return options.find(opt => opt.isoCode === value) ?? null;
}
const DMTCountrySelect = props => {
    const { onChange, value, required, error, helperText, onBlur, filter } = props;
    let countriesOptions = filter ? EACountries : countries;
    const handleOnChange = (event, value) => {
        if (value){
            onChange(value.isoCode);
        }else{
            onChange('');
        }
    }

    return (
        <>
            <Autocomplete
                options={countriesOptions}
                autoHighlight
                onChange={handleOnChange}
                value={getValue(countriesOptions, value)}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option?.isoCode.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option?.isoCode.toLowerCase()}.png 2x`}
                            alt={''}
                        />
                        {option.name}
                    </Box>
                )}
                renderInput={(params) => (
                    <DMTTextInput
                        {...params}
                        label="Country"
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
            />
        </>
    )
}

export default DMTCountrySelect;