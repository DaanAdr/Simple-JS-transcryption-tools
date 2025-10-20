export function transcodeText(text, sourceCharSets, targetCharSets)
{
    const transcodedTextArray = [];

    const characterMap = createMapForCharacterSets(sourceCharSets, targetCharSets);

    //Iterate through each character in the original text
    for (const character of text) {
        // Use the character map to transcode
        const transcodedCharacter = characterMap.get(character) || character;
        transcodedTextArray.push(transcodedCharacter);
    }

    //Join the array into a single string for the final transcoded text
    return transcodedTextArray.join('');
}

function createMapForCharacterSets(sourceCharSets, targetCharSets)
{
    const charSetMap = new Map();

    //Loop through each nested char set
    sourceCharSets.forEach((nestedCharSet, rowIndex) => {
        //Loop through all character in the source set and map them to their target set counterpart

        nestedCharSet.forEach((character, index) => {

            //Check the casing of the character and see if the source char set contains the alt casing
            const isUpperCase = character == character.toUpperCase();

            const altCasedChar = isUpperCase ? character.toLowerCase() : character.toUpperCase();
            const altCasedCharExists = sourceCharSets.flat().includes(altCasedChar);

            if(!altCasedCharExists){
                charSetMap.set(character.toLowerCase(), targetCharSets[rowIndex][index].toLowerCase());
                charSetMap.set(character.toUpperCase(), targetCharSets[rowIndex][index].toUpperCase());

                return;
            }

            charSetMap.set(character, targetCharSets[rowIndex][index]);
        });
    });

    return charSetMap;
}

export function encodeTextWithSeperator(text, plaintextCharacterSet, ciphertextCharacterSet, seperator="0")
{
    const textArray = [...text];
    let encodedText = "";

    //TODO: change capitalisation if no character is found in the plaintext char set

    //Loop through all characters in text
    textArray.forEach(character => {
        if(character == " "){
            encodedText += `${seperator} `;
            return;
        }

        //Get plaintextCharacterSet index for character
        let index = plaintextCharacterSet.indexOf(character);

        //Alternate the character's casing if no index is found
        if(index == -1) {
            const isUpperCase = character == character.toUpperCase();
            const altCasedChar = isUpperCase ? character.toLowerCase() : character.toUpperCase();

            index = plaintextCharacterSet.indexOf(altCasedChar);
        }
        
        //Skip characters that aren't in the character set
        if(index == -1) return;

        //Get non-plaintext character at index and add a space between each letter
        const encodedCharacter = ciphertextCharacterSet[index];
        encodedText += encodedCharacter + " ";
    });

    return encodedText;
}

function decodeText(text, plaintextCharacterSet, ciphertextCharacterSet)
{
    let decodedText = "";

    // Split text at whitespace to get the individual characters
    let characters = text.split(' ');

    // Loop through each character in the text
    characters.forEach(character => {
        // Get ciphertextCharacterSet index for character
        const index = ciphertextCharacterSet.indexOf(character); // Retroactively add whitespace to characters as that is how they're written in the alphabets

        // Skip characters that aren't in the Alphabets
        if(index == -1) return;

        // Get the plaintext character at index
        const plaintextCharacter = plaintextCharacterSet[index];

        decodedText += plaintextCharacter;
    });

    return decodedText;
}