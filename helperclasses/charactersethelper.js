/**
 * Takes all the unique characters in characterSetString and returns them as a nested array
 * 
 * @param {string} characterSetString A string representing the plaintext character set
 * @returns a nested array of unique character sets
 */
export function createUniqueCharacterSets(characterSetString) {
    const characterSubSets = characterSetString.split(' ');
    const usedCharacters = new Set();

    const uniqueCharacterSubSets = characterSubSets.map(subStr => {
        const characterSubSet = subStr.split('');

        const uniqueCharacters = characterSubSet.filter(char => isUnique(char, usedCharacters));

        return uniqueCharacters;
    });

    return uniqueCharacterSubSets;
}

/**
 * Check if a character is unique
 * 
 * @param {char} char The character that needs to be checked
 * @param {Array} usedCharacters An array of character that aren't unique anymore
 * @returns true if the character doesn't appear in usedCharacters, false if it does appear
 */
function isUnique(char, usedCharacters) {
    if(!usedCharacters.has(char)) {
        usedCharacters.add(char);
        return true;
    }

    return false;
}

/**
 * Shift the characters in characterSets by n positions based on the given shift
 * 
 * @param {array} characterSets A nested array of character sets that need to be shifted
 * @param {number} shift The number of positions each character in the character sets have to shift
 * @returns a nested array of the character sets with the shift applied
 */
export function createShiftedCharacterSets(characterSets, shift)
{
    let shiftedCharacterSets = new Array(characterSets.length);

    characterSets.forEach((characterSubSet, rowIndex) => {
        shiftedCharacterSets[rowIndex] = new Array(characterSubSet.length);

        characterSubSet.forEach((character, index) => {
            const shiftedIndex = (Number(index) + Number(shift)) % Number(characterSubSet.length);
            shiftedCharacterSets[rowIndex][shiftedIndex] = character;
        });
    });

    return shiftedCharacterSets;
}

export function createKeywordCharacterSet(keyword, characterSetArray, keywordAtEnd=false)
{
    let uniqueKeyCharacters = [...new Set(keyword)];
    let charSetArray = [...characterSetArray];

    const filteredCharacterSet = charSetArray.filter(character => !uniqueKeyCharacters.includes(character));

    return keywordAtEnd
        ? filteredCharacterSet.concat(uniqueKeyCharacters)
        : uniqueKeyCharacters.concat(filteredCharacterSet);
}

export function createUniqueCharacterSet(characterSetString)
{
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

export function createAffineCharacterSet(aValue, bValue, characterSets)
{
    let cipherCharacterSets = new Array(characterSets.length);

    //Loop through each nested character set
    characterSets.forEach((characterSet, rowIndex) => {
        const subSetLength = Number(characterSet.length);
        cipherCharacterSets[rowIndex] = new Array(subSetLength);

        //Loop through each charater in the character set
        characterSet.forEach((character, index) => {
            const characterIndex = characterSet.indexOf(character);

            // Perform the formula (a * x + b) mod 26
            // In which x refers to the position of the character in the alphabet
            const cipherCharacterIndex = (Number(aValue) * Number(characterIndex) + Number(bValue)) % (subSetLength);

            //For manual decoding, if I didn't create a cipherAlphabet to perform simple substitutions
            // Perform (26 - a) * (y - b) mod 26
            // In which y refers to the position of the character in the alphabet
            
            // Get the character at the cipherIndex
            const cipherCharacter = characterSet[cipherCharacterIndex];

            cipherCharacterSets[rowIndex][index] = cipherCharacter;
        });
    });

    return cipherCharacterSets;
}

export function createAtbashCharacterSet(characterSets)
{
    let cipherCharacterSets = new Array(characterSets.length);

    //Loop through each nested character set
    characterSets.forEach((characterSet, rowIndex) => {
        let tmpCharSet = new Array(...characterSet);
        cipherCharacterSets[rowIndex] = tmpCharSet.reverse();
    });

    return cipherCharacterSets;
}

export function createA1Z26CharacterSet(characterSet, firstCharValue=1){
    const charSetLength = characterSet.length;
    let cipherCharacterSet = new Array(charSetLength);

    for(let i = 0; i < charSetLength; i++)
    {
        cipherCharacterSet[i] = (i + Number(firstCharValue)).toString();
    }

    return cipherCharacterSet;
}