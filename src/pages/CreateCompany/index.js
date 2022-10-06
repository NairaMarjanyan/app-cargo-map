import React, { useState } from "react";
import Button from "../../components/UI/Button";
import SecondaryButton from "../../components/UI/SecondaryButton";
import { v4 as uuid } from "uuid";
import FormContent from "./FormContent";
import SuccessFrame from "./SuccessFrame";
import {
    showErrorNotification,
    showSuccessNotification
} from "../../utils/notifications";
import { getErrorsObj, isEnglishLetter } from "../../utils/helpers";

import styles from "./index.module.scss";

function CreateCompany({ onCompanyCreate, onCancel }) {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const [companyData, setCompanyData] = useState({
        name: "",
        type: "",
        activityAddress: "",
        juridicalAddress: "",
        taxId: "",
        email: "",
        phone: "",
        documents: [],
        errors: null
    });

    const handleDocumentsUpload = (file) => {
        const id = uuid();
        const document = {
            id,
            file
        };
        setCompanyData((prevState) => {
            const documents = [...prevState.documents, document];
            return {
                ...prevState,
                documents
            };
        });
    };

    const handleRemoveDocument = (id) => {
        setCompanyData((prevState) => {
            const documents = prevState.documents.filter(
                (document) => document.id !== id
            );
            return {
                ...prevState,
                documents
            };
        });
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (!isEnglishLetter(value)) {
            setCompanyData((prevState) => {
                const errors = prevState.errors
                    ? { ...prevState.errors }
                    : null;

                if (errors) {
                    delete errors[name];
                }
                return {
                    ...prevState,
                    errors: {
                        ...errors,
                        [name]: "Только английские буквы"
                    }
                };
            });
            return;
        }
        setCompanyData((prevState) => {
            const errors = prevState.errors ? { ...prevState.errors } : null;

            if (errors) {
                delete errors[name];
            }
            return {
                ...prevState,
                [name]: value,
                errors
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsSubmitDisabled(true);
        const {
            name,
            type,
            activityAddress,
            juridicalAddress,
            taxId,
            email,
            phone,
            documents
        } = companyData;

        const formData = new FormData();
        formData.set("name", name);
        formData.set("type", type);
        formData.set("activityAddress", activityAddress);
        formData.set("juridicalAddress", juridicalAddress);
        formData.set("taxId", taxId);
        formData.set("email", email);
        formData.set("phone", phone);
        for (const document of documents) {
            formData.append("documents", document.file);
        }

        onCompanyCreate(formData)
            .then(() => {
                setIsFormSubmitted(true);
                showSuccessNotification("Компания успешно создана.");
            })
            .catch((error) => {
                setIsSubmitDisabled(false);
                showErrorNotification("Не удалось создать компанию.");
                if (error.response) {
                    const errors = error.response.data?.errors;
                    if (errors) {
                        showErrorNotification(
                            "Убедитесь, что все поля заполнены."
                        );
                        setCompanyData((prevState) => {
                            return {
                                ...prevState,
                                errors: getErrorsObj(errors)
                            };
                        });
                    }
                }
            });
    };

    const btnText = isFormSubmitted ? "Ok" : "Отправить";
    const btnClickHandler = isFormSubmitted ? onCancel : handleSubmit;
    const isBtnDisabled = !isFormSubmitted && isSubmitDisabled;

    return (
        <div className={styles.CreateCompany}>
            <div className={styles.Content}>
                {isFormSubmitted ? (
                    <SuccessFrame
                        title="Спасибо!"
                        text="Наши менеджеры должны проверять новые регистрации. Если вы хотите успешно пройти регистрацию, вам необходимо добавить свой первый транспорт."
                    />
                ) : (
                    <FormContent
                        companyData={companyData}
                        onChange={handleChange}
                        onFileUpload={handleDocumentsUpload}
                        onFileRemove={handleRemoveDocument}
                        onCompanyTypeChange={setCompanyData}
                    />
                )}
            </div>

            <div className={styles.ButtonsContainer}>
                <div className={styles.SecondaryButton}>
                    {!isFormSubmitted && (
                        <SecondaryButton onClick={onCancel}>
                            Отменить
                        </SecondaryButton>
                    )}
                </div>
                <Button onClick={btnClickHandler} disabled={isBtnDisabled}>
                    {btnText}
                </Button>
            </div>
        </div>
    );
}

export default CreateCompany;
