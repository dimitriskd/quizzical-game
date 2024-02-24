import Question from './Question';
import { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import { customAlphabet } from 'nanoid';
import Confetti from 'react-confetti';
const nanoid = customAlphabet('qwertyuasdfghjzxcvbn_-', 10);

export default function QuestionsScreen(props) {
    const [questions, setQuestions] = useState(initializeQuestions);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        setCorrectAnswers(() => {
            const correct2 = questions.filter(question => question.correct === true);
            return correct2;
        });
    },[questions])
    console.log(correctAnswers)
    function initializeQuestions() {
        const questionsData = props.questions.map((question) => {
            const answers = [];
            answers.push(question.correct_answer, ...question.incorrect_answers);
            const shuffledAnswers = shuffle(answers);
            return {
                id: nanoid(),
                correct_answer: question.correct_answer,
                answers: shuffledAnswers,
                question: decode(question.question),
                correct: false
            };
        });
        return questionsData;
    };

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex > 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      };

    const updateAnswers = (id, answer) => {
        setQuestions((oldQuestions) => {
            const newArray = [...oldQuestions];
            const question = newArray.find(ans => ans.id == id);
            question.correct = question.correct_answer === answer ? true : false
            question["selected"] = answer;
            return newArray;
        });
    };

    return (
        <section className="flex flex-wrap h-fit my-32 m-4 md:w-1/2 lg:w-1/2">
            {questions.map((question) => (
                <Question
                    key={question.id}
                    question={question}
                    updateAnswers={updateAnswers}
                />
            ))}
            <button className="submit text-white m-auto my-4 py-2 px-3">Submit</button>
        </section>
    );
}