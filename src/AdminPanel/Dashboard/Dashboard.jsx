import React, { useState, useEffect } from "react";

import EditQuestionForm from "./EditQuestionForm";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Sidebar from "./Sidebar";
const Dashboard = () => {
  const [Questions, setQuestions] = useState([]);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [iseditQuestionModalOpen, setIseditQuestionModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [searchInput, setSearchInput] = useState("");



  const [isEditQuestionFormOpen, setIsEditQuestionFormOpen] = useState(false);
  const [questionDataForEdit, setQuestionDataForEdit] = useState(null);
  

  const handleEditQuestion = (question) => {
    setQuestionDataForEdit(question);
    setIsEditQuestionFormOpen(true);
  };
  





  const filteredQuestions = Questions.filter((question) =>
    question.question.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const navigate = useNavigate();

  // const handleOpenAddQuestionModal2 = () => {
  //   setIseditQuestionModalOpen(true);
  // };

  // const handleCloseAddQuestionModal2 = () => {
  //   setIseditQuestionModalOpen(false);
  //   window.location.reload();
  // };

  const handleAddQuestion2 = (newQuestion) => {
    // Handle adding the new question to your data or API
    console.log("Adding new question:", newQuestion);
    // Close the modal
    setIsAddQuestionModalOpen(false);
  };

  // Function to fetch data by ID
  const fetchQuestionData = async (questionId) => {
    let baseUrl = `https://backup-quiz-server.onrender.com/api/getquestion/${questionId}`;
    let url = baseUrl;

    try {
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        throw new Error("Question not found");
      }
      const data = await response.json();
      console.log(data);
      setQuestionData(data);
      //   setEditFormVisible(true);
      // handleOpenAddQuestionModal();
      setIsAddQuestionModalOpen(true);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };







  const handleDeleteQuestion = async (questionId) => {
    let baseUrl = `https://backup-quiz-server.onrender.com/api/delquestions/${questionId}`;
    let url = baseUrl;

    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      console.log(response.status);
      console.log(questionId);

      if (response.status === 204) {
        // showToastMessageDel()
        // Successfully deleted, you can update your UI or perform any other action here
        //  alert('Question deleted successfully.')
        window.location.reload();
        window.scrollTo(0, 0);

        // Optionally, you can update your questions array or state to reflect the deletion.
      } else if (response.status === 404) {
        console.error("Question not found.");
        // Handle the case where the question was not found.
      } else {
        console.error("Error deleting question.");
        // Handle other errors here.
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      // Handle network or other errors here.
    }
  };

  const handleDeleteQuestionID = async (questionId) => {
    console.log("Deleting question with ID:", questionId); // Add this line
    try {
      // ... rest of your code
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  // const onUpdateQuestion = (updatedQuestionData) => {
  //   // Find the index of the updated question in the state
  //   const updatedQuestionIndex = Questions.findIndex(
  //     (question) => question._id === updatedQuestionData._id
  //   );

  //   if (updatedQuestionIndex !== -1) {
  //     // Create a new array with the updated question
  //     const updatedQuestions = [...Questions];
  //     updatedQuestions[updatedQuestionIndex] = updatedQuestionData;
  //     setQuestions(updatedQuestions);
  //     handleCloseEditForm();
  //   }
  // };

  const handleOpenAddQuestionModal = () => {
    setIsAddQuestionModalOpen(true);
  };

  const handleCloseAddQuestionModal = () => {
    setIsAddQuestionModalOpen(false);
  };

  const handleAddQuestion = (newQuestion) => {
    // Handle adding the new question to your data or API
    console.log("Adding new question:", newQuestion);
    // Close the modal
    setIsAddQuestionModalOpen(false);
  };

  //get all questions
  const baseUrl = "https://backup-quiz-server.onrender.com/api/questions";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setQuestions(responseData); // Set all questions without filtering
          // setAnswerStatus(Array(responseData.length).fill(null)); // Initialize answerStatus based on fetched data
        } else {
          console.error("Error fetching questions:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [baseUrl]);

  const gotok = () => {
    navigate("/page2");
  };

  return (
    <>
      {/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button> */}

     

      <Sidebar />

      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="flex items-center justify-center h-auto rounded bg-gray-50 dark:bg-gray-800">
              <div class="max-w-sm p-6 h-[100%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <svg
                  class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
                <a href="#">
                  <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Daily Active Users{" "}
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Daily Active MRs on the Quiz Game
                </p>
                <a
                  href="#"
                  class="inline-flex items-center text-blue-600 hover:underline"
                >
                  See more
                  <svg
                    class="w-3 h-3 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div class="flex items-center justify-center h-auto rounded bg-gray-50 dark:bg-gray-800">
              <div class="max-w-sm p-6 h-[100%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <svg
                  class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
                <a href="#">
                  <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Monthly Active Users{" "}
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Monthly Active MRs on the Quiz Game
                </p>
                <a
                  href="#"
                  class="inline-flex items-center text-blue-600 hover:underline"
                >
                  See more
                  <svg
                    class="w-3 h-3 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div class="flex items-center justify-center h-auto rounded bg-gray-50 dark:bg-gray-800">
              <div class="max-w-sm p-6 h-[100%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <svg
                  class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
                <a href="#">
                  <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Live MRs - 20{" "}
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Current Active MRs on the Quiz Game
                </p>
                <a
                  href="#"
                  class="inline-flex items-center text-blue-600 hover:underline"
                >
                  See more
                  <svg
                    class="w-3 h-3 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* search bar  */}
          <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={searchInput} // Bind the search input value
                onChange={handleSearchInputChange}
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Questions..."
                required
              />
              {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </form>

          {/* search bar ends */}

          {/* all questions  */}

          <div class="flex items-center justify-center mt-10 h-auto mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-black">
                      Question Name
                    </th>
                    <th scope="col" class="px-6 py-3"></th>
                    <th scope="col" class="px-6 py-3"></th>
                    <th scope="col" class="px-6 py-3"></th>
                    <th scope="col" class="px-6 py-3 text-black">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Question
                </th>
                <td class="px-6 py-4">
                    
                </td>
                <td class="px-6 py-4">
                    
                </td>
                <td class="px-6 py-4">
                <a href="#" class="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</a>
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr> */}

                  {filteredQuestions.map((question, index) => (
                    <tr
                      key={index}
                      class="bg-white border-b dark:bg-gray-900 dark:border-gray-700      "
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                      >
                        {question.question}
                      </th>

                      <td class="px-6 py-4">
                        {/* Add other fields or components if needed */}
                      </td>
                      <td class="px-6 py-4">
                        {/* Add other fields or components if needed */}
                      </td>
                      {/* <td class="px-6 py-4">
          <a onClick={() => handleDeleteQuestion(question._id)} class="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</a>
        </td> */}

                      <button
                        className="focus:outline-none mt-4 ml-[150px] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => handleDeleteQuestion(question._id)}
                      >
                        Delete
                      </button>
                      <td class="px-6 py-4">
                        <button
                          className="text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          onClick={()=>fetchQuestionData(question._id)}
                        >
                          Edit
                        </button>
                        {/* <a onClick={fetchQuestionData(question._id)}  class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                      </td>
                     

                     {isAddQuestionModalOpen && (
                        <EditQuestionForm
                          isOpen={isAddQuestionModalOpen}
                          onClose={handleCloseAddQuestionModal}
                          questionData={questionData}
                        />
                      )} 



                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                class="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
