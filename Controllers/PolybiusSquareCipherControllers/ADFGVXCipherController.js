const _substitutionGrid = document.getElementById('txtSubstitutionGrid');
const _inpKeyword = document.getElementById('inpKeyword');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

_substitutionGrid.value = "IJASVG\n3DB7HY\nT9L4C6\nRUMN80\nFKZ15X\nQEPOW2";
let _enteredPlaintext = false;
let _enteredCipherText = false;
let _decodeText = false;

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
        const tmp = grid.indexOf(character);
        console.log(tmp);

        const row = Math.floor(tmp / 7);
        const index = tmp % 7;

        console.log(`row: ${row}, index: ${index}`);
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