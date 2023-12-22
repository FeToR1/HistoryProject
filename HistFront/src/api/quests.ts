import {Question} from "../types/Question.ts";
import First from "../assets/img/Food.png"
import Second from "../assets/img/true.png"

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
    console.log("difficultId: " + difficultId);
    return [
        {
            imagePath : First,
            hints: ["abas", "abas2", "abas4"],
            answers: [
                {
                    text: "aaaa",
                    correct: true
                },
                {
                    text: "bbbb",
                    correct: true
                },
                {
                    text: "cccc",
                    correct: false
                },
                {
                    text: "dddd",
                    correct: false
                }
            ]
        },
        {
            imagePath : Second,
            hints: ["aboba", "boba"],
            answers: [
                {
                    text: "aaaa2",
                    correct: true
                },
                {
                    text: "bbbb2",
                    correct: true
                },
                {
                    text: "cccc2",
                    correct: false
                },
                {
                    text: "dddd2",
                    correct: false
                }
            ]
        }

    ]
}