import React from "react";
import ExpiredCard from "../ExpiredCard";
import CargoSvg from "../icons/24/CargoSvg";

const ExpiredCargoCard = ({
    id,
    fromAddress,
    toAddress,
    type,
    onUpdate,
    onDelete
}) => {
    return (
        <ExpiredCard
            id={id}
            fromAddress={fromAddress}
            toAddress={toAddress}
            category={type}
            onUpdate={onUpdate}
            onDelete={onDelete}
        >
            <CargoSvg />
        </ExpiredCard>
    );
};

export default ExpiredCargoCard;
