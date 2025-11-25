import { getOrderedKeywordAsc } from "./KeyHelper.js";
const _placeholderCharacter = ' ';

//#region Write grids
/**
 * 
 * @param {Number} rowLength 
 * @param {array<char>} characters 
 * @returns 
 */
export function writeGridByRow(rowLength, characters) {
    const textLength = characters.length;
    const additionalWhitespacesForGrid = rowLength - (textLength % rowLength);
    const grid = [];

    // Add whitespace to character array
    for(let i = 1; i <= additionalWhitespacesForGrid; i++) {
        characters.push(_placeholderCharacter);
    }

    // Create grid
    for(let i = 0; i < textLength; i += Number(rowLength)) {
        const row = characters.slice(i, i + Number(rowLength));
        grid.push(row);
    }

    return grid;
}

export function writeGridByColumn(rowLength, characters) {
    const textLength = characters.length;
    const columnLength = Math.ceil(textLength / rowLength);
    const grid = new Array(columnLength).fill(null).map(() => new Array(rowLength).fill(null));

    let textArrayIndex = 0;

    // Loop through columns in ascending order of keyword
    for(let i = 0; i < rowLength; i++) {
        // Loop through all rows in grid
        for(let j = 0; j < columnLength; j++)
        {
            const character = characters[textArrayIndex];
            grid[j][i] = character;
            textArrayIndex++;
        }
    }

    return grid;
}
//#endregion

//#region Organize grids
export function organizeGridByKeyword(keyword, grid) {
    const columnLength = grid.length;
    const organizedGrid = new Array(columnLength)
        .fill(null).map(() => new Array(keyword.length).fill(null));

    const keywordAsc = getOrderedKeywordAsc(keyword);

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

export function recreateOriginalGridByKeyword(grid, keyword) {
    const keywordAsc = getOrderedKeywordAsc(keyword);
    const columnLength = grid.length;
    const rowLength = grid[0].length;
    const originalGrid = new Array(columnLength).fill(null).map(() => new Array(rowLength).fill(null));

    // Loop through all indexes for organised keyword
    for(let i = 0; i < keywordAsc.length; i++) {
        // Loop through all rows for organized grid
        grid.forEach((row, rowIndex) => {
            // Get character at index i
            const char = row[i];

            // Place character at columnIndex in original grid
            originalGrid[rowIndex][keywordAsc[i].columnIndex] = char;
        })
    }

    return originalGrid;
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

export function readGridByRow(grid) {
    const text = [];

    grid.forEach((row) => {
        text.push(...row);
    });

    return text.join('');
}
//#endregion