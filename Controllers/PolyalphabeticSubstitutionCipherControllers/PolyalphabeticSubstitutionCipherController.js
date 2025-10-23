import { createUniqueCharacterSets } from "../../Helperclasses/CharacterSetHelper.js";
import { transcodeText } from "../../Helperclasses/PolyalphabeticSubstitutionHelper.js";

const urlParams = new URLSearchParams(window.location.search);
const _mode = urlParams.get('mode');

const _txtCharSet = document.getElementById('txtCharSet');
const _inpKeyword = document.getElementById('inpKeyword');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

let _plaintextCharacterSet = "";
let _enteredPlaintext = false;
let _enteredCipherText = false;

function populateViewHeader() {
    let headerText = "";

    switch(_mode) {
        case 'vg':
            headerText = "Vigenere Cipher";
            break;
        case 'bf':
            headerText = "Beaufort Cipher";
            break;
        case 'ak':
            headerText = "Autokey Cipher";
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
    _txtCiphertext.value = transcodeText(_txtPlaintext.value, _plaintextCharacterSet, _inpKeyword.value, _mode);
}
//#endregion

//#region Decode text
_txtCiphertext.addEventListener('keyup', () => {
    _enteredPlaintext = false;
    _enteredCipherText = true;
    decodeText();
});

function decodeText() {
    _txtPlaintext.value = transcodeText(_txtCiphertext.value, _plaintextCharacterSet, _inpKeyword.value, _mode, true);
}
//#endregion

//#region set character sets
setPlaintextCharacterSets();

function setPlaintextCharacterSets() {
    const characterSetString = _txtCharSet.value;
    
    _plaintextCharacterSet = createUniqueCharacterSets(characterSetString);
}

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

_inpKeyword.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        decodeText()
    }
});