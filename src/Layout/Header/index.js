import React, { useCallback, useMemo, useState } from "react";
import logoSvg from "../../assets/svgs/logo.svg";
import HelpSvg from "../../components/icons/24/HelpSvg";
import NavLinkWithHoverStyle from "../../components/NavLinkWithHoverStyle";
import { useNavigate } from "react-router-dom";
import UserSvg from "../../components/icons/24/UserSvg";
import DeliveryTrackSvg from "../../components/icons/24/DeliveryTrackSvg";
import CargoSvg from "../../components/icons/24/CargoSvg";
import LogOutSvg from "../../components/icons/24/LogOutSvg";
import PopupMenu from "../../components/UI/PopupMenu";
import IconWrapper from "../../components/IconWrapper";
import HamburgerMenuSvg from "../../components/icons/24/HamburgerMenuSvg";
import CloseSvg from "../../components/icons/24/CloseSvg";
import useWindowSize from "../../hooks/useWindowSize";
import { isMobile } from "react-device-detect";
import BagSvg from "../../components/icons/24/BagSvg";
import NotificationMenu from "../../components/UI/NotificationMenu";
import { logout } from "../../api/user";
import useMyCargosOnMap from "../../store/hooks/useMyCargosOnMap";
import useMyVehiclesOnMap from "../../store/hooks/useMyVehiclesOnMap";
import Notifications from "../../components/UI/Notifications";
import {
    showErrorNotification,
    showSuccessNotification
} from "../../utils/notifications";

import styles from "./index.module.scss";

