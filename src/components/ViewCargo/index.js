import React, { useState } from "react";
import LinkButtonWithFloatingHover from "../LinkButtonWithFloatingHover";
import GeneralInfo from "./GeneralInfo";
import AdditionalInfo from "./AdditionalInfo";

import styles from "./index.module.scss";

const VIEW_CARGO_TABS = {
    generalInfo: "general information",
    additional: "additional"
};

function ViewCargo({ cargoInfo }) {
    const [selectedTab, setSelectedTab] = useState(VIEW_CARGO_TABS.generalInfo);

    function handleTabChange(tab) {
        setSelectedTab(tab);
    }

    return (
        <div className={`${styles.ViewCargoContainer}`}>
            <div className={styles.Header}>
                <LinkButtonWithFloatingHover
                    isActive={selectedTab === VIEW_CARGO_TABS.generalInfo}
                    onClick={() => handleTabChange(VIEW_CARGO_TABS.generalInfo)}
                >
                    {VIEW_CARGO_TABS.generalInfo}
                </LinkButtonWithFloatingHover>
                <LinkButtonWithFloatingHover
                    isActive={selectedTab === VIEW_CARGO_TABS.additional}
                    onClick={() => handleTabChange(VIEW_CARGO_TABS.additional)}
                >
                    {VIEW_CARGO_TABS.additional}
                </LinkButtonWithFloatingHover>
            </div>

            <div className={styles.Content}>
                {selectedTab === VIEW_CARGO_TABS.generalInfo && (
                    <GeneralInfo cargoInfo={cargoInfo} />
                )}
                {selectedTab === VIEW_CARGO_TABS.additional && (
                    <div>
                        <AdditionalInfo cargoInfo={cargoInfo} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewCargo;
