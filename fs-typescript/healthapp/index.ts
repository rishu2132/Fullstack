import express from 'express';
import calculateBmi from './bmiCalculator.ts';
const app = express();

app.get('/hello', (_req,res) =>{
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req,res) =>{
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if(isNaN(weight) || isNaN(height)){
        res.send({error:'malformatted parameters '});
    }

    const bmi = calculateBmi(height,weight);
    res.send({
        weight,
        height,
        bmi
    })
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})