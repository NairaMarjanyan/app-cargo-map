import LinkButton from "../LinkButton";
import PlusSvg from "../icons/24/PlusSvg";
import React from "react";

import styles from "./index.module.scss";

function HeaderContent({ title, onClick, text }) {
    return (
        <div className={styles.HeaderContent}>
            <h2>{title}</h2>
            <div onClick={onClick}>
                <LinkButton text={text}>
                    <PlusSvg />
                </LinkButton>
            </div>
        </div>
    );
}

export default HeaderContent;
