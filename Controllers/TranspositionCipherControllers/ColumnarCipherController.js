import { writeGridByRow, writeGridByColumn, 
    organizeGridByKeyword, recreateOriginalGridByKeyword, 
    readGridByColumn } from "../../Helperclasses/ColumnarCipherHelper.js";

const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");
const _inpKeyword = document.getElementById('inpKeyword');
const _sltGridMode = document.getElementById('sltGridMode');

const _gridModes = {
    WRITEROWSREADCOLUMNS: "wrrc",
    WRITEROWSREADROWS: "wrrr",
    WRITECOLUMNSREADCOLUMNS: "wcrc",
    WRITECOLUMNSREADROWS: "wcrr"
};

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
    const gridMode = _sltGridMode.value;
    const keyword = _inpKeyword.value;
    const characters = [..._txtPlaintext.value];
    let grid = [];
    let text = '';

    switch(gridMode) {
        case _gridModes.WRITEROWSREADCOLUMNS:
            grid = writeGridByRow(keyword, characters);
            grid = organizeGridByKeyword(keyword, grid);
            text = readGridByColumn(grid);
            break;
        // case _gridModes.WRITEROWSREADROWS:
        //     grid = createGridByRow(text, rowLength);
        //     grid = organizeGridColumnsByKeyword(grid, keyword, rowLength);

        //     cipherText = readFromGridByRowInKeywordOrder(grid, keyword);
        //     break;
        // case _gridModes.WRITECOLUMNSREADCOLUMNS:
        //     grid = createGridByColumnForKeyword(text, rowLength, keyword);
        //     cipherText = readFromGridByColumn(grid, rowLength);
        //     break;
        // case _gridModes.WRITECOLUMNSREADROWS:
        //     grid = createGridByColumnForKeyword(text, rowLength, keyword);
        //     cipherText = readFromGridByRow(grid);
        //     break;
        
    }

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
    const gridMode = _sltGridMode.value;
    const keyword = _inpKeyword.value;
    const characters = [..._txtCiphertext.value];
    let grid = [];

    switch(gridMode) {
        case _gridModes.WRITEROWSREADCOLUMNS:
            grid = writeGridByColumn(keyword, characters);
            grid = recreateOriginalGridByKeyword(grid, keyword);
            break;
        // case _gridModes.WRITEROWSREADROWS:
        //     grid = createGridByRow(text, rowLength);
        //     grid = organizeGridColumnsByKeyword(grid, keyword, rowLength);

        //     cipherText = readFromGridByRowInKeywordOrder(grid, keyword);
        //     break;
        // case _gridModes.WRITECOLUMNSREADCOLUMNS:
        //     grid = createGridByColumnForKeyword(text, rowLength, keyword);
        //     cipherText = readFromGridByColumn(grid, rowLength);
        //     break;
        // case _gridModes.WRITECOLUMNSREADROWS:
        //     grid = createGridByColumnForKeyword(text, rowLength, keyword);
        //     cipherText = readFromGridByRow(grid);
        //     break;
        
    }

    //_txtPlaintext.value = //
}
//#endregion

//#region Handle settings changes
// _inpRails.addEventListener('change', () => {
//     if(_enteredPlaintext && !_enteredCipherText){
//         encodeText();
//     }
//     else if(!_enteredPlaintext && _enteredCipherText){
//         decodeText()
//     }
// });
//#endregion
