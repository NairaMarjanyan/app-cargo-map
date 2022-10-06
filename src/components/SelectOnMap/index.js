import React, { useEffect, useState, useRef } from "react";
import MapView from "../MapView";
import Button from "../UI/Button";
import SecondaryButton from "../UI/SecondaryButton";
import styles from "./index.module.scss";
import L from "leaflet";

const SelectOnMap = ({ onCancel, onSubmit }) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    const [latlng, setLatlng] = useState(null);

    useEffect(() => {
        return () => {
            mapRef.current = null;
        };
    }, []);

    function markerDragEnd(event) {
        const marker = event.target;
        const position = marker.getLatLng();
        setLatlng(position);
    }

    function handleClickOnMap(e) {
        if (!mapRef.current?.mapInstanceRef?.current) {
            return;
        }
        const map = mapRef.current.mapInstanceRef.current;
        const { latlng } = e;

        if (markerRef.current) {
            markerRef.current.off("dragend", markerDragEnd);
            map.removeLayer(markerRef.current);
        }

        markerRef.current = L.marker(latlng, { draggable: true });
        markerRef.current.on("dragend", markerDragEnd);
        map.addLayer(markerRef.current);

        setLatlng(latlng);
    }

    return (
        <div>
            <div className={styles.MapContainer}>
                <MapView ref={mapRef} onClick={handleClickOnMap} />
            </div>
            <div className={styles.ButtonContainer}>
                <div className={styles.SecondaryButton}>
                    <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
                </div>
                <Button onClick={() => onSubmit(latlng)}>Done</Button>
            </div>
        </div>
    );
};

export default SelectOnMap;
