const tutorialLocalStorageKey = "tutorial-key";

export function safelyLoadTutorialCookieFromLocalStorage(key) {
    try {
        const isFirstAccess = JSON.parse(
            window.localStorage.getItem(`${key}-${tutorialLocalStorageKey}`)
        );

        return isFirstAccess === null;
    } catch (e) {
        return true;
    }
}

export function saveFirstAccessToLocalStorage(key) {
    window.localStorage.setItem(
        `${key}-${tutorialLocalStorageKey}`,
        JSON.stringify(false)
    );
}
