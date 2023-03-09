import {DatePicker} from "@mui/x-date-pickers";
import DMTTextInput from "./text-input";
import moment from "moment";
import MKTypography from "../../@mui-components/typography";

const getMaxYear = (years) => {
    if (years){
        return new Date(moment().subtract(parseInt(years), 'years').calendar());
    }
}

export const calculateAge = (date) => {
    if (date){
        return new moment().diff(moment(date, "DD MMM YYYY"), 'years');
    }
    return null;
}

const DMTDatePicker = props => {
    const { value, onChange, maxYears, minYears, showAge, required, disableFuture, ...other} = props;
    const age =  calculateAge(value);
    const maxDate = getMaxYear(maxYears);
    const minDate = getMaxYear(minYears);
    const handleOnChange = (newValue) => {
        onChange(newValue);
    }
    return (
        <>
            <DatePicker
                openTo={"year"}
                views={['year', 'month', 'day']}
                inputFormat="dd/MM/yyyy"
                maxDate = {maxDate}
                minDate={minDate}
                disableFuture={disableFuture}

                value={value !=='' ? value : null}
                onChange={handleOnChange}
                renderInput={(params) => <DMTTextInput
                    {...params}
                    {...other}
                    required={required}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'off', // disable autocomplete and autofill
                    }}
                />}
            />
            {showAge && age && (
                <MKTypography align={'center'} sx={{ color:'dark.main'}}>I am {age} years old</MKTypography>
            )}

        </>
    )
}

export default DMTDatePicker;