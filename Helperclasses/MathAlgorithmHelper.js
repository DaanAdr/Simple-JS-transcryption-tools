/**
 * Calculate the Greatest Common Divider using the Euclidean Algorithm
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function CalculateGreatestCommonDivider(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

/**
 * Get a list of all (positive) coprimes for the given number n
 * 
 * @param {number} n The number to get all the coprimes for
 * @returns an array of all coprimes for the given number
 */
export function getListOfCoprimes(n) {
    const coprimeList = [];
    
    for (let i = 1; i < n; i++) { 
        if (CalculateGreatestCommonDivider(n, i) === 1) { 
            coprimeList.push(i);
        }
    }
    
    return coprimeList;
}