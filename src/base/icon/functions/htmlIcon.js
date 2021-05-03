export default function htmlIcon(src, message, customClass = "") {
    return `
            <i>
                <img
                    class="ld-ui-div-icon"
                    src="${src}"
                 class="simple-icon"
                ></img>
                <p class="icon-description ${customClass}">${message}</p>
                <br />
            </i>
            `;
}
