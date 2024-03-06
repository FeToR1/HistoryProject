import PlusCard from "./PlusCard.tsx";


<div className={"text-center mt-3 mt-lg-5 mb-5"}>
    <h1>Добро пожаловать!</h1>
    <p>Пройди захватывающий тест, состоящий из семи увлекательных картин, каждая из которых скрывает за
        собой загадку. Твоя задача - распознать изображения, лежащие в ее основе. Но будь внимателен! Только
        два из шести предложенных вариантов - правильные.</p>
    <p>Выбери уровень сложности, на котором тебе будет комфортно разгадывать загадки: легкий, средний или
        сложный. Если нужна помощь, не стесняйся использовать подсказки. За каждую верно отгаданную картину
        ты получишь до 5 баллов. Однако, помни, что за ошибку или использование подсказки ты потеряешь один
        балл.</p>
    <p>Максимально возможное количество баллов - 35. Готов ли ты к вызову? Проверь свою сообразительность и
        набери максимальное количество очков! Удачи в разгадывании загадок!</p>
</div>
export default function () {
    return (

        <div className={""}
        >
            <div className="fs-2 fw-bold text-center mb-5 mt-5">
                Добро пожаловать!
            </div>
            <div className="row gx-lg-5 gy-lg-3">
                <PlusCard
                    title={"Загадки"}
                    text={"Пройди захватывающий тест, состоящий из семи увлекательных картин, каждая из которых скрывает за\n" +
                        "         собой загадку. Твоя задача - распознать изображения, лежащие в ее основе. Но будь внимателен! Только\n" +
                        "         два из шести предложенных вариантов - правильные."}
                    icon={"bi-lightbulb"}
                    isDark/>
                <PlusCard
                    title={"Гибкость"}
                    text={"Выбери уровень сложности, на котором тебе будет комфортно разгадывать загадки: легкий, средний или\n" +
                        "        сложный. Если нужна помощь, не стесняйся использовать подсказки. За каждую верно отгаданную картину\n" +
                        "        ты получишь до 5 баллов. Однако, помни, что за ошибку или использование подсказки ты потеряешь один\n" +
                        "        балл."}
                    icon={"bi-puzzle"}
                />
                <PlusCard
                    title={"Интеллект"}
                    text={"Максимально возможное количество баллов - 35. Готов ли ты к вызову? Проверь свою сообразительность и\n" +
                        "        набери максимальное количество очков! Удачи в разгадывании загадок!"}
                    icon={"bi-trophy"}
                    isDark
                />
            </div>

        </div>
    )
}