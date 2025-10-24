import { createAffineCharacterSets, createUniqueCharacterSets } 
    from "../../Helperclasses/CharacterSetHelper.js";
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
    document.title = headerText;
}

populateViewHeader();

//#region Encode text
_txtPlaintext.addEventListener('keyup', () => {
    _enteredPlaintext = true;
    _enteredCipherText = false;
    encodeText();
});

function encodeText() {
    _txtCiphertext.value = transcodeText(
        _txtPlaintext.value, 
        _plaintextCharacterSet, 
        _ciphertextCharacterSet);
}
//#endregion

//#region Decode text
_txtCiphertext.addEventListener('keyup', () => {
    _enteredPlaintext = false;
    _enteredCipherText = true;
    decodeText();
});

function decodeText() {
    _txtPlaintext.value = transcodeText(
        _txtCiphertext.value, 
        _ciphertextCharacterSet, 
        _plaintextCharacterSet);
}
//#endregion

//#region Set character sets
setPlaintextCharacterSets();

function setPlaintextCharacterSets() {
    const characterSetString = _txtCharSet.value;
    _plaintextCharacterSet = createUniqueCharacterSets(characterSetString);

    populateSelectElements();
    setCiphertextCharacterSets();
}

function setCiphertextCharacterSets() {
    const aValue = _sltAValue.value;
    const bValue = _sltBValue.value;

    _ciphertextCharacterSet = createAffineCharacterSets(aValue, bValue, _plaintextCharacterSet);
}
//#endregion

//#region Populate select elements
function populateSelectElements() {
    const characterSetLength = Math.max(..._plaintextCharacterSet.map(row => row.length));

    populateSelectForAValues(characterSetLength);
    populateSelectForBValues(characterSetLength);
}

function populateSelectForAValues(characterSetLength) {
    _sltAValue.length = 0;
    const coprimeList = getListOfCoprimes(characterSetLength);

    coprimeList.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        _sltAValue.appendChild(option);

        if (value === 5) {
            option.selected = true;
        }
    });
}

function populateSelectForBValues(characterSetLength) {
    _sltBValue.length = 0;

    for (let i = 0; i < characterSetLength; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        _sltBValue.appendChild(option);

        if (_mode == _cipherMode.MULTIPLICATIVE && i===0) {
            option.selected = true;
            _sltBValue.disabled = true;
        }
        else if (i === 8 && _mode == _cipherMode.AFFINE) {
            option.selected = true; 
        }
    }
}
// #endregion

//#region Handle settings changes
_sltAValue.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setCiphertextCharacterSets();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setCiphertextCharacterSets();
        decodeText()
    }

    setCiphertextCharacterSets();
});

_sltBValue.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setCiphertextCharacterSets();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setCiphertextCharacterSets();
        decodeText()
    }

    setCiphertextCharacterSets();
});

_txtCharSet.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setPlaintextCharacterSets();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setPlaintextCharacterSets();
        decodeText()
    }

    setPlaintextCharacterSets();
});
//#endregion