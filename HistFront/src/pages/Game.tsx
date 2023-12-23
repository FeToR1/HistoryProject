import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetQuestion} from "../api/quests.ts";
import {Question} from "../types/Question.ts";
import {MAX_SCORE, MAX_STEPS, URL_MEDIA} from "../config.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {Modal as BootstrapModal} from "bootstrap/dist/js/bootstrap.bundle.min.js"

export default function () {
    const {difficultyId} = useParams()
    const [questions, setQuestions] = useState([{} as Question] as Question[])
    const [currentStep, setCurrentStep] = useState(0)
    const [score, setScore] = useState(0)
    const [currentChoice, setCurrentChoice] = useState(-1)
    const [answers, setAnswers] = useState([] as boolean[])
    const [colors, setColors] = useState([] as string[])
    const [maxScore, setMaxScore] = useState(5)
    const [hintsNumber, setHintsNumber] = useState(0)
    const [usedIndexes, setUsedIndexes] = useState([] as number[])
    const [showResult, setShowResult] = useState(false)
    useEffect(() => {
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault()
        });
        return () => {
            window.removeEventListener('beforeunload', (event) => {
                event.preventDefault()
            });
        };
    }, []);
    useEffect(() => {
            GetQuestion(Number(difficultyId)).then((res) => {
                    setQuestions(res)
                    const choose = Math.floor(Math.random() * res.length)
                    setCurrentChoice(choose)
                    setUsedIndexes([...usedIndexes, choose])
                    setAnswers([...Array(res[choose].answers.length).fill(false)])
                    setColors([...Array(res[choose].answers.length).fill("black")])
                }
            )
        }
        ,
        [difficultyId]
    )

    function GoNext(){
        let choose = Math.floor(Math.random() * questions.length)
        let cc = 0
        while (usedIndexes.includes(choose)) {
            choose = Math.floor(Math.random() * questions.length)
            cc += 1
            if (cc > 100) {
                setShowResult(true)
                break
            }
        }
        if (currentStep + 1 == MAX_STEPS) {
            setShowResult(true)
        }
        setUsedIndexes([...usedIndexes, choose])
        setCurrentChoice(choose)
        setAnswers([...Array(questions[choose].answers.length).fill(false)])
        setColors([...Array(questions[choose].answers.length).fill("black")])
        setCurrentStep(currentStep + 1)
        setHintsNumber(0)
        setMaxScore(MAX_SCORE)
    }

    function CheckAnswers() {
        let newColors = [...colors]
        let fine = 0
        for (let i = 0; i < answers.length; i++) {
            if (questions[currentChoice].answers[i].correct && answers[i]) {
                newColors = [...newColors.slice(0, i), "success", ...newColors.slice(i + 1)]
            } else if (!questions[currentChoice].answers[i].correct && answers[i]) {
                fine += 1
                newColors = [...newColors.slice(0, i), "danger", ...newColors.slice(i + 1)]
            }
        }
        setMaxScore(maxScore - fine < 1 ? 1 : maxScore - fine)
        if (fine == 0) {
            setScore(score + maxScore)
            GoNext()
        } else {
            setColors(newColors)
        }

    }


    return (
        <>
            <div className="modal fade" id="error"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Ошибка</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Нужно выбрать 2 варианта
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                {
                    showResult ? <>
                        <div className="d-flex justify-content-center flex-column flex-column">
                            <div className="fs-1 fw-bold">Вы получили {score} баллов из {MAX_SCORE * MAX_STEPS}
                            </div>
                            <div className={"text-center"}>
                                <Link className={'btn btn-primary mt-5 btn-lg'} to={"/"}>На главную</Link>
                            </div>
                        </div>
                    </> : (
                        <>
                            {
                                currentChoice == -1 ? <div>Loading...</div> : (
                                    <>
                                        <div className="fs-3 fw-bold">Шаг {currentStep + 1} из {MAX_STEPS}
                                            <br/> Баллы: {score}</div>
                                        <div className="">За решение вы получите {maxScore} баллов</div>
                                        <div className="d-flex justify-content-center mt-5">
                                            <img src={URL_MEDIA+questions[currentChoice].imagePath} alt={"some went wrong"}
                                                 className={"mw-100"}
                                                 style={{
                                                     maxHeight: "500px",
                                                 }}/>
                                        </div>
                                        {
                                            hintsNumber > 0 ? (
                                                <div className="mt-5">
                                                    <div className="fs-4 fw-bold">Подсказки:</div>
                                                    {
                                                        questions[currentChoice].hints.slice(0, hintsNumber).map((el, index) => {
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
                                                        <div className={"col-lg-4 d-flex justify-content-center my-2"}
                                                             key={index}>
                                                            <div className="form-check fs-4">
                                                                <input className={`form-check-input`}
                                                                       type="checkbox"
                                                                       checked={answers[index]}
                                                                       onChange={() => {
                                                                           if (answers.filter(x => x).length < 2 || answers[index]) {
                                                                               setAnswers([...answers.slice(0, index), !answers[index], ...answers.slice(index + 1)])
                                                                           }
                                                                       }}
                                                                />
                                                                <label
                                                                    className={`form-check-label text-${colors[index]}`}
                                                                    htmlFor="flexCheckDefault">
                                                                    {el.text}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className={"d-flex justify-content-center flex-lg-row flex-column mt-5"}>
                                            <button className={"btn btn-primary btn-lg me-3 mt-3"}
                                                    onClick={() => {
                                                        if (hintsNumber + 1 <= questions[currentChoice].hints.length) {
                                                            if (maxScore > 1) {
                                                                setMaxScore(maxScore - 1)
                                                            }

                                                            setHintsNumber(hintsNumber + 1)
                                                        }
                                                    }}> Подсказка
                                            </button>
                                            <button className={"btn btn-primary btn-lg me-3 mt-3"}
                                                    onClick={() => {
                                                        if (answers.filter(x => x).length === 2) {
                                                            CheckAnswers()
                                                        } else {
                                                            const modal = new BootstrapModal(document.getElementById("error"))
                                                            modal.show()
                                                        }

                                                    }}>Проверить ответы
                                            </button>
                                            <button className={"btn btn-primary btn-lg me-3 mt-3"}
                                                    onClick={() => {
                                                        GoNext()
                                                    }}>Пропустить
                                            </button>
                                        </div>
                                    </>
                                )}
                        </>)
                }

            </div>
        </>
    )
}