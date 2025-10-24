export function createProgressiveKeystream(initialShiftValue, shiftIncrement, keystreamLength) {
    const keystream = [];
    let shiftValue = Number(initialShiftValue);

    while(keystream.length < keystreamLength) {
        keystream.push(shiftValue);
        shiftValue += Number(shiftIncrement);
    }

    return keystream;
}

export function createKeystreamForRange(
    initialShiftValue, 
    shiftIncrement, 
    incrementRange, 
    keystreamLength) 
{
    const keystream = [];
    let shiftValue = Number(initialShiftValue);

    while(keystream.length < keystreamLength) {
        const rangeArray = new Array(Number(incrementRange)).fill(Number(shiftValue));
        keystream.push(...rangeArray);
        shiftValue += Number(shiftIncrement);
    }

    return keystream;
}