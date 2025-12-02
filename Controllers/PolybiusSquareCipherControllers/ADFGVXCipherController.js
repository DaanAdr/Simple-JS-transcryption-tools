import { writeGridByRow, writeGridByColumn, 
    organizeGridByKeyword, recreateOriginalGridByKeyword, 
    readGridByColumn, readGridByRow } from "../../Helperclasses/ColumnarCipherHelper.js";

const _substitutionGrid = document.getElementById('txtSubstitutionGrid');
const _inpKeyword = document.getElementById('inpKeyword');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

_substitutionGrid.value = "IJASVG\n3DB7HY\nT9L4C6\nRUMN80\nFKZ15X\nQEPOW2";
let _enteredPlaintext = false;
let _enteredCipherText = false;
let _decodeText = false;

//TODO: Might have to make this dynamic and allow for alternative grid headers
const _gridCoordinatesMap = new Map([
    ['A', 0],
    ['D', 1],
    ['F', 2],
    ['G', 3],
    ['V', 4],
    ['X', 5],
    [0, 'A'],
    [1, 'D'],
    [2, 'F'],
    [3, 'G'],
    [4, 'V'],
    [5, 'X']
]);

//#region Transcode text
_txtPlaintext.addEventListener('keyup', () => {
    encodeText();
});

function encodeText() {
    _enteredPlaintext = true;
    _enteredCipherText = false;
    _decodeText = false;

    let text = _txtPlaintext.value;
    text = text.toUpperCase();

    const characters = [...text.replace(/[^0-9A-Z]/gi, '')];
    const keyword = _inpKeyword.value;
    let adfgvxValues = "";

    const grid = _substitutionGrid.value;

    characters.forEach((character) => {
        //Search character in substitution grid
        const characterSetIndex = grid.indexOf(character);

        //Get grid coordinates
        const rowIndex = Math.floor(characterSetIndex / 7);
        const columnIndex = characterSetIndex % 7;

        //Map coordinates to ADFGX values
        const adfgvxValue = `${_gridCoordinatesMap.get(Number(rowIndex))}${_gridCoordinatesMap.get(Number(columnIndex))}`;
        console.log(adfgvxValue);

        adfgvxValues += adfgvxValue;
    });

    //Encode via transposition
    let transpositionGrid = writeGridByRow(keyword.length, [...adfgvxValues]);
    transpositionGrid = organizeGridByKeyword(keyword, transpositionGrid);
    const encodedText = readGridByColumn(transpositionGrid);

    //transcodeText();
    _txtCiphertext.value = encodedText;
}

_txtCiphertext.addEventListener('keyup', () => {
    decodeText();
});

function decodeText() {
    _enteredPlaintext = false;
    _enteredCipherText = true;
    _decodeText = true;

    let text = _txtCiphertext.value;
    text = text.toUpperCase();
    //const characters = [...text.replace(/[^0-9A-Z]/gi, '')];
    const characters = [...text];
    const keyword = _inpKeyword.value;

    //Spaces required in order for this to work
    let transpositionGrid = writeGridByColumn(keyword.length, characters);
    console.log(`decyphering`)
    console.log('transposition grid in asc key order')
    console.log(transpositionGrid);
    transpositionGrid = recreateOriginalGridByKeyword(transpositionGrid, keyword);
    console.log('recreated og grid')
    console.log(transpositionGrid)
    const adfgvxValues = readGridByRow(transpositionGrid);

    for(let i = 0; i < (adfgvxValues.length / 2); i += 2) {
        const rowIndex = _gridCoordinatesMap.get(adfgvxValues[i]);
        const columnIndex = _gridCoordinatesMap.get(adfgvxValues[i + 1]);

        console.log(`row: ${rowIndex}, column: ${columnIndex}`);


        //Calculate character set string index
        const tmp = Number(rowIndex) * 6;

        // const subArray = [firstCharacter, secondCharacter];
        // adfgvxPairs.push(subArray);
    }
}
//#endregion

//#region Handle settings changes
// _inpKeyword.addEventListener('keyup', () => {
//     if(_enteredPlaintext && !_enteredCipherText){
//         encodeText();
//     }
//     else if(!_enteredPlaintext && _enteredCipherText){
//         decodeText()
//     }
// });
//#endregion