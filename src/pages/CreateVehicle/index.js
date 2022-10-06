import React, { useEffect, useState } from "react";
import Steps from "../../components/Steps";
import StepPageFooter from "../../components/StepPageFooter";
import VehicleGeneralForm from "./VehicleGeneralForm";
import VehicleDimensions from "./VehicleDimensions";
import useSteps from "../../components/Steps/useSteps";
import { v4 as uuid } from "uuid";
import { ADR_OPTIONS, VEHICLE_CATEGORY_TYPE } from "../../utils/constants";
import {
    showErrorNotification,
    showSuccessNotification
} from "../../utils/notifications";

import styles from "./index.module.scss";

const EMPTY_DIMENSIONS_OBJECT = {
    length: 0,
    width: 0,
    height: 0,
    volume: 0,
    loadCapacity: 0
};

const CREATE_VEHICLE_STEPS = [
    {
        number: 1,
        text: "Главная Информация"
    },
    {
        number: 2,
        text: "Дополнительный"
    }
];

const CreateVehicle = ({
    onCancel,
    companies,
    onSubmit,
    bodyTypes,
    getSubTypes,
    makes,
    bodySubTypesObj,
    getModelsByMakeId,
    modelsObj
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        activeStep,
        setActiveStep,
        contentToResetScrollPosRef,
        handleStepForward,
        handleStepBack
    } = useSteps();

    const [vehicleData, setVehicleData] = useState({
        companyId: companies.length === 1 ? companies[0].id : null,
        category: null,
        bodyTypeId: null,
        bodySubTypeId: null,
        permit: null,
        loadings: [],
        makeId: null,
        modelId: null,
        carNumber: null,
        vinNumber: null,
        adr: ADR_OPTIONS[0],
        images: [],
        documents: [],
        bodyDimensions: {
            ...EMPTY_DIMENSIONS_OBJECT
        },
        trailerDimensions: null,
        errors: null
    });

    useEffect(() => {
        const bodyTypeId = vehicleData.bodyTypeId;

        if (!bodyTypeId) {
            return;
        }
        getSubTypes(bodyTypeId).catch((e) => console.log(e));
        // todo handle errors
    }, [vehicleData.bodyTypeId, getSubTypes]);

    useEffect(() => {
        const makeId = vehicleData.makeId;

        if (!makeId) {
            return;
        }

        getModelsByMakeId(makeId).catch((error) => {
            console.log(error);
        });
        // todo handle errors
    }, [vehicleData.makeId, getModelsByMakeId]);

    useEffect(() => {
        return () => {
            for (const image of vehicleData.images) {
                URL.revokeObjectURL(image.url);
            }
        };
    }, [vehicleData.images]);

    useEffect(() => {
        setVehicleData((prevState) => {
            return {
                ...prevState,
                bodyDimensions: {
                    ...EMPTY_DIMENSIONS_OBJECT
                },
                trailerDimensions: null
            };
        });
        // todo handle errors
    }, [vehicleData.category]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setVehicleData((prevState) => {
            let { bodySubTypeId, modelId } = prevState;
            if (name === "bodyTypeId") {
                bodySubTypeId = null;
            }
            if (name === "makeId") {
                modelId = null;
            }

            // TODO make generic
            const errors = prevState.errors ? { ...prevState.errors } : null;
            if (errors) {
                delete errors[name];
            }

            return {
                ...prevState,
                bodySubTypeId,
                modelId,
                errors,
                [name]: value
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isSubmitting) {
            return;
        }

        const {
            companyId,
            category,
            bodyTypeId,
            bodySubTypeId,
            permit,
            loadings,
            makeId,
            modelId,
            carNumber,
            vinNumber,
            adr,
            images,
            documents,
            bodyDimensions,
            trailerDimensions
        } = vehicleData;

        const loadingKeys = loadings.map((loading) => loading.id);

        const formData = new FormData();
        formData.set("companyId", companyId);
        formData.set("category", category);
        formData.set("bodyTypeId", bodyTypeId);
        formData.set("bodySubTypeId", bodySubTypeId);
        formData.set("permit", permit);
        formData.set("loadings", loadingKeys);
        formData.set("makeId", makeId);
        formData.set("modelId", modelId);
        formData.set("carNumber", carNumber);
        formData.set("vinNumber", vinNumber);
        formData.set("adr", adr === "No ADR" ? "noadr" : adr);

        // bodyDimensions
        formData.set("bodyDimensions.length", bodyDimensions.length);
        formData.set("bodyDimensions.width", bodyDimensions.width);
        formData.set("bodyDimensions.volume", bodyDimensions.volume);
        formData.set("bodyDimensions.height", bodyDimensions.height);
        formData.set("bodyDimensions.loadCapacity", bodyDimensions.length);

        //trailerDimensions
        if (trailerDimensions) {
            formData.set("trailerDimensions.length", trailerDimensions.length);
            formData.set("trailerDimensions.width", trailerDimensions.width);
            formData.set("trailerDimensions.volume", trailerDimensions.volume);
            formData.set("trailerDimensions.height", trailerDimensions.height);
            formData.set(
                "trailerDimensions.loadCapacity",
                trailerDimensions.loadCapacity
            );
        }

        for (const document of documents) {
            formData.append("documents", document.file);
        }

        for (const image of images) {
            formData.append("images", image.file);
        }

        setIsSubmitting(true);
        onSubmit(formData)
            .then(() => {
                showSuccessNotification("Vehicle successfully created.");
                onCancel();
            })
            .catch((error) => {
                showErrorNotification("Make sure all field are filled.");
                if (error.response) {
                    const errors = error.response.data?.errors;
                    if (errors) {
                        const constErrorsObj = {};
                        for (let key in errors) {
                            if (errors.hasOwnProperty(key)) {
                                constErrorsObj[key] = errors[key];
                            }
                        }

                        setVehicleData((prevState) => {
                            return {
                                ...prevState,
                                errors: constErrorsObj
                            };
                        });
                    }
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    function handleClickOnSelectableCard(value) {
        const mockedEventObj = {
            target: {
                name: "category",
                value
            }
        };
        handleChange(mockedEventObj);
    }

    function handleDimensionChange(bodyType, name, value) {
        if (bodyType === "bodyDimensions") {
            setVehicleData((prevState) => {
                const bodyDimensions = { ...prevState.bodyDimensions };
                bodyDimensions[name] = value;

                return {
                    ...prevState,
                    errors: null,
                    bodyDimensions
                };
            });
        }
        if (bodyType === "trailerDimensions") {
            setVehicleData((prevState) => {
                const trailerDimensions = prevState.trailerDimensions
                    ? { ...prevState.trailerDimensions }
                    : {
                          ...EMPTY_DIMENSIONS_OBJECT
                      };

                trailerDimensions[name] = value;

                return {
                    ...prevState,
                    errors: null,
                    trailerDimensions
                };
            });
        }
    }

    function handleImageUpload(e) {
        const file = e.target.files[0];

        setVehicleData((prevState) => {
            const images = [
                ...prevState.images,
                { file, id: uuid(), url: URL.createObjectURL(file) }
            ];
            return {
                ...prevState,
                errors: null,
                images
            };
        });
    }

    function handleImageDelete(id) {
        setVehicleData((prevState) => {
            let images = [];
            for (const image of prevState.images) {
                if (image.id === id) {
                    URL.revokeObjectURL(image.url);
                } else {
                    images.push(image);
                }
            }
            return {
                ...prevState,
                images
            };
        });
    }

    // todo create reuseable hook (CreateCompany)
    const handleDocumentsUpload = (file) => {
        const id = uuid();
        const document = {
            id,
            file
        };
        setVehicleData((prevState) => {
            const documents = [...prevState.documents, document];
            return {
                ...prevState,
                errors: null,
                documents
            };
        });
    };

    const handleRemoveDocument = (id) => {
        setVehicleData((prevState) => {
            const documents = prevState.documents.filter(
                (document) => document.id !== id
            );
            return {
                ...prevState,
                documents
            };
        });
    };

    function isDimensionsFilledCorrectly(dimensionObj) {
        if (!dimensionObj) {
            return false;
        }
        return Boolean(
            dimensionObj.width &&
                dimensionObj.height &&
                dimensionObj.length &&
                dimensionObj.volume &&
                dimensionObj.loadCapacity
        );
    }

    function isNextEnabled() {
        if (activeStep === 1) {
            return Boolean(
                vehicleData.companyId &&
                    vehicleData.category &&
                    vehicleData.bodyTypeId &&
                    vehicleData.permit &&
                    vehicleData.adr &&
                    vehicleData.makeId &&
                    vehicleData.modelId &&
                    vehicleData.carNumber &&
                    vehicleData.vinNumber &&
                    vehicleData.loadings.length > 0
            );
        }

        if (activeStep === 2) {
            if (vehicleData.category === VEHICLE_CATEGORY_TYPE.semitrailer) {
                return Boolean(
                    vehicleData.documents.length > 0 &&
                        isDimensionsFilledCorrectly(
                            vehicleData.bodyDimensions
                        ) &&
                        isDimensionsFilledCorrectly(
                            vehicleData.trailerDimensions
                        )
                );
            }
            return Boolean(
                vehicleData.documents.length > 0 &&
                    isDimensionsFilledCorrectly(vehicleData.bodyDimensions)
            );
        }

        return false;
    }

    const subTypes = bodySubTypesObj[vehicleData.bodyTypeId] || [];
    const models = modelsObj[vehicleData.makeId] || [];

    return (
        <div className={styles.CreateVehicle}>
            <div className={styles.StepsContainer}>
                <div className={styles.Steps}>
                    <Steps
                        steps={CREATE_VEHICLE_STEPS}
                        activeStepNumber={activeStep}
                        onClick={setActiveStep}
                    />
                </div>
            </div>
            <div className={styles.Content} ref={contentToResetScrollPosRef}>
                {activeStep === 1 && (
                    <VehicleGeneralForm
                        handleClickOnSelectableCard={
                            handleClickOnSelectableCard
                        }
                        vehicleData={vehicleData}
                        companies={companies}
                        bodyTypes={bodyTypes}
                        makes={makes}
                        models={models}
                        subTypes={subTypes}
                        onChange={handleChange}
                    />
                )}
                {activeStep === 2 && (
                    <VehicleDimensions
                        onChange={handleDimensionChange}
                        vehicleData={vehicleData}
                        onImageUpload={handleImageUpload}
                        onImageDelete={handleImageDelete}
                        onUpload={handleDocumentsUpload}
                        onRemove={handleRemoveDocument}
                    />
                )}
            </div>
            <div className={styles.ButtonsContainer}>
                <StepPageFooter
                    steps={CREATE_VEHICLE_STEPS}
                    activeStep={activeStep}
                    handleActiveStepChange={handleStepForward}
                    handleStepBack={handleStepBack}
                    handleBack={onCancel}
                    onSubmit={handleSubmit}
                    isNextDisabled={!isNextEnabled() || isSubmitting}
                />
            </div>
        </div>
    );
};

export default CreateVehicle;
