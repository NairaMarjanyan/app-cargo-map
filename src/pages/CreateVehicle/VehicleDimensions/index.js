import React from "react";
import AddImageForm from "../../../components/AddImageForm";
import { VEHICLE_CATEGORY_TYPE } from "../../../utils/constants";
import DimensionForm from "../DimensionForm";
import UploadFile from "../../../components/UploadFile";

import styles from "./index.module.scss";

const VEHICLE_DOCUMENTS_ACCEPTED_TYPE = [
    "image/*",
    ".doc",
    ".docx",
    "application/msword",
    ".pdf"
];

function VehicleAdditionalForm({
    onChange,
    vehicleData,
    onImageUpload,
    onImageDelete,
    onUpload,
    onRemove
}) {
    return (
        <div className={styles.VehicleAdditionalContainer}>
            <DimensionForm
                title="Размеры Кузова"
                onChange={onChange}
                data={vehicleData.bodyDimensions}
                property="bodyDimensions"
                errors={vehicleData.errors}
            />

            {vehicleData.category === VEHICLE_CATEGORY_TYPE.semitrailer && (
                <DimensionForm
                    title="Trailer Dimensions"
                    onChange={onChange}
                    data={vehicleData.trailerDimensions}
                    property="trailerDimensions"
                    errors={vehicleData.errors}
                />
            )}
            <div className={styles.UploadFileContainer}>
                <p className={styles.RegisterCertificate}>
                    <span className={styles.Asterisk}>*</span>Добавить
                    техпасспорт машины
                </p>

                <div className={styles.FilesUploadContainer}>
                    <UploadFile
                        accept={VEHICLE_DOCUMENTS_ACCEPTED_TYPE}
                        onUpload={onUpload}
                        onRemove={onRemove}
                        documents={vehicleData.documents}
                        error={vehicleData.errors?.documents?.[0] || null}
                    />
                </div>
            </div>
            <div className={styles.DetailsContainer}>
                <p className={styles.DetailsContainerText}>
                    <span className={styles.Asterisk}>*</span>Фотографии
                    транспора
                </p>
            </div>
            <AddImageForm
                onUpload={onImageUpload}
                onDelete={onImageDelete}
                images={vehicleData.images}
            />
        </div>
    );
}

export default VehicleAdditionalForm;
