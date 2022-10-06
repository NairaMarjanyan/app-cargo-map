import { useCallback, useState } from "react";

const useFilter = (filterObj) => {
    const [filter, setFilter] = useState(filterObj);

    const handleFilterChange = useCallback((event) => {
        const selected = event.target.checked;
        const value = event.target.value;
        const name = event.target.name;

        setFilter((prevState) => {
            let updatedList = selected
                ? [...prevState[name], value]
                : prevState[name].filter((item) => item !== value);
            return {
                ...prevState,
                [name]: updatedList
            };
        });
    }, []);

    return [filter, handleFilterChange];
};

export default useFilter;
