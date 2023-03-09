import {paymentDeclaration} from "../../../../api-requests/data/payment-section-data";
import MKBox from "../../../@mui-components/box";
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, {useState} from "react";
import {Close} from "@mui/icons-material";

const PaymentDeclarationSection = props => {
    const { open, onClose, onSave } = props;
    const [isLoading, setIsLoading] = useState(false);

    const handleOnConfirm  = async () => {
        setIsLoading(true)
        await onSave();
        setIsLoading(false);
    }
    return(
        <Dialog
            open={open}
            //onClose={onClose}
            fullWidth
            maxWidth={'md'}
            scroll={'body'}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center'}}>
                Payment Declaration
                <MKBox sx={{ flex: '1 0 auto'}}/>
                <IconButton onClick={onClose}>
                    <Close/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <MKBox sx={{
                    backgroundColor: 'light.main',
                    borderRadius: 5,
                    p:2,
                    mt:2,
                }}>
                    {paymentDeclaration.map((declaration, index) => (
                        <MKBox
                            key={index}
                            sx={{
                                fontSize: '14px',
                                color: 'dark.main',
                                mt:1,
                                //fontWeight:'bold',
                                textAlign: 'justify',
                                letterSpacing: 'normal'
                            }}
                            component={'li'}>
                            {declaration.name}
                        </MKBox>
                    ))}
                </MKBox>
                <DialogActions>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="start"
                        variant="contained"
                        color={'success'}
                        onClick={handleOnConfirm}
                    >
                        Confirm & Proceed
                    </LoadingButton>
                </DialogActions>
            </DialogContent>

        </Dialog>

    )
}

export default React.memo(PaymentDeclarationSection);