import { createEmptyFence, populateFenceWithPlaintext, populateFenceWithMockData, populateFenceByRowsAsc, 
    readFenceByRowsAsc, readFenceByColumnAsc } from "../../Helperclasses/FenceHelper.js";

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
    const textArray = [..._txtPlaintext.value];
    const rails = _inpRails.value;
    const offset = _inpOffset.value;

    let fence = createEmptyFence(textArray, offset, rails);
    fence = populateFenceWithPlaintext(textArray, fence, fenceStartingPoint, rails);

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
    const fenceStartingPoint = document.querySelector('input[name="FenceStartingPoint"]:checked').value;
    const offset = _inpOffset.value;
    const rails = _inpRails.value;
    let textArray = [..._txtCiphertext.value];
    let fence = new Array(Number(rails)).fill(null).map(() => new Array(Number(textArray.length) + Number(offset)).fill(null));

    fence = populateFenceWithMockData(fence, fenceStartingPoint, rails, offset);
    fence - populateFenceByRowsAsc(fence, textArray);
    
    _txtPlaintext.value = readFenceByColumnAsc(fence);
}
//#endregion

//#region Handle settings changes
_inpRails.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        decodeText()
    }
});

_inpOffset.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        decodeText()
    }
});

document.querySelectorAll('input[name="FenceStartingPoint"]').forEach(radio => {
    radio.addEventListener('change', () => {
        if(_enteredPlaintext && !_enteredCipherText){
            encodeText();
        }
        else if(!_enteredPlaintext && _enteredCipherText){
            decodeText();
        }
    });
});
//#endregion
