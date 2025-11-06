import { encodeChaoText } from "../../Helperclasses/ChaoCipherHelper.js";

const _txtPlaintextCharacterSet = document.getElementById('txtPlaintextCharacterSet');
const _txtCipherTextCharacterSet = document.getElementById('txtCipherTextCharacterSet');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

let _plaintextCharacterSetString;
let _ciphertextCharacterSetString;
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
    _txtCiphertext.value = encodeChaoText(
        _txtPlaintext.value, 
        _plaintextCharacterSetString, 
        _ciphertextCharacterSetString);
}
//#endregion

//#region Decode text
_txtCiphertext.addEventListener('keyup', () => {
    _enteredPlaintext = false;
    _enteredCipherText = true;
    decodeText();
});

// function decodeText()
// {
//     _txtPlaintext.value = transcodeText(
//         _txtCiphertext.value, 
//         _ciphertextCharacterSet, 
//         _plaintextCharacterSet);
// }
//#endregion

//#region set character sets
setPlaintextCharacterSet();

function setPlaintextCharacterSet()
{
    _plaintextCharacterSetString = _txtPlaintextCharacterSet.value;
    setCiphertextCharacterSet();
}

function setCiphertextCharacterSet()
{
    _ciphertextCharacterSetString = _txtCipherTextCharacterSet.value;
}
//#endregion

//#region Handle settings changes
// _txtCharSet.addEventListener('keyup', () => {
//     if(_enteredPlaintext && !_enteredCipherText){
//         encodeText();
//     }
//     else if(!_enteredPlaintext && _enteredCipherText){
//         decodeText()
//     }
// });
//#endregion
