import React, { useCallback } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import VehicleCard from "../../VehicleCard";

import styles from "./index.module.scss";

const SearchList = ({ list, onClick, onLocationClick }) => {
    // TODO wrap with usecallback onClick or use ref
    const Row = useCallback(
        ({ index, style }) => {
            const vehicle = list[index];
            return (
                <div className={`${styles.SearchListItem}`} style={style}>
                    <li key={vehicle.id}>
                        <VehicleCard
                            category={vehicle.category}
                            fromAddress={vehicle.fromAddress}
                            toAddress={vehicle.toAddress}
                            capacity={vehicle.capacity}
                            loaded={vehicle.loaded}
                            adr={vehicle.adr}
                            onLocationClick={(e) => {
                                e.stopPropagation();
                                onLocationClick(
                                    vehicle.fromLocation.latitude,
                                    vehicle.fromLocation.longitude
                                );
                            }}
                            onClick={(e) => {
                                onClick(e, vehicle);
                            }}
                        />
                    </li>
                </div>
            );
        },
        [list, onClick, onLocationClick]
    );

    return (
        <ul className={styles.SearchList}>
            <AutoSizer>
                {({ height, width }) => {
                    return (
                        <List
                            height={height}
                            itemCount={list.length}
                            itemSize={230}
                            width={width}
                            useIsScrolling
                        >
                            {Row}
                        </List>
                    );
                }}
            </AutoSizer>
        </ul>
    );
};

export default SearchList;
