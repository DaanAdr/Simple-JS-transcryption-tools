import { createUniqueCharacterSets, createAtbashCharacterSets } from "../../Helperclasses/CharacterSetHelper.js";
import { transcodeText } from "../../Helperclasses/SubstitutionCipherHelper.js";

const _txtCharSet = document.getElementById('txtCharSet');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

let _plaintextCharacterSet = "";
let _ciphertextCharacterSet = "";
let _enteredPlaintext = false;
let _enteredCipherText = false;

//#region Encode text
_txtPlaintext.addEventListener('keyup', () => {
    _enteredPlaintext = true;
    _enteredCipherText = false;
    encodeText();
});

function encodeText()
{
    _txtCiphertext.value = transcodeText(_txtPlaintext.value, _plaintextCharacterSet, _ciphertextCharacterSet);
}
//#endregion

//#region Decode text
_txtCiphertext.addEventListener('keyup', () => {
    _enteredPlaintext = false;
    _enteredCipherText = true;
    decodeText();
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
    _ciphertextCharacterSet = createAtbashCharacterSets(_plaintextCharacterSet);
}

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
