import React, { useState } from "react";
import Button from "../../components/UI/Button";
import SecondaryButton from "../../components/UI/SecondaryButton";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/UI/PasswordInput";

import styles from "./index.module.scss";

function Security() {
    const [state, setState] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    function handleGoBack() {
        navigate(-1);
    }

    const handlePasswordChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setState((prevState) => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };

    const handleSubmitChangePassword = (e) => {
        e.preventDefault();
        setState(state);
        if (state.newPassword !== state.confirmPassword) {
            // console.error("Error");
        }
    };

    return (
        <div className={styles.Security}>
            <p className={styles.Title}>Сменить пароль</p>
            <div className={styles.Wrapper}>
                <PasswordInput
                    label="Старый пароль"
                    name="oldPassword"
                    onChange={handlePasswordChange}
                    value={state.oldPassword || ""}
                    required
                />
            </div>
            <div className={styles.Wrapper}>
                <PasswordInput
                    label="Новый пароль"
                    name="newPassword"
                    onChange={handlePasswordChange}
                    value={state.newPassword || ""}
                    required
                />
            </div>
            <div className={styles.Wrapper}>
                <PasswordInput
                    label="Подтвердите пароль"
                    name="confirmPassword"
                    onChange={handlePasswordChange}
                    value={state.confirmPassword || ""}
                    required
                />
            </div>
            <div className={styles.ButtonsContainer}>
                <SecondaryButton onClick={handleGoBack}>
                    Отменить
                </SecondaryButton>
                <Button onClick={handleSubmitChangePassword}>Изменить</Button>
            </div>
        </div>
    );
}

export default Security;
