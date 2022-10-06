import React, { useState } from "react";
import SearchList from "./SearchList";
import useDebounce from "../../hooks/useDebounce";
import Input from "../UI/Input";

import styles from "./index.module.scss";

const TrackList = ({ trucks, onClick, onLocationClick }) => {
    const [searchTerm, setSearchTerm] = useState("");

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(value);
    }

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const filteredTrucks = trucks.filter((truck) => {
        const category = String(truck.category || "").toLowerCase();
        const fromAddress = String(truck.fromAddress || "").toLowerCase();
        const toAddress = String(truck.toAddress || "").toLowerCase();
        const term = String(debouncedSearchTerm).toLowerCase();

        return (
            category.includes(term) ||
            fromAddress.includes(term) ||
            toAddress.includes(term)
        );
    });

    return (
        <div className={styles.Search}>
            <div className={styles.SearchInput}>
                <Input
                    type="text"
                    onChange={handleSearchTermChange}
                    value={searchTerm}
                    placeholder="search vehicles by name"
                />
            </div>
            <SearchList
                list={filteredTrucks}
                onClick={onClick}
                onLocationClick={onLocationClick}
            />
        </div>
    );
};

export default TrackList;
