import React from "react";
import Step from "./Step";

import styles from "./index.module.scss";
import useWindowSize from "../../hooks/useWindowSize";

function Steps({ steps, activeStepNumber, onClick }) {
    const { width: windowWidth } = useWindowSize();

    const isSmallView = windowWidth <= 720;

    let translateX = 0;
    let width = "100%";
    if (isSmallView) {
        const stepsLength = steps.length;
        translateX = (-1 * (activeStepNumber - 1) * 100) / stepsLength;
        width = `${stepsLength * 100}%`;
    }

    return (
        <div className={styles.StepperContainer}>
            <div
                className={styles.ActiveContent}
                style={{
                    transform: `translateX(${translateX}%)`,
                    width
                }}
            >
                <div className={styles.Steps}>
                    {steps.map((step) => {
                        return (
                            <Step
                                key={step.number}
                                number={step.number}
                                text={step.text}
                                isActive={step.number === activeStepNumber}
                                isDone={step.number < activeStepNumber}
                                onClick={onClick}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Steps;
