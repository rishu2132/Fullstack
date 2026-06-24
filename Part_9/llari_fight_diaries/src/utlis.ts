import type { NewDiaryEntry } from "../types.ts";

const parseNewDiaryEntry = (object: unknown ):NewDiaryEntry => {

    console.log(object);  // object is no longer unused
    const newEntry: NewDiaryEntry = {
        weather: 'cloudy',   // fake entry
        visibility: 'good',
        date:'24-06-26',
        comment: 'fake news'
    };
        
    return newEntry;
};

export default parseNewDiaryEntry;