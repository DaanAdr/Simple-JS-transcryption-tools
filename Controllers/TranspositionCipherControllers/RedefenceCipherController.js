import { createEmptyFence, populateFenceWithPlaintext, populateFenceWithMockData,
    organizeFenceRailsByKeyword, recreateOriginalFence,
    readFenceByRowsAsc, readFenceByColumnAsc, 
    populateFenceByRowsAsc} from "../../Helperclasses/FenceHelper.js";

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
    const characters = [..._txtCiphertext.value];
    const rails = _inpKeyword.value.length;
    const keyword = _inpKeyword.value;

    let fence = createEmptyFence(characters, 0, rails);
    fence = populateFenceWithMockData(fence, "TOP", rails, 0);
    fence = organizeFenceRailsByKeyword(fence, keyword);
    fence = populateFenceByRowsAsc(fence, characters);
    fence = recreateOriginalFence(fence, keyword);

    _txtPlaintext.value = readFenceByColumnAsc(fence);
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
