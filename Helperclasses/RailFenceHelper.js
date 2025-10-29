export function encodeRailFence(text, fenceStartingPoint, offset, rails) {
    const textArray = [...text];
    let fence = createEmptyFence(textArray, offset, rails);
    fence = populateFenceWithPlaintext(textArray, fence, fenceStartingPoint, rails);

    return readFenceByRowsAsc(fence);
}

function createEmptyFence(textArray, offset, rails) {
    if(Number(offset) > 0)
    {
        const offsetArray = new Array(Number(offset)).fill(undefined);
        textArray.unshift(...offsetArray);
    }

    const fence = new Array(Number(rails))
        .fill(null).map(() => new Array(Number(textArray.length) + offset).fill(null));

    return fence;
}

function populateFenceWithPlaintext(textArray, fence, fenceStartingPoint, rails) {
    let rowIndex = (fenceStartingPoint == "BOTTOM") ? rails - 1 : 0;
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