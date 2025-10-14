import { makeCharacterSetUnique, createShiftedCharacterSet } from "../../helperclasses/charactersethelper.js";
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
    _plaintextCharacterSet = makeCharacterSetUnique(_txtCharSet.value);

    populateShiftDropdown();
}

_txtCharSet.addEventListener('keydown', () => {
    setCharSet();
})
//#endregion

function populateShiftDropdown()
{
    // Remove all options from sltShiftKey
    _sltShiftKey.length = 0;

    const charSetLength = _plaintextCharacterSet.length < 3 ? 25 : _plaintextCharacterSet.length;

    for(let i = 1; i < charSetLength; i++)
    {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        _sltShiftKey.appendChild(option);
    }
}

_sltShiftKey.addEventListener('change', () => {
    console.log("Change")
    if(enteredPlaintext && !enteredCipherText){
        console.log(" A")
        encodeText();
    }
    else if(!enteredPlaintext && enteredCipherText){
        console.log("B")
        decodeText()
    }
})