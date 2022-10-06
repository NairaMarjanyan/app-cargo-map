import React, { useState } from "react";
import LinkButtonWithFloatingHover from "../../components/LinkButtonWithFloatingHover";
import LinkButton from "../../components/LinkButton";
import PlusSvg from "../../components/icons/24/PlusSvg";
import CompanyInfo from "./CompanyInfo";
import Modal from "../../components/UI/Modal";
import ConfirmWindow from "../../components/ConfirmWindow";
import EmptyContent from "../../components/EmptyContent";
import BagSvg from "../../components/icons/140/BagSvg";
import { COMPANY_TYPE } from "../../utils/constants";

import styles from "./index.module.scss";

const COMPANIES_TRUCK_TABS = {
    transport: "Транспорт",
    expediter: "Логист",
    load: "Загрузка"
};

function titleOfEmptyContent(selectedTab) {
    if (selectedTab === COMPANY_TYPE.transport) {
        return "Нет транспортной компании";
    } else if (selectedTab === COMPANY_TYPE.expediter) {
        return "Нет экспедиторской компании";
    } else if (selectedTab === COMPANY_TYPE.load) {
        return "Нет грузовой    компании";
    }
}

const Companies = ({ companies, toggleAddCompanyModal, onDelete }) => {
    const [selectedTab, setSelectedTab] = useState(COMPANY_TYPE.transport);

    l

    function handleTabChange(tab) {
        setSelectedTab(tab);
    }

    function cancelDelete() {
        setCompanyIdToDelete(null);
    }

    function handleDelete() {
        onDelete(companyIdToDelete)
            .then(() => {
                cancelDelete();
            })
            .catch((e) => {
                console.log(e);
                // TODO handle error
            });
    }

    const filteredCompaniesToDisplay = companies.filter(
        (company) => company.type === selectedTab
    );

    return (
        <div className={styles.Companies}>
            <div className={styles.HeaderContent}>
                <div className={styles.Header}>
                    <div className={styles.LinkWrapper}>
                        <LinkButtonWithFloatingHover
                            isActive={selectedTab === COMPANY_TYPE.transport}
                            onClick={() =>
                                handleTabChange(COMPANY_TYPE.transport)
                            }
                        >
                            {COMPANIES_TRUCK_TABS.transport}
                        </LinkButtonWithFloatingHover>
                    </div>
                    <div className={styles.LinkWrapper}>
                        <LinkButtonWithFloatingHover
                            isActive={selectedTab === COMPANY_TYPE.expediter}
                            onClick={() =>
                                handleTabChange(COMPANY_TYPE.expediter)
                            }
                        >
                            {COMPANIES_TRUCK_TABS.expediter}
                        </LinkButtonWithFloatingHover>
                    </div>
                    <div className={styles.LinkWrapper}>
                        <LinkButtonWithFloatingHover
                            isActive={selectedTab === COMPANY_TYPE.load}
                            onClick={() => handleTabChange(COMPANY_TYPE.load)}
                        >
                            {COMPANIES_TRUCK_TABS.load}
                        </LinkButtonWithFloatingHover>
                    </div>
                </div>

                <div
                    onClick={toggleAddCompanyModal}
                    className={styles.AddNewContainer}
                >
                    <LinkButton text="Добавить">
                        <PlusSvg />
                    </LinkButton>
                </div>
            </div>

            <div className={styles.Content}>
                {filteredCompaniesToDisplay.length === 0 ? (
                    <EmptyContent
                        title={titleOfEmptyContent(selectedTab)}
                        text="У вас нет компании. Вы можете создать их."
                        linkText="Добавить"
                        isIconShow="true"
                        linkCb={toggleAddCompanyModal}
                    >
                        <BagSvg />
                    </EmptyContent>
                ) : (
                    filteredCompaniesToDisplay.map((company, idx) => (
                        <CompanyInfo
                            company={company}
                            key={idx}
                            onDelete={setCompanyIdToDelete}
                        />
                    ))
                )}
            </div>

            <Modal isOpen={Boolean(companyIdToDelete)} hideHeader>
                <ConfirmWindow
                    title="Удалить компанию"
                    text="Вы уверены, что хотите удалить эту компанию? Обратите внимание, что при удалении компании грузы/транспортные средства этой компании будут удалены."
                    cancelText="Отменить"
                    submitText="Да, удалить"
                    onCancel={cancelDelete}
                    onSubmit={handleDelete}
                />
            </Modal>
        </div>
    );
};

export default Companies;
