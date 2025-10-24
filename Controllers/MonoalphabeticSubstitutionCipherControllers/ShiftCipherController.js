import { createShiftedCharacterSets, createUniqueCharacterSets } 
    from "../../Helperclasses/CharacterSetHelper.js";
import { transcodeText } from "../../Helperclasses/SubstitutionCipherHelper.js";

const _sltShiftKey = document.getElementById("sltShiftKey");
const _txtCharSet = document.getElementById('txtCharSet');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

let _plaintextCharacterSet = "";
let _ciphertextCharacterSet = "";
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

function decodeText()
{
    _txtPlaintext.value = transcodeText(
        _txtCiphertext.value, 
        _ciphertextCharacterSet, 
        _plaintextCharacterSet);
}
//#endregion

//#region set character sets
setPlaintextCharacterSet();

function setPlaintextCharacterSet()
{
    const characterSetString = _txtCharSet.value;
    _plaintextCharacterSet = createUniqueCharacterSets(characterSetString);

    populateSelectElement();
    setCiphertextCharacterSet();
}

function setCiphertextCharacterSet()
{
    _ciphertextCharacterSet = createShiftedCharacterSets(_plaintextCharacterSet, _sltShiftKey.value);
}
//#endregion

function populateSelectElement()
{
    const previouslySelected = parseInt(_sltShiftKey.value);
    _sltShiftKey.length = 0;

    const charSetLength = Math.max(..._plaintextCharacterSet.map(row => row.length));

    for(let i = 1; i < charSetLength; i++)
    {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        _sltShiftKey.appendChild(option);

        if(previouslySelected != NaN && i === previouslySelected) {
            option.selected = true;
        }
    }
}

//#region Handle settings changes
_sltShiftKey.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setCiphertextCharacterSet();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setCiphertextCharacterSet();
        decodeText()
    }
});

_txtCharSet.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setPlaintextCharacterSet();
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setPlaintextCharacterSet();
        decodeText()
    }
    
    setPlaintextCharacterSet();
});
//#endregion
