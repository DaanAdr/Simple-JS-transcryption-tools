import { createKeywordCharacterSet, makeCharacterSetUnique } from "../../helperclasses/charactersethelper.js";

const _sltShiftKey = document.getElementById("sltShiftKey");
const _txtCharSet = document.getElementById('txtCharSet');
const _inpKeyword = document.getElementById('inpKeyword');
const _inpAppendKeyword = document.getElementById('inpAppendKeyword');

let _plaintextCharacterSet = "";
let _ciphertextCharacterSet = "";
let typingTimer;
let enteredPlaintext = false;
let enteredCipherText = false;

//#region set character sets
setPlaintextCharSet();

function setPlaintextCharSet()
{
    const charSetString = _txtCharSet.value;
    
    _plaintextCharacterSet = makeCharacterSetUnique(charSetString);

    populateShiftDropdown();

    setCiphertextCharSet();
}

function setCiphertextCharSet()
{
    const keyword = _inpKeyword.value;
    const appendKeyword = _inpAppendKeyword.checked;
    const shiftValue = _sltShiftKey.value;

    let ciphertextCharacterSet = createKeywordCharacterSet(keyword, _plaintextCharacterSet, appendKeyword);

    if(shiftValue > 0) ciphertextCharacterSet = createShiftedCharacterSet(ciphertextCharacterSet, shiftValue);

    _ciphertextCharacterSet = ciphertextCharacterSet;

    console.log('plaintext')
    console.log(_plaintextCharacterSet)
    console.log('ciphertext')
    console.log(_ciphertextCharacterSet)
}

_txtCharSet.addEventListener('keyup', () => {
    setPlaintextCharSet();
})
//#endregion

function populateShiftDropdown()
{
    // Remove all options from sltShiftKey
    _sltShiftKey.length = 0;

    const charSetLength = _plaintextCharacterSet.length;

    for(let i = 0; i < charSetLength; i++)
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
        //encodeText();
    }
    else if(!enteredPlaintext && enteredCipherText){
        setCiphertextCharSet();
        //decodeText()
    }
})

_inpAppendKeyword.addEventListener('change', () => {
    setPlaintextCharSet();
})