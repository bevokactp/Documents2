// utils for generation things

export function generateNewUserIdUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f) | (c === 'x' ? 0 : 8);
        return r.toString(16);
    });
}

export function getRandomIntInRanges(min, max) {
    min = Math.ceil(min);  // Round up the min value
    max = Math.floor(max); // Round down the max value
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
