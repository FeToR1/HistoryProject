import {configureStore} from "@reduxjs/toolkit";
import QuestSlice from "./QuestSlice.ts";

export default configureStore({
    reducer: {
        QuestStore: QuestSlice
    }
})