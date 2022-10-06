import React from "react";
import EmptyContent from "../../components/EmptyContent";
import EmptyCargoSvg from "../../components/icons/140/EmptyCargoSvg";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";
import HeaderContent from "../../components/HeaderContent";
import Image from "../../components/UI/Image";
import LoadingPage from "../../components/LoadingPage";

import styles from "./index.module.scss";

const columns = [
    {
        name: "Vehicle",
        selector: (row) => <Image row={row} />
    },
    {
        name: "Adr",
        selector: (row) => row.adr
    },
    {
        name: "Body SubType Name",
        selector: (row) => row.bodySubTypeName
    },
    {
        name: "Body Type Name",
        selector: (row) => row.bodyTypeName
    },
    {
        name: "Loadings",
        selector: (row) => row.loadings[0]
    },
    {
        name: "Permit",
        selector: (row) => row.permit
    }
];

function Cargos({ cargos = [], isLoading }) {
    const navigate = useNavigate();

    const showEmptyContent = !isLoading && cargos.length === 0;

    return (
        <div className={styles.Cargos}>
            <div className={styles.Header}>
                <HeaderContent
                    title="My Cargos"
                    text="Create New Cargo"
                    onClick={() => {
                        navigate({
                            pathname: "/add-cargo"
                        });
                    }}
                />
            </div>
            {isLoading && (
                <div className={styles.LoadingContainer}>
                    <LoadingPage />
                </div>
            )}
            {showEmptyContent && (
                <EmptyContent
                    title="No Cargo"
                    text="You don't have cargo. You can create them."
                    linkText="Create New Cargo"
                    isIconShow="true"
                    linkCb={() => {
                        navigate({
                            pathname: "/add-cargo"
                        });
                    }}
                >
                    <EmptyCargoSvg />
                </EmptyContent>
            )}
            {!showEmptyContent && (
                <div className={styles.DataTable}>
                    <DataTable data={cargos} columns={columns} />
                </div>
            )}
        </div>
    );
}

export default Cargos;
