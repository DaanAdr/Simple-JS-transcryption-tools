import { createUniqueCharacterSets } from "../../Helperclasses/CharacterSetHelper.js";
import { transcodeVigenere, transcodeBeaufort, transcodeAutokey } 
    from "../../Helperclasses/PolyalphabeticSubstitutionHelper.js";
import { createKeyStreamForKeyword } from "../../Helperclasses/KeystreamHelper.js";

const urlParams = new URLSearchParams(window.location.search);
const _mode = urlParams.get('mode');
const _cipherMode = {
    VIGENERE: `vg`,
    BEAUFORT: `bf`,
    AUTOKEY: `ak`,
};

const _txtCharSet = document.getElementById('txtCharSet');
const _inpKeyword = document.getElementById('inpKeyword');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

let _plaintextCharacterSet = "";
let _enteredPlaintext = false;
let _enteredCipherText = false;
let _decodeText = false;

function populateViewHeader() {
    let headerText = "";

    switch(_mode) {
        case _cipherMode.VIGENERE:
            headerText = "Vigenère Cipher";
            break;
        case _cipherMode.BEAUFORT:
            headerText = "Beaufort Cipher";
            break;
        case _cipherMode.AUTOKEY:
            headerText = "Autokey Cipher";
            break;
    };

    document.getElementById('header').innerHTML = headerText;
    document.title = headerText;
}

populateViewHeader();

//#region Transcode text
_txtPlaintext.addEventListener('keyup', () => {
    _enteredPlaintext = true;
    _enteredCipherText = false;
    _decodeText = false;

    transcodeText();
});

_txtCiphertext.addEventListener('keyup', () => {
    _enteredPlaintext = false;
    _enteredCipherText = true;
    _decodeText = true;

    transcodeText();
});

function transcodeText() {
    let keystream = "";
    const text = _decodeText ? _txtCiphertext.value : _txtPlaintext.value;
    let transcodedText = "";

    switch(_mode) {
        case _cipherMode.VIGENERE:
            keystream = createKeyStreamForKeyword(
                _inpKeyword.value, 
                text.length, 
                _plaintextCharacterSet);
            
            transcodedText = transcodeVigenere(
                text, 
                _plaintextCharacterSet, 
                keystream, 
                _decodeText);

            break;
        case _cipherMode.BEAUFORT:
            keystream = createKeyStreamForKeyword(
                _inpKeyword.value, 
                text.length, 
                _plaintextCharacterSet);
            
            transcodedText = transcodeBeaufort(
                text,
                _plaintextCharacterSet,
                keystream);

            break;
        case _cipherMode.AUTOKEY:
            const keyword = _inpKeyword.value;
            keystream = createKeyStreamForKeyword(
                keyword, 
                keyword.length, 
                _plaintextCharacterSet);
            
            transcodedText = transcodeAutokey(
                text,
                _plaintextCharacterSet,
                keystream,
                _decodeText);

            break;
    };

    if(_decodeText) {
        _txtPlaintext.value = transcodedText;
    } 
    else {
        _txtCiphertext.value = transcodedText;
    }
}
//#endregion

//#region Set character sets
setPlaintextCharacterSets();

function setPlaintextCharacterSets() {
    const characterSetString = _txtCharSet.value;
    _plaintextCharacterSet = createUniqueCharacterSets(characterSetString);
}
//#endregion

//#region Handle settings changes
_inpKeyword.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        decodeText()
    }
});

_txtCharSet.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setPlaintextCharacterSets();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setPlaintextCharacterSets();
        decodeText()
    }
    
    setPlaintextCharacterSets();
});
//#endregion