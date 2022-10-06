import React from "react";
import CategoryCard from "../../../components/CategoryCard";
import { VEHICLE_CATEGORY_TYPE } from "../../../utils/constants";
import TruckSvg from "../../../components/icons/48/VehicleSvg";
import LorrySvg from "../../../components/icons/48/LorrySvg";
import CouplingSvg from "../../../components/icons/48/CouplingSvg";
import BusSvg from "../../../components/icons/48/BusSvg";
import Select from "../../../components/UI/Select";
import MultiSelect from "../../../components/UI/MultiSelect";
import Input from "../../../components/UI/Input";
import SelectWithAutoComplete from "../../../components/UI/SelectWithAutoComplete";
import {
    LOADING_OPTIONS,
    PERMIT_OPTIONS,
    ADR_OPTIONS
} from "../../../utils/constants";
import styles from "./index.module.scss";

function VehicleGeneralForm({
    handleClickOnSelectableCard,
    vehicleData,
    companies,
    bodyTypes,
    subTypes,
    makes,
    models,
    onChange
}) {
    function handleMultiSelectChange(name, options) {
        const event = {
            target: {
                name,
                value: options
            }
        };
        onChange(event);
    }

    return (
        <div className={styles.VehicleGeneralFormContainer}>
            <div className={styles.FormInput}>
                <Select
                    value={vehicleData.companyId || ""}
                    label="Компания"
                    name="companyId"
                    onChange={onChange}
                    options={companies}
                    required
                    disabled={companies.length === 1}
                    keyPropertyName="id"
                    valuePropertyName="id"
                    displayPropertyName="name"
                    error={vehicleData.errors?.companyId?.[0]}
                />
            </div>
            <div className={styles.FormInput}>
                <div className={styles.CategoriesContainerHeader}>
                    <span className={styles.Required}>*</span>
                    <h2>Category</h2>
                </div>

                <div className={styles.CategoryCardsContainer}>
                    <CategoryCard
                        title="Полуприцеп"
                        isSelected={
                            vehicleData.category ===
                            VEHICLE_CATEGORY_TYPE.trailer
                        }
                        onClick={() => {
                            handleClickOnSelectableCard(
                                VEHICLE_CATEGORY_TYPE.trailer
                            );
                        }}
                    >
                        <TruckSvg />
                    </CategoryCard>
                    <CategoryCard
                        title="Грузовик"
                        isSelected={
                            vehicleData.category === VEHICLE_CATEGORY_TYPE.truck
                        }
                        onClick={() => {
                            handleClickOnSelectableCard(
                                VEHICLE_CATEGORY_TYPE.truck
                            );
                        }}
                    >
                        <LorrySvg />
                    </CategoryCard>
                    <CategoryCard
                        title="Автопоезд" //"Сцепка"
                        isSelected={
                            vehicleData.category ===
                            VEHICLE_CATEGORY_TYPE.semitrailer
                        }
                        onClick={() => {
                            handleClickOnSelectableCard(
                                VEHICLE_CATEGORY_TYPE.semitrailer
                            );
                        }}
                    >
                        <CouplingSvg />
                    </CategoryCard>
                    <CategoryCard
                        title="Фургон"
                        isSelected={
                            vehicleData.category ===
                            VEHICLE_CATEGORY_TYPE.minibus
                        }
                        onClick={() => {
                            handleClickOnSelectableCard(
                                VEHICLE_CATEGORY_TYPE.minibus
                            );
                        }}
                    >
                        <BusSvg />
                    </CategoryCard>
                </div>
                {vehicleData.errors?.category && (
                    <p className="fb-error">
                        {vehicleData.errors?.category?.[0]}
                    </p>
                )}
            </div>

            <div className={styles.FormInput}>
                <Select
                    label="Тип кузова"
                    name="bodyTypeId"
                    value={vehicleData.bodyTypeId || ""}
                    onChange={onChange}
                    disabled={bodyTypes.length === 0}
                    options={bodyTypes}
                    keyPropertyName="id"
                    valuePropertyName="id"
                    displayPropertyName="name"
                    required
                    error={vehicleData.errors?.bodyTypeId?.[0]}
                />
            </div>
            <div className={styles.FormInput}>
                <Select
                    label="Body Subtype"
                    name="bodySubTypeId"
                    value={vehicleData.bodySubTypeId || ""}
                    onChange={onChange}
                    options={subTypes}
                    keyPropertyName="id"
                    valuePropertyName="id"
                    displayPropertyName="name"
                    disabled={subTypes.length === 0}
                    // error={vehicleData.errors?.bodySubTypeId?.[0]}
                />
            </div>
            <div className={styles.FormInput}>
                <MultiSelect
                    label=" Тип загрузки"
                    name="loadings"
                    value={vehicleData.loadings || []}
                    options={LOADING_OPTIONS}
                    onChange={(_, options) => {
                        handleMultiSelectChange("loadings", options);
                    }}
                    getOptionLabel={(option) => {
                        return option.name;
                    }}
                    isOptionEqualToValue={(option, loading) => {
                        return option.id === loading.id;
                    }}
                    required
                    error={vehicleData.errors?.loadings?.[0] || null}
                />
            </div>

            <div className={styles.SelectsContainer}>
                <div className={styles.Selects}>
                    <Select
                        label="Разрешение"
                        name="permit"
                        value={vehicleData.permit || ""}
                        onChange={onChange}
                        options={PERMIT_OPTIONS}
                        required
                        error={vehicleData.errors?.permit?.[0]}
                    />
                </div>
                <div className={styles.Selects}>
                    <Select
                        label="ADR"
                        name="adr"
                        value={vehicleData.adr || ""}
                        onChange={onChange}
                        options={ADR_OPTIONS}
                        required
                        error={vehicleData.errors?.adr?.[0]}
                    />
                </div>
            </div>

            <div className={styles.SelectsContainer}>
                <div className={styles.Selects}>
                    <SelectWithAutoComplete
                        label="Марка"
                        name="makeId"
                        value={vehicleData.makeId}
                        onChange={(_, option) => {
                            handleMultiSelectChange("makeId", option.id);
                        }}
                        options={makes}
                        getOptionLabel={(option) => {
                            if (option.name) {
                                return option.name;
                            }
                            const id = option;
                            const selectedOption = makes.find(
                                (make) => make.id === id
                            );
                            return selectedOption.name;
                        }}
                        isOptionEqualToValue={(option, value) => {
                            return option.id === value;
                        }}
                        multiple={false}
                        disablePortal={false}
                        disabled={makes.length === 0}
                        required
                        error={vehicleData.errors?.makeId?.[0]}
                    />
                </div>
                <div className={styles.Selects}>
                    <SelectWithAutoComplete
                        label="Модель"
                        name="modelId"
                        value={vehicleData.modelId}
                        onChange={(_, option) => {
                            handleMultiSelectChange("modelId", option.id);
                        }}
                        options={models}
                        getOptionLabel={(option) => {
                            // todo make generic
                            if (option.name) {
                                return option.name;
                            }
                            const id = option;
                            const selectedOption = models.find(
                                (model) => model.id === id
                            );
                            return selectedOption.name;
                        }}
                        isOptionEqualToValue={(option, value) => {
                            return option.id === value;
                        }}
                        multiple={false}
                        disablePortal={false}
                        disabled={models.length === 0}
                        required
                        error={vehicleData.errors?.modelId?.[0]}
                    />
                </div>
            </div>
            <div className={styles.SelectsContainer}>
                <div className={styles.Selects}>
                    <Input
                        label="Регистрационный номер"
                        name="carNumber"
                        value={vehicleData.carNumber || ""}
                        onChange={onChange}
                        required
                        error={Boolean(vehicleData.errors?.carNumber)}
                        helperText={vehicleData.errors?.carNumber}
                    />
                </div>
                <div className={styles.Selects}>
                    <Input
                        label="VIN Код"
                        name="vinNumber"
                        value={vehicleData.vinNumber || ""}
                        onChange={onChange}
                        required
                        error={Boolean(vehicleData.errors?.vinNumber)}
                        helperText={vehicleData.errors?.vinNumber}
                    />
                </div>
            </div>
        </div>
    );
}

export default VehicleGeneralForm;
