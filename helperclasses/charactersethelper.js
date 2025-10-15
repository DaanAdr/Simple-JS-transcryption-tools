export function createUniqueNestedCharSet(charSetString)
{
    const charSubSets = charSetString.split(' ');

    const usedChars = new Set();

    const uniqueCharArrays = charSubSets.map(str => {
        // Split the string into an array of characters
        const chars = str.split('');
        // Filter out characters that are already used
        const uniqueChars = chars.filter(char => {
            // Check if the character is already in the used set
            if (!usedChars.has(char)) {
                // If not, add it to the used set
                usedChars.add(char);
                return true; // Keep this character
            }
            return false; // Discard this character
        });
        return uniqueChars; // Return the unique character array for the current string
    });

    return uniqueCharArrays;
}

//#region Create shifted character set
export function createShiftedCharacterSet(characterSet, shift)
{
    //Check if the alphanumerical alphabet needs to be used
    if(characterSet.length < 3) {
        let shiftedCharSet = shiftCharacterSet([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"], shift);
        let numberSet = shiftAlphanumericCharSet(shift);

        shiftedCharSet.push(...numberSet);

        return shiftedCharSet;
    }

    return shiftCharacterSet(characterSet, shift);
}

function shiftCharacterSet(characterSet, shift)
{
    const shiftedCharSet = characterSet.slice(shift);
    const remainingChars = characterSet.slice(0, shift);
    shiftedCharSet.push(...remainingChars);

    return shiftedCharSet;
}

function shiftAlphanumericCharSet(shift)
{
    let shiftedNumbers = [];
    const numbers = [..."0123456789"];

    // Shift numbers using a modulo operation
    numbers.forEach(number => {
        const shiftedNumber = (Number(number) + Number(shift)) % 10;
        shiftedNumbers.push(String(shiftedNumber));
    });

    return shiftedNumbers;
}
//#endregion