import {Autocomplete} from "@mui/material";
import DMTTextInput from "./text-input";
import {useEffect} from "react";
import {useDispatch, useSelector} from "../../../store";
import {fetchAllBanks, fetchBankBranches} from "../../../slices/utils";

const getValue = (options, value) => {
    return options?.find(opt => opt.branchName === value) ?? null;
}

const DMTBanks = props => {
    const { onChange, label, value, required= false, error, helperText, onBlur } = props;
    const dispatch = useDispatch();
    const { banks } = useSelector(({utils}) => utils)
    const handleOnChange = (event, value) => {
        if (value){
            onChange(value.branchName);
        }else{
            onChange('');
        }
    }

    const fetchBanks = async () => {
        await dispatch(fetchAllBanks())
    }

    useEffect( () => {
        dispatch(fetchBankBranches())
    },[])

    return (
        <>
            <Autocomplete
                options={banks}
                autoHighlight
                onChange={handleOnChange}
                value={getValue(banks, value)}
                getOptionLabel={(option) => option?.bankName}
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

export default DMTBanks;