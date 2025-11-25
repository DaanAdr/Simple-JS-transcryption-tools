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
    // ['A', 0],
    // ['D', 1],
    // ['F', 2],
    // ['G', 3],
    // ['V', 4],
    // ['X', 5]
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

    const text = _txtPlaintext.value;
    const characters = [...text.replace(/[^0-9A-Z]/gi, '')];

    console.log(characters);

    const grid = _substitutionGrid.value;

    characters.forEach((character) => {
        //Search character in substitution grid
        const characterSetIndex = grid.indexOf(character); //TODO:Make character alt case
        console.log(`${character}: ${characterSetIndex}`);

        //Get grid coordinates
        const rowIndex = Math.floor(characterSetIndex / 7);
        const columnIndex = characterSetIndex % 7;

        console.log(`rowIndex: ${rowIndex}, columnIndex: ${columnIndex}`);

        //Map coordinates to ADFGX values
        const adfgvxValue = `${_gridCoordinatesMap.get(Number(rowIndex))}${_gridCoordinatesMap.get(Number(columnIndex))}`;
        console.log(adfgvxValue);
    });

    //transcodeText();
}

_txtCiphertext.addEventListener('keyup', () => {
    decodeText();
});

function decodeText() {
    _enteredPlaintext = false;
    _enteredCipherText = true;
    _decodeText = true;

    //transcodeText();
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