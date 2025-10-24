import { createProgressiveKeystream, createKeystreamForRange } from "../../Helperclasses/KeystreamHelper.js";
import { createUniqueCharacterSets } from "../../Helperclasses/CharacterSetHelper.js";
import { transcodeVigenere } from "../../Helperclasses/PolyalphabeticSubstitutionHelper.js";

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

//#region Encode text
_txtPlaintext.addEventListener('keyup', () => {
    _enteredPlaintext = true;
    _enteredCipherText = false;
    _decodeText = false;

    encodeText();
});

function encodeText()
{
    let encodedText = "";
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
            keystream = createProgressiveKeystream(
                initialShiftValue, 
                shiftIncrement, 
                keystreamLength);

            encodedText = transcodeVigenere(textCharacters, _plaintextCharacterSet, keystream, _decodeText);
            
            break;
        case _changeOfShift.EVERYWORD:
            const text = _decodeText ? _txtCiphertext.value : _txtPlaintext.value;

            encodedText = encodeEveryWord(
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

            encodedText = transcodeVigenere(textCharacters, _plaintextCharacterSet, keystream, _decodeText);
            break;
    }

    if(_decodeText) {
        _txtPlaintext.value = encodedText;
    }
    else {
        _txtCiphertext.value = encodedText;
    }
}
//#endregion

_txtCiphertext.addEventListener('keyup', () => {
    _enteredPlaintext = false;
    _enteredCipherText = true;
    _decodeText = true;

    encodeText();
});

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
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        setPlaintextCharacterSet();
        decodeText()
    }
    
    setPlaintextCharacterSet();
});

_inpInitShiftValue.addEventListener('input', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        decodeText()
    }
});

_inpIncrementShiftValue.addEventListener('input', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        decodeText()
    }
});

_chbApplyIncrementAtN0.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        decodeText()
    }
});
//#endregion

function encodeEveryWord(text, characterSet, initialShiftValue, shiftIncrement, decodeText) {
    const words = text.split(' ');
    let shiftValue = Number(initialShiftValue);
    const encodedWords = [];

    words.forEach((word) => {
        const keystream = new Array(word.length).fill(Number(shiftValue));

        //Encode
        const encodedWord = transcodeVigenere([...word], characterSet, keystream, decodeText);
        encodedWords.push(encodedWord);

        shiftValue += Number(shiftIncrement);
    });

    return encodedWords.join(' ');
}