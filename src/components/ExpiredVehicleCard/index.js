import React from "react";
import ExpiredCard from "../ExpiredCard";
import useVehicleIcon from "../../hooks/useVehicleIcon";

const ExpiredVehicleCard = ({
    id,
    fromAddress,
    toAddress,
    category,
    onUpdate,
    onDelete
}) => {
    const VehicleIcon = useVehicleIcon(category);

    return (
        <ExpiredCard
            id={id}
            fromAddress={fromAddress}
            toAddress={toAddress}
            category={category}
            onUpdate={onUpdate}
            onDelete={onDelete}
        >
            <div style={{ width: "40px", height: "30px" }}>
                <VehicleIcon />
            </div>
        </ExpiredCard>
    );
};

export default ExpiredVehicleCard;
