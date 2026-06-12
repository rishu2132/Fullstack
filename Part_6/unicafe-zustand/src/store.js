import { create } from 'zustand'

const useFeedbackStore = create(set =>({
    good:0,
    bad:0,
    neutral:0,
    actions: {
        positive:() => set(state => ({good: state.good + 1})),
        negative:() => set(state => ({bad: state.bad + 1})),
        zero:() => set(state => ({neutral: state.neutral + 1}))
    },
})) 

export const useGoodFeedback = () => useFeedbackStore(state => state.good)
export const useBadFeedback = () => useFeedbackStore(state => state.bad)
export const useNeutralFeedback = () => useFeedbackStore(state => state.neutral)
export const useFeedbackControl = () => useFeedbackStore(state => state.actions)