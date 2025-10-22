import {createA1Z26CharacterSet, createUniqueCharacterSet } from "../../Helperclasses/CharacterSetHelper.js";
import { encodeTextWithSeperator, decodeTextWithSeperator } from "../../Helperclasses/SubstitutionCipherHelper.js";

const _txtCharSet = document.getElementById('txtCharSet');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");
const _inpSeperator = document.getElementById("inpSeperator");
const _inpFirstCharValue = document.getElementById("inpFirstCharValue");

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
    _txtCiphertext.value = encodeTextWithSeperator(_txtPlaintext.value, _plaintextCharacterSet, _ciphertextCharacterSet, _inpSeperator.value);
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
    _txtPlaintext.value = decodeTextWithSeperator(_txtCiphertext.value, _plaintextCharacterSet, _ciphertextCharacterSet, _inpSeperator.value);
}
//#endregion

//#region set character sets
setCharacterSets();

function setCharacterSets()
{
    let charSetString = _txtCharSet.value;
    _plaintextCharacterSet = createUniqueCharacterSet(charSetString);
    
    setCiphertextCharSet();
}

function setCiphertextCharSet(){
    _ciphertextCharacterSet = createA1Z26CharacterSet(_plaintextCharacterSet, _inpFirstCharValue.value);
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

_inpSeperator.addEventListener('keyup', () => {
    if(enteredPlaintext && !enteredCipherText){
        encodeText();
    }
    else if(!enteredPlaintext && enteredCipherText){
        decodeText()
    }
});

_inpFirstCharValue.addEventListener('keyup', () => {
    if(enteredPlaintext && !enteredCipherText){
        setCiphertextCharSet();
        encodeText();
    }
    else if(!enteredPlaintext && enteredCipherText){
        setCiphertextCharSet();
        decodeText()
    }
})