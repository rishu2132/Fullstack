interface duration {
    hours: number[];
    target: number; 
}



const calculatorArguments = (args: string[]): duration => {
    if (args.length < 4) throw new Error ('not enough arguments');
    
    const data = args.slice(2);
    const allNumbers = data.map(d => Number(d));
    if(allNumbers.some(isNaN)) throw new Error ('all provided values must be number');
    const [target,...hours] = allNumbers;
    return {
        target,
        hours
    };
};


interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (data:number[],target:number): Result => {

    if(data.length < 1 && target <= 0){
        throw new Error ('not valid data ');
    }
    const periodLength = data.length;
    const trainingDays = data.filter(h => h > 0).length;
    const average = data.reduce((sum, h) => sum + h, 0) / periodLength;
    const success = average >= target;

    let rating: 1 | 2 | 3;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'great job, target reached!';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'needs more effort';
    }

        return {
            periodLength,
            trainingDays,
            success,
            average,
            target,
            rating,
            ratingDescription

        };
    
};

if (process.argv[1]=== import.meta.filename){
    try {
    const {target, hours} = calculatorArguments(process.argv);
    console.log(calculateExercises(hours,target));

} catch (error: unknown) {
    let errorMessage = 'something went wrong: ';
    if (error instanceof Error){
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
}

