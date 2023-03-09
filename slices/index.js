import educarePLusReducer from "./educare-plus";
import sanlamEducareReducer from "./sanlam-educare";
import superEndowmentReducer from "./super-endowment";
import utilsReducer from "./utils";

const reducers = {
    educarePlus: educarePLusReducer,
    superEndowment: superEndowmentReducer,
    utils: utilsReducer,
    sanlamEducare: sanlamEducareReducer
}

export default reducers;