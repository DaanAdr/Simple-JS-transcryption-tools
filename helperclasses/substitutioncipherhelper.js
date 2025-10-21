/**
 * Transcode a text from a source character set to a target character set
 * 
 * @param {string} text The text to transcode
 * @param {array} sourceCharacterSets A nested array of the character set that the text is in
 * @param {array} targetCharacterSets A nested array of the character set that the text needs to be substituted to
 * @returns a string of the substituted text
 */
export function transcodeText(text, sourceCharacterSets, targetCharacterSets)
{
    const transcodedTextArray = [];

    const characterMap = createMapForCharacterSets(sourceCharacterSets, targetCharacterSets);

    for (const character of text) {
        const transcodedCharacter = characterMap.get(character) || character;
        transcodedTextArray.push(transcodedCharacter);
    }

    return transcodedTextArray.join('');
}

function createMapForCharacterSets(sourceCharacterSets, targetCharacterSets)
{
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
                charSetMap.set(character.toLowerCase(), targetCharacterSets[rowIndex][index].toLowerCase());
                charSetMap.set(character.toUpperCase(), targetCharacterSets[rowIndex][index].toUpperCase());

                return;
            }

            charSetMap.set(character, targetCharacterSets[rowIndex][index]);
        });
    });

    return charSetMap;
}

/**
 * Encode a text from the plaintext character set to the ciphertext character set
 * 
 * @param {string} text A text to encode
 * @param {array} plaintextCharacterSet An array of the character set that the text is in
 * @param {array} ciphertextCharacterSet An array of the character set that the text needs to be substituted to
 * @param {char} seperator A character that is inserted between words in the substituted text
 * @returns a string of the substituted text
 */
export function encodeTextWithSeperator(text, plaintextCharacterSet, ciphertextCharacterSet, seperator="0")
{
    const textArray = [...text];
    let encodedText = "";

    textArray.forEach(character => {
        if(character == " "){
            encodedText += `${seperator} `;
            return;
        }

        const index = getCharacterIndex(character, plaintextCharacterSet);

        if(index > -1) {
            const encodedCharacter = ciphertextCharacterSet[index];
            encodedText += encodedCharacter + " ";
            return;
        }

        encodedText += character;
    });

    return encodedText;
}

/**
 * Get the index of a character for the given character set. This also checks the alternate casing of the character
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
 * @param {array} plaintextCharacterSet An array of the character set that the text needs to be substituted to
 * @param {array} ciphertextCharacterSet An array of the character set that the text is in
 * @param {char} seperator A character that is inserted between words in the input text
 * @returns a string of the substituted text
 */
export function decodeTextWithSeperator(text, plaintextCharacterSet, ciphertextCharacterSet, seperator="0")
{
    let decodedText = "";
    const characters = text.split(' ');

    characters.forEach(character => {
        if(character == seperator){
            decodedText += " ";
            return;
        }

        const index = ciphertextCharacterSet.indexOf(character);

        if(index > -1) {
            const plaintextCharacter = plaintextCharacterSet[index];
            decodedText += plaintextCharacter;
            return;
        }

        decodedText += character;
    });

    return decodedText;
}