import MKTypography from "../@mui-components/typography";
import Container from "@mui/material/Container";
import MKBox from "../@mui-components/box";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import stepOne from "../../public/static/images/step_1.png";
import stepTwo from "../../public/static/images/step_2.png";
import stepThree from "../../public/static/images/step_3.png"
import Badge from "@mui/material/Badge";
import MKButton from "../@mui-components/button";
import Link from "next/link";

const steps = [
    {
        id: '01',
        image: stepOne,
        name: 'Tell us about yourself',
        description: '',
    },
    {
        id: '02',
        image: stepTwo,
        name: 'See if you are eligible',
        description: '',
    },
    {
        id: '03',
        image: stepThree,
        name: 'Activate your policy',
        description: '',
    },
]

const StepsSection = props => {
    return(
        <MKBox component="section" py={{ xs: 3, md: 5 }} sx={{
            backgroundColor: 'primary.main',
            minHeight: '100vh',
        }}>
            <Container
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <MKBox>
                    <MKTypography  variant="h3" color={'light'} my={1}>
                        Done in 3 easy steps
                    </MKTypography>
                </MKBox>
                <Grid container spacing={8} sx={{ mt: 2 }} alignItems="center">
                    {
                        steps.map(step => (
                            <Grid key={step.id} item xs={12} md={4} lg={4}>
                                <MKBox
                                    sx={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Badge color={'secondary'} badgeContent={step.id} sx={{ fontSize: 25}} >
                                        <Image
                                            // loader={myLoader}
                                            src={step.image}
                                            alt="Step One"
                                            placeholder={'blur'}
                                        />
                                    </Badge>
                                    <MKTypography sx={{ mt: 2}} variant={'h5'}  color={'light'} gutterBottom>{step.name}</MKTypography>
                                    <MKTypography variant={'caption'}  color={'light'}>{step.description}</MKTypography>
                                </MKBox>
                            </Grid>
                        ))
                    }

                </Grid>
                <MKBox mt={10}>
                    <Link href={'online-calculator'}>
                        <MKButton> Get Quote</MKButton>
                    </Link>
                </MKBox>
            </Container>
        </MKBox>
    )
}

export default StepsSection;