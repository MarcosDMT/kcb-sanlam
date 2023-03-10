import {Autocomplete} from "@mui/material";
import DMTTextInput from "./text-input";
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "../../../store";
import {fetchBankBranches, fetchBranches} from "../../../slices/utils";

const getValue = (options, value) => {
    return options?.find(opt => opt.name === value) ?? null;
}

const DMTBankBranches = props => {
    const { onChange, label, value, required = false, error, helperText, onBlur, bankID } = props;
    const dispatch = useDispatch();
    const { branches } = useSelector(({utils}) => utils)
    const handleOnChange = (event, value) => {
        if (value){
            onChange(value.name);
        }else{
            onChange('');
        }
    }

    const getBankBranches = useCallback(async () => {
            await dispatch(fetchBankBranches());
    },[])

    useEffect( () => {
        getBankBranches();
    },[])

    return (
        <>
            <Autocomplete
                options={branches}
                autoHighlight
                onChange={handleOnChange}
                value={getValue(branches, value)}
                getOptionLabel={(option) => option?.name}
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
            />
        </>
    )
}

export default DMTBankBranches;