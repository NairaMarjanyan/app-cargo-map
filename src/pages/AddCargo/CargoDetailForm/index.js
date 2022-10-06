import React, { useState } from "react";
import BoxForm from "../../../components/PackageForms/BoxForm";
import BagForm from "../../../components/PackageForms/BagForm";
import OtherPackageForms from "../../../components/PackageForms/OtherPackageForms";
import PopoverMenu from "../../../components/UI/PopoverMenu";
import Select from "../../../components/UI/Select";
import ClosableCard from "../../../components/ClosableCard";
import PalletForm from "../../../components/PackageForms/PalletForm";
import styles from "./index.module.scss";
import { ADR_OPTIONS, PACKING_TYPES } from "../../../utils/constants";

const PACKING_OPTIONS = [
    {
        name: "паллеты",
        id: PACKING_TYPES.pallet
    },
    {
        name: "коробки",
        id: PACKING_TYPES.box
    },
    {
        name: "мешки",
        id: PACKING_TYPES.bag
    },
    {
        name: "Другое",
        id: PACKING_TYPES.other
    }
];

const CargoDetailForm = ({
    data,
    onChange,
    handleRemovePacking,
    onPackingChange,
    onAddPacking,
    cargoTypes,
    companies
}) => {
    const [selectedPackageType, setSelectedPackageType] = useState("none");
    const menuItems = [
        {
            id: PACKING_TYPES.pallet,
            value: PACKING_OPTIONS[0].name,
            cb: handlePackageTypeChange
        },
        {
            id: PACKING_TYPES.box,
            value: PACKING_OPTIONS[1].name,
            cb: handlePackageTypeChange
        },
        {
            id: PACKING_TYPES.bag,
            value: PACKING_OPTIONS[2].name,
            cb: handlePackageTypeChange
        },
        {
            id: PACKING_TYPES.other,
            value: PACKING_OPTIONS[3].name,
            cb: handlePackageTypeChange
        }
    ];

    function handlePackageTypeChange(type) {
        if (PACKING_TYPES[type]) {
            onAddPacking(type);
        }
        setSelectedPackageType("none");
    }

    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        onChange(name, value);
    }
    return (
        <div className={styles.CargoDetailForm}>
            <div className={styles.CargoDetailsContainer}>
                <h2 className={styles.Title}>Детали груза</h2>
                <div className={styles.Select}>
                    <Select
                        value={data.companyId || ""}
                        label=" Компания"
                        name="companyId"
                        onChange={handleInputChange}
                        options={companies}
                        required
                        disabled={companies.length === 1}
                        keyPropertyName="id"
                        valuePropertyName="id"
                        displayPropertyName="name"
                    />
                </div>
                <div className={styles.Select}>
                    <Select
                        value={data.cargoTypeId || ""}
                        onChange={handleInputChange}
                        options={cargoTypes}
                        name="cargoTypeId"
                        label="Наименование груза"
                        required
                        keyPropertyName="id"
                        valuePropertyName="id"
                        displayPropertyName="name"
                        disabled={cargoTypes.length === 0}
                    />
                </div>
                <div className={styles.Select}>
                    <Select
                        value={data.adr || ""}
                        onChange={handleInputChange}
                        options={ADR_OPTIONS}
                        name="adr"
                        label="ADR"
                        required
                    />
                </div>
            </div>
            <div className={styles.PackingContainer}>
                <p className={styles.Title}> Упаковка</p>
                {data.packings.map((packageData) => {
                    return (
                        <ClosableCard
                            title={packageData.type}
                            onClose={() => handleRemovePacking(packageData.id)}
                            key={packageData.id}
                        >
                            {packageData.type === PACKING_TYPES.pallet && (
                                <PalletForm
                                    data={packageData}
                                    onChange={onPackingChange}
                                />
                            )}
                            {packageData.type === PACKING_TYPES.box && (
                                <BoxForm
                                    data={packageData}
                                    onChange={onPackingChange}
                                />
                            )}
                            {packageData.type === PACKING_TYPES.bag && (
                                <BagForm
                                    data={packageData}
                                    onChange={onPackingChange}
                                />
                            )}
                            {packageData.type === PACKING_TYPES.other && (
                                <OtherPackageForms
                                    data={packageData}
                                    onChange={onPackingChange}
                                />
                            )}
                        </ClosableCard>
                    );
                })}

                <div className={styles.AddNewContainer}>
                    <PopoverMenu
                        menuItems={menuItems}
                        value={selectedPackageType}
                        onChange={handlePackageTypeChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default CargoDetailForm;
