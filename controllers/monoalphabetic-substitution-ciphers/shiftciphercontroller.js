import { makeCharacterSetUnique, createShiftedCharacterSet } from "../../helperclasses/charactersethelper.js";

const _sltShiftKey = document.getElementById("sltShiftKey");
const _txtCharSet = document.getElementById('txtCharSet');
const _txtPlaintext = document.getElementById("txtPlaintext");

let _plaintextCharacterSet = "";
let typingTimer;

_txtPlaintext.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        // Return encoded value
        //_txtEncoded.value = transcodeShift(_txtPlaintext.value, _sltShiftKey.value);
        const ciphertextCharacterSet = createShiftedCharacterSet(_plaintextCharacterSet, _sltShiftKey.value);
        console.log(ciphertextCharacterSet);

    }, 500); // 1000 milliseconds = 1 second
});

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

function encodePlaintext()
{
    // const ciphertextCharacterSet = 
}