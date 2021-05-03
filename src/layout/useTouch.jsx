import React, { useState, useEffect } from "react";

export function useTouch() {
    const [isTouch, setIsTouch] = useState(isTouchDevice());

    useEffect(() => {
        function handleResize() {
            console.log("I should handle resize");
            const isStillTouch = isTouchDevice();
            console.log("touch:", isStillTouch);
            if (isTouch !== isStillTouch) {
                setIsTouch(isStillTouch);
            }
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return { isTouch };
}

function isTouchDevice() {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
}
