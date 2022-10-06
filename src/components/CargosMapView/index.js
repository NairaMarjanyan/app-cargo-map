import React, { useEffect, useImperativeHandle, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css"; // or leaflet.markercluster-src.js for the non-minified version
import "leaflet.markercluster/dist/MarkerCluster.Default.css"; // not needed if you use your own iconCreateFunction instead of the default one
import ReactDOMServer from "react-dom/server";
import "leaflet-control-geocoder";
import CargoCard from "../CargoCard";
import VehicleCard from "../VehicleCard";
import {
    cargoIcon,
    inactiveVehicleIcon,
    vehicleIcon
} from "../../utils/leaflet_icons";

import styles from "./index.module.scss";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const CargosMapView = ({ cargos, onCardClick, vehicles }, ref) => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const clusterLayerRef = useRef(null);

    const onCardClickCBRef = useRef(onCardClick);
    onCardClickCBRef.current = onCardClick;

    useEffect(() => {
        if (!mapContainerRef.current) {
            return;
        }

        // create map
        const map = L.map(mapContainerRef.current, {
            preferCanvas: true,
            minZoom: 3,
            zoomControl: false
        })
            .setZoom(8)
            .setView(L.latLng(40.201653, 44.503256));

        // add tileLayer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 25
        }).addTo(map);

        // add search control
        L.Control.geocoder({
            defaultMarkGeocode: false
        })
            .on("markgeocode", function (e) {
                const bbox = e.geocode.bbox;
                const poly = L.polygon([
                    bbox.getSouthEast(),
                    bbox.getNorthEast(),
                    bbox.getNorthWest(),
                    bbox.getSouthWest()
                ]);
                map.fitBounds(poly.getBounds());
            })
            .addTo(map);

        // Zoom control
        L.control
            .zoom({
                position: "topright"
            })
            .addTo(map);

        // save map instance to ref
        mapRef.current = map;

        // cleanup
        return () => {
            mapRef.current.clearAllEventListeners();
            mapRef.current.remove();
        };
    }, []);

    // add cargos to map
    useEffect(() => {
        if (!mapRef.current) {
            return;
        }

        const map = mapRef.current;

        // remove existing cluster layer
        if (clusterLayerRef?.current) {
            map.removeLayer(clusterLayerRef.current);
            clusterLayerRef.current.remove();
        }

        // add cluster layer
        clusterLayerRef.current = L.markerClusterGroup();

        // add cargo to cluster layer
        cargos.forEach((cargo) => {
            const content = ReactDOMServer.renderToString(
                <CargoCard
                    type={cargo.type}
                    fromAddress={cargo.fromAddress}
                    toAddress={cargo.toAddress}
                    weight={cargo.weight}
                    adr={cargo.adr}
                    hideLocation
                />
            );
            let divEl = document.createElement("div");
            divEl.innerHTML = content;
            divEl.onclick = (e) => onCardClickCBRef.current(e, cargo);
            L.marker(
                L.latLng(
                    cargo.fromLocation.latitude,
                    cargo.fromLocation.longitude
                ),
                {
                    icon: cargoIcon,
                    radius: 3
                }
            )
                .bindPopup(divEl)
                .addTo(clusterLayerRef.current);
        });

        // add cluster layer to our map instance
        map.addLayer(clusterLayerRef.current);
    }, [cargos]);

    // add my vehicles to map
    useEffect(() => {
        if (!mapRef.current) {
            return;
        }

        const map = mapRef.current;

        const myVehiclesMarkerLayers = [];

        vehicles.forEach((vehicle) => {
            const content = ReactDOMServer.renderToString(
                <VehicleCard
                    category={vehicle?.category}
                    fromAddress={vehicle.fromAddress}
                    toAddress={vehicle?.toAddress}
                    capacity={vehicle.capacity}
                    loaded={vehicle.loaded}
                    adr={vehicle.adr}
                    hideLocation
                />
            );
            let divEl = document.createElement("div");
            divEl.innerHTML = content;

            const icon = vehicle.isExpired ? inactiveVehicleIcon : vehicleIcon;
            const marker = L.marker(
                L.latLng(
                    vehicle.fromLocation.latitude,
                    vehicle.fromLocation.longitude
                ),
                {
                    icon: icon,
                    radius: 5
                }
            )
                .bindPopup(divEl, {
                    maxWidth: 500,
                    closeButton: false
                })
                .addTo(map);

            myVehiclesMarkerLayers.push(marker);
        });

        return () => {
            for (const myVehiclesMarkerLayer of myVehiclesMarkerLayers) {
                map.removeLayer(myVehiclesMarkerLayer);
            }
        };
    }, [vehicles]);

    useImperativeHandle(ref, () => ({
        mapInstance: mapRef.current
    }));

    return <div className={styles.MapView} ref={mapContainerRef} />;
};

export default React.forwardRef(CargosMapView);
