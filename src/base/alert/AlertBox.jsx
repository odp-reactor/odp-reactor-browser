import React from "react";

import { Icon } from "semantic-ui-react";
import { useAlertCtx } from "./ctx/useAlertCtx";

export default function AlertBox() {
    // console.log("Alert box called");
    // const [context, setContext] = useContext(Context);

    const {alert} = useAlertCtx()

    return (
        <div id="alert-box"
            style={alert.warning ? {
                color: "red",
                borderColor: "red",
                backgroundColor: "white"
            } : {} }
        >
            <div class="semantic-ui-icon">
                <Icon name={!alert.warning ? "check" : "warning"} size="big" color={!alert.warning ? "green" : "red"} />
            </div>
            {alert && alert.message}
            {/* {context.alert ? context.alert.message : null} */}
        </div>
    );
}
