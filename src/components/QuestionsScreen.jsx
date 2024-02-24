import Question from './Question';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import { customAlphabet } from 'nanoid';
import Confetti from 'react-confetti';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const nanoid = customAlphabet('qwertyuasdfghjzxcvbn_-', 10);

export default function QuestionsScreen(props) {
    const [questions, setQuestions] = useState(initializeQuestions);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);

    useEffect(() =>{
        const numberOfCorrectAnswers = questions.reduce((count, question) => {
            return count + (question.correct ? 1 : 0);
        }, 0);
        setCorrectAnswers(numberOfCorrectAnswers)
    },[gameEnded])
    
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
    console.log(questions)
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

    function endGame(){
        const allQuestionsAnswered = questions.every(obj => obj.hasOwnProperty("selected"));
        if(allQuestionsAnswered)
            setGameEnded(true);
        else{
            const notify = () => toast.info('😲 Please Select all your Answers!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnFocusLoss: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });
            notify();
        };
    }
    return (
        <section className="flex flex-wrap h-fit my-32 m-4 md:w-2/3 lg:w-2/3">
            <ToastContainer />
            {questions.map((question) => (
                <Question
                    key={question.id}
                    question={question}
                    updateAnswers={updateAnswers}
                    gameEnded={gameEnded}
                />
            ))}
            <button onClick={gameEnded? props.resetGame :endGame} className="submit text-white m-auto my-4 py-2 px-3">{gameEnded? "Play Again" : "Submit"}</button>
            <Modal correctAnswers={correctAnswers} numberOfQuestions={props.questions.length} gameEnded={gameEnded}/>
            {correctAnswers > questions.length/2 && <Confetti />}
        </section>
    );
}