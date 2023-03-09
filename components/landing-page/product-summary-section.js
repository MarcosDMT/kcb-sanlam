import {Card, CardContent, CardHeader, Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import FilledInfoCard from "../@dmt-components/cards/info-cards/filled-info-card";
import ProductQuoteDialog from "./product-quote-dialog";
import {useState} from "react";
import MKTypography from "../@mui-components/typography";


const ProductSummarySection = () => {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState('');

    const handleOnCloseModal = () => {
        setOpen(false);
    }
    const handleOnOpenModal = () => (title) => {
        setOpen(true);
        setProduct(title);
    }
    return (
        <>
            <Container sx={{
                p: 2,
                mx: { xs: 2, lg: 3 },
                // mt: -15,

                //backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
               //  backdropFilter: "saturate(200%) blur(30px)",
               // boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={4}>
                        <FilledInfoCard
                            variant="gradient"
                            color="info"
                            icon="school"
                            title="EduCare Plan"
                            description=" The EduCare Plan Secures your children's future today. It combines savings for your child's
              education with life cover to ensure that your dreams for them are realized"
                            action={{
                                type: "internal",
                                onClick: handleOnOpenModal("EduCare Plan"),
                                route: "#",
                                color: "warning",
                                label: "Get Quote",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <FilledInfoCard
                            color="info"
                            // variant="gradient"
                            icon="workspace_premium"
                            title="EduCare Plus"
                            description="Put some money away regularly and guarantee cash payments for your children's education. They focus on
              their grades as you focus on a bright future."
                            action={{
                                type: "internal",
                                onClick: handleOnOpenModal("EduCare Plus Plan"),
                                route: "#",
                                color: "warning",
                                label: "Get Quote",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <FilledInfoCard
                            color="warning"
                            // variant="gradient"
                            icon="family_restroom"
                            title="Super Endowment Plus"
                            description="This is a life insurance product with regular, guaranteed benefits to provide cash in
              the short term & security in the long term for you & your family."
                            action={{
                                type: "internal",
                                onClick: handleOnOpenModal("Super Endowment Plus"),
                                route: "#",
                                color: "warning",
                                label: "Get Quote",
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
            <ProductQuoteDialog {...{ title: product, open, onClose:handleOnCloseModal}}/>
        </>
    )
}

export default ProductSummarySection;