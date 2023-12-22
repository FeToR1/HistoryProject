export type Answer = {
    text: string,
    correct: boolean
}

export type Question = {
    imagePath: string,
    hints: string[],
    answers: Answer[]
}

