import { createAffineCharacterSet, makeCharacterSetUnique } from "../../helperclasses/charactersethelper.js";

const _txtCharSet = document.getElementById('txtCharSet');
const _sltAValue = document.getElementById("sltAValue");
const _sltBValue = document.getElementById("sltBValue");
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

const _affineAValues = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
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
    //_txtCiphertext.value = transcodeText(_txtPlaintext.value, _plaintextCharacterSet, _ciphertextCharacterSet);
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
    //_txtPlaintext.value = transcodeText(_txtCiphertext.value, _ciphertextCharacterSet, _plaintextCharacterSet);
}
//#endregion

// #region Populate selects
// Populate sltAValue
_affineAValues.forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    _sltAValue.appendChild(option);

    // Set the default value
    if (value === 5) option.selected = true; // Mark this option as selected
});

// Populate sltBValue
for (let i = 0; i <= 25; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    _sltBValue.appendChild(option);

    // Set the default value
    if (i === 8) option.selected = true; // Mark this option as selected
}
// #endregion

//#region set character sets
setPlaintextCharSet();

function setPlaintextCharSet()
{
    const charSetString = _txtCharSet.value;
    
    _plaintextCharacterSet = makeCharacterSetUnique(charSetString);
    console.log(_plaintextCharacterSet);

    setCiphertextCharSet();
}

function setCiphertextCharSet()
{
    const aValue = _sltAValue.value;
    const bValue = _sltBValue.value;

    _ciphertextCharacterSet = createAffineCharacterSet(aValue, bValue, _plaintextCharacterSet);

    
    console.log(_ciphertextCharacterSet);
}

_txtCharSet.addEventListener('keyup', () => {
    setPlaintextCharSet();
});
//#endregion

