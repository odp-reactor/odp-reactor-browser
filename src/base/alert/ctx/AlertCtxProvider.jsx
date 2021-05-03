import React, { useState, useEffect } from "react";
import { AlertCtx } from "./AlertCtx";

export default function AlertCtxProvider({ children }) {
    const [alert, setAlert] = useState({
        switch: true,
        message: "",
        active: false,
    });

    function useAlert() {
        useEffect(() => {
            if (alert && alert.active) {
                const interval = showAlertBox();
                if (interval) {
                    return () => clearInterval(interval);
                }
            }
        }, [alert]);

        const showAlert = (/*message*/) => {
            setAlert({
                switch: true,
                // switch: context.alert ? !context.alert.switch : true,
                active: true,
                // message: message,
            });
        };
        return showAlert;
    }

    function showAlertBox(hideTime = 1500) {
        const alertBox = document.getElementById("alert-box");
        if (alertBox) {
            document.getElementById("alert-box").classList.add("show-alert");
            const interval = setInterval(() => {
                document
                    .getElementById("alert-box")
                    .classList.remove("show-alert");
            }, hideTime);

            return interval;
        }
    }

    // set default filters
    return (
        <AlertCtx.Provider
            value={{
                useAlert,
            }}
        >
            {children || null}
        </AlertCtx.Provider>
    );
}
