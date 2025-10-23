const _cipherMode = {
    VIGENERE: `vg`,
    BEAUFORT: `bf`,
    AUTOKEY: `ak`,
};

/**
 * Transcode a text using the vigenere cipher
 * 
 * @param {string} text The text that needs to be transcoded.
 * @param {Array<Array<string>>} characterSets - A nested array of character sets.
 * @param {string} keyword The keyword that is used for setting up the shift.
 * @param {boolean} decodeText To indicate if a text needs to be decoded instead of encoded.
 * @returns {string} the transcoded text as a string.
 */
export function transcodeText(text, characterSets, keyword, cipherMode, decodeText=false) {
    let keystream = "";
    const textCharacters = [...text];
    let transcodedText = "";
    
    switch(cipherMode) {
        case _cipherMode.VIGENERE:
            keystream = createKeyStream(keyword, text.length, characterSets);
            transcodedText = transcodeVigenere(textCharacters, characterSets, keystream, decodeText);
            break;
        case _cipherMode.BEAUFORT:
            keystream = createKeyStream(keyword, text.length, characterSets);
            transcodedText = transcodeBeaufort(textCharacters, characterSets, keystream);
            break;
        case _cipherMode.AUTOKEY:
            keystream = createKeyStream(keyword, keyword.length, characterSets);
            transcodedText = transcodeAutokey(textCharacters, characterSets, keystream, decodeText);
            break;
    };

    return transcodedText;
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
function createKeyStream(keyword, keystreamLength, characterSets) {
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
function transcodeVigenere(textCharacters, characterSets, keystream, decodeText) {
    let encodedText = "";
    let keystreamIndex = 0;

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
function transcodeBeaufort(textCharacters, characterSets, keystream) {
    let encodedText = "";
    let keystreamIndex = 0;

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
function transcodeAutokey(textCharacters, characterSets, keystream, decodeText) {
    //TODO: Something it wrong with the keystream
    let encodedText = "";
    let keystreamIndex = 0;

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