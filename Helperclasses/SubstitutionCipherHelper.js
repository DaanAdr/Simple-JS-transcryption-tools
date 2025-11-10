/**
 * Transcode a text from a source character set to a target character set
 * 
 * @param {string} text The text to transcode
 * @param {array} sourceCharacterSets A nested array of the character set that the text is in
 * @param {array} targetCharacterSets A nested array of the character set 
 * that the text needs to be substituted to
 * @returns a string of the substituted text
 */
export function transcodeText(text, sourceCharacterSets, targetCharacterSets) {
    const transcodedTextArray = [];

    const characterMap = createMapForCharacterSets(sourceCharacterSets, targetCharacterSets);

    for (const character of text) {
        const transcodedCharacter = characterMap.get(character);

        if(transcodedCharacter == undefined) {
            transcodedTextArray.push(character);
        }
        else {
            transcodedTextArray.push(transcodedCharacter.target);
        }
    }

    return transcodedTextArray.join('');
}

export function transcodeCharacter(character, sourceCharacterSets, targetCharacterSets) {
    const characterMap = createMapForCharacterSets([sourceCharacterSets], [targetCharacterSets]);
    let isTranscoded = true;
    let index = NaN;

    let transcodedCharacter = characterMap.get(character);// || character;

    if(transcodedCharacter == undefined) {
        transcodedCharacter = character;
        isTranscoded = false;
    }
    else {
        index = transcodedCharacter.index;
        transcodedCharacter = transcodedCharacter.target;
    }

    return {transcodedCharacter, isTranscoded, index};
}

function createMapForCharacterSets(sourceCharacterSets, targetCharacterSets) {
    const charSetMap = new Map();

    //Loop through each nested char set
    sourceCharacterSets.forEach((nestedCharSet, rowIndex) => {
        //Loop through all character in the source set and map them to their target set counterpart

        nestedCharSet.forEach((character, index) => {

            //Check the casing of the character and see if the source char set contains the alt casing
            const isUpperCase = character == character.toUpperCase();

            const altCasedChar = isUpperCase ? character.toLowerCase() : character.toUpperCase();
            const altCasedCharExists = sourceCharacterSets.flat().includes(altCasedChar);

            if(!altCasedCharExists){
                charSetMap.set(character.toLowerCase(), {
                    target: targetCharacterSets[rowIndex][index].toLowerCase(),
                    index: index
                }); 
                    

                charSetMap.set(character.toUpperCase(), {
                    target: targetCharacterSets[rowIndex][index].toUpperCase(),
                    index: index
                });

                return;
            }

            charSetMap.set(character, {
                target: targetCharacterSets[rowIndex][index],
                index: index
            });
        });
    });

    return charSetMap;
}

//#region Transcode with seperator
/**
 * Encode a text from the plaintext character set to the ciphertext character set
 * 
 * @param {string} text A text to encode
 * @param {array} plaintextCharacterSet An array of the character set that the text is in
 * @param {array} ciphertextCharacterSet An array of the character set 
 * that the text needs to be substituted to
 * @param {char} seperator A character that is inserted between words in the substituted text
 * @param {boolean} isAlphabeticalRanks To indicate if the function is used for 
 * the Added Alphabetical Rank A1Z26 Cipher
 * @returns a string of the substituted text
 */
export function encodeTextWithSeperator(
    text, 
    plaintextCharacterSet, 
    ciphertextCharacterSet, 
    seperator="0", 
    isAlphabeticalRanks=false)
{
    const textArray = [...text];
    let encodedText = "";
    let previousValue = 0;

    textArray.forEach(character => {
        if(character == " "){
            encodedText += `${seperator} `;
            return;
        }

        const index = getCharacterIndex(character, plaintextCharacterSet);

        if(index > -1) {
            let encodedCharacter = ciphertextCharacterSet[index];

            if(isAlphabeticalRanks) {
                encodedCharacter = Number(encodedCharacter) + Number(previousValue);
                previousValue = encodedCharacter;
            }

            encodedText += encodedCharacter + " ";
            return;
        }

        encodedText += character;
    });

    return encodedText;
}

/**
 * Get the index of a character for the given character set. 
 * This also checks the alternate casing of the character
 * 
 * @param {char} character 
 * @param {array} characterSet 
 * @returns the numerical index of the character in the given character set or -1 if no index is found
 */
function getCharacterIndex(character, characterSet) {
    let index = characterSet.indexOf(character);

    if(index == -1) {
        const isUpperCase = character == character.toUpperCase();
        const altCasedChar = isUpperCase ? character.toLowerCase() : character.toUpperCase();

        index = characterSet.indexOf(altCasedChar);
    }

    return index;
}

/**
 * Decode a text from the ciphertext character set to the plaintext character set
 * 
 * @param {string} text A text to decode
 * @param {array} plaintextCharacterSet An array of the character set 
 * that the text needs to be substituted to
 * @param {array} ciphertextCharacterSet An array of the character set that the text is in
 * @param {char} seperator A character that is inserted between words in the input text
 * @param {boolean} isAlphabeticalRanks To indicate if the function is used for 
 * the Added Alphabetical Rank A1Z26 Cipher
 * @returns a string of the substituted text
 */
export function decodeTextWithSeperator(
    text, 
    plaintextCharacterSet, 
    ciphertextCharacterSet, 
    seperator="0", 
    isAlphabeticalRanks=false)
{
    let decodedText = "";
    const characters = text.split(' ');
    let previousValue = 0;

    characters.forEach(character => {
        if(character == seperator){
            decodedText += " ";
            return;
        }

        if(isAlphabeticalRanks) {
            character = character - previousValue;
            previousValue += Number(character);
        }

        const index = ciphertextCharacterSet.indexOf(character.toString());

        if(index > -1) {
            const plaintextCharacter = plaintextCharacterSet[index];
            decodedText += plaintextCharacter;
            return;
        }

        decodedText += character;
    });

    return decodedText;
}
//#endregion