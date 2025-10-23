import { createKeywordCharacterSet, createUniqueCharacterSet } from "../../Helperclasses/CharacterSetHelper.js";
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

function encodeText()
{
    _txtCiphertext.value = transcodeText(_txtPlaintext.value, [_plaintextCharacterSet], [_ciphertextCharacterSet]);
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
    _txtPlaintext.value = transcodeText(_txtCiphertext.value, [_ciphertextCharacterSet], [_plaintextCharacterSet]);
}
//#endregion

//#region set character sets
setPlaintextCharSet();

function setPlaintextCharSet()
{
    const charSetString = _txtCharSet.value;
    
    _plaintextCharacterSet = createUniqueCharacterSet(charSetString);

    setCiphertextCharSet();
}

function setCiphertextCharSet()
{
    const keyword = _inpKeyword.value;
    const appendKeyword = _inpAppendKeyword.checked;

    let ciphertextCharacterSet = createKeywordCharacterSet(keyword, _plaintextCharacterSet, appendKeyword);

    _ciphertextCharacterSet = ciphertextCharacterSet;
}

_txtCharSet.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setPlaintextCharSet();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setPlaintextCharSet();
        decodeText()
    }
    
    setPlaintextCharSet();
});
//#endregion

_inpAppendKeyword.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setCiphertextCharSet();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setCiphertextCharSet();
        decodeText()
    }

    setCiphertextCharSet();
});

_inpKeyword.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setCiphertextCharSet();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setCiphertextCharSet();
        decodeText()
    }
});