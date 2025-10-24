export function createProgressiveKeystream(initialShiftValue, shiftIncrement, keystreamLength) {
    const keystream = [];
    let shiftValue = Number(initialShiftValue);

    while(keystream.length < keystreamLength) {
        keystream.push(shiftValue);
        shiftValue += Number(shiftIncrement);
    }

    return keystream;
}