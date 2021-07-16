import React, { useContext } from "react";
import { AlertCtx } from "./AlertCtx";

export function useAlertCtx() {
    const { useAlert } = useContext(AlertCtx);
    const {showAlert, alert} = useAlert();
    return {
        showAlert, alert
    };
}
