// export function makeCharacterSetUnique(characterSet)
// {
//     return [...new Set([...characterSet])];
// }

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