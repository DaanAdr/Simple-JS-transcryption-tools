// Function to calculate GCD using the Euclidean Algorithm
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Function to generate a list of coprime numbers for a given number n
export function getListOfCoprimes(n) {
    const coprimeList = [];
    
    for (let i = 1; i < n; i++) {  // Consider numbers less than n
        if (gcd(n, i) === 1) {      // Check if GCD is 1
            coprimeList.push(i);    // If coprime, add to the list
        }
    }
    
    return coprimeList;
}