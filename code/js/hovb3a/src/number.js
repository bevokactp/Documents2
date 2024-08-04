
export function padWithLeadingZeros(number, length) {
    //  pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length. The padding is applied from the start (left) of the current string.

    return number.toString().padStart(length, '0');
}