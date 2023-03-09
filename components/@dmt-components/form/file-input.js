import DMTTextInput from "./text-input";


const DMTFileInput = props => {
    const {
        onChange,
        label,
        value,
        required,
        error,
        onBlur,
        helperText,
        ...others
    } = props;


    const handleOnChange = e => {
        const file = e.target.files[0];
        if (file !== undefined){
            const fileExtension = '.' + file.name.split('.').pop();
            getBase64(file)
                .then(data => {
                    onChange({
                        name: file.name,
                        extension: fileExtension,
                        data: data
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else{
            onChange(null)
        }
    }

    const getBase64 = file => {
        return new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
        });
    };

    return (
        <>
            <DMTTextInput
                type={'file'}
                onChange={handleOnChange}
                required={required}
                error={error}
                InputLabelProps={{ shrink: true }}
                onBlur={onBlur}
                helperText={helperText}
                label={label}
                {...others}
            />
        </>
    )
}

export default DMTFileInput;