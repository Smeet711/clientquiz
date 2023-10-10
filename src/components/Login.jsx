import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import Image from '../assets/background.png'

import './Login.css'

const Login = () => {

  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [answerOptions, setAnswerOptions] = useState([
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
  ]);
  
  const handleAnswerOptionChange = (index) => (e) => {
    const newAnswerOptions = [...answerOptions];
    newAnswerOptions[index].answer = e.target.value;
    setAnswerOptions(newAnswerOptions);
  };

  const handleCorrectAnswerChange = (index) => (e) => {
    const newAnswerOptions = [...answerOptions];
    newAnswerOptions[index].isCorrect = e.target.checked;
    setAnswerOptions(newAnswerOptions);
  };

  const handleAddQuestion = async () => {
    // Create a new question object with the current state
    const newQuestionData = {
      question,
      category,
      answerOptions,
    };

    let baseUrl = "https://backup-quiz-server.onrender.com/api/createquestions"

let url = baseUrl;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestionData),
      });

      if (response.ok) {
        // Question added successfully, you can handle success here
        alert("Question Created Wowow")
        console.log('Question added successfully');
      } else {
        // Handle error responses here
        console.error('Error adding question:', response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions here
      console.error('Error adding question:', error);
    }

    // Clear the form after submission
    setQuestion('');
    setCategory('');
    setAnswerOptions([
      { answer: '', isCorrect: false },
      { answer: '', isCorrect: false },
      { answer: '', isCorrect: false },
      { answer: '', isCorrect: false },
    ]);
  };

//
//
//

const gotoadmin = ()=>{
  navigate('/loginadmin')
}






    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   
    const navigate = useNavigate()

    const handleLogin = (e) => {
      e.preventDefault();
  
      // Hardcoded email and password for demo purposes
      const hardcodedEmail = 'mr@gmail.com';
      const hardcodedPassword = 'pass';

      
      
  
      if (email === hardcodedEmail && password === hardcodedPassword) {
        // Successful login, navigate to '/home'
       
        navigate("/home")

      } else {
        // Display an error message or handle failed login
        alert('Invalid email or password. Please try again.');
      }
    };


// creating questions 



















  return (
    <>
    
    <section class="">

  <div class="flex flex-row items-center justify-between px-6 py-8 mx-auto md:h-screen lg:py-0">
      {/* <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
        User Quiz Login  
      </a> */}







      <div className=' w-[100vw] h-[100vh]  flex justify-center items-center  '>
      
      <div class="w-full h-[350px]   bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-2xl font-semibold text-center   text-gray-900 md:text-2xl dark:text-white">
              User Login 
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">


{/* // new email field  */}

              <div class="flex">
  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
    </svg>
  </span>
  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" id="email"  class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie Green"/>
</div>

{/* // new email field  */}

                  {/* <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      
                      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                  </div> */}

{/* // new pass field starts  */}
<div class="flex">
  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
  <FontAwesomeIcon icon={faLock} size="lg" color="#000" />

  </span>
  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" id="password"  placeholder="••••••••" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
</div>

{/* // new pass field ends  */}




                  {/* <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div> */}




                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
{/* <Link to="/home">Submit</Link> */}

<button onClick={handleLogin} type="button" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
  Login
  {/* <Link to="/home">Login</Link>  */}
</button>
<button onClick={gotoadmin} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Admin Login
    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>
</button>
                  {/* <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login </button> */}
                  {/* <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p> */}
              </form>
          </div>
      </div>
      </div>
  </div>
</section>







    </>
  )
}

export default Login