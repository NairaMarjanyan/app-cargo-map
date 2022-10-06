import React from "react";
import LinkButton from "../LinkButton";
import PlusSvg from "../icons/24/PlusSvg";

import styles from "./index.module.scss";

function EmptyContent({ title, text, children, linkText, linkCb, isIconShow }) {
    return (
        <div className={styles.EmptyContent}>
            <div className={styles.IconWrapper}>{children}</div>
            <div className={styles.TextWrapper}>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
            <LinkButton text={linkText} onClick={linkCb}>
                {isIconShow && <PlusSvg />}
            </LinkButton>
        </div>
    );
}

export default EmptyContent;
