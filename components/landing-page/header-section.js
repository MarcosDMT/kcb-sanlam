import MKBox from "../@mui-components/box";
import MKTypography from "../@mui-components/typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKButton from "../@mui-components/button";
import HeroImage from "./hero-image";
import Link from "next/link";
import Zoom from 'react-reveal/Zoom'


const LandingHeader = props => {
    const { scrollToSection, products} = props;
    return(
            <MKBox component="header"
                   sx={{
                       backgroundImage: ({palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.light.main, 0.1), rgba(gradients.dark.state, 0.9), 270)}, url(/static/background-images/super_endownment.webp)`,
                       //backgroundImage: ({palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.light.main, 0.1), rgba(gradients.dark.state, 0.9), 270)}, url(/static/hero.png)`,
                       backgroundSize: "cover",
                       backgroundPosition: "center",
                       backgroundRepeat: "no-repeat"
                       //backgroundColor:"light.main"
            }}>
                <MKBox
                    display="flex"
                    alignItems="center"
                    minHeight="80vh"
                >
                    <Container>
                        <Grid
                            container
                            flexDirection="row"
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                            mx="auto"
                        >
                            <Grid item xs={12} md={6} lg={6}>
                                <MKTypography
                                    variant="h2"
                                    color="light"
                                    sx={({ breakpoints, typography: { size } }) => ({
                                        [breakpoints.down("md")]: {
                                            fontSize: size["3xl"],
                                        },
                                    })}
                                    mb={3}
                                >
                                    {'Life Insurance'}
                                </MKTypography>
                                <MKTypography color={'light'} variant="body1" mt={1} mb={{ xs: 3, sm: 8 }} px={3}>
                                    KCB Life Insurance provides peace of mind that your family/dependents will be
                                    financially secure no matter what happens.
                                </MKTypography>
                                <MKBox sx={{
                                    mt: -3,
                                }}>
                                    <Link href={'online-calculator'}>
                                        <MKButton
                                            sx={{ mr: 2 }}
                                            variant={'outlined'}
                                            //onClick={handleOnOpenCalculator}
                                        >
                                            Get Quote
                                        </MKButton>
                                    </Link>
                                    <MKButton color={'primary'} onClick={e => scrollToSection(products)}>Start Application</MKButton>

                                </MKBox>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6} mt={{ xs: 3}}>
                                {/*<HeroImage/>*/}
                            </Grid>
                        </Grid>
                    </Container>
                </MKBox>
            </MKBox>
    )
}

export default LandingHeader;