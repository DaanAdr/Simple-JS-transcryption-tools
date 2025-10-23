import { createAffineCharacterSets, createUniqueCharacterSets } from "../../Helperclasses/CharacterSetHelper.js";
import { transcodeText } from "../../Helperclasses/SubstitutionCipherHelper.js";
import { getListOfCoprimes } from "../../Helperclasses/MathAlgorithmHelper.js";

const urlParams = new URLSearchParams(window.location.search);
const _mode = urlParams.get('mode');
const _cipherMode = {
    AFFINE: "ac",
    MULTIPLICATIVE: "mp",
};

const _txtCharSet = document.getElementById('txtCharSet');
const _sltAValue = document.getElementById("sltAValue");
const _sltBValue = document.getElementById("sltBValue");
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

let _plaintextCharacterSet = "";
let _ciphertextCharacterSet = "";
let _enteredPlaintext = false;
let _enteredCipherText = false;

function populateViewHeader() {
    let headerText = "";

    switch(_mode) {
        case _cipherMode.MULTIPLICATIVE:
            headerText = "Multiplicative Cipher";
            break;
        case _cipherMode.AFFINE:
            headerText = "Affine Cipher";
            break;
    };

    document.getElementById('header').innerHTML = headerText;
}

populateViewHeader();

//#region Encode text
_txtPlaintext.addEventListener('keyup', () => {
    _enteredPlaintext = true;
    _enteredCipherText = false;
    encodeText();
});

function encodeText()
{
    _txtCiphertext.value = transcodeText(_txtPlaintext.value, _plaintextCharacterSet, _ciphertextCharacterSet);
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
    _txtPlaintext.value = transcodeText(_txtCiphertext.value, _ciphertextCharacterSet, _plaintextCharacterSet);
}
//#endregion

//#region set character sets
setPlaintextCharSet();

function setPlaintextCharSet()
{
    const charSetString = _txtCharSet.value;
    _plaintextCharacterSet = createUniqueCharacterSets(charSetString);

    populateDropdowns();
    setCiphertextCharSet();
}

function setCiphertextCharSet()
{
    const aValue = _sltAValue.value;
    const bValue = _sltBValue.value;

    _ciphertextCharacterSet = createAffineCharacterSets(aValue, bValue, _plaintextCharacterSet);
}

_txtCharSet.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setPlaintextCharSet();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setPlaintextCharSet();
        decodeText()
    }

    setPlaintextCharSet();
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
        if (value === 5) option.selected = true;
    });

    // Populate sltBValue
    for (let i = 0; i < charSetLength; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        _sltBValue.appendChild(option);

        // Set the default value
        if (_mode == _cipherMode.MULTIPLICATIVE && i===0) {
            option.selected = true;
            _sltBValue.disabled = true;
        }
        else if (i === 8 && _mode == _cipherMode.AFFINE) option.selected = true; 
    }
}
// #endregion

_sltAValue.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setCiphertextCharSet();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setCiphertextCharSet();
        decodeText()
    }

    setCiphertextCharSet();
});

_sltBValue.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setCiphertextCharSet();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setCiphertextCharSet();
        decodeText()
    }

    setCiphertextCharSet();
});