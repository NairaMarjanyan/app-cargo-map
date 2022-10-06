import React, { useMemo, useRef } from "react";
import UploadFileSvg from "../icons/24/UploadFileSvg";
import DeleteSvg from "../icons/16/DeleteSvg";
import PaperSvg from "../icons/24/PaperSvg";
import { v4 as uuid } from "uuid";

import styles from "./index.module.scss";

function UploadFile({ accept, onUpload, onRemove, documents, error }) {
    const labelElementRef = useRef(null);
    const elementId = useMemo(() => uuid(), []);

    const handleDragOver = (e) => {
        e.preventDefault();
        labelElementRef.current.classList.add(styles.Dragover);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        labelElementRef.current.classList.remove(styles.Dragover);
    };

    const handleDrop = (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length > 0) {
            onUpload(e.dataTransfer.files[0]);
        }
        labelElementRef.current.classList.remove(styles.Dragover);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <>
            <label
                htmlFor={elementId}
                className={`${styles.UploadFile} ${error ? styles.Error : ""}`}
                ref={labelElementRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                tabIndex="0"
            >
                <div className={styles.FileUploadWrapper}>
                    <div className={styles.Container}>
                        <div className={styles.UploadFileLogoContainer}>
                            <UploadFileSvg />
                        </div>
                        <p>Перетащите или выберите файл</p>
                    </div>
                    <input
                        id={elementId}
                        hidden
                        className={styles.Input}
                        type="file"
                        accept={accept}
                        onChange={handleFileInputChange}
                    />
                </div>
            </label>
            {error && <span className="fb-error">{error}</span>}
            {documents?.length > 0 && (
                <div className={styles.UploadedFile}>
                    {documents.map((document) => (
                        <div key={document.id}>
                            <div className={styles.UploadedFileWrapper}>
                                <div className={styles.Container}>
                                    <div className={styles.IconContainer}>
                                        <PaperSvg />
                                    </div>
                                    <p>{document.file.name}</p>
                                </div>
                                <div
                                    className={styles.DeleteSvg}
                                    onClick={() => onRemove(document.id)}
                                >
                                    <DeleteSvg />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default UploadFile;
