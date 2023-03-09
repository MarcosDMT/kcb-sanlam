import React from "react";
import Lottie from "react-lottie";
import animationData from "../../public/lottie/educare-plus-lottie.json"

const EducarePlusLottie = () => {
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
        height={300}
        width={400}
        isClickToPauseDisabled={true}
    />;
}

export default EducarePlusLottie;