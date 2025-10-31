import { writeGridByRow, writeGridByColumn, 
    readGridByColumn, readGridByRow } from "../../Helperclasses/ColumnarCipherHelper.js";

const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");
const _inpColumns = document.getElementById('inpColumns');

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
    const characters = [..._txtPlaintext.value];
    const grid = writeGridByRow(_inpColumns.value, characters);
    const text = readGridByColumn(grid);

    _txtCiphertext.value = text;
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
    const characters = [..._txtCiphertext.value];
    const grid = writeGridByColumn(_inpColumns.value, characters);
    const text = readGridByRow(grid);

    _txtPlaintext.value = text;
}
//#endregion

//#region Handle settings changes
_inpColumns.addEventListener('change', () => {
    if(_enteredPlaintext && !_enteredCipherText){
        encodeText();
    }
    else if(!_enteredPlaintext && _enteredCipherText){
        decodeText()
    }
});
//#endregion
