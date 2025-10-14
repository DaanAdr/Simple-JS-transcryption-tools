import { makeCharacterSetUnique, createShiftedCharacterSet } from "../../helperclasses/charactersethelper.js";

const _sltShiftKey = document.getElementById("sltShiftKey");
const _txtCharSet = document.getElementById('txtCharSet');
const _txtPlaintext = document.getElementById("txtPlaintext");
const _txtCiphertext = document.getElementById("txtCiphertext");

let _plaintextCharacterSet = "";
let typingTimer;

_txtPlaintext.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        const ciphertextCharacterSet = createShiftedCharacterSet(_plaintextCharacterSet, _sltShiftKey.value);

        _txtCiphertext.value = transcodeText(_txtPlaintext.value, _plaintextCharacterSet, ciphertextCharacterSet);

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

function transcodeText(text, sourceCharSet, targetCharSet)
{
    const textArray = [...text];

    let transcodedText = "";

        // Transcode the text by looping through all chracters in it
        textArray.forEach(character => {
            // Check if the character is in the source character set
            if(sourceCharSet.includes(character)){

                // Get the character at the same index in the target character set
                const characterIndex = sourceCharSet.indexOf(character);
                let transcodedCharacter = targetCharSet[characterIndex];

                transcodedText += transcodedCharacter;
            }
            //Make character upper/lower case and check again
            else{
                //Invert the casing of the letter
                const isUppercase = character == character.toUpperCase();
                const char = isUppercase ? character.toLowerCase() : character.toUpperCase();

                if(sourceCharSet.includes(char)){
                    // Get the character at the same index in the target character set
                    const characterIndex = sourceCharSet.indexOf(char);
                    let transcodedCharacter = targetCharSet[characterIndex];

                    //Change the casing of the letter back
                    if(!isUppercase) transcodedCharacter = transcodedCharacter.toLowerCase();
                    transcodedText += transcodedCharacter;
                }
                else{
                    transcodedText += character;
                }
            }
        });

        return transcodedText;
}