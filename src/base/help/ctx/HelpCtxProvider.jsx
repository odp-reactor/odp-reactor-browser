import React, { useState } from "react";
import { HelpCtx } from "./HelpCtx";

import {
    safelyLoadTutorialCookieFromLocalStorage,
    saveFirstAccessToLocalStorage,
} from "./tutorialCookieLocalStorageHandlers";

export default function HelpCtxProvider({ children, noTutorial }) {
    // set default filters
    return (
        <HelpCtx.Provider
            value={{
                saveFirstAccessToLocalStorage,
                safelyLoadTutorialCookieFromLocalStorage,
                noTutorial,
            }}
        >
            {children || null}
        </HelpCtx.Provider>
    );
}
