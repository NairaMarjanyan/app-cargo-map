import { useEffect, useRef, useState } from "react";

const useSteps = () => {
    const [activeStep, setActiveStep] = useState(1);

    const contentToResetScrollPosRef = useRef(null);

    useEffect(() => {
        if (!contentToResetScrollPosRef.current) {
            return;
        }
        contentToResetScrollPosRef.current.scrollTop = 0;
    }, [activeStep]);

    const handleStepForward = () => {
        setActiveStep((prevStep) => {
            return prevStep + 1;
        });
    };

    const handleStepBack = () => {
        setActiveStep((prevState) => {
            return prevState - 1;
        });
    };

    return {
        activeStep,
        setActiveStep,
        contentToResetScrollPosRef,
        handleStepForward,
        handleStepBack
    };
};

export default useSteps;
