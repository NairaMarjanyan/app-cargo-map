import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Steps from "../../components/Steps";
import StepPageFooter from "../../components/StepPageFooter";
import useSteps from "../../components/Steps/useSteps";
import VehicleRouteForm from "./VehicleRouteForm";
import VehicleDetailForm from "./VehicleDetailForm";
import HeaderNavigationBack from "../../components/HeaderNavigationBack";
import {
    showErrorNotification,
    showSuccessNotification
} from "../../utils/notifications";
import { getErrorsObj } from "../../utils/helpers";

import styles from "./index.module.scss";

const ADD_VEHICLE_STEPS = [
    {
        number: 1,
        text: "Детали транспорта"
    },
    {
        number: 2,
        text: "Маршрут"
    }
];

function AddVehicle({ vehicles, onVehiclesAdd }) {
    const [vehicleData, setVehicleData] = useState({
        vehicleId: null,
        loaded: 0,
        loadedVolume: 0,
        date: new Date(),
        toAddressCoordinates: null,
        fromAddressCoordinates: null,
        contactPersonName: null,
        phoneNumber: null,
        notes: "",
        errors: null,
        hasPartialTransport: false
    });

    const [vehicleToDisplay, setVehicleToDisplay] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!vehicleData.vehicleId) {
            return;
        }

        const vehicleToDisplay = vehicles.find(
            (vehicle) => vehicle.id === vehicleData.vehicleId
        );
        if (vehicleToDisplay) {
            setVehicleToDisplay(vehicleToDisplay);
        }
    }, [vehicleData.vehicleId, vehicles]);

    function handleGoBack() {
        navigate(-1);
    }

    const { activeStep, setActiveStep, handleStepForward, handleStepBack } =
        useSteps();

    function handleStatePropertyChange(name, value) {
        setVehicleData((prevState) => {
            const errors = prevState.errors ? { ...prevState.errors } : null;

            if (errors) {
                delete errors[name];
            }

            if (name === "hasPartialTransport" && value === false) {
                return {
                    ...prevState,
                    loaded: 0,
                    loadedVolume: 0,
                    [name]: value
                };
            }
            return {
                ...prevState,
                [name]: value
            };
        });
    }

    function isNextEnabled() {
        if (activeStep === 1) {
            return Boolean(vehicleData.vehicleId);
        }

        if (activeStep === 2) {
            return Boolean(
                vehicleData.date && vehicleData.fromAddressCoordinates
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
            contactPersonName,
            phoneNumber: contactPhone,
            vehicleId,
            loaded,
            loadedVolume,
            hasPartialTransport
        } = vehicleData;

        const data = {
            from,
            availabilityDate,
            loaded: Number(loaded) || 0,
            loadedVolume: Number(loadedVolume) || 0
        };

        if (to) {
            data.to = to;
        }
        if (contactPersonName) {
            data.contactPersonName = contactPersonName;
        }
        if (contactPhone) {
            data.contactPhone = contactPhone;
        }
        if (notes) {
            data.notes = notes;
        }

        if (hasPartialTransport) {
            data.hasPartialTransport = hasPartialTransport;
        }

        if (loaded) {
            const totalCapacity =
                (vehicleToDisplay?.bodyDimensions?.loadCapacity || 0) +
                (vehicleToDisplay?.trailerDimensions?.loadCapacity || 0);
            if (loaded > totalCapacity) {
                setVehicleData((prevState) => {
                    return {
                        ...prevState,
                        errors: {
                            loaded: "Can't be more then initial capacity"
                        }
                    };
                });
                setActiveStep(1);
                return;
            }
        }

        if (loadedVolume) {
            const totalVolume =
                (vehicleToDisplay?.bodyDimensions?.volume || 0) +
                (vehicleToDisplay?.trailerDimensions?.volume || 0);
            if (loadedVolume > totalVolume) {
                setVehicleData((prevState) => {
                    return {
                        ...prevState,
                        errors: {
                            loadedVolume: "Can't be more then initial volume"
                        }
                    };
                });
                setActiveStep(1);
                return;
            }
        }

        onVehiclesAdd({ id: vehicleId, data })
            .then(() => {
                showSuccessNotification("Vehicle successfully added");
                navigate("/find-cargo");
            })
            .catch((error) => {
                // TODO validate that loaded <= capacity
                showErrorNotification("Failed to add vehicle to map");
                if (error.response) {
                    const errors = error.response.data?.errors;
                    if (errors) {
                        showErrorNotification(
                            "Make sure all fields are filled."
                        );
                        setVehicleData((prevState) => {
                            return {
                                ...prevState,
                                errors: getErrorsObj(errors)
                            };
                        });
                    }
                }
            });
    }

    return (
        <div className={styles.AddVehicle}>
            <div className={styles.HeaderBack}>
                <HeaderNavigationBack text="Добавить транспорт" />
            </div>
            <div className={styles.StepsContainer}>
                <div className={styles.Steps}>
                    <Steps
                        steps={ADD_VEHICLE_STEPS}
                        activeStepNumber={activeStep}
                        onClick={setActiveStep}
                    />
                </div>
            </div>
            <div className={styles.Content}>
                {activeStep === 1 && (
                    <VehicleDetailForm
                        data={vehicleData}
                        vehicles={vehicles}
                        vehicleToDisplay={vehicleToDisplay}
                        onChange={handleStatePropertyChange}
                    />
                )}
                {activeStep === 2 && (
                    <VehicleRouteForm
                        data={vehicleData}
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
                    steps={ADD_VEHICLE_STEPS}
                    isNextDisabled={!isNextEnabled()}
                />
            </div>
        </div>
    );
}

export default AddVehicle;
