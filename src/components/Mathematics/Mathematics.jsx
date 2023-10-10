import React, { useState, useEffect } from 'react';
import '../Quiz.css'
import QuizTimer from '../QuizTimer';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import Poup from '../PopupScore/Poup';

import Clock from '../ClockTimer/Clock';
import back from '../../assets/backgroundquiz.png'

const Mathematics = () => {

  const customStyles = {
    backgroundImage: `url(${back})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontSize: '20px',
  };





  let totalScore = 0;
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(Array(0).fill(null)); // Initialize with an empty array
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  const [questions, setQuestions] = useState([]); // Store fetched questions


  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);


  const handleOpenAddQuestionModal2 = () => {
    setIsAddQuestionModalOpen(true);
  };
  
  const handleCloseAddQuestionModal2 = () => {
    setIsAddQuestionModalOpen(false);

    navigate(`/leaderboard/${category}`);



  };







  const baseUrl = "https://backup-quiz-server.onrender.com/api/questions";

  useEffect(() => {
    const fetchData = async () => {
      let url = `${baseUrl}?category=${category}`; // Include category in the URL

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          const filteredQuestions = responseData.filter((question) =>
          question.category === category
        );
          setQuestions(filteredQuestions);
          setAnswerStatus(Array(filteredQuestions.length).fill(null)); // Initialize answerStatus based on fetched data
        } else {
          console.error('Error fetching questions:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [baseUrl, category]);

  const navigate = useNavigate();
  const { doctorId } = useParams();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    console.log('Confirmed');
    closeModal();
  };

  const handleNext = () => {
    if (!isChecked) {
      alert("Please check your answer before moving to the next question.");
      return;
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Handle the end of the quiz
      handleSubmitButton();
    }

    setIsOptionSelected(false);
    setIsChecked(false);
  };

  const handleCheck = () => {
    if (!isOptionSelected) {
      alert("Please select an option before checking.");
      return;
    }

    setIsChecked(true);

    const updatedAnswerStatus = [...answerStatus];
    const selectedAnswer = selectedOptions[currentQuestion]?.answerByUser;
    // const correctAnswer = questions[currentQuestion].correctAnswer; // Assuming your fetched data has a "correctAnswer" field

    // console.log(correctAnswer);


    const correctAnswer = questions[currentQuestion].answerOptions.find(
      (option) => option.isCorrect
    ).answer;
  
    updatedAnswerStatus[currentQuestion] = selectedAnswer === correctAnswer;
  
    setAnswerStatus(updatedAnswerStatus);


    if (selectedAnswer === correctAnswer) {
      updatedAnswerStatus[currentQuestion] = true;
      setScore(score + 10);
    } else {
      updatedAnswerStatus[currentQuestion] = false;
    }

    setAnswerStatus(updatedAnswerStatus);
    if (selectedAnswer === correctAnswer) {
      setScore(score + 10);
    }
  };



  //
  const handleAnswerOption = (answer) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = { answerByUser: answer };
    setSelectedOptions(updatedSelectedOptions);
    setIsOptionSelected(true);
  };

  const handleSubmitButton = async () => {
   

    for (let i = 0; i < questions.length; i++) {
      if (answerStatus[i]) {
        totalScore += 10;
      }
    }

    // alert("Score: " + totalScore);
    handleOpenAddQuestionModal2()

    const data = {
      totalPoints: totalScore,
      categoryName: category,
      userId: doctorId,
    };

    try {
      const response = await fetch('https://quizapi-omsn.onrender.com/api/submit/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        console.log('Data submitted successfully:', responseData);

        
      } else {
        console.error('Error submitting Data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTimerEnd = () => {
    alert("Data adding...");
    // handleSubmitButton();
    handleCloseAddQuestionModal2()
  };

  return (
    <div className="flex flex-col w-screen px-5 h-screen bg-blue-500 justify-center items-center" style={customStyles}>

      <QuizTimer score={score} handleTimerEnd={handleTimerEnd} />
      <Clock/>
      {questions.length > 0 && currentQuestion < questions.length && (
        <div className="flex flex-col justify-center items-center  w-full">
          <h4 className="mt-10 text-xl text-white/60">
            Question {currentQuestion + 1} of {questions.length}
          </h4>
          <div className="mt-4 text-2xl text-white text-center">
          {currentQuestion + 1}.  {questions[currentQuestion].question}
          </div>
        </div>
      )}
      {currentQuestion < questions.length && (
        <div className="grid grid-cols-2  gap-x-4 gap-y-4">
          {questions[currentQuestion].answerOptions.map((answer, index) => (
            <div
              key={index}
              onClick={(e) => {
                if (!answer.disabled) {
                  handleAnswerOption(answer.answer);
                }
              }}
              className={` "transform -skew-x-6 flex items-center w-[400px] py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer  ${
                isChecked && answerStatus[currentQuestion] !== null
                  ? answer.isCorrect
                    ? 'bg-green-300'
                    : 'bg-red-500'
                  : answer.backgroundColor || 'bg-white/5'
              }`}
            >
              <input
                type="radio"
                name={answer.answer}
                value={answer.answer}
                onChange={(e) => handleAnswerOption(answer.answer)}
                checked={
                  answer.answer === selectedOptions[currentQuestion]?.answerByUser
                }
                disabled={answer.disabled || isChecked}
                className={`w-6 h-6 bg-black ${
                  answer.disabled ? 'cursor-not-allowed' : ''
                }`}
              />
              <p
                className={`ml-6 text-white ${
                  answer.disabled ? 'text-gray-500' : ''
                }`}
              >
                {answer.answer}
              </p>
            </div>
          ))}
          <div className="flex justify-between w-full mt-4 text-white">
            <div className="flex justify-between w-full mt-4 space-x-4">
              <button
                onClick={handleCheck}
                className={`flex-1 text-white bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                  !isOptionSelected ? 'cursor-not-allowed' : ''
                }`}
              >
                Submit
              </button>
              <button
                onClick={handleNext}
                className={`flex-1 py-3 bg-indigo-600 rounded-lg text-white`}
              >
                {currentQuestion + 1 === questions.length ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showScore && (
        <button
          onClick={openModal}
          className="block text-white m-[10px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Score
        </button>
      )}

{isAddQuestionModalOpen && <Poup

isOpen={isAddQuestionModalOpen}
onClose={handleCloseAddQuestionModal2}

scorePoints={score}
/>}





      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={closeModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {score}
                </h3>
                <button
                  onClick={handleConfirm}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mathematics;
