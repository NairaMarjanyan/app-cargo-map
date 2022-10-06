// The debounce function receives our function as a parameter
export const debouncedCallbackWithAnimationFrame = (fn) => {
    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame;
    // The debounce function returns a new function that can receive a variable number of arguments
    return (...params) => {
        // If the frame variable has been defined, clear it now, and queue for next frame
        if (frame) {
            cancelAnimationFrame(frame);
        }
        // Queue our function call for the next frame
        frame = requestAnimationFrame(() => {
            // Call our function and pass any params we received
            fn(...params);
        });
    };
};

export function getPaginationData({ page, rowsPerPage }) {
    const startIndex = page * rowsPerPage;
    const endIndex = page * rowsPerPage + rowsPerPage;
    return { startIndex, endIndex };
}

export function getErrorsObj(errors) {
    const constErrorsObj = {};
    for (let key in errors) {
        if (errors.hasOwnProperty(key)) {
            constErrorsObj[key] = errors[key];
        }
    }
    return constErrorsObj;
}

export function formatDate(dateStr, locale = "ru") {
    try {
        return new Intl.DateTimeFormat(locale).format(new Date(dateStr));
    } catch (e) {
        return dateStr;
    }
}

export function isEnglishLetter(str) {
    let res = /^([a-zA-Z0-9.@_/-])*$/;
    return res.test(str);
}
