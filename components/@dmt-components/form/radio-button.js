import {FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup} from "@mui/material";
import MKBox from "../../@mui-components/box";


const DMTNormalRadioButtons = props => {
    const { name, onChange, value, label, options, error, helperText,} = props;
    const handleOnChange = e => {
        onChange(e.target.value);
    }
    return (
        <>
            <MKBox sx={{
                borderRadius: 1,
                py:1,
                px:2,
                color: 'dark.main',
                backgroundColor: theme => theme.palette.common.white,
            }}>
                <FormControl variant={'standard'} error={error}>
                    <FormLabel id={`${label}buttons-group-label`}>{label}</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby={`${label}buttons-group-label`}
                        name={name}
                        value={value}
                        onChange={handleOnChange}
                    >
                        { options.map((opt, index) => (
                            <FormControlLabel key={index} value={opt} control={<Radio checked={value === opt}/>} label={opt} />
                        ))}
                    </RadioGroup>
                    <FormHelperText>{helperText}</FormHelperText>
                </FormControl>
            </MKBox>

        </>
    )
}

export default DMTNormalRadioButtons;