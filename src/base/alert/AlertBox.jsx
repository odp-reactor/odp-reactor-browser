import React from "react";

import { Icon } from "semantic-ui-react";

export default function AlertBox() {
    // console.log("Alert box called");
    // const [context, setContext] = useContext(Context);
    return (
        <div id="alert-box">
            <div class="semantic-ui-icon">
                <Icon name="check" size="big" color="green" />
            </div>
            Filter Updated
            {/* {context.alert ? context.alert.message : null} */}
        </div>
    );
}
