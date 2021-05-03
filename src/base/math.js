//#DEFINE constants
const X = 0;
const Y = 1;

/**
 * =*=*=*=*=*=*=*=*=*=*=*=*=
 *
 *   Cartesian Mathematics
 *
 * =*=*=*=*=*=*=*=*=*=*=*=*=
 */

/**
 * Returns a control point for quadratic bezier distance
 * on the segment axis
 *
 * @param {number[]} coordinates_1 point A
 * @param {number[]} coordinates_2 point B
 * @param {number} heightWeight this number is multiplied by the unit to increase the round of the arc
 */
export default function getControlPoint(
    coordinates_1,
    coordinates_2,
    heightWeight = 1
) {
    const UNIT = 1; // you can change this with a function
    const m = getSlope(coordinates_1, coordinates_2);
    const midPoint = getMidpoint(coordinates_1, coordinates_2);

    console.log(coordinates_1, coordinates_2);
    if (!m) {
        return [midPoint[X] + heightWeight * UNIT, midPoint[Y]];
    } else {
        let controlPointX = midPoint[X] + heightWeight * UNIT;
        return [controlPointX, segmentAxis(controlPointX, midPoint, m)];
    }
}

/**
 * Given x returns y coordinates
 *
 * @param {number} x function input
 * @param {number[]} midPoint the midpoint coordinates of a segment
 * @param {*} m slope of axis
 */
function segmentAxis(x, midPoint, m) {
    return (-1 / m) * (x - midPoint[X]) + midPoint[Y];
}

function getMidpoint(coordinates_1, coordinates_2) {
    return [
        (coordinates_1[X] + coordinates_2[X]) / 2,
        (coordinates_1[Y] + coordinates_2[Y]) / 2,
    ];
}

/**
 * Computes the slope of a line given 2 points
 *
 * @param {number[]} coordinates_1 Point 1
 * @param {number[]} coordinates_2 Point 2
 */
function getSlope(coordinates_1, coordinates_2) {
    if (coordinates_1[X] === coordinates_2[X]) {
        return undefined;
    } else {
        return (
            (coordinates_2[Y] - coordinates_1[Y]) /
            (coordinates_2[X] - coordinates_1[X])
        );
    }
}

/**
 * Gets two points and returns the angle they draw in a cartesian plan
 *
 * @param {number[]} p1 an array of x1, y1 coordinates
 * @param {number[]} p2 an array of x2, y2 coordinates
 */
export function getAngle(p1, p2) {
    const diffY = p1[Y] - p2[Y];
    const diffX = p1[X] - p2[X];
    return Math.atan2(diffY, diffX) * (180 / Math.PI) - 90;
}

/**
 * @description Return log in base b of n
 * @author Christian Colonna
 * @date 02-12-2020
 * @export
 * @param {number} b base
 * @param {number} n number
 * @returns {number} the log in base b of n
 */
export function baseLog(b, n) {
    return Math.log(n) / Math.log(b);
}

/**
 * @description Scale a number x (number in a range minD, maxD) projecting it to a range (minV, maxV)
 *              returns minV if result is not finite
 * @author Christian Colonna
 * @date 08-12-2020
 * @export
 * @param {number} x input value
 * @param {number} minD minimum value in data
 * @param {number} maxD max value in data
 * @param {number} minV minimum value x can be scaled
 * @param {number} maxV maximum value x can be scaled
 * @returns {number} scaled output
 */
export function scaleData(x, minD, maxD, minV, maxV) {
    // log base
    const b = Math.pow(maxD - minD, 1 / (maxV - minV));
    const result = minV + baseLog(b, x - minD);
    if (isFinite(result)) {
        return result;
    }
    return minV;
}

export function scaleInto01(x, min, max) {
    return (x - min) / (max - min);
}

export function decimalPlaces(num) {
    var match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
        return 0;
    }
    return Math.max(
        0,
        // Number of digits right of decimal point.
        (match[1] ? match[1].length : 0) -
            // Adjust for scientific notation.
            (match[2] ? +match[2] : 0)
    );
}
