import React, { useMemo } from "react";
import InfoBlock from "../../../components/InfoBlock";
import LocationSvg from "../../../components/icons/40/LocationSvg";
import TelSvg from "../../../components/icons/24/TelSvg";
import PaperSvg from "../../../components/icons/24/PaperSvg";
import MessageSvg from "../../../components/icons/24/MessageSvg";
import IconWrapper from "../../../components/IconWrapper";
import ThreeDotsSvg from "../../../components/icons/24/ThreeDotsSvg";
import IDSvg from "../../../components/icons/16/IDSvg";
import PopupMenu from "../../../components/UI/PopupMenu";
//import EditSvg from "../../../components/icons/24/EditSvg";
import RecycleBinSvg from "../../../components/icons/24/RecycleBinSvg";
import { COMPANY_STATUSES } from "../../../utils/constants";
import CompanyStatus from "../../../components/CompanyStatus";

import styles from "./index.module.scss";

function CompanyInfo({ company, onDelete }) {
    const menuItems = useMemo(() => {
        return [
            // {
            //     title: "Редактировать",
            //     iconComponent: EditSvg,
            //     cb: () => {
            //         console.log("Edit");
            //     }
            // },
            {
                title: "Удалить",
                iconComponent: RecycleBinSvg,
                cb: () => {
                    onDelete(company.id);
                }
            }
        ];
    }, [company, onDelete]);

    const isVerified = COMPANY_STATUSES.verified === company.status;

    return (
        <div className={styles.CompanyInfo}>
            <div className={styles.CompanyContainer}>
                <div className={styles.StatusContainer}>
                    <h2 className={styles.Title}>{company.name}</h2>

                    <CompanyStatus
                        text={isVerified ? "Проверено" : "В ожидании"}
                        isVerified={isVerified}
                    />
                </div>
                <div className={styles.LogoContainer}>
                    <PopupMenu menuItems={menuItems}>
                        <IconWrapper backgroundColor="transparent">
                            <ThreeDotsSvg />
                        </IconWrapper>
                    </PopupMenu>
                </div>
            </div>
            <div className={styles.CompanyData}>
                <div className={styles.InfoBlock}>
                    <InfoBlock
                        title="Адрес деятельности"
                        text={company.activityAddress}
                    >
                        <LocationSvg />
                    </InfoBlock>
                </div>
                <div className={styles.InfoBlock}>
                    <InfoBlock
                        title="Юридический адрес"
                        text={company.juridicalAddress}
                    >
                        <LocationSvg />
                    </InfoBlock>
                </div>
                <div className={styles.InfoBlock}>
                    <InfoBlock title="ИНН" text={company.taxId}>
                        <IDSvg />
                    </InfoBlock>
                </div>
            </div>
            <div className={styles.CompanyDataWithFiles}>
                <div className={styles.InfoBlock}>
                    <InfoBlock title="Номер телефона" text={company.phone}>
                        <TelSvg />
                    </InfoBlock>
                </div>
                <div className={styles.InfoBlock}>
                    <InfoBlock title="Email" text={company.email}>
                        <MessageSvg />
                    </InfoBlock>
                </div>
                <div className={styles.InfoBlock}>
                    <InfoBlock title="Регистрационный сертификат">
                        <div className={styles.DocumentsWrapper}>
                            {company.documents.map((document) => {
                                return (
                                    <a
                                        href={document.fileUrl}
                                        key={document.id}
                                        style={{ margin: "5px" }}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <div
                                            className={styles.UploadedDocuments}
                                        >
                                            <div className={styles.IconWrapper}>
                                                <PaperSvg />
                                            </div>
                                            {document.description}
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </InfoBlock>
                </div>
            </div>
        </div>
    );
}

export default CompanyInfo;
