import Background from "./components/Background";
import DarkToggle from "./components/DarkToggle";
import GameSelection from "./components/GameSelection";
import { useEffect, useState } from "react";
import { windowEvent } from "./API/getQuestions";
import "./styles/App.css";

export default function App(){
  const [ darkMode, setDarkMode ] = useState(false);
  const [ questionsList, setQuestionsList ] = useState([]);
  
  useEffect(() => {
    darkMode ?
      document.body.classList.add("dark")
      :
      document.body.classList.remove("dark");

  }, [darkMode]);

  function darkToggle(){
    setDarkMode(oldMode => !oldMode);
  }

  function fetchQuestions(data){
    setQuestionsList(data);
  }

  return (
    <main className="flex justify-center items-center h-screen">
      { windowEvent }
      <DarkToggle darkToggle={ darkToggle } darkMode={ darkMode }/>

      <GameSelection fetchQuestions={ fetchQuestions }/>
      <Background darkMode={ darkMode }/>
    </main>
  );

}