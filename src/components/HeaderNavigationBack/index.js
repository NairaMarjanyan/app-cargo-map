import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowSvg from "../icons/24/ArrowSvg";
import styles from "./index.module.scss";

function HeaderNavigationBack({ text }) {
    const navigate = useNavigate();

    function handleGoBack() {
        navigate(-1);
    }

    return (
        <div className={styles.HeaderNavigationBack}>
            <div className={styles.Icon} onClick={handleGoBack}>
                <ArrowSvg />
            </div>
            <p onClick={handleGoBack} className={styles.Text}>
                {text}
            </p>
        </div>
    );
}

export default HeaderNavigationBack;
