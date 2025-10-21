import { createUniqueCharacterSets } from "../../helperclasses/charactersethelper.js";
import { createMapForCharacterSets } from "../../helperclasses/substitutioncipherhelper.js";

const _txtCharSet = document.getElementById('txtCharSet');
const _inpKeyword = document.getElementById('inpKeyword');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

let _plaintextCharacterSet = "";
let typingTimer;
let enteredPlaintext = false;
let enteredCipherText = false;

//#region Encode text
_txtPlaintext.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        
        enteredPlaintext = true;
        enteredCipherText = false;
        encodeText();

    }, 500); // 1000 milliseconds = 1 second
});

function encodeText() {
    _txtCiphertext.value = encodeVig(_txtPlaintext.value, _plaintextCharacterSet, _inpKeyword.value);
}
//#endregion

//#region Decode text
_txtCiphertext.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        
        enteredPlaintext = false;
        enteredCipherText = true;
        decodeText();

    }, 500); // 1000 milliseconds = 1 second
});

function decodeText() {
    _txtPlaintext.value = transcodeText(_txtCiphertext.value, _ciphertextCharacterSet, _plaintextCharacterSet);
}
//#endregion

//#region set character sets
setPlaintextCharacterSets();

function setPlaintextCharacterSets() {
    const characterSetString = _txtCharSet.value;
    
    _plaintextCharacterSet = createUniqueCharacterSets(characterSetString);
}

_txtCharSet.addEventListener('keyup', () => {
    if(enteredPlaintext && !enteredCipherText){
        setPlaintextCharacterSets();
        encodeText();
    }
    else if(!enteredPlaintext && enteredCipherText){
        setPlaintextCharacterSets();
        decodeText()
    }
    
    setPlaintextCharacterSets();
});
//#endregion

function encodeVig(text, characterSets, keyword) {
    const keyCharacters = [...new Set(keyword.split(''))];
    const keystream = createKeyStream(keyCharacters, text, characterSets);
    const textCharacters = [...text];
    let encodedText = "";
    let keystreamIndex = 0;

    textCharacters.forEach(character => {

        characterSets.forEach((characterSet) => {
            const characterSetIndex = characterSet.indexOf(character);

            if(characterSetIndex > -1) {
                const indexEncodedCharacter = (characterSetIndex + keystream[keystreamIndex]) % characterSet.length;
                keystreamIndex++;
                const encodedCharacter = characterSet[indexEncodedCharacter];
                character = encodedCharacter;
                
                return;
            }
        });

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