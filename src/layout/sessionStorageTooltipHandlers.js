const tooltipItemKey = "showTooltip";

export function safelyLoadShowTooltipFromSessionStorage() {
    try {
        return JSON.parse(window.sessionStorage.getItem(tooltipItemKey));
    } catch (e) {
        return true;
    }
}

export function saveShowTooltipToSessionStorage(showTooltip) {
    window.sessionStorage.setItem(tooltipItemKey, JSON.stringify(showTooltip));
}
