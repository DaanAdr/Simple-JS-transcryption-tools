const _txtCharSet = document.getElementById('txtCharSet');
const _charSetOptions = document.getElementsByName('charSetOptions');
let _plaintextCharacterSet = "";

//TODO: trigger setCharSet on page load

function setCharSet()
{
    const selectedOption = document.querySelector('input[name="charSetOptions"]:checked');

    switch(selectedOption.value)
    {
        case "alphabet":
            _plaintextCharacterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;

        case "numalpha":
            _plaintextCharacterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
        
        case "indienumalpha":
            _plaintextCharacterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
        
        case "doublealphabet":
            _plaintextCharacterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            break;
        
        case "customcharset":
            //TODO: _txtCharSet is null
            _plaintextCharacterSet = _txtCharSet.value;
            break;
    }

    console.log(_plaintextCharacterSet);
}