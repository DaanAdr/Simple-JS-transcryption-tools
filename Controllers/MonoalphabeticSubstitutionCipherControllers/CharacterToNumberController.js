import {createA1Z26CharacterSet, createUniqueCharacterSet } from "../../Helperclasses/CharacterSetHelper.js";
import { encodeTextWithSeperator, decodeTextWithSeperator } from "../../Helperclasses/SubstitutionCipherHelper.js";

const urlParams = new URLSearchParams(window.location.search);
const _mode = urlParams.get('mode');
const _cipherMode = {
    A1Z26: 'az',
    ALHABETICALRANKS: 'ar',
};

const _txtCharSet = document.getElementById('txtCharSet');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");
const _inpSeperator = document.getElementById("inpSeperator");
const _inpFirstCharValue = document.getElementById("inpFirstCharValue");

let _plaintextCharacterSet = "";
let _ciphertextCharacterSet = "";
let _enteredPlaintext = false;
let _enteredCipherText = false;
let _isAlphabeticalRanks = false;

function populateViewHeader() {
    let headerText = "";

    switch(_mode) {
        case _cipherMode.A1Z26:
            headerText = "A1Z26 Cipher";
            break;
        case _cipherMode.ALHABETICALRANKS:
            headerText = "Added Alphabetical Rank A1Z26 Cipher";
            _isAlphabeticalRanks = true;
            break;
    };

    document.getElementById('header').innerHTML = headerText;
}
populateViewHeader();

//#region Encode text
_txtPlaintext.addEventListener('keyup', () => {
    _enteredPlaintext = true;
    _enteredCipherText = false;
    encodeText();
});

function encodeText() {
    _txtCiphertext.value = encodeTextWithSeperator(
        _txtPlaintext.value, _plaintextCharacterSet, 
        _ciphertextCharacterSet, 
        _inpSeperator.value, 
        _isAlphabeticalRanks);
}
//#endregion

//#region Decode text
_txtCiphertext.addEventListener('keyup', () => {
    _enteredPlaintext = false;
    _enteredCipherText = true;
    decodeText();
});

function decodeText() {
    _txtPlaintext.value = decodeTextWithSeperator(
        _txtCiphertext.value, 
        _plaintextCharacterSet, 
        _ciphertextCharacterSet, 
        _inpSeperator.value, 
        _isAlphabeticalRanks);
}
//#endregion

//#region Character sets
setCharacterSets();

function setCharacterSets() {
    let charSetString = _txtCharSet.value;
    _plaintextCharacterSet = createUniqueCharacterSet(charSetString);
    
    setCiphertextCharacterSet();
}

function setCiphertextCharacterSet() {
    _ciphertextCharacterSet = createA1Z26CharacterSet(_plaintextCharacterSet, _inpFirstCharValue.value);
}
//#endregion

//#region Handle setting changes
_inpSeperator.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        decodeText()
    }
});

_inpFirstCharValue.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setCiphertextCharacterSet();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setCiphertextCharacterSet();
        decodeText()
    }
});

_txtCharSet.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setCharacterSets();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setCharacterSets();
        decodeText()
    }

    setCharacterSets();
});
//#endregion