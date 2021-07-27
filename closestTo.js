const soup = [
    ['A', 'B', 'R'],
    ['H', 'A', 'H'],
    ['A', 'P', 'R'],
    ['P', 'L', 'A'],
    ['G', 'E', 'F']
];

const word = 'APPLE';
const letters = word.split('');

console.log(` The word:`);
console.log(word);
console.log(` The matrix:`);
console.log(soup);

//getting the letters we will search for in the matrix as arrays:
//NOTE : we need each letter once
const AArray = letters.filter(el=>el==="A");
const PLE = letters.filter(el=>el!=="A").slice(1);

//getting the indexes of the letters from the matrix:

function getLetterIndexesAsArray (letterArr){
    let indexesArr = [];

    for (let i = 0; i < soup.length; i++) {
        for (let j = 0; j < soup[i].length; j++) {
            const element = soup[i][j];
            
            for (let k = 0; k < letterArr.length; k++) {
                const letter = letterArr[k];
                if(element === letter){
                    indexesArr.push([i,j]);
                } 
            }
        }
    }
    return indexesArr
}

//Indexes of all "A" letters as array:
//NOTE : since we have all the letters we need besides A in the matrix only once - we need to find the closest A to all the other letters 
let AIndexes = getLetterIndexesAsArray (AArray);
console.log(` Indexes of all "A" letters as array:`);
console.log(AIndexes);

//Indexes of the rest of the letters from the word as array:
let APPLEIndexes = getLetterIndexesAsArray (PLE);
console.log(` Indexes of the rest of the letters from the word as array:`);
console.log(APPLEIndexes);

// to calculate the "distance" between letters in the matrix the following method is used : 

// Ai1[0][1] Ai2[3][1] otherLetter[2][0] >>>
// Ai1[0+1=1=i] Ai2[3+1=4=j] otherLetter[2+0=2=k] >>>
// i-k=1-2=-1=distanceAi1, j-k=4-2=2=distanceAi2 >>>
// if distanceAi2 > distanceAi1 => Ai2 is closer to otherLetter

// getting the sum of each pair of indexes. 
function getIndexTotal(obj){
    totalIndexArray = [];

    for (const oneOf in obj){
        I = obj[oneOf].reduce((acc,el)=>acc+el);
        totalIndexArray.push(I);
    }
    return totalIndexArray
}

let I1= getIndexTotal(AIndexes);
let I2= getIndexTotal(APPLEIndexes);

console.log(` Summed indexes for A letters as array:`);
console.log(I1);
console.log(` Summed indexes for other letters as array:`);
console.log(I2);

// from each element of the array with values from A letters we substract each of the elements from the other letters array - that way each A's distance is measured to each of the other letters: 
function getDistances (arr1,arr2){

    return arr1.map(el=>{
        let values = [];

        for (let l = 0; l < arr2.length; l++){
            d = el-arr2[l];
            values.push(d);
        } 
        return values
    });
}

let distances = getDistances(I1,I2);
console.log(` Distances of each A to each of the other letters:`);
console.log(distances);

// the total "score" of each A is calculated by reducing the array (summing its elements):
function getScoreOfA(arr){
    let scoreArray = [];
    for (let h = 0; h < arr.length; h++) {
        const element = arr[h].reduce((acc,el)=>acc+el);
        scoreArray.push(element)
    }
    return scoreArray
}

let distanceTotal = getScoreOfA(distances);
console.log(` Overall "scores" of each A:`);
console.log(distanceTotal);

// getting the best score:
let closest = distanceTotal.reduce(function(a, b) { return Math. max(a, b); });
console.log(` And the winner is...`);
console.log(closest);

// getting the best score index in the scores array:
function getClosestIndex(arr){
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] === closest){
            return i
        }
    }
}

let closestIndex = getClosestIndex(distanceTotal);
console.log(` Winner index is:`);
console.log(closestIndex);

let closestA = AIndexes[closestIndex];
console.log(` The indexes of the closest A to the others in the matrix:`);
console.log(closestA);

APPLEIndexes.unshift(closestA);
console.log(` The indexes of the closest letters to form the word:`);
console.log(APPLEIndexes);

function writeWord (letters,indexes){
    wordAsArray = [];
    for (let w = 0; w < indexes.length; w++) {
        const letterIndexes = indexes[w];
        for (let z = 0; z < indexes[w].length; z++) {
            let letter = letters[letterIndexes[z]][letterIndexes[++z]];
            wordAsArray.push(letter);
        }
    }
    return wordAsArray.toString().replace(/,/g," ");
}

console.log(`Which is:`);
console.log(writeWord(soup,APPLEIndexes));
