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

/**
 * Create a list of the indexes for each character in the keyword, 
 * and repeat said list for a given length
 * 
 * @param {string} keyword The keyword for which all indexes need to be used to create the keystream.
 * @param {number} keystreamLength The length the keystream should be. 
 * Normally the length of the text that needs to be transcoded.
 * @param {Array<Array<string>>} characterSets - A nested array of character sets.
 * @returns {Array<number>} an array of indexes that are to be used as shift values.
 */
export function createKeyStreamForKeyword(keyword, keystreamLength, characterSets) {
    const keyCharacters = [...new Set(keyword.split(''))];
    const keyCharacterIndexes = [];
    const keystream = [];

    if(keyword.length < 1) {
        return [];
    }

    keyCharacters.forEach(character => {
        let characterFound = false;

        characterSets.forEach(characterSet => {
            const index = characterSet.indexOf(character);

            if(index > -1) {
                keyCharacterIndexes.push(index);
                characterFound = true;
                return;
            }
        });

        if(!characterFound) {
            const isUpperCase = character == character.toUpperCase();
            const altCasedCharacter = isUpperCase ? character.toLowerCase() : character.toUpperCase();

            characterSets.forEach(characterSet => {
                const index = characterSet.indexOf(altCasedCharacter);

                if(index > -1) {
                    keyCharacterIndexes.push(index);
                    return;
                }
            });
        }
    });

    if(keyCharacterIndexes.length < 1) {
        alert("Keyword character not in the character sets");
    }

    while(keystream.length < keystreamLength) {
        keystream.push(...keyCharacterIndexes);
    }

    return keystream;
}