function Header({ companiesInfo }) {
    const navigate = useNavigate();
    const {
        myExpiredCargosOnMap,
        removeMyCargoFromMap: removeMyCargoFromMapAction,
        updateMyCargoOnMap: updateMyCargoOnMapAction
    } = useMyCargosOnMap();

    const {
        myExpiredVehiclesOnMap,
        removeMyVehicleFromMap: removeMyVehicleFromMapAction,
        updateMyVehicleOnMap: updateMyVehicleOnMapAction
    } = useMyVehiclesOnMap();

    const updateMyVehicleOnMap = useCallback(
        (id) => {
            updateMyVehicleOnMapAction(id)
                .then(() => {
                    showSuccessNotification("Successfully updated");
                })
                .catch(() => {
                    showErrorNotification("Failed to update");
                });
        },
        [updateMyVehicleOnMapAction]
    );

    const updateMyCargoOnMap = useCallback(
        (id) => {
            updateMyCargoOnMapAction(id)
                .then(() => {
                    showSuccessNotification("Successfully updated");
                })
                .catch(() => {
                    showErrorNotification("Failed to update");
                });
        },
        [updateMyCargoOnMapAction]
    );
    const removeMyVehicleFromMap = useCallback(
        (id) => {
            removeMyVehicleFromMapAction(id)
                .then(() => {
                    showSuccessNotification("Successfully updated");
                })
                .catch(() => {
                    showErrorNotification("Failed to update");
                });
        },
        [removeMyVehicleFromMapAction]
    );
    const removeMyCargoFromMap = useCallback(
        (id) => {
            removeMyCargoFromMapAction(id)
                .then(() => {
                    showSuccessNotification("Successfully updated");
                })
                .catch(() => {
                    showErrorNotification("Failed to update");
                });
        },
        [removeMyCargoFromMapAction]
    );
    const { vehicleCompanies, loadCompanies } = companiesInfo;

    const notificationCount =
        myExpiredCargosOnMap.length + myExpiredVehiclesOnMap.length;

    const hasVehicleCompany = vehicleCompanies.length > 0;
    const hasLoadCompany = loadCompanies.length > 0;
    const hasNotification = notificationCount > 0;
    const { width: windowWidth } = useWindowSize();
    const isSmallView = isMobile || windowWidth <= 475;

    const menuItems = useMemo(() => {
        const items = [
            {
                title: "Учетная запись",
                iconComponent: BagSvg,
                cb: () => {
                    navigate("user");
                }
            }
        ];

        if (hasVehicleCompany) {
            items.push({
                title: "Мои машины",
                iconComponent: DeliveryTrackSvg,
                cb: () => {
                    navigate("vehicles");
                }
            });
        }

        if (hasLoadCompany) {
            items.push({
                title: "Мои грузы",
                iconComponent: CargoSvg,
                cb: () => {
                    navigate("cargos");
                }
            });
        }
        if (isMobile || isSmallView) {
            items.push({
                title: "Уведомления",
                component: Notifications,
                cb: () => {
                    navigate("notifications");
                }
            });
        }

        items.push({
            title: "Выйти",
            iconComponent: LogOutSvg,
            cb: () => {
                logout().then(() => {
                    navigate("/");
                });
            }
        });

        return items;
    }, [navigate, hasVehicleCompany, hasLoadCompany, isSmallView]);

    const HeaderItems = useMemo(() => {
        return [
            {
                title: "Find Vehicle",
                cb: () => {
                    navigate("find-truck");
                }
            },
            {
                title: "Find Cargo",
                cb: () => {
                    navigate("find-cargo");
                }
            }
        ];
    }, [navigate]);

    function handleLogoClick() {
        navigate("/");
    }

    const [show, setShow] = useState(true);
    const handleChangeIcon = () => {
        return setShow((prev) => !prev);
    };

    return (
        <div className={styles.Header}>
            <div className={styles.NavLinkContainer}>
                <div
                    className={styles.MenuContainer}
                    onClick={handleChangeIcon}
                >
                    <PopupMenu
                        menuItems={HeaderItems}
                        isFullWidth={isMobile || isSmallView}
                    >
                        <IconWrapper
                            backgroundColor="transparent"
                            padding="10px"
                        >
                            {show ? <HamburgerMenuSvg /> : <CloseSvg />}
                        </IconWrapper>
                    </PopupMenu>
                </div>
                <div className={styles.LogoContainer} onClick={handleLogoClick}>
                    <img src={logoSvg} alt="logo" />
                </div>

                <div className={styles.LinksWrapper}>
                    <NavLinkWithHoverStyle to="find-truck">
                        Find Vehicle
                    </NavLinkWithHoverStyle>

                    <NavLinkWithHoverStyle to="find-cargo">
                        Find Cargo
                    </NavLinkWithHoverStyle>
                </div>
            </div>

            <div className={styles.IconsWrapper}>
                <div className={styles.IconContainer}>
                    <IconWrapper>
                        <HelpSvg />
                    </IconWrapper>
                </div>
                <div className={styles.NotificationsWrapper}>
                    <NotificationMenu
                        myExpiredVehiclesOnMap={myExpiredVehiclesOnMap}
                        myExpiredCargosOnMap={myExpiredCargosOnMap}
                        updateMyCargoOnMap={updateMyCargoOnMap}
                        removeMyCargoFromMap={removeMyCargoFromMap}
                        updateMyVehicleOnMap={updateMyVehicleOnMap}
                        removeMyVehicleFromMap={removeMyVehicleFromMap}
                    >
                        <IconWrapper>
                            <Notifications
                                notificationCount={notificationCount}
                            />
                        </IconWrapper>
                    </NotificationMenu>
                </div>

                <div>
                    <PopupMenu
                        menuItems={menuItems}
                        notificationCount={notificationCount}
                        isFullWidth={isMobile || isSmallView}
                    >
                        <IconWrapper backgroundColor="rgba(152, 162, 179, 0.2)">
                            <div className={styles.NotificationContainer}>
                                <UserSvg />
                                {hasNotification && (
                                    <div
                                        className={styles.NotificationSign}
                                    ></div>
                                )}
                            </div>
                        </IconWrapper>
                    </PopupMenu>
                </div>
            </div>
        </div>
    );
}

export default Header;
