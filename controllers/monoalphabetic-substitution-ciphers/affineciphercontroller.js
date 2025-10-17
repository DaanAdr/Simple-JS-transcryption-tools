import { createAffineCharacterSet, makeCharacterSetUnique, createUniqueNestedCharSet } from "../../helperclasses/charactersethelper.js";
import { transcodeText } from "../../helperclasses/substitutioncipherhelper.js";
import { getListOfCoprimes } from "../../helperclasses/mathalgorithmhelper.js";

const _txtCharSet = document.getElementById('txtCharSet');
const _sltAValue = document.getElementById("sltAValue");
const _sltBValue = document.getElementById("sltBValue");
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
    _plaintextCharacterSet = createUniqueNestedCharSet(charSetString);

    populateDropdowns();
    setCiphertextCharSet();
}

function setCiphertextCharSet()
{
    const aValue = _sltAValue.value;
    const bValue = _sltBValue.value;

    _ciphertextCharacterSet = createAffineCharacterSet(aValue, bValue, _plaintextCharacterSet);
}

_txtCharSet.addEventListener('keyup', () => {
    setPlaintextCharSet();
    populateDropdowns();
});
//#endregion

function populateDropdowns()
{
    //Empty dropdowns
    _sltAValue.length = 0;
    _sltBValue.length = 0;

    const charSetLength = Math.max(..._plaintextCharacterSet.map(row => row.length));
    const coprimeList = getListOfCoprimes(charSetLength);

    coprimeList.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        _sltAValue.appendChild(option);

        // Set the default value
        if (value === 5) option.selected = true; // Mark this option as selected
    });

    // Populate sltBValue
    for (let i = 0; i < charSetLength; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        _sltBValue.appendChild(option);

        // Set the default value
        if (i === 8) option.selected = true; // Mark this option as selected
    }
}
// #endregion

_sltAValue.addEventListener('change', () => {
    if(enteredPlaintext && !enteredCipherText){
        setCiphertextCharSet();
        encodeText();
    }
    else if(!enteredPlaintext && enteredCipherText){
        setCiphertextCharSet();
        decodeText()
    }

    setCiphertextCharSet();
});

_sltBValue.addEventListener('change', () => {
    if(enteredPlaintext && !enteredCipherText){
        setCiphertextCharSet();
        encodeText();
    }
    else if(!enteredPlaintext && enteredCipherText){
        setCiphertextCharSet();
        decodeText()
    }

    setCiphertextCharSet();
});