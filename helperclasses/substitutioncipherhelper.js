export function transcodeText(text, sourceCharSets, targetCharSets)
{
    const transcodedTextArray = [];

    const characterMap = createMapForCharacterSets(sourceCharSets, targetCharSets);

    //Iterate through each character in the original text
    for (const character of text) {
        // Use the character map to transcode
        const transcodedCharacter = characterMap.get(character) || character;
        transcodedTextArray.push(transcodedCharacter);
    }

    //Join the array into a single string for the final transcoded text
    return transcodedTextArray.join('');
}

function createMapForCharacterSets(sourceCharSets, targetCharSets)
{
    const charSetMap = new Map();

    //Loop through each nested char set
    sourceCharSets.forEach((nestedCharSet, rowIndex) => {
        //Loop through all character in the source set and map them to their target set counterpart

        nestedCharSet.forEach((character, index) => {

            //Check the casing of the character and see if the source char set contains the alt casing
            const isUpperCase = character == character.toUpperCase();

            const altCasedChar = isUpperCase ? character.toLowerCase() : character.toUpperCase();
            const altCasedCharExists = sourceCharSets.flat().includes(altCasedChar);

            if(!altCasedCharExists){
                charSetMap.set(character.toLowerCase(), targetCharSets[rowIndex][index].toLowerCase());
                charSetMap.set(character.toUpperCase(), targetCharSets[rowIndex][index].toUpperCase());

                return;
            }

            charSetMap.set(character, targetCharSets[rowIndex][index]);
        });
    });

    return charSetMap;
}