/**
 * Find the index of a character in the given character sets
 * 
 * @param {char} character The character for which the index needs to be found.
 * @param {Array<Array<string>>} characterSets - A nested array of character sets.
 * @returns {{ characterIndex: number, rowIndex: number, isUpperCase: boolean }} 
 * An object containing:
 * - characterIndex: The index of the character within its respective character set.
 * - rowIndex: The index of the character set in which the character was found.
 * - isUpperCase: A boolean indicating if the character is uppercase.
 */
function findCharacterIndex(character, characterSets) {
    let characterIndex = undefined;
    let isUpperCase = character == character.toUpperCase();
    let rowIndex = undefined;

    characterSets.forEach((characterSet, row) => {
        const index = characterSet.indexOf(character);

        if(index > -1) {
            characterIndex = index;
            rowIndex = row;
        }
    });

    if(characterIndex == undefined) {
        const altCasedCharacter = isUpperCase ? character.toLowerCase() : character.toUpperCase();

        characterSets.forEach((characterSet, row) => {
            const index = characterSet.indexOf(altCasedCharacter);

            if(index > -1) {
                characterIndex = index;
                rowIndex = row;
            }
        });
    }

    return {characterIndex, rowIndex, isUpperCase};
}

//#region Vigenere Cipher 
export function transcodeVigenere(text, characterSets, keystream, decodeText) {
    let encodedText = "";
    let keystreamIndex = 0;
    const textCharacters = [...text];

    textCharacters.forEach(character => {
        const { characterIndex, rowIndex, isUpperCase } = findCharacterIndex(character, characterSets);

        if(characterIndex != undefined) {
            const {transcodedCharacter, indexTranscodedCharacter} = 
                getShiftedCharacterForVigenereCipher(
                    characterIndex, 
                    characterSets[rowIndex], 
                    keystream[keystreamIndex], 
                    isUpperCase, 
                    decodeText);
                    
            keystreamIndex++;
            character = transcodedCharacter;
        }

        encodedText += character;
    });

    return encodedText;
}

/**
 * Performs a calculation to get the encoded/decoded character for characterIndex
 * 
 * @param {number} characterIndex The index of the character that needs to be shifted.
 * @param {Array<string>} characterSet The character set that the character is in.
 * @param {number} keystreamCharacter The value that character needs to be shifted by.
 * @param {boolean} isUpperCase Determines the casing of the shifted character.
 * @param {boolean} decodeText Indicates if the shift needs to be positive (Encoding) 
 * or negative (Decoding).
 * @returns {{transcodedCharacter, indexTranscodedCharacter}} the shifted character.
 */
function getShiftedCharacterForVigenereCipher(
    characterIndex, 
    characterSet, 
    keystreamCharacter, 
    isUpperCase, 
    decodeText) 
{
    const characterSetLength = characterSet.length;

    let indexTranscodedCharacter = decodeText ? 
        (characterIndex - keystreamCharacter) % characterSetLength : 
        (characterIndex + keystreamCharacter) % characterSetLength;

    indexTranscodedCharacter = indexTranscodedCharacter < 0 ? 
        indexTranscodedCharacter += characterSetLength : 
        indexTranscodedCharacter = indexTranscodedCharacter;

    let transcodedCharacter = characterSet[indexTranscodedCharacter];
    
    transcodedCharacter = isUpperCase ? 
        transcodedCharacter = transcodedCharacter : 
        transcodedCharacter = transcodedCharacter.toLowerCase();
    
    return {transcodedCharacter, indexTranscodedCharacter};
}

//#endregion

//#region Beaufort Cipher 
export function transcodeBeaufort(text, characterSets, keystream) {
    let encodedText = "";
    let keystreamIndex = 0;
    const textCharacters = [...text];

    textCharacters.forEach(character => {
        const { characterIndex, rowIndex, isUpperCase } = findCharacterIndex(character, characterSets);

        if(characterIndex != undefined) {
            character = getShiftedCharacterForBeaufortCipher(characterIndex, characterSets[rowIndex], keystream[keystreamIndex], isUpperCase);
            keystreamIndex++;
        }

        encodedText += character;
    });

    return encodedText;
}

/**
 * Performs a calculation to get the encoded/decoded character for characterIndex
 * 
 * @param {number} characterIndex The index of the character that needs to be shifted.
 * @param {Array<string>} characterSet The character set that the character is in.
 * @param {number} keystreamCharacter The value that character needs to be shifted by.
 * @param {boolean} isUpperCase Determines the casing of the shifted character.
 * @returns {char} the shifted character.
 */
function getShiftedCharacterForBeaufortCipher(characterIndex, characterSet, keystreamCharacter, isUpperCase) {
    const characterSetLength = characterSet.length;
          
    let indexTranscodedCharacter = (keystreamCharacter - characterIndex + characterSetLength) % characterSetLength;
    indexTranscodedCharacter = indexTranscodedCharacter < 0 ? indexTranscodedCharacter += characterSetLength : indexTranscodedCharacter = indexTranscodedCharacter;
    
    let transcodedCharacter = characterSet[indexTranscodedCharacter];
    transcodedCharacter = isUpperCase ? transcodedCharacter = transcodedCharacter : transcodedCharacter = transcodedCharacter.toLowerCase();
    
    return transcodedCharacter;
}

//#endregion

//#region Autokey Cipher
export function transcodeAutokey(text, characterSets, keystream, decodeText) {
    let encodedText = "";
    let keystreamIndex = 0;
    const textCharacters = [...text];

    textCharacters.forEach(character => {
        const { characterIndex, rowIndex, isUpperCase } = findCharacterIndex(character, characterSets);

        if(!decodeText && characterIndex > -1) {
            keystream.push(characterIndex);
        }

        if(characterIndex != undefined) {
            const { transcodedCharacter, indexTranscodedCharacter } = 
                getShiftedCharacterForVigenereCipher(
                    characterIndex, 
                    characterSets[rowIndex], 
                    keystream[keystreamIndex], 
                    isUpperCase, 
                    decodeText);

            character = transcodedCharacter;

            if(decodeText) {
                keystream.push(indexTranscodedCharacter);
            }
            
            keystreamIndex++;
        }

        encodedText += character;
    });

    return encodedText;
}

//#endregion

//#region Progressive Shift Cipher
export function transcodeEveryWord(text, characterSet, initialShiftValue, shiftIncrement, decodeText) {
    const words = text.split(' ');
    let shiftValue = Number(initialShiftValue);
    const encodedWords = [];

    words.forEach((word) => {
        const keystream = new Array(word.length).fill(Number(shiftValue));

        //Encode
        const encodedWord = transcodeVigenere([...word], characterSet, keystream, decodeText);
        encodedWords.push(encodedWord);

        shiftValue += Number(shiftIncrement);
    });

    return encodedWords.join(' ');
}
//#endregion