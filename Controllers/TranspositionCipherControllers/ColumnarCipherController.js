import { writeGridByRow, organizeGridByKeyword } from "../../Helperclasses/ColumnarCipherHelper.js";

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

    switch(gridMode) {
        case _gridModes.WRITEROWSREADCOLUMNS:
            grid = writeGridByRow(keyword, characters);
            grid = organizeGridByKeyword([...keyword], grid);

            // cipherText = readFromGridByColumn(grid, rowLength);
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
}
//#endregion

//#region Decode text
// _txtCiphertext.addEventListener('keyup', () => {
//     _enteredPlaintext = false;
//     _enteredCipherText = true;
//     decodeText();
// });

// function decodeText()
// {
//     const fenceStartingPoint = document.querySelector('input[name="FenceStartingPoint"]:checked').value;

//     _txtPlaintext.value = decodeRailFence(
//         _txtCiphertext.value, 
//         fenceStartingPoint, 
//         _inpOffset.value,
//         _inpRails.value);
// }
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
