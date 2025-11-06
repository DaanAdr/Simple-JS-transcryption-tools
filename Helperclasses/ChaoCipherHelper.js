import { createUniqueCharacterSet } from "./CharacterSetHelper.js";
import { transcodeCharacter } from "./SubstitutionCipherHelper.js";

export function encodeChaoText(text, plaintextCharacterSettring, ciphertextCharacterSettring) {
    let plaintextCharacterSet = createUniqueCharacterSet(plaintextCharacterSettring);
    let ciphertextCharacterSet = createUniqueCharacterSet(ciphertextCharacterSettring);
    const transcodedTextArray = [];
    const characters = [...text];

    characters.forEach((character) => {
        const {transcodedCharacter, isTranscoded, index} = transcodeCharacter(character, 
            plaintextCharacterSet, ciphertextCharacterSet);

        transcodedTextArray.push(transcodedCharacter);

        if(isTranscoded) {
            plaintextCharacterSet = permuteCharacterSet(plaintextCharacterSet, index + 1, false);
            ciphertextCharacterSet = permuteCharacterSet(ciphertextCharacterSet, index, true);
        }
    });

    return transcodedTextArray.join('');
}

function permuteCharacterSet(characterSet, characterIndex, isCiphertextCharacterSet) {
    const permutedCharacterSetEnd = characterSet.slice(0, characterIndex);
    const permutedCharacterSetStart = characterSet.slice(characterIndex);

    const permutedCharacterSet = [...permutedCharacterSetStart];
    permutedCharacterSet.push(...permutedCharacterSetEnd);

    const indexN = isCiphertextCharacterSet ? 1 : 2;
    const newNadirCharacter = permutedCharacterSet.splice(indexN, 1);
    const nadir = characterSet.length / 2;
    permutedCharacterSet.splice(nadir, 0, ...newNadirCharacter);

    return permutedCharacterSet;
}