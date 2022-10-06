import React from "react";
import Button from "../UI/Button";
import SecondaryButton from "../UI/SecondaryButton";

import styles from "./index.module.scss";

function ConfirmWindow({
    title,
    text,
    onCancel,
    onSubmit,
    cancelText,
    submitText
}) {
    return (
        <div className={styles.ConfirmWindowContainer}>
            <h2 className={styles.Title}>{title}</h2>
            <p className={styles.Text}>{text}</p>
            <div className={styles.ButtonsContainer}>
                {typeof onCancel === "function" && (
                    <SecondaryButton onClick={onCancel}>
                        {cancelText}
                    </SecondaryButton>
                )}
                <Button className={styles.DeleteButton} onClick={onSubmit}>
                    {submitText}
                </Button>
            </div>
        </div>
    );
}

export default ConfirmWindow;
