import { useEffect, useState } from "react";
import { loadCategories } from "../API/loadSelects.js";
import { getQuestions } from "../API/getQuestions.js";

export default function GameSelection(props) {

  const [selectData, setSelectData] = useState([]);
  const [promiseHandle, setPromise] = useState(false);
  const [form, setForm] = useState({ amount: 1 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await loadCategories();
        setSelectData(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  function formData(e) {
    const key = e.target.id;
    const value = e.target.value;
    if (value !== "any")
      setForm((oldForm) => {
        return {
          ...oldForm,
          [key]: value,
        };
      });
  }

  async function formSubmit(e) {
    e.preventDefault();
    setPromise(true);
    if (form.amount <= 10 && form.amount >= 5)
      try {
        const data = await getQuestions(form);
        setPromise(false);
        props.fetchQuestions(data);
      } catch (error) {
        console.log(error);
      }
    else
      alert("Please the amount to be between 5 and 10")
  }

  const optionElements = selectData.map((option) => {
    return (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    );
  });
  console.log(promiseHandle)
  return (
    <div className="h-full w-80 md:w-auto flex flex-col flex-wrap justify-center items-center md:h-screen">
      <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
        Quizzical
      </h1>
      <h2 className="text-md md:text-xl text-center m-5">
        Answer the questions and test your knowledge!
      </h2>
      <form className="w-full">
        <div className="grid grid-cols-1 grid-rows-5 gap-4 justify-items-center">
          <div className="w-full">
            <label
              htmlFor="amount"
              className="flex flex-col md:flex-row text-md md:text-lg mb-1 md:items-center"
            >
              Amount of Questions:
              <input
                id="amount"
                type="number"
                className="gameSelect--input md:ml-3 md:w-80"
                min="5"
                max="10"
                placeholder="Max number of questions 10"
                onChange={(e) => formData(e)}
                required
              />
            </label>
          </div>
          <div className="w-full">
            <label
              htmlFor="category"
              className="flex flex-col md:flex-row text-md md:text-lg mb-1 md:items-center"
            >
              Select A Category:
              <select
                className="gameSelect--select md:ml-auto md:w-80"
                id="category"
                onChange={(e) => formData(e)}
              >
                <option value="any">Any Category</option>
                {optionElements}
              </select>
            </label>
          </div>
          <div className="w-full">
            <label
              htmlFor="difficulty"
              className="flex flex-col md:flex-row text-md md:text-lg mb-1 md:items-center"
            >
              Select Difficulty:
              <select
                className="gameSelect--select md:ml-auto md:w-80"
                id="difficulty"
                onChange={(e) => formData(e)}
              >
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
          </div>
          <div className="w-full">
            <label
              htmlFor="type"
              className="flex flex-col md:flex-row text-md md:text-lg mb-1 md:items-center"
            >
              Select Type:
              <select
                className="gameSelect--select md:ml-auto md:w-80"
                id="type"
                onChange={(e) => formData(e)}
              >
                <option value="any">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
              </select>
            </label>
          </div>
          {!promiseHandle ?
          <button
            className="submit text-white dark:bg-blue-500 drop-shadow-md w-36 h-12"
            aria-label="Start Game"
            onClick={(e) => formSubmit(e)}
          >
            Start Game
          </button>
          :
          <button disabled="" type="button" class="rounded-sm bg-zinc-400 text-white dark:bg-blue-400 dark:text-gray-200  drop-shadow-md w-36 h-12 hover:transform-none">
            <svg aria-hidden="true" role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
            </svg>
            Loading...
          </button>}
        </div>
      </form>
      <a className="fixed bottom-0 left-1 text-xs z-auto" href="https://www.vecteezy.com/free-vector/wavy">Wavy Vectors by Vecteezy</a>
      <a className="fixed bottom-0 right-1 z-auto" href="https://github.com/dimitriskd">Made by Dimitris K.</a>
    </div>
  );
}
