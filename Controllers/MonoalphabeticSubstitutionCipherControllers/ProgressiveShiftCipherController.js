import { createKeystreamForRange } from "../../Helperclasses/KeyHelper.js";
import { createUniqueCharacterSets } from "../../Helperclasses/CharacterSetHelper.js";
import { transcodeVigenere, transcodeEveryWord } from "../../Helperclasses/PolyalphabeticSubstitutionHelper.js";

const _txtCharSet = document.getElementById('txtCharSet');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");
const _inpInitShiftValue = document.getElementById("inpInitShiftValue");
const _inpIncrementShiftValue = document.getElementById("inpIncrementShiftValue");
const _chbApplyIncrementAtN0 = document.getElementById("chbApplyIncrementAtN0");
const _inpCharRange = document.getElementById("inpCharRange");

const _changeOfShift = {
    EVERYCHARACTER: "char",
    EVERYWORD: "word",
    RANGEOFCHARACTERS: "charRange"
}

let _plaintextCharacterSet = "";
let _enteredPlaintext = false;
let _enteredCipherText = false;
let _decodeText = false;

//#region Transcode text
_txtPlaintext.addEventListener('keyup', () => {
    _enteredPlaintext = true;
    _enteredCipherText = false;
    _decodeText = false;

    transcodeText();
});

_txtCiphertext.addEventListener('keyup', () => {
    _enteredPlaintext = false;
    _enteredCipherText = true;
    _decodeText = true;

    transcodeText();
});

function transcodeText()
{
    let transcodedText = "";
    const shiftChangeOption = document.querySelector('input[name="shiftChangeOption"]:checked').value;
    const shiftIncrement = _inpIncrementShiftValue.value;
    const textCharacters = _decodeText ? [..._txtCiphertext.value] : [..._txtPlaintext.value];
    const keystreamLength = _decodeText ? _txtCiphertext.value.length : _txtPlaintext.value.length;
    let keystream = "";

    let initialShiftValue = _inpInitShiftValue.value;
    initialShiftValue = _chbApplyIncrementAtN0.checked ? 
        (Number(initialShiftValue) + Number(shiftIncrement)) : Number(initialShiftValue);

    switch(shiftChangeOption) {
        case _changeOfShift.EVERYCHARACTER:
            keystream = createKeystreamForRange(
                initialShiftValue, 
                shiftIncrement, 
                1,
                keystreamLength);

            transcodedText = transcodeVigenere(textCharacters, _plaintextCharacterSet, keystream, _decodeText);
            
            break;
        case _changeOfShift.EVERYWORD:
            const text = _decodeText ? _txtCiphertext.value : _txtPlaintext.value;

            transcodedText = transcodeEveryWord(
                text,
                _plaintextCharacterSet,
                initialShiftValue,
                shiftIncrement,
                _decodeText);
            
            break;
        case _changeOfShift.RANGEOFCHARACTERS:
            keystream = createKeystreamForRange(
                initialShiftValue,
                shiftIncrement,
                _inpCharRange.value,
                keystreamLength
            )

            transcodedText = transcodeVigenere(textCharacters, _plaintextCharacterSet, keystream, _decodeText);
            break;
    }

    if(_decodeText) {
        _txtPlaintext.value = transcodedText;
    }
    else {
        _txtCiphertext.value = transcodedText;
    }
}
//#endregion

//#region set character sets
setPlaintextCharacterSet();

function setPlaintextCharacterSet()
{
    const characterSetString = _txtCharSet.value;
    _plaintextCharacterSet = createUniqueCharacterSets(characterSetString);
}
//#endregion

//#region Handle settings changes
_txtCharSet.addEventListener('keyup', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        setPlaintextCharacterSet();
        transcodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setPlaintextCharacterSet();
        transcodeText()
    }
    
    setPlaintextCharacterSet();
});

_inpInitShiftValue.addEventListener('input', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        transcodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        transcodeText()
    }
});

_inpIncrementShiftValue.addEventListener('input', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        transcodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        transcodeText()
    }
});

_chbApplyIncrementAtN0.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        transcodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        transcodeText()
    }
});

document.querySelectorAll('input[name="shiftChangeOption"]').forEach(radio => {
    radio.addEventListener('change', () => {
        if(_enteredPlaintext && !_enteredCipherText){
            transcodeText();
        }
        else if(!_enteredPlaintext && _enteredCipherText){
            transcodeText()
        }
    });
});

_inpCharRange.addEventListener('input', () => {
    const shiftChangeOption = document.querySelector('input[name="shiftChangeOption"]:checked').value;

    if(shiftChangeOption == _changeOfShift.RANGEOFCHARACTERS) {
        if(_enteredPlaintext && !_enteredCipherText){
            transcodeText();
        }
        else if(!_enteredPlaintext && _enteredCipherText){
            transcodeText()
        }
    }
});
//#endregion