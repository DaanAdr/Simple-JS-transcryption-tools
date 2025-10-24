import { createKeywordCharacterSet, createUniqueCharacterSet, createAtbashCharacterSets } 
    from "../../Helperclasses/CharacterSetHelper.js";
import { transcodeText } from "../../Helperclasses/SubstitutionCipherHelper.js";

const _txtCharSet = document.getElementById('txtCharSet');
const _inpKeyword = document.getElementById('inpKeyword');
const _inpAppendKeyword = document.getElementById('inpAppendKeyword');
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

function encodeText() {
    _txtCiphertext.value = transcodeText(
        _txtPlaintext.value, 
        [_plaintextCharacterSet], 
        [_ciphertextCharacterSet]);
}
//#endregion

//#region Decode text
_txtCiphertext.addEventListener('keyup', () => {
    _enteredPlaintext = false;
    _enteredCipherText = true;
    decodeText();
});

function decodeText() {
    _txtPlaintext.value = transcodeText(
        _txtCiphertext.value, 
        [_ciphertextCharacterSet], 
        [_plaintextCharacterSet]);
}
//#endregion

//#region set character sets
setCharacterSets();

function setCharacterSets() {
    const plaintextCharacterSet = createUniqueCharacterSet(_txtCharSet.value);

    _plaintextCharacterSet = createKeywordCharacterSet(
        _inpKeyword.value, 
        plaintextCharacterSet, 
        _inpAppendKeyword.checked);

    const ciphertextCharacterSets = createAtbashCharacterSets([_plaintextCharacterSet]);
    _ciphertextCharacterSet = ciphertextCharacterSets[0];
}
//#endregion

//#region Handle settings changes
_inpAppendKeyword.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setCharacterSets();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setCharacterSets();
        decodeText()
    }

    setCiphertextCharacterSet();
});

_inpKeyword.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setCharacterSets();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setCharacterSets();
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