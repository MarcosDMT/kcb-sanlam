import React from "react";
import Lottie from "react-lottie";
import animationData from "../../public/lottie/super-endownment-lottie.json"

const SuperEndowmentLottie = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return <Lottie
        options={defaultOptions}
        height={200}
        isClickToPauseDisabled={true}
    />;
}

export default SuperEndowmentLottie;