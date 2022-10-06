import React, { useRef } from "react";
import PlusSvg16 from "../icons/16/PlusSvg16";
import DeleteSvg from "../icons/16/DeleteSvg";

import styles from "./index.module.scss";

function AddImageForm({ images, onUpload, onDelete }) {
    const inputRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            inputRef.current?.click();
        }
    };

    return (
        <div className={styles.AddImageForm}>
            <label
                className={styles.AddImageFormWrapper}
                tabIndex="0"
                onKeyDown={handleKeyDown}
            >
                <div className={styles.AddImageFormContainer}>
                    <div className={styles.IconWrapper}>
                        <PlusSvg16 />
                    </div>
                    <span>Добавить фото</span>
                    <input
                        ref={inputRef}
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={onUpload}
                    />
                </div>
            </label>
            {images.length > 0 && (
                <div className={styles.UploadedImage}>
                    {images.map((image) => (
                        <div key={image.id} className={styles.Container}>
                            <div
                                className={styles.IconContainer}
                                onClick={() => onDelete(image.id)}
                            >
                                <div className={styles.Icon}>
                                    <DeleteSvg />
                                </div>
                            </div>
                            <div className={styles.PreviewImageContainer}>
                                <img src={image.url} alt={image.file.name} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AddImageForm;
