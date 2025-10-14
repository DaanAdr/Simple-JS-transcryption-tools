let _plaintextCharacterSet = "";

window.addEventListener("load", function() { 
    setCharSet();
});

function setCharSet()
{
    const selectedOption = document.querySelector('input[name="charSetOptions"]:checked');

    switch(selectedOption.value)
    {
        case "alphabet":
            _plaintextCharacterSet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
            break;

        case "numalpha":
            _plaintextCharacterSet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
            break;
        
        case "indienumalpha":
            _plaintextCharacterSet = [[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"],[..."0123456789"]];
            break;
        
        case "doublealphabet":
            _plaintextCharacterSet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"];
            break;
        
        case "customcharset":
            _plaintextCharacterSet = [...document.getElementById('txtCharSet').value];
            break;
    }

    console.log(_plaintextCharacterSet);
}