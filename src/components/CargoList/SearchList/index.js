import React, { useCallback } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import styles from "./index.module.scss";
import CargoCard from "../../CargoCard";

const SearchList = ({ list, onClick, onLocationClick }) => {
    // TODO wrap with usecallback onClick or use ref
    const Row = useCallback(
        ({ index, style }) => {
            const cargo = list[index];
            return (
                <div className={`${styles.SearchListItem}`} style={style}>
                    <li key={cargo.id}>
                        <CargoCard
                            type={cargo.type}
                            fromAddress={cargo.fromAddress}
                            toAddress={cargo.toAddress}
                            weight={cargo.weight}
                            adr={cargo.adr}
                            onLocationClick={(e) => {
                                e.stopPropagation();
                                onLocationClick(
                                    cargo.fromLocation.latitude,
                                    cargo.fromLocation.longitude
                                );
                            }}
                            onClick={(e) => onClick(e, cargo)}
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
