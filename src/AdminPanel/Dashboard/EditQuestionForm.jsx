import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditQuestionForm = ({ isOpen, onClose, questionData }) => {
  const [quesValue, setQuesValue] = useState(questionData ? questionData.question : '');
  const [quesCat, setQuesCat] = useState(questionData ? questionData.category : '');

  const [answerOptions, setAnswerOptions] = useState(
    questionData
      ? questionData.answerOptions
      : [
          { answer: '', isCorrect: false },
          { answer: '', isCorrect: false },
          { answer: '', isCorrect: false },
          { answer: '', isCorrect: false },
        ]
  );

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

  const showToastMessageEdit = () => {
    toast.success('Question Updated... !', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleUpdateQuestion = async () => {
    const baseUrl = `https://backup-quiz-server.onrender.com/api/updatequestions/${questionData._id}`;

    try {
      const updatedQuestionData = {
        question: quesValue,
        category: quesCat,
        answerOptions,
      };

      // Make a PUT request to update the question
      const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuestionData),
      });

      if (response.ok) {
        showToastMessageEdit();
      } else {
        console.error('Error updating question:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="absolute inset-0 opacity-40" onClick={onClose}></div>
      <div className="relative bg-gray-200 w-full max-w-md p-8 rounded-lg z-50">
        <h2 className="text-2xl font-semibold mb-4">Edit the Question</h2>
        <label className="block mb-2">Question:</label>
        <input
          type="text"
          value={quesValue}
          onChange={(e) => setQuesValue(e.target.value)}
          className="w-full border rounded-md py-2 px-3 mt-1"
        />
        <label className="block mb-2">Category:</label>
        <input
          type="text"
          value={quesCat}
          onChange={(e) => setQuesCat(e.target.value)}
          className="w-full border rounded-md py-2 px-3 mt-1"
        />
        {/* <h3 className="text-lg font-medium mb-2">Answer Options:</h3> */}
        {/* {answerOptions.map((option, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              // value={option.answer}
              onChange={handleAnswerOptionChange(index)}
              className="w-full border rounded-md py-2 px-3 mt-1"
            />
            <label className="mt-1 flex items-center space-x-2">
              <input
                type="radio"
                name="correctAnswer"
                // checked={option.isCorrect}
                onChange={handleCorrectAnswerChange(index)}
                className="h-5 w-5 text-blue-500"
              />
              <span className="text-gray-600">Correct Answer</span>
            </label>
          </div>
        ))} */}
        <button
          onClick={handleUpdateQuestion}
          className="w-full mt-4 bg-blue-500 text-white rounded-md py-2 font-medium hover:bg-blue-600"
        >
          Update Question
        </button>
      </div>
    </div>
  );
};

export default EditQuestionForm;
