import React, { useEffect, useState } from "react";
import { getLocationByCoordinates } from "../../api/location";
import Input from "../UI/Input";
import IconWrapper from "../IconWrapper";
import LocationSvg from "../icons/40/LocationSvg";
import Modal from "../UI/Modal";
import SelectOnMap from "../SelectOnMap";
import styles from "./index.module.scss";

function constructAddress({
    street = "",
    province = "",
    city = "",
    country = ""
}) {
    return `${street ? `${street}, ` : ""}${
        province !== city ? `${province}, ` : ""
    }${city}, ${country}`;
}
function LocationInput({ name, label, coordinates, onChange, required }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (!coordinates) {
            return;
        }
        getLocationByCoordinates({
            longitude: coordinates.longitude,
            latitude: coordinates.latitude
        })
            .then((response) => {
                const {
                    street = "",
                    province = "",
                    city = "",
                    country = ""
                } = response.data;

                const address = constructAddress({
                    street,
                    province,
                    city,
                    country
                });
                setAddress(address);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsModalOpen(false);
            });
    }, [coordinates]);

    function handleModalClose() {
        setIsModalOpen(false);
    }

    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function handleSetLocation(latLng) {
        const addressCoordinates = {
            longitude: latLng.lng,
            latitude: latLng.lat
        };
        onChange(name, addressCoordinates);
        handleModalClose();
    }

    return (
        <>
            <div className={styles.LocationInput}>
                <div className={styles.Input}>
                    <Input
                        value={address}
                        className={styles.Input}
                        inputProps={{
                            "aria-label": { name }
                        }}
                        onChange={Function.prototype}
                        label={label}
                        type="text"
                        name={name}
                        required={required}
                        readOnly
                    />
                </div>
                <div className={styles.IconContainer} onClick={handleModalOpen}>
                    <IconWrapper>
                        <LocationSvg />
                    </IconWrapper>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                title="Map"
                hideHeader
                onClose={handleModalClose}
                onBackDropClick={handleModalClose}
            >
                <SelectOnMap
                    onCancel={handleModalClose}
                    onSubmit={handleSetLocation}
                />
            </Modal>
        </>
    );
}

export default LocationInput;
