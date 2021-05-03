import React, { useContext, useEffect } from "react";
import { HelpCtx } from "./HelpCtx";

export function useHelpCtx(key) {
    const {
        safelyLoadTutorialCookieFromLocalStorage,
        saveFirstAccessToLocalStorage,
        noTutorial,
    } = useContext(HelpCtx);
    const isFirstAccess = noTutorial
        ? false
        : safelyLoadTutorialCookieFromLocalStorage(key);
    useEffect(() => {
        saveFirstAccessToLocalStorage(key);
    }, []);
    return {
        isFirstAccess,
    };
}
