import {Autocomplete} from "@mui/material";
import DMTTextInput from "./text-input";
import {useEffect} from "react";
import {useDispatch, useSelector} from "../../../store";
import {fetchPaymentTerms} from "../../../slices/utils";

const getValue = (options, value) => {
    return options?.find(opt => opt.term === value) ?? null;
}

const DMTPaymentTerms = props => {
    const { onChange, label, value, fullWidth=true, productId, required=false, error, helperText, onBlur, ...other } = props;
    const dispatch = useDispatch();
    const { terms } = useSelector(({utils}) => utils)
    const handleOnChange = (event, value) => {
        if (value){
            onChange(value);
        }else{
            onChange(null);
        }
    }


    useEffect( () => {
        dispatch(fetchPaymentTerms(productId))
    },[productId])

    return (
        <>
            <Autocomplete
                options={terms}
                //fullWidth={fullWidth}
                autoHighlight
                onChange={handleOnChange}
                value={getValue(terms, value)}
                getOptionLabel={(option) => option?.term.toString()}
                renderInput={(params) => (
                    <DMTTextInput
                        {...params}
                        label={label}
                        required={required}
                        error={error}
                        onBlur={onBlur}
                        helperText={helperText}
                        {...other}
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

export default DMTPaymentTerms;