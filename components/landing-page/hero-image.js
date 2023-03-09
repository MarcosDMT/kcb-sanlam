import MKBox from "../@mui-components/box";

const HeroImage = () => {
    return(
        <MKBox
            sx={{
                // backgroundColor: 'info.main',
                width:'100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <MKBox
                sx={{
                    height: '45vh',
                    width: '70vh',
                    borderRadius:'70% 30% 30% 70% / 60% 40% 60% 40% ',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.0), rgba(gradients.dark.state, 0.0))}, url(/static/hero.png)`,
                }}
            >

            </MKBox>
        </MKBox>
    )
}

export default HeroImage;