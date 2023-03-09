import MKTypography from "../@mui-components/typography";
import Container from "@mui/material/Container";
import MKBox from "../@mui-components/box";
import ContactUs from "./contact-us-section";
import DMTAccordion from "../@dmt-components/accordion";
import MKButton from "../@mui-components/button";

const products = [
  {
    id: 2,
    name: "FlexiEducator Plus",
    description:
      "Put some money away regularly and guarantee cash payments for your children's education. " +
      "They focus on their grades as you focus on giving them a bright future.",
    active: true,
    link: "/products/flexieducator-plus",
  },
  {
    id: 1,
    name: "FlexiSaver Plus",
    description:
      "This is a life insurance product with regular, guaranteed benefits to provide cash in" +
      " the short term & security in the long term for you & your family.",
    active: true,
    link: "/products/flexisaver-plus",
  },
  {
    id: 3,
    name: "Sanlam Fadhili",
    description:
      "Thinking ahead and planning for when you’ll no longer be there can be difficult. It can however be comforting to know that by arranging and paying for things now, you will be sparing your loved ones some of the emotional and financial burden at a difficult time.",
    active: true,
    link: "/products/sanlam-fadhili",
  },
];

const ProductDetailsSection = (props) => {
  return (
    <MKBox
      component="section"
      py={{ xs: 3, md: 5 }}
      sx={{
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MKBox>
          <MKTypography variant="h3" color={"secondary"} my={1}>
            {`Here's what we offer`}
          </MKTypography>
        </MKBox>
        <MKBox mt={2} width={{ md: "75%", xs: "100%" }}>
          {products.map((product) => (
            <DMTAccordion
              key={product.id}
              icon="family_restroom"
              active={product?.active}
              title={product.name}
              content={
                <MKTypography variant={"body1"}>
                  {product.description}
                </MKTypography>
              }
              link={product.link}
            />
          ))}
        </MKBox>
        <ContactUs />
      </Container>
    </MKBox>
  );
};

export default ProductDetailsSection;
