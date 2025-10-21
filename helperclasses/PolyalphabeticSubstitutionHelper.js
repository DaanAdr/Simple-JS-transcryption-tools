/**
 * Transcode a text using the vigenere cipher
 * 
 * @param {string} text The text that needs to be transcoded
 * @param {array} characterSets A nested array of the character set that the text is in
 * @param {string} keyword The keyword that is used for setting up the shift
 * @param {boolean} decodeText To indicate if a text needs to be decoded instead of encoded
 * @returns the transcoded text as a string
 */
export function transcodeVigenere(text, characterSets, keyword, decodeText=false) {
    const keyCharacters = [...new Set(keyword.split(''))];
    const keystream = createKeyStream(keyCharacters, text, characterSets);
    const textCharacters = [...text];
    let encodedText = "";
    let keystreamIndex = 0;

    textCharacters.forEach(character => {
        let characterIndex = undefined;
        let rowIndex = undefined;
        let isUpperCase = true;

        characterSets.forEach((characterSet, row) => {
            const index = characterSet.indexOf(character);

            if(index > -1) {
                characterIndex = index;
                rowIndex = row;
                return;
            }
        });

        if(characterIndex == undefined) {
            isUpperCase = character == character.toUpperCase();
            const altCasedCharacter = isUpperCase ? character.toLowerCase() : character.toUpperCase();

            characterSets.forEach((characterSet, row) => {
                const index = characterSet.indexOf(altCasedCharacter);

                if(index > -1) {
                    characterIndex = index;
                    rowIndex = row;
                    return;
                }
            });
        }

        if(characterIndex > -1) {
            const characterSetLength = characterSets[rowIndex].length;
            let indexTranscodedCharacter = decodeText ? (characterIndex - keystream[keystreamIndex]) % characterSetLength: (characterIndex + keystream[keystreamIndex]) % characterSetLength;
            indexTranscodedCharacter = indexTranscodedCharacter < 0 ? indexTranscodedCharacter += characterSetLength : indexTranscodedCharacter = indexTranscodedCharacter;
            
            keystreamIndex++;
            let transcodedCharacter = characterSets[rowIndex][indexTranscodedCharacter];
            transcodedCharacter = isUpperCase ? transcodedCharacter = transcodedCharacter : transcodedCharacter = transcodedCharacter.toLowerCase();
            
            character = transcodedCharacter;
        }

        encodedText += character;
    });
    
    return encodedText;
}

function createKeyStream(keyCharacters, text, characterSets) {
    const spacelessText = text.replace(/\s/g, '');
    const keystreamLength = spacelessText.length;
    const keyCharacterIndexes = [];
    const keystream = [];

    keyCharacters.forEach(character => {

        characterSets.forEach(characterSet => {
            const index = characterSet.indexOf(character);

            if(index > -1) {
                keyCharacterIndexes.push(index);
                return;
            }
        });
    });

    while(keystream.length < keystreamLength) {
        keystream.push(...keyCharacterIndexes);
    }

    return keystream;
}