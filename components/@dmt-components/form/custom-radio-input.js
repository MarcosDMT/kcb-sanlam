import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import {Check} from "@mui/icons-material";


const DMTRadioButton = props => {
    const { options, active, onChange, placeholder, error, helperText, ...others } = props;
    const handleOnClick = (opt) => {
        onChange(opt);
    };


    return (<>
            {/*<MKTypography component={'label'}>{placeholder}</MKTypography>*/}
            <MKBox sx={{
                display: {md:'flex', sm:'grid'},
                justifyContent:'center',
                alignItems: 'center',
                color: 'dark.main',
                gap: 2,
            }}>
                { options.map( (opt, index) => (
                    <MKBox key={index}  onClick={e => handleOnClick(opt)}  sx={{
                        alignItems:'center',
                        cursor:'pointer',
                        my:1,
                        '&:hover': {
                          boxShadow: 5,
                           // //backgroundColor: theme => alpha(theme.palette.dark.main, 0.1),
                            //transform: 'translate(8px, 2px) scale(1)',
                           // borderBottom: '5px solid',
                        },
                        borderRadius: 2,
                        backgroundColor: theme => theme.palette.light.main,
                        borderLeft:active === opt ? '5px solid ' : '',
                        boxShadow: active === opt ? 5: 1,
                        padding:2,
                    }}>
                        <MKBox sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems:'center',
                        }}>
                            { active === opt && (
                                <Check sx={{mr:1}} fontSize={'small'} color={'success'}/>
                            )}
                            <MKTypography  variant={'h6'}>{opt}</MKTypography>
                        </MKBox>

                    </MKBox>
                ))}

            </MKBox>
            { error && (
                <MKTypography variant={'caption'} color={'error'} align={'center'}>{helperText}</MKTypography>
            )}

        </>
    );
}

export default DMTRadioButton;