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

    populateShiftDropdown();
}

function populateShiftDropdown()
{
    const _sltShiftKey = document.getElementById("sltShiftKey");

    // Remove all options from sltShiftKey
    _sltShiftKey.length = 0;

    const charSetLength = _plaintextCharacterSet.length < 3 ? _plaintextCharacterSet[0].length : _plaintextCharacterSet.length;

    for(let i = 1; i < charSetLength; i++)
    {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        _sltShiftKey.appendChild(option);
    }
}

function customCharSetChanged()
{
    const selectedOption = document.querySelector('input[name="charSetOptions"]:checked');

    if(selectedOption.value === "customcharset")
    {
        _plaintextCharacterSet = [...document.getElementById('txtCharSet').value];

        populateShiftDropdown();
    }
}