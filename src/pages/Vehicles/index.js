import React, { useMemo, useState, useEffect } from "react";
import Modal from "../../components/UI/Modal";
import AddVehicleSvg from "../../components/icons/24/AddVehicleSvg";
import CreateVehicle from "../CreateVehicle";
import { COMPANY_TYPE } from "../../utils/constants";
import DataTable from "../../components/DataTable";
import EmptyContent from "../../components/EmptyContent";
import VehicleSvg from "../../components/icons/140/VehicleSvg";
import useVehicleStore from "../../store/hooks/useVehicleStore";
import LoadingPage from "../../components/LoadingPage";
import { getPaginationData } from "../../utils/helpers";
import useVehicleTypesStore from "../../store/hooks/useVehicleTypesStore";
import HeaderContent from "../../components/HeaderContent";
import styles from "./index.module.scss";
import Image from "../../components/UI/Image";

const columns = [
    {
        id: "Vehicle",
        name: "Vehicle",
        selector: (row) => <Image row={row} />
    },

    {
        id: "Company",
        name: "Company",
        selector: (row) => row.category
    },
    {
        id: "Category",
        name: "Category",
        selector: (row) => row.category
    },
    {
        id: "CarNumber",
        name: "Car Number",
        selector: (row) => row.carNumber
    },
    {
        id: "Vin Number",
        name: "Vin Number",
        selector: (row) => row.vinNumber
    },
    {
        id: "BodyType",
        name: "BodyType",
        selector: (row) => row.bodyType.name
    },
    {
        id: "bodySubType",
        name: "Body SubType",
        selector: (row) => row.bodySubType.name
    },
    {
        id: "Adr",
        name: "Adr",
        selector: (row) => row.adr
    },
    {
        id: "model",
        name: "Model",
        selector: (row) => row.model.name
    },
    {
        id: "make",
        name: "Make",
        selector: (row) => row.make.name
    },
    {
        id: "permit",
        name: "Permit",
        selector: (row) => row.permit
    },
    {
        id: "loadings",
        name: "Loadings",
        selector: (row) => row.loadings[0]
    }
];

const Vehicles = ({ companies }) => {
    const [isCreateVehicleModalOpen, setIsCreateVehicleModalOpen] =
        useState(false);

    const {
        vehicles,
        loading,
        getVehicles,
        createVehicle,
        getMakes,
        makes,
        getModelsByMakeId,
        modelsObj
    } = useVehicleStore();
    //to do
    const { getBodyTypes, bodyTypes, getSubTypes, bodySubTypesObj } =
        useVehicleTypesStore();

    const [state, setState] = useState({
        currentPage: 0,
        data: [],
        totalCount: 0,
        rowsPerPage: 10
    });

    useEffect(() => {
        if (!isCreateVehicleModalOpen) {
            return;
        }
        Promise.all([getBodyTypes(), getMakes()]).catch((e) => console.log(e));
        // todo handle errors
    }, [isCreateVehicleModalOpen, getBodyTypes, getMakes]);
    useEffect(() => {
        getVehicles().catch((error) => {
            console.error(error);
        });
    }, [getVehicles]);

    useEffect(() => {
        if (vehicles.length === 0) {
            return;
        }

        function getData(page, rowsPerPage) {
            const { startIndex, endIndex } = getPaginationData({
                page,
                rowsPerPage
            });

            return new Promise((res) => {
                setTimeout(() => {
                    res({
                        data: vehicles.slice(startIndex, endIndex),
                        totalLength: vehicles.length
                    });
                }, 200);
            });
        }

        getData(state.currentPage, state.rowsPerPage)
            .then((response) => {
                setState((prevState) => {
                    return {
                        ...prevState,
                        data: response.data,
                        totalCount: response.totalLength
                    };
                });
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }, [state.currentPage, state.rowsPerPage, vehicles]);

    function handleAddVehicleModalToggle() {
        setIsCreateVehicleModalOpen((prevState) => !prevState);
    }

    const vehicleCompanies = useMemo(() => {
        return companies.filter(
            (company) => company.type === COMPANY_TYPE.transport
        );
    }, [companies]);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className={styles.Vehicles}>
            <div className={styles.Header}>
                <HeaderContent
                    title="My Vehicles"
                    text="Create New Vehicle"
                    onClick={handleAddVehicleModalToggle}
                />
            </div>

            {vehicles.length === 0 && (
                <EmptyContent
                    title="No vehicle found"
                    text="You don't have vehicle. You can create them."
                    linkText="Create New Vehicle"
                    linkCb={handleAddVehicleModalToggle}
                >
                    <VehicleSvg />
                </EmptyContent>
            )}
            <div className={styles.DataTable}>
                <DataTable data={vehicles} columns={columns} />
            </div>
            <Modal
                isOpen={isCreateVehicleModalOpen}
                title="Добавить машину"
                iconComponent={AddVehicleSvg}
                onClose={handleAddVehicleModalToggle}
            >
                <CreateVehicle
                    onCancel={handleAddVehicleModalToggle}
                    companies={vehicleCompanies}
                    bodyTypes={bodyTypes}
                    bodySubTypesObj={bodySubTypesObj}
                    getSubTypes={getSubTypes}
                    getModelsByMakeId={getModelsByMakeId}
                    modelsObj={modelsObj}
                    makes={makes}
                    onSubmit={createVehicle}
                />
            </Modal>
        </div>
    );
};

export default Vehicles;
