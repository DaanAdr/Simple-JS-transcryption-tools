import { createShiftedNestedCharacterSet, createUniqueNestedCharSet } from "../../helperclasses/charactersethelper.js";
import { transcodeText } from "../../helperclasses/substitutioncipherhelper.js";

const _sltShiftKey = document.getElementById("sltShiftKey");
const _txtCharSet = document.getElementById('txtCharSet');
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
    //Split at space
    const charSetString = _txtCharSet.value;
    
    _plaintextCharacterSet = createUniqueNestedCharSet(charSetString);

    populateShiftDropdown();

    setCiphertextCharSet();
}

function setCiphertextCharSet()
{
    _ciphertextCharacterSet = createShiftedNestedCharacterSet(_plaintextCharacterSet, _sltShiftKey.value);
}

_txtCharSet.addEventListener('keyup', () => {
    setPlaintextCharSet();
})
//#endregion

function populateShiftDropdown()
{
    // Remove all options from sltShiftKey
    _sltShiftKey.length = 0;

    const charSetLength = Math.max(..._plaintextCharacterSet.map(row => row.length));

    for(let i = 1; i < charSetLength; i++)
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
})
