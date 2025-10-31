const _placeholderCharacter = '_';

//#region Write grids
export function writeGridByRow(keyword, characters) {
    const rowLength = keyword.length;
    const textLength = characters.length;
    const additionalWhitespacesForGrid = rowLength - (textLength % rowLength);
    const grid = [];

    // Add whitespace to character array
    for(let i = 1; i <= additionalWhitespacesForGrid; i++) {
        characters.push(_placeholderCharacter);
    }

    // Create grid
    for(let i = 0; i < textLength; i += rowLength) {
        const row = characters.slice(i, i + rowLength);
        grid.push(row);
    }

    return grid;
}

//#endregion

//#region Organize grids
export function organizeGridByKeyword(keywordCharacters, grid) {
    const columnLength = grid.length;
    const organizedGrid = new Array(columnLength)
        .fill(null).map(() => new Array(keywordCharacters.length).fill(null));

    // Create an array of the letters in the keyword in ascending order
    const keywordAsc = keywordCharacters.map((character, index) => ({
        character: character,
        columnIndex: index
    }));
    keywordAsc.sort((a, b) => a.character.localeCompare(b.character));

    // Loop through columns in ascending order of keyword
    for(let i = 0; i < keywordAsc.length; i++) {
        // Loop through all rows in grid
        for(let j = 0; j < columnLength; j++) {
            const char = grid[j][keywordAsc[i].columnIndex];
            organizedGrid[j][i] = char;
        }
    }

    return organizedGrid
}
//#endregion

//#region Read from grids
export function readGridByColumn(grid) {
    const text = [];
    const rowLength = grid[0].length;

    // Loop through all columns
    for(let i = 0; i < rowLength; i++)
    {
        // Loop through all rows for column
        grid.forEach(row => {
            let character = row[i];

            if(character == _placeholderCharacter) {
                character = ' ';
            }

            text.push(character);
        });
    }

    return text.join('');
}
//#endregion