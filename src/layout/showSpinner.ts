export function showSpinner() : void {


        // display spinner
        document.getElementsByClassName("odpr-spinner")[0]?.classList.add("display-odpr-spinner")
        // hide page content
        document.getElementsByClassName("odpr-container")[0]?.classList.add("hide-odpr-container")


}