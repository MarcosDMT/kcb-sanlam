import React, {useState} from 'react';
import {Alert, Snackbar, Typography} from "@mui/material";

const CopyToClipboard = props => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const { value = "", color= 'primary'} = props;
    const handleClick = e => {
        e.preventDefault();
        setOpen(true);
        try {
            navigator.clipboard.writeText(value).then(() => {
                setMessage("Copied to Clipboard");
            }).catch(e => console.log(e));
        }
        catch (e){
            setMessage(e.message)
        }

    };
    const handleClose = ()=> {
        setOpen(false);
    }
    if (!value || value ===''){
        return null;
    }
    return (
        <>
            <Typography
                variant={'h6'}
                sx={{cursor: 'pointer'}}
                color={color}
                onClick={handleClick}
                title={'Click to copy to clipboard'}>
                {value}
            </Typography>
            {/*<TextField*/}
            {/*    fullWidth*/}
            {/*    value={value}*/}
            {/*    disabled*/}
            {/*    size={"small"}*/}
            {/*    InputLabelProps={{ shrink: true, }}*/}
            {/*    InputProps={{*/}
            {/*        endAdornment: <InputAdornment position={'end'}>*/}
            {/*            <Button sx={{mr:-2}} onClick={handleClick}>Copy</Button>*/}
            {/*        </InputAdornment>*/}
            {/*    }}*/}
            {/*/>*/}
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={2000}
                onClose={handleClose}
                open={open}
            >
                <Alert severity="success" variant={'filled'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default CopyToClipboard