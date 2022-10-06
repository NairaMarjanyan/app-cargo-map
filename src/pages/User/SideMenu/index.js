import React from "react";
import NavigationMenu from "../NavigationMenu";
import IconWrapper from "../../../components/IconWrapper";
import BagSvg from "../../../components/icons/24/BagSvg";
import UserSvg from "../../../components/icons/24/UserSvg";
import BellSvg from "../../../components/icons/24/BellSvg";
import SecuritySvg from "../../../components/icons/24/SecuritySvg";

import styles from "./index.module.scss";

const SideMenu = () => {
    return (
        <div className={styles.SideMenu}>
            <div className={styles.NavMenuContainer}>
                <NavigationMenu
                    to="companies"
                    title="Компании"
                    text="Информация о компаниях"
                >
                    <div className={styles.IconWrapper}>
                        <IconWrapper>
                            <BagSvg />
                        </IconWrapper>
                    </div>
                </NavigationMenu>

                <NavigationMenu
                    to="account"
                    title="Личная информация"
                    text="Личные данные"
                >
                    <div className={styles.IconWrapper}>
                        <IconWrapper>
                            <UserSvg />
                        </IconWrapper>
                    </div>
                </NavigationMenu>

                <NavigationMenu
                    to="notification"
                    title="Уведомления"
                    text="Предпочтения и способ, которым вы хотите, чтобы с вами связались"
                >
                    <div className={styles.IconWrapper}>
                        <IconWrapper>
                            <BellSvg />
                        </IconWrapper>
                    </div>
                </NavigationMenu>

                <NavigationMenu
                    to="security"
                    title="Безопасность"
                    text="Сменить пароль"
                >
                    <div className={styles.IconWrapper}>
                        <IconWrapper>
                            <SecuritySvg />
                        </IconWrapper>
                    </div>
                </NavigationMenu>
            </div>
        </div>
    );
};

export default SideMenu;
