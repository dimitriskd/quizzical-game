import { nanoid } from "nanoid";
import Question from "./Question"
import { useEffect, useState } from "react";
import { decode } from "html-entities";

export default function QuestionsScreen(props){
    const [questions,setQuestions] = useState(initializeQuestions);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    
    function initializeQuestions(){
        const questionsData = props.questions.map(question => {
            const answers = [];
            answers.push(question.correct_answer,...question.incorrect_answers);
            return {
                id: nanoid(),
                correct_answer: question.correct_answer,
                answers: answers,
                question : decode(question.question),
            }
        });
        return questionsData;
    }
    
    const questionElments = questions.map(question => {
        return <Question key={question.id} question={question} />
    })

    return (
        <section className="flex flex-wrap h-fit my-32 m-4 md:w-1/2 lg:w-1/2">
            { questionElments }
            <button className="submit text-white m-auto my-4 py-2 px-3">Submit</button>
        </section>
    )
}
