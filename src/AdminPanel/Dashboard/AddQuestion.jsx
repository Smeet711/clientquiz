import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQuestion = ({ isOpen, onClose, onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [answerOptions, setAnswerOptions] = useState([
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
  ]);

  const showToastMessage = () => {
    toast.success('Question Created !', {
        position: toast.POSITION.TOP_RIGHT
    });
};




  const handleAnswerOptionChange = (index) => (e) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index].answer = e.target.value;
    setAnswerOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (index) => (e) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index].isCorrect = e.target.checked;
    setAnswerOptions(updatedOptions);
  };

  const handleAddQuestion = async () => {
    const newQuestionData = {
      question,
      category,
      answerOptions,
    };

    let baseUrl = "https://backup-quiz-server.onrender.com/api/createquestions";

    let url = baseUrl;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestionData),
      });

      if (response.ok) {
        // Question added successfully, you can handle success here
        alert("Question Created Wowow");
        showToastMessage()
        console.log("Question added successfully");
      } else {
        // Handle error responses here
        console.error("Error adding question:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions here
      console.error("Error adding question:", error);
    }

    // Clear the form after submission
    setQuestion("");
    setCategory("");
    setAnswerOptions([
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ]);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="relative bg-white w-full h-auto max-w-md p-8 rounded-lg shadow-lg z-50">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-4">Add a New Question</h2>
        <label className="block mb-2">
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </label>
        <label className="block mb-2">
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
          {/* <select
            // id="category"
            // value={selectedCategory}
            // onChange={handleCategoryChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option selected="">Select Category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
            <option value="Science">Science</option>
            <option value="Astronomy">Astronomy</option>
          </select> */}
        </label>
        <h3 className="text-lg font-medium mb-2">Answer Options:</h3>
        {answerOptions.map((option, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option.answer}
              onChange={handleAnswerOptionChange(index)}
              className="w-full border rounded-md py-2 px-3 mt-1"
            />
            <label className="mt-1 flex items-center space-x-2">
              <input
                type="radio"
                name="correctAnswer"
                checked={option.isCorrect}
                onChange={handleCorrectAnswerChange(index)}
                className="h-5 w-5 text-blue-500"
              />
              <span className="text-gray-600">Correct Answer</span>
            </label>
          </div>
        ))}
        <button
          onClick={handleAddQuestion}
          className="w-full mt-4 bg-blue-500 text-white rounded-md py-2 font-medium hover:bg-blue-600"
        >
          Add Question
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddQuestion;
