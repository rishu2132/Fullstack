interface unit {
    weight: number;
    height: number;
}

const parseArguments = (args: string[]): unit => {
    if (args.length < 4) throw new Error ('not enough arguments, need 2 arguments');
    if (args.length > 4) throw new Error ('too many arguments, need only 2 arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error ('Provided values are not numbers!');  
    }
};


const calculateBmi = (height:number, weight:number):string => {
    const bmi: number = weight/(height/100)**2;

    if(bmi<16)return 'Underweight (Severe thinness';
    else if(bmi<17) return 'Underweight (Moderate thinness';
    else if(bmi < 18.5) return 'Underweight (Mild thinness';
    else if(bmi < 25) return 'Normal range';
    else if(bmi < 30) return 'Overweight (Pre-obese)';
    else if(bmi < 35) return 'Obese (Class I)';
    else if(bmi < 40) return 'Obese (Class II)';
    else if(bmi>=40) return 'Obese (Class III)';
    else throw new Error('given height or weight are not numbers');
};


if (process.argv[1] === import.meta.filename){
    try {
        const {height , weight} = parseArguments(process.argv);
        console.log(calculateBmi(height,weight));
    } catch (error: unknown) {
        let errorMessage = 'something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}

export default calculateBmi;