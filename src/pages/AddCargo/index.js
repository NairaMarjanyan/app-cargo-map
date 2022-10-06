import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Steps from "../../components/Steps";
import { v4 as uuid } from "uuid";
import CargoDetailForm from "./CargoDetailForm";
import {
    ADR_OPTIONS,
    PACKING_TYPES,
    PALLET_TYPES
} from "../../utils/constants";
import CargoRouteForm from "./CargoRouteForm";
import CargoRequirementsForm from "./CargoRequirementsForm";
import StepPageFooter from "../../components/StepPageFooter";
import useSteps from "../../components/Steps/useSteps";
import HeaderNavigationBack from "../../components/HeaderNavigationBack";
import {
    showErrorNotification,
    showSuccessNotification
} from "../../utils/notifications";

import styles from "./index.module.scss";

const EMPTY_PACKAGE = {
    id: null,
    type: null,
    palletType: null,
    volume: 0,
    quantity: 0,
    weight: 0,
    width: 0,
    height: 0,
    length: 0,
    notes: ""
};

const ADD_CARGO_STEPS = [
    {
        number: 1,
        text: "Детали груза"
    },
    {
        number: 2,
        text: "Требование к машине"
    },
    {
        number: 3,
        text: "Маршрут"
    }
];

function AddCargo({
    companies,
    cargoTypes,
    onAddCargoToMap,
    bodyTypes,
    getSubTypes,
    bodySubTypesObj
}) {
    const [cargoData, setCargoData] = useState({
        companyId: companies.length === 1 ? companies[0].id : "",
        cargoTypeId: null,
        adr: ADR_OPTIONS[0],
        packings: [],
        type: null,
        bodyTypeId: null,
        bodySubTypeId: null,
        permit: null,
        loadings: [],
        fromAddressCoordinates: null,
        toAddressCoordinates: null,
        date: new Date(),
        notes: ""
    });

    const navigate = useNavigate();

    const { activeStep, setActiveStep, handleStepForward, handleStepBack } =
        useSteps();

    useEffect(() => {
        const bodyTypeId = cargoData.bodyTypeId;

        if (!bodyTypeId) {
            return;
        }
        getSubTypes(bodyTypeId).catch((e) => console.log(e));
        // todo handle errors
    }, [cargoData.bodyTypeId, getSubTypes]);

    function handleStatePropertyChange(name, data) {
        setCargoData((prevState) => {
            return {
                ...prevState,
                [name]: data
            };
        });
    }

    function handlePackingChange({ id, name, value }) {
        setCargoData((prevState) => {
            const packings = prevState.packings.map((packageData) => {
                if (packageData.id === id) {
                    packageData[name] = value;
                }

                return packageData;
            });
            return {
                ...prevState,
                packings
            };
        });
    }

    // TODO make reusable import from one place for each page
    function handleGoBack() {
        navigate(-1);
    }

    function handleRemovePacking(idToRemove) {
        setCargoData((prevState) => {
            const packings = prevState.packings.filter(
                (packageData) => packageData.id !== idToRemove
            );
            return {
                ...prevState,
                packings
            };
        });
    }

    function handleAddPackage(type) {
        if (type === "none") {
            return;
        }
        const id = uuid();

        let palletType = null;
        if ("pallet" === type) {
            palletType = PALLET_TYPES.euro;
        }

        const newEmptyPackage = {
            ...EMPTY_PACKAGE,
            id,
            type,
            palletType
        };

        setCargoData((prevState) => {
            const packings = [...prevState.packings];
            packings.push(newEmptyPackage);
            return {
                ...prevState,
                packings
            };
        });
    }

    function isPackingFilledCorrectly(packing) {
        if (packing.type === PACKING_TYPES.pallet) {
            if (packing.palletType === PALLET_TYPES.euro) {
                return Boolean(
                    packing.volume && packing.weight && packing.quantity
                );
            } else {
                return Boolean(
                    packing.volume &&
                        packing.weight &&
                        packing.quantity &&
                        packing.height &&
                        packing.width
                );
            }
        }

        if (
            packing.type === PACKING_TYPES.box ||
            packing.type === PACKING_TYPES.bag
        ) {
            return Boolean(
                packing.volume &&
                    packing.weight &&
                    packing.quantity &&
                    packing.height &&
                    packing.width &&
                    packing.length
            );
        }

        if (packing.type === PACKING_TYPES.other) {
            return Boolean(packing.weight && packing.quantity && packing.notes);
        }

        return false;
    }

    function isNextEnabled() {
        if (activeStep === 1) {
            for (const packing of cargoData.packings) {
                if (!isPackingFilledCorrectly(packing)) {
                    return false;
                }
            }
            return Boolean(
                cargoData.companyId &&
                    cargoData.cargoTypeId &&
                    cargoData.adr &&
                    cargoData.packings.length > 0
            );
        }

        if (activeStep === 2) {
            return Boolean(
                cargoData.bodyTypeId &&
                    cargoData.permit &&
                    cargoData.loadings.length > 0
            );
        }
        if (activeStep === 3) {
            return Boolean(
                cargoData.fromAddressCoordinates &&
                    cargoData.toAddressCoordinates &&
                    cargoData.date
            );
        }

        return false;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const {
            fromAddressCoordinates: from,
            toAddressCoordinates: to,
            date: availabilityDate,
            notes,
            adr,
            bodyTypeId,
            bodySubTypeId,
            loadings,
            permit,
            packings,
            cargoTypeId,
            companyId
        } = cargoData;

        const loadingKeys = loadings.map((loading) => loading.id);

        const data = {
            from,
            to,
            availabilityDate,
            adr: adr === "No ADR" ? "noadr" : adr,
            bodyTypeId,
            bodySubTypeId,
            loadings: loadingKeys,
            packings: packings.map((packing) => {
                delete packing.id;
                return packing;
            }),
            permit,
            companyId,
            cargoTypeId
        };

        if (notes) {
            data.notes = notes;
        }

        onAddCargoToMap(data)
            .then((res) => {
                console.log(res);
                showSuccessNotification("Груз успешно добавлен");
                navigate("/find-truck");
            })
            .catch((e) => {
                console.log(e);
                showErrorNotification("Не удалось добавить груз на карту");
            });
    }
    return (
        <div className={styles.AddCargo}>
            <div className={styles.HeaderBack}>
                <HeaderNavigationBack text=" Добавить груз" />
            </div>
            <div className={styles.StepsContainer}>
                <div className={styles.Steps}>
                    <Steps
                        steps={ADD_CARGO_STEPS}
                        activeStepNumber={activeStep}
                        onClick={setActiveStep}
                    />
                </div>
            </div>
            <div className={styles.Content}>
                {activeStep === 1 && (
                    <CargoDetailForm
                        data={cargoData}
                        handleRemovePacking={handleRemovePacking}
                        onAddPacking={handleAddPackage}
                        onChange={handleStatePropertyChange}
                        onPackingChange={handlePackingChange}
                        companies={companies}
                        cargoTypes={cargoTypes}
                    />
                )}
                {activeStep === 2 && (
                    <CargoRequirementsForm
                        onChange={handleStatePropertyChange}
                        data={cargoData}
                        bodyTypes={bodyTypes}
                        bodySubTypesObj={bodySubTypesObj}
                    />
                )}
                {activeStep === 3 && (
                    <CargoRouteForm
                        data={cargoData}
                        onChange={handleStatePropertyChange}
                    />
                )}
            </div>
            <div className={styles.ButtonsContainer}>
                <StepPageFooter
                    activeStep={activeStep}
                    handleActiveStepChange={handleStepForward}
                    handleStepBack={handleStepBack}
                    handleBack={handleGoBack}
                    onSubmit={handleSubmit}
                    steps={ADD_CARGO_STEPS}
                    isNextDisabled={!isNextEnabled()}
                />
            </div>
        </div>
    );
}

export default AddCargo;
