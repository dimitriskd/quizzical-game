import { useEffect, useState } from "react";
import { loadCategories } from "../API/loadSelects.js";
import { getQuestions } from "../API/getQuestions.js";

export default function GameSelection(props) {

  const [selectData, setSelectData] = useState([]);
  const [form, setForm] = useState({amount: 1});

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
    if(value !== "any")
        setForm((oldForm) => {
            return {
                ...oldForm,
                [key]: value,
            };
        });
  }

  async function formSubmit(e) {
    e.preventDefault();
    if(form.amount <= 10 && form.amount > 0)
        try {
            const data = await getQuestions(form);
            props.fetchQuestions(data);
        } catch (error) {
            console.log(error);
        }
    else
        alert("Please max amount of questions 10")
  }

  const optionElements = selectData.map((option) => {
    return (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    );
  });

  return (
    <div className="container w-80 md:w-auto flex flex-col flex-wrap justify-center items-center md:h-screen">
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
                min="1"
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
          <button
            className="submit text-white dark:bg-blue-500 drop-shadow-md w-36 h-12"
            aria-label="Start Game"
            onClick={(e) => formSubmit(e)}
          >
            Start Game
          </button>
        </div>
      </form>
    </div>
  );
}
