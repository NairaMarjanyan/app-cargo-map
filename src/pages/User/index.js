import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import HeaderNavigationBack from "../../components/HeaderNavigationBack";
import SideMenu from "./SideMenu";
import useWindowSize from "../../hooks/useWindowSize";
import { isMobile } from "react-device-detect";

import styles from "./index.module.scss";

const User = () => {
    const { width: windowWidth } = useWindowSize();
    const isSmallView = isMobile || windowWidth <= 768;

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isUserPage = pathname === "/user";

    useEffect(() => {
        if (!isSmallView && isUserPage) {
            navigate("/user/companies");
        }
    }, [isUserPage, isSmallView, navigate]);

    function handleGoBack() {
        navigate(-1);
    }

    const style = isSmallView && !isUserPage ? { display: "none" } : null;

    return (
        <div className={styles.User}>
            <div className={styles.HeaderContainer}>
                <div className={styles.BackContainer} onClick={handleGoBack}>
                    <HeaderNavigationBack text="Back" />
                </div>
            </div>
            <div className={styles.SideMenu} style={style}>
                <SideMenu />
            </div>
            <main className={styles.Main}>
                <Outlet />
            </main>
        </div>
    );
};

export default User;
