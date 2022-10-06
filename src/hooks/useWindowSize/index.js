import { useState, useLayoutEffect } from "react";
import { debouncedCallbackWithAnimationFrame } from "../../utils/helpers";

const useWindowSize = ({ delay = 100 } = {}) => {
    const [state, setState] = useState({
        width:
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,
        height:
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight
    });

    useLayoutEffect(() => {
        const debouncedFn = debouncedCallbackWithAnimationFrame(
            () =>
                setState({
                    width:
                        window.innerWidth ||
                        document.documentElement.clientWidth ||
                        document.body.clientWidth,
                    height:
                        window.innerHeight ||
                        document.documentElement.clientHeight ||
                        document.body.clientHeight
                }),
            delay
        );

        window.addEventListener("resize", debouncedFn);

        return () => window.removeEventListener("resize", debouncedFn);
    }, [delay]);

    return state;
};

export default useWindowSize;
