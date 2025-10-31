export function encodeRailFence(text, fenceStartingPoint, offset, rails) {
    const textArray = [...text];
    let fence = createEmptyFence(textArray, offset, rails);
    fence = populateFenceWithPlaintext(textArray, fence, fenceStartingPoint, rails);

    return readFenceByRowsAsc(fence);
}

export function decodeRailFence(text, fenceStartingPoint, offset, rails) {
    let textArray = [...text];
    let fence = new Array(Number(rails)).fill(null).map(() => new Array(Number(textArray.length) + Number(offset)).fill(null));

    fence = populateFenceWithMockData(fence, fenceStartingPoint, rails, offset);
    fence - populateFenceByRowsAsc(fence, textArray);
    
    return readFenceByColumnAsc(fence);
}

//region Create fence
export function createEmptyFence(textArray, offset, rails) {
    if(Number(offset) > 0)
    {
        const offsetArray = new Array(Number(offset)).fill(undefined);
        textArray.unshift(...offsetArray);
    }

    const fence = new Array(Number(rails))
        .fill(null).map(() => new Array(Number(textArray.length) + Number(offset)).fill(null));

    return fence;
}
//endregion

//#region Populate fence
export function populateFenceWithPlaintext(textArray, fence, fenceStartingPoint, rails) {
    let rowIndex = (fenceStartingPoint == "BOTTOM") ? Number(rails) - 1 : 0;
    let incrementRow = (fenceStartingPoint != "BOTTOM");
    
    // Add characters from text to fence
    textArray.forEach((character, index) => {
        fence[rowIndex][index] = character;

        // Update row index
        if (incrementRow) {
            rowIndex++;
            if (rowIndex === Number(rails)) {
                rowIndex = rails - 2;
                incrementRow = false;
            }
        } else {
            rowIndex--;
            if (rowIndex < 0) {
                rowIndex = 1;
                incrementRow = true;
            }
        }
    });
    
    return fence;
}

export function populateFenceWithMockData(fence, fenceStartingPoint, rails, offset) {
    let rowIndex = (fenceStartingPoint == "BOTTOM") ? Number(rails) - 1 : 0;
    let incrementRow = (fenceStartingPoint != "BOTTOM");

    const fenceLength = fence[0].length;

    let firstElement = true;
    let offsetCount = 1;

    // Populate the fence with mock data so the actual text can be added afterwards
    for(let i = 0; i < fenceLength; i++)
    {
        if(offset > 0 && firstElement && offsetCount <= offset)
        {
            fence[rowIndex][i] = undefined;
            firstElement = false;
            offsetCount++;
        }
        else
        {
            fence[rowIndex][i] = '_';
        }

        // Update row index
        if (incrementRow) {
            rowIndex++;
            if (rowIndex === Number(rails)) {
                rowIndex = Number(rails) - 2;
                incrementRow = false;
            }
            firstElement = true;
        } else {
            rowIndex--;
            if (rowIndex < 0) {
                rowIndex = 1;
                incrementRow = true;
            }
            firstElement = true;
        }
    }

    return fence;
}

export function populateFenceByRowsAsc(fence, textArray) {
    let textIndex = 0;

    // Loop through each row in cipherArray
    fence.forEach((row, rowIndex) => {

        // Loop through each element in row
        row.forEach((element, columnIndex) => {
            // Check if element is not null
            if(element != null && element != undefined)
            {
                fence[rowIndex][columnIndex] = textArray[textIndex];
                textIndex++;
            }
        });
    });

    return fence;
}
//#endregion

//#region Read Fence
export function readFenceByRowsAsc(fence) {
    const text = [];

    fence.forEach(row => {
        row.forEach(element => {
            if(element != null && element != undefined) {
                text.push(element);
            }
        });
    });

    return text.join('');
}

export function readFenceByColumnAsc(fence) {
    const fenceLength = fence[0].length;
    const text = [];

    // Loop through text length
    for(let i = 0; i < fenceLength; i++)
    {
        // Loop through each row in cipherArray
        fence.forEach((row) => {
            let element = row[i];

            // Check if element is not null
            if(element != null) text.push(element);
        });
    }

    return text.join('');
}
//#endregion

export function organizeFenceRailsByKeyword(fence, keyword) {
    const keywordAsc = getOrderedKeyword(keyword);

    const organizedGrid = new Array(keyword.length)
        .fill(null).map(() => new Array(fence[0].length).fill(null));

    // Loop through ordered keyword
    keywordAsc.forEach((keywordCharacter, index) => {
        organizedGrid[index] = fence[keywordCharacter.rowIndex];
    });

    return organizedGrid;
}

function getOrderedKeyword(keyword) {
    const keywordCharacters = [...keyword];

    const keywordAsc = keywordCharacters.map((character, index) => ({
        character: character,
        rowIndex: index
    }));
    keywordAsc.sort((a, b) => a.character.localeCompare(b.character));

    return keywordAsc;
}

export function recreateOriginalFence(fence, keyword) {
    const keywordAsc = getOrderedKeyword(keyword);

    const originalFence = new Array(keyword.length)
        .fill(null).map(() => new Array(fence[0].length).fill(null));

    // Loop through ordered keyword
    keywordAsc.forEach((keywordCharacter, index) => {
        //organizedGrid[index] = fence[keywordCharacter.rowIndex];
        originalFence[keywordCharacter.rowIndex] = fence[index];
    });

    return originalFence;
}