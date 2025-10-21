import { createUniqueCharacterSets, createAtbashCharacterSet } from "../../helperclasses/charactersethelper.js";
import { transcodeText } from "../../helperclasses/substitutioncipherhelper.js";

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
    _txtCiphertext.value = transcodeText(_txtPlaintext.value, _plaintextCharacterSet, _ciphertextCharacterSet);
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
    _txtPlaintext.value = transcodeText(_txtCiphertext.value, _ciphertextCharacterSet, _plaintextCharacterSet);
}
//#endregion

//#region set character sets
setCharacterSets();

function setCharacterSets()
{
    //Split at space
    const charSetString = _txtCharSet.value;
    
    _plaintextCharacterSet = createUniqueCharacterSets(charSetString);
    _ciphertextCharacterSet = createAtbashCharacterSet(_plaintextCharacterSet);

    console.log(_plaintextCharacterSet);
    console.log(_ciphertextCharacterSet);
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
