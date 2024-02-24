import DarkToggle from "./components/DarkToggle";
import GameSelection from "./components/GameSelection";
import QuestionsScreen from "./components/QuestionsScreen";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import "./styles/App.css";

export default function App(){
  const [ darkMode, setDarkMode ] = useState(false);
  const [ questionsList, setQuestionsList ] = useState([]);
  const [flag,setFlag] = useState(false);
  
  useEffect(() => {
    darkMode ?
      document.body.classList.add("dark")
      :
      document.body.classList.remove("dark");

  }, [darkMode]);

  useEffect(()=>{
    const notify = () => toast.warn(questionsList, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
      });
      notify();
  },[questionsList])

  function darkToggle(){
    setDarkMode(oldMode => !oldMode);
  }

  function fetchQuestions(data){
    setQuestionsList(data);
    setFlag(true)
  }

  const toastContainerProps = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
    transition: Slide
  };

  return (
    <section className="h-fit">
      <div className="absolute top-0 left-0">
        <DarkToggle darkToggle={ darkToggle } darkMode={ darkMode }/>
      </div>
      <section className="flex flex-wrap justify-center items-center h-fit ">
        {!flag ? <GameSelection fetchQuestions={ fetchQuestions }/> : <QuestionsScreen questions={questionsList} />}
      </section>
      <ToastContainer {...toastContainerProps} />
      <a className="fixed bottom-0 text-xs z-auto" href="https://www.vecteezy.com/free-vector/wavy">Wavy Vectors by Vecteezy</a>
    </section>
  );

}