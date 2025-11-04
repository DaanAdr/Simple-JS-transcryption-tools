import { createUniqueCharacterSets } from "./CharacterSetHelper.js";
import { transcodeCharacter } from "./SubstitutionCipherHelper.js";

export function encodeText(text, plaintextCharacterSetString, cipherTextCharacterSetString) {
    const plaintextCharacterSets = createUniqueCharacterSets(plaintextCharacterSetString);
    const ciphertextCharacterSets = createUniqueCharacterSets(cipherTextCharacterSetString);
    const transcodedTextArray = [];

    for (const character of text) {
        const transcodedCharacter = transcodeCharacter(character, 
            plaintextCharacterSets, ciphertextCharacterSets);

        transcodedTextArray.push(transcodedCharacter);

        if(transcodedCharacter == character) {
            //Permute the character sets
        }
    }

    return transcodedTextArray.join('');
}

function permuteCharacterSets(characterSets, characterIndex) {
    characterSets.forEach(characterSet => {
        const nadir = characterSet.length / 2;

        //IMPORTANT: This might not work with multiple character sets
    });
}