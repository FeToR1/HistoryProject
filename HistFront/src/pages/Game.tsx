import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetQuestion} from "../api/quests.ts";
import {Question} from "../types/Question.ts";
import {MAX_STEPS} from "../config.ts";

export default function () {
    const {difficultyId} = useParams()
    const [questions, setQuestions] = useState([{} as Question] as Question[])
    const [currentStep, setCurrentStep] = useState(0)
    const [score, setScore] = useState(0)
    const [currentChoice, setCurrentChoice] = useState(-1)
    const [answers, setAnswers] = useState([] as boolean[])
    const [maxScore, setMaxScore] = useState(5)
    const [hintsNuber, setHintsNumber] = useState(0)
    useEffect(() => {
            GetQuestion(Number(difficultyId)).then((res) => {
                    setQuestions(res)
                    const choose = Math.floor(Math.random() * res.length)
                    setCurrentChoice(choose)
                    setAnswers([...Array(res[choose].answers.length).fill(false)])
                }
            )
        }
        ,
        [difficultyId]
    )

    return (
        <div className="container my-5">
            {
                currentChoice == -1 ? <div>Loading...</div> : (
                    <>
                        <div className="fs-3 fw-bold">Шаг {currentStep + 1} из {MAX_STEPS} <br/> Баллы: {score}</div>
                        <div className="">За решение вы получите {maxScore} баллов</div>
                        <div className="d-flex justify-content-center mt-5">
                            <img src={questions[currentChoice].imagePath} alt={"some went wrong"} className={"mw-100"}/>
                        </div>
                        {
                            hintsNuber > 0 ? (
                                <div className="mt-5">
                                    <div className="fs-4 fw-bold">Подсказки:</div>
                                    {
                                        questions[currentChoice].hints.slice(0, hintsNuber).map((el, index) => {
                                            return (
                                                <div className="fs-4" key={index}>{el}</div>
                                            )
                                        })
                                    }
                                </div>
                            ) : null
                        }
                        <div className="row mt-5 justify-content-center">
                            {
                                questions[currentChoice].answers.map((el, index) => {
                                    return (
                                        <div className={"col-4 d-flex justify-content-center my-2"} key={index}>
                                            <div className="form-check fs-4">
                                                <input className="form-check-input"
                                                       type="checkbox"
                                                       checked={answers[index]}
                                                       onChange={() => {
                                                           setAnswers([...answers.slice(0, index), !answers[index], ...answers.slice(index + 1)])
                                                       }}
                                                />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    {el.text}
                                                </label>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={"d-flex justify-content-center mt-5"}>
                            <button className={"btn btn-primary btn-lg me-3"}
                                    onClick={() => {
                                        if (hintsNuber + 1 <= questions[currentChoice].hints.length) {
                                            if (maxScore>1) {
                                                setMaxScore(maxScore - 1)
                                            }

                                            setHintsNumber(hintsNuber + 1)
                                        }
                                    }}> Подсказка
                            </button>
                            <button className={"btn btn-primary btn-lg me-3"}
                                    onClick={() => {
                                        console.log(answers)
                                    }}>Проверить ответы
                            </button>
                            <button className={"btn btn-primary btn-lg me-3"}
                                    onClick={() => {
                                        console.log(answers)
                                    }}>Пропустить
                            </button>
                        </div>
                    </>
                )}
        </div>
    )
}