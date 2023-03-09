import MKBox from "../../../@mui-components/box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import MKTypography from "../../../@mui-components/typography";
import {appName} from "../../../../utils/constants";
import {
    EmailRounded,
    Facebook, Language,
    LinkedIn,
    LocationOnRounded,
    PhoneRounded,
    Twitter,
    YouTube
} from "@mui/icons-material";
import {Divider, Stack} from "@mui/material";
import {useState} from "react";

const date = new Date().getFullYear();

const socialLinks = [
    {
        icon: <YouTube/>,
        link:'https://www.youtube.com/sanlam',
    },
    {
        icon: <Twitter/>,
        link:'https://twitter.com/sanlam',
    },
    {
        icon: <Facebook/>,
        link:'http://www.facebook.com/sanlamgroup',
    },
    {
        icon: <LinkedIn/>,
        link: 'http://www.linkedin.com/company/165844'
    }
];

const individualLinks = {
    title: 'Individual',
    links: [
        {
            name: 'Life Insurance',
            link: 'https://www.sanlam.co.za/kenya/individual/Pages/life-insurance.aspx'
        },
        {
            name: 'Saving for Education',
            link: 'https://www.sanlam.co.za/kenya/individual/Pages/saving-for-education.aspx'
        },
        {
            name: 'General Insurance',
            link: 'https://www.sanlam.co.za/kenya/individual/Pages/general-insurance.aspx'
        },
        {
            name: 'Financial Planning',
            link: 'https://www.sanlam.co.za/kenya/individual/Pages/financial-planning.aspx'
        },
        {
            name: 'Investments',
            link: 'https://www.sanlam.co.za/investmentseastafrica/Pages/default.aspx'
        }
    ]
}
const corporateLinks = {
    title: 'Corporate',
    links: [
        {
            name: 'Life Insurance',
            link: 'https://www.sanlam.co.za/kenya/corporate/Pages/life-insurance.aspx'
        },
        {
            name: 'General Insurance',
            link: 'https://www.sanlam.co.za/kenya/corporate/Pages/general-insurance.aspx'
        },
        {
            name: 'Investments',
            link: 'https://www.sanlam.co.za/investmentseastafrica/Pages/default.aspx'
        },
        {
            name: 'Marine Insurance',
            link: 'https://marine.sanlam.com/'
        }
    ]
}
const customerLinks = {
    title: 'Customer Center',
    links: [
        {
            name: 'Application Forms',
            link: 'https://www.sanlam.co.za/kenya/customerservice/Pages/default.aspx#applicationForms'
        },
        {
            name: 'Claim Forms',
            link: 'https://www.sanlam.co.za/kenya/customerservice/Pages/default.aspx#claimsForms'
        },
    ]
}
const mediaLinks = {
    title: 'Media',
    links: [
        {
            name: 'Press Releases',
            link: 'https://www.sanlam.co.za/kenya/media/Pages/default.aspx'
        },
        {
            name: 'Television Commercials',
            link: 'https://www.sanlam.co.za/kenya/media/Pages/default.aspx#tvcommercials'
        },
    ]
}
const aboutLinks = {
    title: 'About',
    links: [
        {
            name: 'Our Profile',
            link: 'https://www.sanlam.co.za/kenya/about/Pages/default.aspx'
        },
        {
            name: 'Leadership',
            link: 'https://www.sanlam.co.za/kenya/about/Pages/default.aspx#directors'
        },
        {
            name: 'Investor Relations',
            link: 'https://www.sanlam.co.za/kenya/about/Pages/default.aspx#results'
        },
        {
            name: 'Governance',
            link: 'https://www.sanlam.co.za/kenya/about/Pages/governance.aspx'
        },
        {
            name: 'Careers',
            link: 'https://www.sanlam.co.za/kenya/about/Pages/careers.aspx'
        }
    ]
}


