import { createShiftedCharacterSet, createUniqueNestedCharSet } from "../../helperclasses/charactersethelper.js";
import { transcodeText } from "../../helperclasses/substitutioncipherhelper.js";

const _sltShiftKey = document.getElementById("sltShiftKey");
const _txtCharSet = document.getElementById('txtCharSet');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

let _plaintextCharacterSet = "";
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
    const ciphertextCharacterSet = createShiftedCharacterSet(_plaintextCharacterSet, _sltShiftKey.value);

    console.log(_plaintextCharacterSet);
    console.log(ciphertextCharacterSet);

    _txtCiphertext.value = transcodeText(_txtPlaintext.value, _plaintextCharacterSet, ciphertextCharacterSet);
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
    const ciphertextCharacterSet = createShiftedCharacterSet(_plaintextCharacterSet, _sltShiftKey.value);

        _txtPlaintext.value = transcodeText(_txtCiphertext.value, ciphertextCharacterSet, _plaintextCharacterSet);
}
//#endregion

//#region set plaintext character set
setCharSet();

function setCharSet()
{
    //Split at space
    const charSetString = _txtCharSet.value;
    
    _plaintextCharacterSet = createUniqueNestedCharSet(charSetString);

    populateShiftDropdown();
}

_txtCharSet.addEventListener('keyup', () => {
    setCharSet();
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
        encodeText();
    }
    else if(!enteredPlaintext && enteredCipherText){
        decodeText()
    }
})



//TODO: Check if using map hinders using A-Za-z
//TODO: Use modulo operation to determine char sets