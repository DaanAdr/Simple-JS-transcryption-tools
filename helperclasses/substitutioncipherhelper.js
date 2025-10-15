export function transcodeText(text, sourceCharSet, targetCharSet)
{
    const transcodedTextArray = [];

    // Create a map for character mapping
    const charSetMap = new Map();
    
    // Fill the mapping for lower and upper case
    sourceCharSet.forEach((char, index) => {
        charSetMap.set(char, targetCharSet[index]);
        charSetMap.set(char.toLowerCase(), targetCharSet[index].toLowerCase());
        //charSetMap.set(char.toUpperCase(), targetCharSet[index].toUpperCase());
    });

    // Iterate through each character in the original text
    for (const character of text) {
        // Use the character map to transcode
        const transcodedCharacter = charSetMap.get(character) || character;
        transcodedTextArray.push(transcodedCharacter);
    }

    // Join the array into a single string for the final transcoded text
    return transcodedTextArray.join('');
}