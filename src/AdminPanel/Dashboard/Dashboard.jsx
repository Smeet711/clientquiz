import React,{useState,useEffect} from 'react'
import AddQuestion from './AddQuestion';
import EditQuestionForm from './EditQuestionForm';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './Sidebar';
const Dashboard = () => {

const [Questions, setQuestions] = useState([])
const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);


const [questionData, setQuestionData] = useState(null);



const navigate = useNavigate()


const handleOpenAddQuestionModal2 = () => {
   setIsAddQuestionModalOpen(true);
 };
 
 const handleCloseAddQuestionModal2 = () => {
   setIsAddQuestionModalOpen(false);
   window.location.reload();
 };
 
 const handleAddQuestion2 = (newQuestion) => {
   // Handle adding the new question to your data or API
   console.log('Adding new question:', newQuestion);
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
       throw new Error('Question not found');
     }
     const data = await response.json();
     console.log(data);
     setQuestionData(data);
   //   setEditFormVisible(true);

   handleOpenAddQuestionModal2()
  
   } catch (error) {
     console.error('Error fetching question data:', error);
   }


 };

const handleDeleteQuestion = async (questionId) => {

   let baseUrl = `https://backup-quiz-server.onrender.com/api/delquestions/${questionId}`;
   let url = baseUrl;

   try {
     const response = await fetch((url), {
       method: 'DELETE',
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
       console.error('Question not found.');
       // Handle the case where the question was not found.
     } else {
       console.error('Error deleting question.');
       // Handle other errors here.
     }
   } catch (error) {
     console.error('Error deleting question:', error);
     // Handle network or other errors here.
   }
 };
 
 const handleDeleteQuestionID = async (questionId) => {
   console.log('Deleting question with ID:', questionId); // Add this line
   try {
     // ... rest of your code
   } catch (error) {
     console.error('Error deleting question:', error);
   }
 };
 





  const onUpdateQuestion = (updatedQuestionData) => {
    // Find the index of the updated question in the state
    const updatedQuestionIndex = Questions.findIndex(
      (question) => question._id === updatedQuestionData._id
    );

    if (updatedQuestionIndex !== -1) {
      // Create a new array with the updated question
      const updatedQuestions = [...Questions];
      updatedQuestions[updatedQuestionIndex] = updatedQuestionData;
      setQuestions(updatedQuestions);
      handleCloseEditForm();
    }
  };



const handleOpenAddQuestionModal = () => {
  setIsAddQuestionModalOpen(true);
};

const handleCloseAddQuestionModal = () => {
  setIsAddQuestionModalOpen(false);
};

const handleAddQuestion = (newQuestion) => {
  // Handle adding the new question to your data or API
  console.log('Adding new question:', newQuestion);
  // Close the modal
  setIsAddQuestionModalOpen(false);
};


//get all questions
  const baseUrl = "https://backup-quiz-server.onrender.com/api/questions";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const responseData = await response.json();
          setQuestions(responseData); // Set all questions without filtering
          // setAnswerStatus(Array(responseData.length).fill(null)); // Initialize answerStatus based on fetched data
        } else {
          console.error('Error fetching questions:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [baseUrl]);
  


  const gotok = ()=>{
   navigate("/page2")
}













  return (
    <>
    
{/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button> */}


<Sidebar/>

<div class="p-4 sm:ml-64">
   <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div class="grid grid-cols-3 gap-4 mb-4">
         <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
      </div>

{/* all questions  */}

      <div class="flex items-center justify-center h-auto mb-4 rounded bg-gray-50 dark:bg-gray-800">
       
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Question Name
                </th>
                <th scope="col" class="px-6 py-3">
                   
                </th>
                <th scope="col" class="px-6 py-3">
                   
                </th>
                <th scope="col" class="px-6 py-3">
                    
                </th>
                <th scope="col" class="px-6 py-3">
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
          
          {Questions.map((question, index) => (
      <tr key={index} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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

        <button className='focus:outline-none mt-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
        <ToastContainer />
        <td class="px-6 py-4">
        <button className='text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={() => fetchQuestionData(question._id)}>Edit</button>
          {/* <a onClick={fetchQuestionData(question._id)}  class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
        </td>

        
{isAddQuestionModalOpen && <EditQuestionForm

isOpen={isAddQuestionModalOpen}
onClose={handleCloseAddQuestionModal2}
questionData={questionData}
/>}


      

      </tr>
    ))}
           
           
            
        </tbody>
    </table>
</div>




      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
      </div>
      <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
         <p class="text-2xl text-gray-400 dark:text-gray-500">
            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
         </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
      </div>
   </div>
</div>

    
    </>
  )
}

export default Dashboard