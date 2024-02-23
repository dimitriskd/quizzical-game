import { decode } from "html-entities"

export default function QuestionsScreen({question}){

    const answerElements = question.answers.map(answer => {
        return <button className="answer dark:ring-black my-1 dark:bg-zinc-800 dark:text-white">{decode(answer)}</button>
    })

    return (
        <article id={question.id} className="w-full mx-1 my-1">
            <div className="flex-row mb-3">
                <p className="font-semibold text-lg md:text-xl">{question.question}</p>
            </div>
            <div className="mb-5">
                { answerElements }
            </div>
            <hr className="border-gray-300"/>
        </article>
    )
}
