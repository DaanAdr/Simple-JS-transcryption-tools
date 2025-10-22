import { createUniqueCharacterSets } from "../../helperclasses/charactersethelper.js";
import { transcodeVigenere } from "../../helperclasses/PolyalphabeticSubstitutionHelper.js";

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
    _txtCiphertext.value = transcodeVigenere(_txtPlaintext.value, _plaintextCharacterSet, _inpKeyword.value);
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
    _txtPlaintext.value = transcodeVigenere(_txtCiphertext.value, _plaintextCharacterSet, _inpKeyword.value, true);
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