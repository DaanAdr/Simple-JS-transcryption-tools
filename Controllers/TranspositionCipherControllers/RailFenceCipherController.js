import { encodeRailFence, decodeRailFence } from "../../Helperclasses/RailFenceHelper.js";

const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");
const _inpOffset = document.getElementById("inpOffset");
const _inpRails = document.getElementById("inpRails");

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
    const fenceStartingPoint = document.querySelector('input[name="FenceStartingPoint"]:checked').value;

    _txtCiphertext.value = encodeRailFence(
        _txtPlaintext.value, 
        fenceStartingPoint, 
        _inpOffset.value,
        _inpRails.value);
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
    const fenceStartingPoint = document.querySelector('input[name="FenceStartingPoint"]:checked').value;

    _txtPlaintext.value = decodeRailFence(
        _txtCiphertext.value, 
        fenceStartingPoint, 
        _inpOffset.value,
        _inpRails.value);
}
//#endregion

//#region Handle settings changes


// _txtCharSet.addEventListener('keyup', () => {
//     if(_enteredPlaintext && !_enteredCipherText){
//         setPlaintextCharacterSet();
//         encodeText();
//     }
//     else if(!_enteredPlaintext && _enteredCipherText){
//         setPlaintextCharacterSet();
//         decodeText()
//     }
    
//     setPlaintextCharacterSet();
// });
//#endregion
