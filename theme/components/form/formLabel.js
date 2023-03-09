import colors from "../../base/colors";
import typography from "../../base/typography";

const { text } = colors;
const { size } = typography;

export default {
  styleOverrides: {
    root: {
      color: text.main,
      fontSize: size.sm,
    },
  },
};
