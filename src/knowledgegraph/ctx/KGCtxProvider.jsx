import React, {useState} from "react";
import { KGCtx } from "./KGCtx";

export default function KGCtxProvider({ knowledgeGraph, classUri, children }) {

    return (
        <KGCtx.Provider value={{ knowledgeGraph, classUri }}>
            {children || null}
        </KGCtx.Provider>
    );
}
