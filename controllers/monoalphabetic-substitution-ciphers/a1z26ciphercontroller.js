import {createA1Z26CharacterSet, makeCharacterSetUnique } from "../../helperclasses/charactersethelper.js";
import { encodeTextWithSeperator, decodeTextWithSeperator } from "../../helperclasses/substitutioncipherhelper.js";

const _txtCharSet = document.getElementById('txtCharSet');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

let _plaintextCharacterSet = "";
let _ciphertextCharacterSet = "";
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

function encodeText()
{
    _txtCiphertext.value = encodeTextWithSeperator(_txtPlaintext.value, _plaintextCharacterSet, _ciphertextCharacterSet);
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

function decodeText()
{
    _txtPlaintext.value = decodeTextWithSeperator(_txtCiphertext.value, _plaintextCharacterSet, _ciphertextCharacterSet);
}
//#endregion

//#region set character sets
setCharacterSets();

function setCharacterSets()
{
    //Split at space
    let charSetString = _txtCharSet.value;
    charSetString = charSetString.replace(/\s/g, '');
    
    _plaintextCharacterSet = makeCharacterSetUnique(charSetString);
    _ciphertextCharacterSet = createA1Z26CharacterSet(_plaintextCharacterSet);
}

_txtCharSet.addEventListener('keyup', () => {
    if(enteredPlaintext && !enteredCipherText){
        setCharacterSets();
        encodeText();
    }
    else if(!enteredPlaintext && enteredCipherText){
        setCharacterSets();
        decodeText()
    }

    setCharacterSets();
});
//#endregion
