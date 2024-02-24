import { decode } from 'html-entities';

export default function Question(props) {
    const updateAnswers = (answer) => {
        props.updateAnswers(props.question.id, answer);
    };
    return (
        <article id={props.question.id} className="w-full mx-1 my-1">
            <div className="flex-row mb-3">
                <p className="font-semibold text-lg md:text-xl">{props.question.question}</p>
            </div>
            <div className="mb-5">
                {props.question.answers.map((answer, index) => (
                    <button
                        key={props.question.id + index}
                        onClick={() => updateAnswers(answer)}
                        className={`answer ${props.question.selected === answer ? 'selected' : ''}`}
                    >
                        {decode(answer)}
                    </button>
                ))}
            </div>
            <hr className="border-gray-300" />
        </article>
    );
}