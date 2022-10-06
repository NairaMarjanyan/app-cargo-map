import React from "react";
import InfoBlock from "../../components/InfoBlock";
import UserSvg from "../../components/icons/24/UserSvg";
import TelSvg from "../../components/icons/24/TelSvg";
import MessageSvg from "../../components/icons/24/MessageSvg";

import styles from "./index.module.scss";

function Account() {
    return (
        <div className={styles.Account}>
            <div className={styles.Header}>
                <h2 className={styles.Title}>Личная информация</h2>
            </div>
            <div className={styles.Content}>
                <InfoBlock title="Имя" text="Adam Smith">
                    <UserSvg />
                </InfoBlock>
                <InfoBlock title="Номер телефона" text="+374 11 111 111">
                    <TelSvg />
                </InfoBlock>
                <InfoBlock title="Email" text="adamsmith@gmail.com">
                    <MessageSvg />
                </InfoBlock>
            </div>
        </div>
    );
}

export default Account;
