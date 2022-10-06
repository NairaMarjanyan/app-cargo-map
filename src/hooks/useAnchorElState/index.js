import { useCallback, useState } from "react";

const useAnchorElState = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = useCallback((e) => {
        setAnchorEl(e.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const isOpen = Boolean(anchorEl);
    return {
        anchorEl,
        onClick: handleClick,
        onClose: handleClose,
        isOpen
    };
};

export default useAnchorElState;
