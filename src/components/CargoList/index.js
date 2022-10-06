import React, { useState } from "react";

import styles from "./index.module.scss";
import SearchList from "./SearchList";
import useDebounce from "../../hooks/useDebounce";
import Input from "../UI/Input";

const CargoList = ({ cargos, onClick, onLocationClick }) => {
    const [searchTerm, setSearchTerm] = useState("");

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(value);
    }

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const filteredCargos = cargos.filter((cargo) => {
        const type = String(cargo.type || "").toLowerCase();
        const fromAddress = String(cargo.fromAddress || "").toLowerCase();
        const toAddress = String(cargo.toAddress || "").toLowerCase();
        const term = String(debouncedSearchTerm).toLowerCase();

        return (
            type.includes(term) ||
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
                list={filteredCargos}
                onClick={onClick}
                onLocationClick={onLocationClick}
            />
        </div>
    );
};

export default CargoList;