//worldwide
const southAfricaLinks = {
    title: 'South Africa',
    links: [
        {
            name: 'South Africa Home',
            link: 'http://www.sanlam.co.za/'
        },
        {
            name: 'Sanlam Investments',
            link: 'http://www.sanlaminvestments.com/'
        },
        {
            name: 'Sanlam Private Wealth',
            link: 'http://sanlamprivatewealth.sanlam.com/'
        },
        {
            name: 'Glacier by Sanlam',
            link: 'http://www.glacier.co.za/'
        },
        {
            name: 'Sanlam BlueStar',
            link: 'http://www.sanlam.co.za/bluestar/Pages/default.aspx'
        }
    ]
}
const restAfricaLinks = {
    title: 'Rest of Africa',
    links: [
        {
            name: 'Sanlam Investments East Africa',
            link: 'http://www.sanlam.co.za/investmentseastafrica'
        },
        {
            name: 'Sanlam Kenya',
            link: 'http://www.sanlam.co.za/kenya'
        },
        {
            name: 'Sanlam Mozambique',
            link: 'http://www.sanlam.co.za/mozambique'
        },
        {
            name: 'Sanlam Namibia',
            link: 'http://www.sanlam.co.za/namibia'
        },
        {
            name: 'Sanlam Private Wealth Mauritius',
            link: 'http://sanlamprivatewealth.mu/'
        },
        {
            name: 'Sanlam Rwanda',
            link: 'https://rw.sanlam.com/'
        },
        {
            name: 'Sanlam Swaziland',
            link: 'http://www.sanlam.co.za/eswatini'
        },
        {
            name: 'Sanlam Tanzania',
            link: 'http://www.sanlam.co.za/tanzania'
        },
        {
            name: 'Sanlam Uganda',
            link: 'http://www.sanlam.co.za/uganda'
        },
        {
            name: 'Sanlam Zambia',
            link: 'http://www.sanlam.co.za/zambia'
        },
    ]
}
const europeLinks = {
    title: 'Europe',
    links: [
        {
            name: 'Sanlam UK',
            link: 'http://www.sanlam.co.uk/'
        },
        {
            name: 'Sanlam Securities UK',
            link: 'http://www.sanlamsecuritiesuk.com/'
        },
        {
            name: 'Sanlam FOUR',
            link: 'https://www.sanlamfour.com/'
        },
        {
            name: 'Sanlam Asset Management Ireland',
            link: 'http://www.sanlam.co.za/ireland'
        },
    ]
}
const globalLinks = {
    title: 'Global',
    links: [
        {
            name: 'Global Investment Solutions',
            link: 'http://www.sanlamgis.com/'
        },
        {
            name: 'Investor Relations',
            link: 'http://www.sanlam.com/'
        },
    ]
}

