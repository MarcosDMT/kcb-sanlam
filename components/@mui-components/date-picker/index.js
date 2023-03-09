import PropTypes from "prop-types";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import MKInput from "../text-field";

function MKDatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <MKInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

// Setting default values for the props of date-picker
MKDatePicker.defaultProps = {
  input: {},
};

// Typechecking props for the date-picker
MKDatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default MKDatePicker;
