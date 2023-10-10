import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'







const LoginAdmin = () => {

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








    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   
    const navigate = useNavigate()

    const handleLogin = (e) => {
      e.preventDefault();
  
      // Hardcoded email and password for demo purposes
      const hardcodedEmail = 'admin';
      const hardcodedPassword = 'adminpass';

      
      
  
      if (email === hardcodedEmail && password === hardcodedPassword) {
        // Successful login, navigate to '/home'
       
        navigate("/dashboard")

      } else {
        // Display an error message or handle failed login
        alert('Invalid email or password. Please try again.');
      }
    };


// creating questions 



















  return (
    <>
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
         Admin Login  
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
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
                  {/* <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login </button> */}
                  {/* <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p> */}
              </form>
          </div>
      </div>
  </div>
</section>
















    </>
  )
}

export default LoginAdmin