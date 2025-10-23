//#region Plaintext character set helpers
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
 * Takes all the unique characters in characterSetString and returns them as an array
 * 
 * @param {string} characterSetString A string representing the plaintext character set
 * @returns an array of unique character sets
 */
export function createUniqueCharacterSet(characterSetString) {
    characterSetString = characterSetString.replace(/\s/g, '');
    const charSetArray = [...characterSetString];
    return [...new Set(charSetArray)];
}

//#endregion

//#region Ciphertext character set helpers
/**
 * Shift the characters in characterSets by n positions based on the given shift
 * 
 * @param {array} characterSets A nested array of character sets that need to be shifted
 * @param {number} shift The number of positions each character in the character sets have to shift
 * @returns a nested array of the character sets with the shift applied
 */
export function createShiftedCharacterSets(characterSets, shift) {
    let shiftedCharacterSets = new Array(characterSets.length);

    characterSets.forEach((characterSubSet, rowIndex) => {
        shiftedCharacterSets[rowIndex] = new Array(characterSubSet.length);

        characterSubSet.forEach((character, index) => {
            const shiftedIndex = (Number(index) + Number(shift)) % Number(characterSubSet.length);
            const shiftedCharacter = characterSubSet[shiftedIndex];
            
            shiftedCharacterSets[rowIndex][index] = shiftedCharacter;
        });
    });

    return shiftedCharacterSets;
}

/**
 * Add a keyword to the characterSetArray
 * 
 * @param {string} keyword The keyword that needs to be used when creating the character set
 * @param {array} characterSetArray An array of character set that need to be modified
 * @param {boolean} keywordAtEnd A boolean to indicate if the letters in the keyword need to be added 
 * to the back of front of the character set
 * @returns an array of the keyword and the remaining letters in the characterSetArray
 */
export function createKeywordCharacterSet(keyword, characterSetArray, keywordAtEnd=false) {
    let keyCharacters = [...new Set(keyword)];
    const characterSet = new Array(...characterSetArray);

    const filteredCharacterSet = characterSet.filter(character => !keyCharacters.includes(character));

    return keywordAtEnd
        ? filteredCharacterSet.concat(keyCharacters)
        : keyCharacters.concat(filteredCharacterSet);
}

/**
 * Create character sets for the given character sets, using the affine algorithm
 * 
 * @param {number} aValue Value A for the affine algorithm
 * @param {number} bValue Value B for the affine algorithm
 * @param {array} characterSets A nested array of character sets that need to be rearranged using the 
 * affine algorithm
 * @returns a nested array of the character sets rearranged using the affine algorithm
 */
export function createAffineCharacterSets(aValue, bValue, characterSets) {
    let cipherCharacterSets = new Array(characterSets.length);

    characterSets.forEach((characterSet, rowIndex) => {
        const subSetLength = Number(characterSet.length);
        cipherCharacterSets[rowIndex] = new Array(subSetLength);

        characterSet.forEach((character, index) => {
            // Perform the formula (a * x + b) mod 26, 
            // in which x refers to the position of the character in the alphabet
            const cipherCharacterIndex = 
                (Number(aValue) * Number(index) + Number(bValue)) % (subSetLength);

            //For manual decoding, if I didn't create a cipherAlphabet to perform simple substitutions
            // Perform (26 - a) * (y - b) mod 26, 
            // in which y refers to the position of the character in the alphabet
            
            const cipherCharacter = characterSet[cipherCharacterIndex];
            cipherCharacterSets[rowIndex][index] = cipherCharacter;
        });
    });

    return cipherCharacterSets;
}

/**
 * Create a reserve character set for the given character sets
 * 
 * @param {array} characterSets A nested array of character sets that need to be reversed
 * @returns a nested array of the reversed character sets
 */
export function createAtbashCharacterSets(characterSets) {
    let cipherCharacterSets = new Array(characterSets.length);

    characterSets.forEach((characterSet, rowIndex) => {
        let tmpCharacterSet = new Array(...characterSet);
        cipherCharacterSets[rowIndex] = tmpCharacterSet.reverse();
    });

    return cipherCharacterSets;
}

/**
 * Create a character set in which each character is replaced by its index + the additionalValue
 * 
 * @param {array} characterSet An array of character set that need to be modified
 * @param {number} additionalValue An additional value each character gets on top of its index. 
 * Defaults to 1 so A=1, B=2 as is the standard in the A1Z26 cipher
 * @returns an array of numbers for each character in the character set
 */
export function createA1Z26CharacterSet(characterSet, additionalValue=1) {
    const characterSetLength = characterSet.length;
    let cipherCharacterSet = new Array(characterSetLength);

    for(let i = 0; i < characterSetLength; i++)
    {
        cipherCharacterSet[i] = (i + Number(additionalValue)).toString();
    }

    return cipherCharacterSet;
}

//#endregion