import React from "react";
import SecondaryButton from "../UI/SecondaryButton";
import Button from "../UI/Button";

import styles from "./index.module.scss";

function StepPageFooter({
    activeStep,
    handleActiveStepChange,
    handleStepBack,
    handleBack,
    onSubmit,
    steps,
    isNextDisabled
}) {
    let btnText = "Далее";
    let cb = handleActiveStepChange;

    if (activeStep === steps[steps.length - 1].number) {
        btnText = "Добавить";
        cb = onSubmit;
    }

    return (
        <div className={styles.ContainerButtons}>
            <div>
                {activeStep > 1 && (
                    <SecondaryButton onClick={handleStepBack}>
                        Назад
                    </SecondaryButton>
                )}
            </div>
            <div className={styles.Buttons}>
                <div className={styles.SecondaryButton}>
                    <SecondaryButton onClick={handleBack}>
                        Отмена
                    </SecondaryButton>
                </div>
                <Button onClick={cb} disabled={isNextDisabled}>
                    {btnText}
                </Button>
            </div>
        </div>
    );
}

export default StepPageFooter;