const DefaultFooter = () => {
    const color = 'light';
    const [openWorld, setOpenWorld] = useState(false);
    const handleOpenClose = () => {
        setOpenWorld(!openWorld)
    }

    return (
        <MKBox component="footer" bgColor={'secondary'}>
            <Container>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4} sx={{ ml: "auto", mb: 3 }}>
                        <MKBox  style={{cursor: 'pointer'}}>
                            <Link href={'/'}>
                                <MKBox style={{maxWidth: '180px'}} component="img" src={'/logo.png'} alt={appName} mb={2} />
                            </Link>
                        </MKBox>
                        <MKBox mt={3}>
                            {/*Contact Information*/}
                            <MKBox display={'flex'} alignItems={'center'} color={color} component={'a'} href={'tel:+25420278100'}>
                                <PhoneRounded sx={{ fontSize: '12px'}}/>
                                <MKTypography color={color} variant={'caption'}  sx={{ ml: 2, fontSize: '12px'}}>{`+254(0)20 278100`}</MKTypography>
                            </MKBox>
                            <MKBox mt={2} display={'flex'} alignItems={'center'} color={color} component={'a'} href={'mailto:info@sanlam.co.ke'}>
                                <EmailRounded fontSize={'small'}/>
                                <MKTypography  color={color}  variant={'caption'} sx={{ ml: 2, fontSize: '12px'}}>{`info@sanlam.co.ke`}</MKTypography>
                            </MKBox>
                            <MKBox mt={2} display={'flex'} alignItems={'center'} color={color} component={'a'} href={'https://goo.gl/maps/ZBB7RyF4y4ubS5wa9'} target={'_blank'}>
                                <LocationOnRounded fontSize={'small'}/>
                                <MKTypography  color={color}  variant={'caption'} sx={{ ml: 2, fontSize: '12px'}}>{`Sanlam Tower Off Waiyaki Way, Westlands`}</MKTypography>
                            </MKBox>

                            {/*Social Links*/}
                            <Stack direction={'row'} spacing={2} mt={4}>
                                {
                                    socialLinks.map((social, index) => (
                                        <MKBox color={color} key={index} component={'a'} href={social.link} target={'_blank'}>
                                            {social.icon}
                                        </MKBox>
                                    ))
                                }
                            </Stack>
                        </MKBox>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={10}>
                            <Grid item xs={12} md={4}>
                                <MKBox display={'flex'} flexDirection={'column'}>
                                    <LinkItem  {...{link: individualLinks, color}}/>
                                    <LinkItem mt={2} {...{link: corporateLinks, color}}/>
                                </MKBox>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <LinkItem {...{link:customerLinks,color}}/>
                                <LinkItem mt={2} {...{link:mediaLinks, color}}/>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <LinkItem {...{link:aboutLinks, color}}/>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Copyright Section */}
                    <Grid item xs={12} md={12} sx={{ my: 3 }}>
                        <Grid container spacing={5} alignItems={openWorld ? '' : 'center'}>
                            <Grid item xs={12} md={openWorld ? 12 : 4} >
                                <MKBox
                                    display={'flex'}
                                    alignItems={'center'}
                                    sx={{ cursor: 'pointer'}}
                                    color={color}
                                    onClick={handleOpenClose}
                                >
                                    <Language sx={{ fontSize: '14px'}} />
                                    <MKTypography
                                        color={color}
                                        variant={'body2'}
                                        sx={{ ml: 2, fontSize: '16px'}}
                                    >
                                        {`Worldwide`}
                                    </MKTypography>
                                </MKBox>
                            </Grid>
                            {
                                openWorld && (
                                    <>
                                        <Grid item xs={12} md={3}>
                                            <LinkItem  {...{link: southAfricaLinks, color}}/>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <LinkItem  {...{link: restAfricaLinks, color}}/>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <LinkItem  {...{link: europeLinks, color}}/>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <LinkItem  {...{link: globalLinks, color}}/>
                                        </Grid>
                                    </>
                                )
                            }
                            <Grid item xs={12} md={openWorld? 12 : 8} >
                                <MKTypography variant="caption" fontWeight="regular"  color={'light'}>

                                    Copyright &copy; {date} | All rights reserved. |
                                    <MKTypography
                                        component="a"
                                        href="https://www.sanlam.com/terms-of-use.php"
                                        target="_blank"
                                        rel="noreferrer"
                                        variant="caption"
                                        fontWeight="regular"
                                        color={'light'}
                                    >
                                        {` Sanlam Life Insurance Limited `}
                                    </MKTypography>
                                    {`is a Licensed Financial Services Provider and a Registered Credit Provider.`}
                                </MKTypography>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </MKBox>
    )
}





const LinkItem = ({ link, color, ...other }) => {
    return (
        <MKBox {...other}>
            <MKTypography color={color} variant={'body2'} sx={{ fontSize: '16px'}}>{link.title}</MKTypography>
            <Divider sx={{ my:1, borderColor:`${color}.main`, backgroundColor:`${color}.main`}}/>
            <MKBox sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                {
                    link.links.map((subLink, index) => (
                        <MKBox
                            key={index}
                            component={'a'}
                            target={'_blank'}
                            href={subLink.link}
                            color={color}
                            sx={{ fontSize: '13px', mt: index === 3 ? 1 : 0 }}
                        >
                            {subLink.name}
                        </MKBox>
                    ))
                }

            </MKBox>
        </MKBox>
    )
}

export default DefaultFooter;