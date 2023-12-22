import {createSlice} from "@reduxjs/toolkit";
import {Quest} from "../types/Quest.ts";

export const QuestSlice = createSlice({
    name: "QuestStore",
    initialState: {
        quest: {questions: []} as Quest,
        answers: {} as {[id: string]: string}
    },
    reducers: {
        changeQuest:(state, action: {payload: {quest: Quest, answers: {[id: string]: string}}, type: string})=>{
            state.quest = action.payload.quest
            state.answers = action.payload.answers
        },
        addAnswer(state, action: {payload: {id: string, value: string}, type: string}){
            state.answers[action.payload.id] = action.payload.value
        }
    }
})

export const {changeQuest, addAnswer} = QuestSlice.actions
export default QuestSlice.reducer