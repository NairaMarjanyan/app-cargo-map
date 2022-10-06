import React from "react";
import styles from "./index.module.scss";
import CheckMarkSvg from "../../icons/24/CheckMarkSvg";

function Step({ number, text, isActive, isDone, onClick }) {
    const cssClasses = [styles.Step];

    if (isActive) {
        cssClasses.push(styles.Active);
    }
    if (isDone) {
        cssClasses.push(styles.Done);
    }

    function handleClick() {
        if (isDone) {
            onClick(number);
        }
    }

    return (
        <div className={cssClasses.join(" ")} onClick={handleClick}>
            <div className={styles.StepNumber}>
                {isDone ? (
                    <div className={styles.IconWrapper}>
                        <CheckMarkSvg />
                    </div>
                ) : (
                    <p>{number}</p>
                )}
            </div>
            <div className={styles.TextContainer}>
                <p className={styles.StepTitle}>Шаг {number}</p>
                <p className={styles.StepText}>{text}</p>
            </div>
        </div>
    );
}

export default Step;
