import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
const app = express();
app.use(express.json());

app.get('/hello', (_req,res) =>{
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) =>{
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if(isNaN(weight) || isNaN(height)){
        res.status(400).send({error: 'malformatted parameters'});
    }

    if(!weight || !height){
        res.status(400).send({error: 'missing parameters'});
    }

    const bmi = calculateBmi(height,weight);
    res.send({
        weight,
        height,
        bmi
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if(!target || !daily_exercises){
     res.status(400).send({error: 'parameters missing'});
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const allNumbers = daily_exercises.map(Number);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (isNaN(Number(target)) || allNumbers.some(isNaN) ){
        res.status(400).send({error: 'malformatted parameters'});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
     res.send(calculateExercises(daily_exercises,target));

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});