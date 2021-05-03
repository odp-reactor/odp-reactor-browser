export function findSliderDomain(arr, valueKey) {
    let min, max;
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i][valueKey]) {
            let n = Number.parseFloat(arr[i][valueKey]);
            if (min === undefined) {
                min = n;
                max = n;
            } else {
                if (n < min) {
                    min = n;
                }
                if (n > max) {
                    max = n;
                }
            }
        }
    }
    return [Math.floor(min), Math.ceil(max)];
}
