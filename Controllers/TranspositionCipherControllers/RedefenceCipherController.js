import { createEmptyFence, populateFenceWithPlaintext,
    organizeFenceRailsByKeyword,
    readFenceByRowsAsc } from "../../Helperclasses/RailFenceHelper.js";

const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");
const _inpKeyword = document.getElementById("inpKeyword");

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
    const characters = [..._txtPlaintext.value];
    const rails = _inpKeyword.value.length;

    let fence = createEmptyFence(characters, 0, rails);
    fence = populateFenceWithPlaintext(characters, fence, "TOP", rails);
    fence = organizeFenceRailsByKeyword(fence, _inpKeyword.value);
    _txtCiphertext.value = readFenceByRowsAsc(fence);
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
    _txtPlaintext.value = decodeRailFence(
        _txtCiphertext.value, 
        fenceStartingPoint, 
        _inpOffset.value,
        _inpRails.value);
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
//#endregion
