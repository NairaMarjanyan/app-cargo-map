import React from "react";
import InfoMessage from "../../../components/InfoMessage";
import SelectableCard from "../../../components/SelectableCard";
import { COMPANY_TYPE } from "../../../utils/constants";
import VehicleSvg40 from "../../../components/icons/40/VehicleSvg40";
import LoadSvg from "../../../components/icons/40/LoadSvg";
import Input from "../../../components/UI/Input";
import ExpediterSvg from "../../../components/icons/40/ExpediterSvg";
import UploadFile from "../../../components/UploadFile";

import IconWrapper from "../../../components/IconWrapper";
import styles from "./index.module.scss";

const COMPANY_DOCUMENTS_ACCEPTED_TYPE = [
    "image/*",
    ".doc",
    ".docx",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".pdf"
];

function FormContent({ companyData, onChange, onFileUpload, onFileRemove }) {
    const {
        name,
        type,
        activityAddress,
        juridicalAddress,
        taxId,
        email,
        documents,
        phone,
        errors
    } = companyData;
    function handleClickOnSelectableCard(value) {
        const mockedEventObj = {
            target: {
                name: "type",
                value
            }
        };
        onChange(mockedEventObj);
    }

    return (
        <div className={styles.FormContent}>
            <InfoMessage>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum has been the industry 's standard dummy
                text ever since the 1500 s
            </InfoMessage>
            <div className={styles.CompanyTypeContainer}>
                <h2 className={styles.CompanyTypeText}>Тип компании</h2>
                <div className={styles.RadioButtonsContainer}>
                    <SelectableCard
                        title="Транспорт"
                        text="Free"
                        isSelected={type === COMPANY_TYPE.transport}
                        onClick={() => {
                            handleClickOnSelectableCard(COMPANY_TYPE.transport);
                        }}
                    >
                        <IconWrapper>
                            <VehicleSvg40 />
                        </IconWrapper>
                    </SelectableCard>
                    <SelectableCard
                        title="Логист"
                        text="200$/m "
                        isSelected={type === COMPANY_TYPE.expediter}
                        onClick={() => {
                            handleClickOnSelectableCard(COMPANY_TYPE.expediter);
                        }}
                    >
                        <IconWrapper>
                            <ExpediterSvg />
                        </IconWrapper>
                    </SelectableCard>
                    <SelectableCard
                        title="Загрузка"
                        text="Free"
                        isSelected={type === COMPANY_TYPE.load}
                        onClick={() => {
                            handleClickOnSelectableCard(COMPANY_TYPE.load);
                        }}
                    >
                        <IconWrapper>
                            <LoadSvg />
                        </IconWrapper>
                    </SelectableCard>
                </div>
                {errors?.type && (
                    <p className="fb-error">{errors?.type?.[0]}</p>
                )}
            </div>

            <form className={styles.InputsContainer}>
                <div className={styles.InputWrapper}>
                    <Input
                        type="text"
                        label="Имя компании"
                        name="name"
                        inputProps={{
                            "aria-label": "Имя компании"
                        }}
                        onChange={onChange}
                        value={name}
                        required
                        error={Boolean(errors?.name)}
                        helperText={errors?.name}
                    />
                </div>
                <div className={styles.InputWrapper}>
                    <Input
                        type="text"
                        label="Адрес деятельности"
                        name="activityAddress"
                        inputProps={{
                            "aria-label": "Адрес деятельности"
                        }}
                        onChange={onChange}
                        value={activityAddress}
                        error={Boolean(errors?.activityAddress)}
                        helperText={errors?.activityAddress}
                        required
                    />
                </div>
                <div className={styles.InputWrapper}>
                    <Input
                        type="text"
                        label="Юридический адрес"
                        name="juridicalAddress"
                        inputProps={{
                            "aria-label": "Юридический адрес"
                        }}
                        value={juridicalAddress}
                        onChange={onChange}
                        error={Boolean(errors?.juridicalAddress)}
                        helperText={errors?.juridicalAddress}
                        required
                    />
                </div>
                <div className={styles.InputWrapper}>
                    <Input
                        type="text"
                        label="ИНН"
                        name="taxId"
                        inputProps={{
                            "aria-label": "ИНН"
                        }}
                        value={taxId}
                        onChange={onChange}
                        error={Boolean(errors?.taxId)}
                        helperText={errors?.taxId}
                        required
                    />
                </div>
                <div className={styles.InputWrapper}>
                    <Input
                        type="text"
                        label="Номер телефона"
                        name="phone"
                        inputProps={{
                            "aria-label": "Номер телефона"
                        }}
                        value={phone}
                        onChange={onChange}
                        error={Boolean(errors?.phone)}
                        helperText={errors?.phone}
                        required
                    />
                </div>
                <div className={styles.InputWrapper}>
                    <Input
                        type="text"
                        label="Email"
                        name="email"
                        inputProps={{
                            "aria-label": "Email"
                        }}
                        value={email}
                        onChange={onChange}
                        error={Boolean(errors?.email)}
                        helperText={errors?.email}
                        required
                    />
                </div>
            </form>
            <div className={styles.UploadFileContainer}>
                <p className={styles.RegisterCertificate}>
                    <span className={styles.Asterisk}>*</span>Регистрационный
                    сертификат
                </p>

                <div className={styles.FilesUploadContainer}>
                    <UploadFile
                        accept={COMPANY_DOCUMENTS_ACCEPTED_TYPE}
                        onUpload={onFileUpload}
                        onRemove={onFileRemove}
                        documents={documents}
                        error={errors?.documents?.[0] || null}
                    />
                </div>
            </div>
        </div>
    );
}

export default FormContent;
