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