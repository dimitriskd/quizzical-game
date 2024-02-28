import { decode } from 'html-entities';
import tick from "/images/tick.svg";
import cross from "/images/cross.svg";

export default function Question(props) {

    const updateAnswers = (answer) => {
        props.updateAnswers(props.question.id, answer);
    };

    const disabled = {
        disabled: props.gameEnded ? true : false
    }
    return (
        <article id={props.question.id} className="flex flex-col h-fit w-full mx-1 my-1">
            <div className="mb-3 w-fit">
                <p className="font-semibold text-lg md:text-xl">{props.question.question}</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="w-fit">
                    {props.question.answers.map((answer, index) => (
                        <button
                            key={props.question.id + index}
                            onClick={() => updateAnswers(answer)}
                            className={`answer ${props.question.selected === answer ? 'selected' : ''} ${props.gameEnded && props.question.correct_answer === answer && props.question.selected === answer ? 'correct' : (props.gameEnded && props.question.selected === answer ? 'wrong' : '')}`}
                            {...disabled}
                        >
                            {decode(answer)}
                        </button>
                    ))}
                </div>
                <div className='result w-fit h-fit flex flex-col items-center'>
                    {
                        props.gameEnded ?
                            props.question.correct ? <img src={tick} alt="tick" className='h-10' /> : <img src={cross} alt="tick" className='h-9' />
                        : ""
                    }
                </div>
            </div>
            <hr className="border-gray-300 mt-3" />
        </article>
    );
}