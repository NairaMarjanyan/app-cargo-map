import React, { useEffect, useImperativeHandle, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css"; // or leaflet.markercluster-src.js for the non-minified version
import "leaflet.markercluster/dist/MarkerCluster.Default.css"; // not needed if you use your own iconCreateFunction instead of the default one
import styles from "./index.module.scss";
import "leaflet-control-geocoder";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const MapView = ({ onClick }, ref) => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const onClickRef = useRef(null);
    onClickRef.current = onClick;

    useImperativeHandle(ref, () => {
        return {
            mapInstanceRef: mapRef
        };
    });

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
            .setZoom(13)
            .setView(L.latLng(40.201653, 44.503256));
        //todo get user location
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

        // Listeners
        if (typeof onClickRef.current === "function") {
            map.on("click", onClickRef.current);
        }
        // save map instance to ref
        mapRef.current = map;

        // cleanup
        return () => {
            mapRef.current.clearAllEventListeners();
            mapRef.current.remove();
        };
    }, []);

    return <div className={styles.MapView} ref={mapContainerRef} />;
};

export default React.forwardRef(MapView);
