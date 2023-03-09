import colors from "../../base/colors";
import borders from "../../base/borders";
import boxShadows from "../../base/boxShadows";
import pxToRem from "../../functions/pxToRem";


const { grey, white, primary, warning} = colors;
const { borderRadius } = borders;
const { tabsBoxShadow } = boxShadows;

export default {
  styleOverrides: {
    root: {
      position: "relative",
      //backgroundColor: primary.main,
      background: `linear-gradient(25deg,#0c78c5,#5da4ff 30%,#00c7ff 60%)`,
      color: white.main,
      borderRadius: borderRadius.xl,
      minHeight: "unset",
      padding: pxToRem(4),
    },

    flexContainer: {
      height: "100%",
      position: "relative",
      zIndex: 10,
    },

    fixed: {
      overflow: "unset !important",
      overflowX: "unset !important",
    },

    vertical: {
      "& .MuiTabs-indicator": {
        width: "100%",
      },
    },

    indicator: {
      height: "100%",
      borderRadius: borderRadius.lg,
      backgroundColor: white.main,

      boxShadow: tabsBoxShadow.indicator,
      transition: "all 500ms ease",
    },
  },
};
