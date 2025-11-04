const _txtPlaintextCharacterSet = document.getElementById('txtPlaintextCharacterSet');
const _txtCipherTextCharacterSet = document.getElementById('txtCipherTextCharacterSet');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

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
    _txtCiphertext.value = transcodeText(
        _txtPlaintext.value, 
        _plaintextCharacterSet, 
        _ciphertextCharacterSet);
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
    _txtPlaintext.value = transcodeText(
        _txtCiphertext.value, 
        _ciphertextCharacterSet, 
        _plaintextCharacterSet);
}
//#endregion

//#region set character sets
setPlaintextCharacterSet();

function setPlaintextCharacterSet()
{
    const characterSetString = _txtCharSet.value;
    _plaintextCharacterSet = createUniqueCharacterSets(characterSetString);

    populateSelectElement();
    setCiphertextCharacterSet();
}

function setCiphertextCharacterSet()
{
    _ciphertextCharacterSet = createShiftedCharacterSets(_plaintextCharacterSet, _sltShiftKey.value);
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
