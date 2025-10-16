import { createKeywordCharacterSet, makeCharacterSetUnique, createShiftedCharacterSet } from "../../helperclasses/charactersethelper.js";
import { transcodeText } from "../../helperclasses/substitutioncipherhelper.js";

const _sltShiftKey = document.getElementById("sltShiftKey");
const _txtCharSet = document.getElementById('txtCharSet');
const _inpKeyword = document.getElementById('inpKeyword');
const _inpAppendKeyword = document.getElementById('inpAppendKeyword');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

let _plaintextCharacterSet = "";
let _ciphertextCharacterSet = "";
let typingTimer;
let enteredPlaintext = false;
let enteredCipherText = false;

//#region Encode text
_txtPlaintext.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        
        enteredPlaintext = true;
        enteredCipherText = false;
        encodeText();

    }, 500); // 1000 milliseconds = 1 second
});

function encodeText()
{
    _txtCiphertext.value = transcodeText(_txtPlaintext.value, _plaintextCharacterSet, _ciphertextCharacterSet);
}
//#endregion

//#region Decode text
_txtCiphertext.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        
        enteredPlaintext = false;
        enteredCipherText = true;
        decodeText();

    }, 500); // 1000 milliseconds = 1 second
});

function decodeText()
{
    _txtPlaintext.value = transcodeText(_txtCiphertext.value, _ciphertextCharacterSet, _plaintextCharacterSet);
}
//#endregion

//#region set character sets
setPlaintextCharSet();

function setPlaintextCharSet()
{
    const charSetString = _txtCharSet.value;
    
    _plaintextCharacterSet = makeCharacterSetUnique(charSetString);

    populateShiftDropdown();

    setCiphertextCharSet();
}

function setCiphertextCharSet()
{
    const keyword = _inpKeyword.value;
    const appendKeyword = _inpAppendKeyword.checked;
    const shiftValue = _sltShiftKey.value;

    let ciphertextCharacterSet = createKeywordCharacterSet(keyword, _plaintextCharacterSet, appendKeyword);

    if(shiftValue > 0) ciphertextCharacterSet = createShiftedCharacterSet(ciphertextCharacterSet, shiftValue);

    _ciphertextCharacterSet = ciphertextCharacterSet;
}

_txtCharSet.addEventListener('keyup', () => {
    setPlaintextCharSet();
});
//#endregion

function populateShiftDropdown()
{
    // Remove all options from sltShiftKey
    _sltShiftKey.length = 0;

    const charSetLength = _plaintextCharacterSet.length;

    for(let i = 0; i < charSetLength; i++)
    {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        _sltShiftKey.appendChild(option);
    }
}

_sltShiftKey.addEventListener('change', () => {
    if(enteredPlaintext && !enteredCipherText){
        setCiphertextCharSet();
        encodeText();
    }
    else if(!enteredPlaintext && enteredCipherText){
        setCiphertextCharSet();
        decodeText()
    }
});

_inpAppendKeyword.addEventListener('change', () => {
    if(enteredPlaintext && !enteredCipherText){
        setPlaintextCharSet();
        encodeText();
    }
    else if(!enteredPlaintext && enteredCipherText){
        setPlaintextCharSet();
        decodeText()
    }

    setPlaintextCharSet();
});