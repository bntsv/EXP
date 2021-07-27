let arr = [1];

function foo(acc,el){
    console.log(`acc is ${acc}`);
    console.log(`el is ${el}`);
    return acc+el
}

let sum = arr.reduce(foo);

foo();
console.log(`acc + el = ${sum}`);
console.log(typeof sum);
