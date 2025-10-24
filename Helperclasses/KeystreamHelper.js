/**
 * Create a keystream in which the shift value gets repeated for a range of characters
 * 
 * @param {Number} initialShiftValue The shift value the keystream needs to start with.
 * @param {Number} shiftIncrement The number the shift value is increased by 
 * when it has been repeated enough times.
 * @param {Number} shiftRepeats The number of times a shift value is repeated. 
 * @param {Number} keystreamLength The length the keystream needs to be.
 * @returns {Array<Number>} The created keystream.
 */
export function createKeystreamForRange(
    initialShiftValue, 
    shiftIncrement, 
    shiftRepeats, 
    keystreamLength) 
{
    const keystream = [];
    let shiftValue = Number(initialShiftValue);

    while(keystream.length < keystreamLength) {
        const rangeArray = new Array(Number(shiftRepeats)).fill(Number(shiftValue));
        keystream.push(...rangeArray);
        shiftValue += Number(shiftIncrement);
    }

    return keystream;
}