import {Question} from "../types/Question.ts";
import axios from "axios";
import {API} from "../config.ts";

// export type Question = {
//     imagePath: string,
//     hints: string[],
//     answers: Answer[]
// }
//

// export type Answer = {
//     text: string,
//     correct: boolean
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GetQuestion(difficultId: number): Promise<Question[]> {
    let result = await axios.get<Question[]>(API + '/questions_by_marker/' + difficultId + "/")
    console.log(result.data)
    return result.data
}