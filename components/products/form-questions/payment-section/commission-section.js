import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import {alpha, Table, TableBody, TableContainer} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "../../../@dmt-components/tables";
import {commissionRates} from "../../../../api-requests/data/payment-section-data";

const CommissionSection = props => {
    const { product } = props;
    return (
        <>
            <MKBox
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent:'center',
                    mt:2,
                }}
            >
                { product === 'EduCare' ? (
                    <>
                        <MKTypography variant={'h6'} sx={{fontSize: '14px'}} color={'dark'}>
                            {'NOTE: Standard Chartered Bancassurance Intermediary Ltd earns commissions on the premiums paid ' +
                                'for this insurance product, as indicated below.'}<br/>
                            <TableContainer sx={{width: {md: '50%', xs: '100%'}}}>
                                <Table sx={{
                                    backgroundColor: theme=> alpha(theme.palette.light.main, 0.3),
                                }}>
                                    <TableBody>
                                        <StyledTableRow>
                                            <StyledTableCell>
                                                <MKTypography color={'primary'} variant={'h6'}>
                                                    {`Year`}
                                                </MKTypography>

                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <MKTypography color={'primary'} variant={'h6'}>
                                                    {`Commission (%)`}
                                                </MKTypography>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                        {
                                            commissionRates.map((rate, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell>
                                                        <MKTypography variant={'caption'}>
                                                            {rate.year}
                                                        </MKTypography>
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <MKTypography variant={'caption'}>
                                                            {rate.commission}
                                                        </MKTypography>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br/>
                            {'Commission is paid for a maximum of 10 years'}
                        </MKTypography>

                    </>
                ): (
                    <>
                        <MKTypography variant={'h6'} color={'dark'}>
                            {'NOTE: Standard Chartered Bancassurance Intermediary Ltd earns on the premiums paid for this insurance' +
                                ' product: Commission is payable at 40% of on first year premiums only and is based on gross' +
                                ' policyholder premiums (inclusive of statutory levies).'}
                        </MKTypography>
                    </>
                )}
            </MKBox>
        </>
    )
}

export default CommissionSection;