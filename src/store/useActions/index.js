import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const useActions = (actions) => {
    const dispatch = useDispatch();

    const memoizedActions = useMemo(() => {
        return bindActionCreators({ ...actions }, dispatch);
    }, [actions, dispatch]);

    return memoizedActions;
};

export default useActions;
