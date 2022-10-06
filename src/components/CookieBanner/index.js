import React, { useLayoutEffect, useState } from "react";
import styles from "./index.module.scss";
import Button from "../UI/Button";

const localStorage = window.localStorage;

const CookieBanner = () => {
    const [accepted, setAccepted] = useState(false);

    useLayoutEffect(() => {
        try {
            const accepted = localStorage.getItem("cm-cookie-policy-accepted");
            if (accepted) {
                setAccepted(true);
            }
        } catch (e) {
            console.log("No localStorage");
        }
    }, []);

    function handleAcceptCookie() {
        try {
            localStorage.setItem("cm-cookie-policy-accepted", "yes");
        } catch (e) {
            console.log("No localStorage");
        } finally {
            setAccepted(true);
        }
    }

    if (accepted) {
        return null;
    }
    return (
        <div className={styles.CookieBanner}>
            <p>
                We use cookies to offer a better browsing experience. By
                clicking Accept you consent to our use of cookies.
            </p>
            <div className={styles.ButtonContainer}>
                <Button onClick={handleAcceptCookie}>accept</Button>
            </div>
        </div>
    );
};

export default CookieBanner;
