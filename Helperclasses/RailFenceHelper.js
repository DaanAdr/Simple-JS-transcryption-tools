export function encodeRailFence(text, fenceStartingPoint, offset, rails) {
    const textArray = [...text];
    let fence = createEmptyFence(textArray, offset, rails);
    fence = populateFenceWithPlaintext(textArray, fence, fenceStartingPoint, rails);

    return readFenceByRowsAsc(fence);
}

export function decodeRailFence(text, fenceStartingPoint, offset, rails) {
    console.clear();

    let textArray = [...text];
    let fence = createEmptyFence(textArray, offset, rails);

    console.log("Created fence for text");
    console.log(JSON.parse(JSON.stringify(fence)));  

    fence = populateFenceWithMockData(fence, fenceStartingPoint, rails, offset);

    fence - populateFenceByRowsAsc(fence, textArray);
    
    return readFenceByColumnAsc(fence);
}

//region Create fence
function createEmptyFence(textArray, offset, rails) {
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
function populateFenceWithPlaintext(textArray, fence, fenceStartingPoint, rails) {
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

    console.log("Created fence with markings for text");
    console.log(JSON.parse(JSON.stringify(fence)));
    
    return fence;
}

function populateFenceWithMockData(fence, fenceStartingPoint, rails, offset) {
    //TODO: Fix issue with offset
    const tmpFence = fence;
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
            tmpFence[rowIndex][i] = undefined;
            firstElement = false;
            offsetCount++;
        }
        else
        {
            tmpFence[rowIndex][i] = '_';
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

    console.log("Created fence with markings for text");
    console.log(JSON.parse(JSON.stringify(tmpFence)));   // Makes a copy of the current state of the array for display

    return tmpFence;
}

function populateFenceByRowsAsc(fence, textArray) {
    let textIndex = 0;
    console.log(textArray);

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

    console.log("Filled fence with text");
    console.log(JSON.parse(JSON.stringify(fence))); 
    return fence;
}
//#endregion

//#region Read Fence
function readFenceByRowsAsc(fence) {
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

function readFenceByColumnAsc(fence) {
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
