// const multiplicator = (a: number,b:number ,printText:string) => {
//     console.log(printText,a*b);
// }

// multiplicator(2,4,"multiplied number 2 and 4 , the result is:");

// ! creating your own types

type Operation = 'mulitply' | 'add' | 'divide';

const calculator = (a: number, b: number, op:Operation): number => {
    switch(op) {
        case 'mulitply':
            return a*b;
        case 'add':
            return a+b;
        case 'divide':
            if(b===0) throw new Error('can\'t divide by 0');
            return a/b;
        default:
            throw new Error('Operation is not multiply , add and divide');
    }
}

try {
    console.log(calculator(1,5,'divide'));
} catch (error:unknown) {
    let errorMessage = 'something went wrong: ';
    if(error instanceof Error ) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}