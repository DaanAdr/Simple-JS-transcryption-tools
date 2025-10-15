//#region Nested character sets
export function createUniqueNestedCharSet(charSetString)
{
    const charSubSets = charSetString.split(' ');

    const usedChars = new Set();

    const uniqueCharArrays = charSubSets.map(str => {
        // Split the string into an array of characters
        const chars = str.split('');
        // Filter out characters that are already used
        const uniqueChars = chars.filter(char => {
            // Check if the character is already in the used set
            if (!usedChars.has(char)) {
                // If not, add it to the used set
                usedChars.add(char);
                return true; // Keep this character
            }
            return false; // Discard this character
        });
        return uniqueChars; // Return the unique character array for the current string
    });

    return uniqueCharArrays;
}

export function createShiftedNestedCharacterSet(characterSet, shift)
{
    let shiftedCharSet = new Array(characterSet.length);

    //Loop through each nested charSet
    characterSet.forEach((nestedCharSet, rowIndex) => {
        shiftedCharSet[rowIndex] = new Array(nestedCharSet.length);

        //Loop through each character in nested charSet
        nestedCharSet.forEach((character, index) => {
            //Apply shift
            const shiftedIndex = (Number(index) + Number(shift)) % Number(nestedCharSet.length);

            const shiftedCharacter = nestedCharSet[shiftedIndex];
            shiftedCharSet[rowIndex][index] = shiftedCharacter;
        });
    });

    return shiftedCharSet;
}
//#endregion

export function createKeywordCharacterSet(keyword, characterSetArray, keywordAtEnd=false)
{
    let uniqueKeyCharacters = [...new Set(keyword)];
    let charSetArray = [...characterSetArray];

    const filteredCharacterSet = charSetArray.filter(character => !uniqueKeyCharacters.includes(character));

    uniqueKeyCharacters.forEach(character => {
        // Remove character from alphabet to modify
        let indexOfCharacterToRemove = charSetArray.indexOf(character);
        charSetArray.splice(indexOfCharacterToRemove, 1);
    });

    return keywordAtEnd
        ? filteredCharacterSet.concat(uniqueKeyCharacters)
        : uniqueKeyCharacters.concat(filteredCharacterSet);
}

export function makeCharacterSetUnique(characterSetString)
{
    characterSetString = characterSetString.toUpperCase();
    const charSetArray = [...characterSetString];
    return [...new Set(charSetArray)];
}

export function createShiftedCharacterSet(characterSet, shift)
{
    let shiftedCharSet = new Array(characterSet.length);

    characterSet.forEach((character, index) => {
        //Apply shift
        const shiftedIndex = (Number(index) + Number(shift)) % Number(characterSet.length);
        const shiftedCharacter = characterSet[shiftedIndex];
        shiftedCharSet[index] = shiftedCharacter;
    });

    return shiftedCharSet;
}