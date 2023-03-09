import {Checkbox, FormControl, FormControlLabel} from "@mui/material";
import MKBox from "../../@mui-components/box";
import {useEffect} from "react";

const checkValue = (value) => {
    return value === 'Yes';
}
const DMTCheckbox = props => {
    const { checked, handleOnChange, label, name} = props;

    const handleChange = e => {
        console.log();
        if (e.target.checked){
            handleOnChange('Yes');
        }
        else{
            handleOnChange('No');
        }

    }

    useEffect(() => {
        if (checked === ''){
            handleOnChange('No')
        }
    },[checked])

    return (
        <>
            <MKBox sx={{
                borderRadius: 2,
                py:1,
                px:2,
                color: 'dark.main',
                backgroundColor: theme => theme.palette.light.main,
                boxShadow: 5,
            }}>
                <FormControl component="fieldset">
                    <FormControlLabel
                        label={label}
                        control={
                            <Checkbox
                                checked={checkValue(checked)}
                                name={name}
                                onChange={handleChange}
                            />
                        }
                    />
                </FormControl>
            </MKBox>

        </>
    )
}

export default DMTCheckbox;