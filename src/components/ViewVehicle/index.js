import React, { useState } from "react";
import LinkButtonWithFloatingHover from "../LinkButtonWithFloatingHover";
import GeneralInfo from "./GeneralInfo";
import AdditionalInfo from "./AdditionalInfo";

import styles from "./index.module.scss";

const VIEW_TRUCK_TABS = {
    generalInfo: "general information",
    additional: "additional"
};

function ViewVehicle({ vehicleInfo }) {
    const [selectedTab, setSelectedTab] = useState(VIEW_TRUCK_TABS.generalInfo);
    function handleTabChange(tab) {
        setSelectedTab(tab);
    }

    return (
        <div className={`${styles.ViewVehicleContainer}`}>
            <div className={styles.Header}>
                <LinkButtonWithFloatingHover
                    isActive={selectedTab === VIEW_TRUCK_TABS.generalInfo}
                    onClick={() => handleTabChange(VIEW_TRUCK_TABS.generalInfo)}
                >
                    {VIEW_TRUCK_TABS.generalInfo}
                </LinkButtonWithFloatingHover>
                <LinkButtonWithFloatingHover
                    isActive={selectedTab === VIEW_TRUCK_TABS.additional}
                    onClick={() => handleTabChange(VIEW_TRUCK_TABS.additional)}
                >
                    {VIEW_TRUCK_TABS.additional}
                </LinkButtonWithFloatingHover>
            </div>

            <div className={styles.Content}>
                {selectedTab === VIEW_TRUCK_TABS.generalInfo && (
                    <GeneralInfo vehicleInfo={vehicleInfo} />
                )}
                {selectedTab === VIEW_TRUCK_TABS.additional && (
                    <div>
                        <AdditionalInfo vehicleInfo={vehicleInfo} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewVehicle;
