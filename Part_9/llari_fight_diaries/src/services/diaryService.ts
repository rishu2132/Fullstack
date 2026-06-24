import diaries from '../../data/entries.ts';
import type { NonSensitiveDiaryEntry ,DiaryEntry } from '../../types.ts';

const getEntries = ():DiaryEntry[] => {
    return diaries;
};

const getNonSensitiveEntries = ():NonSensitiveDiaryEntry[] => {
    return diaries.map(({id,date,weather,visibility}) => ({
        id,
        date,
        weather,
        visibility
    }));
};

const findById = (id:number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    return entry;
}

const addDiary = () => {
    return null;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById
};