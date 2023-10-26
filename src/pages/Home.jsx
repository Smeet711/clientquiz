import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from '../components/Searchbar/SearchBar'
import { SearchResultsList } from '../components/Searchbar/SearchResultsList'
import { BeatLoader } from 'react-spinners';
import './Home.css'

const Home = () => {



  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


const [results, setResults] = useState([]);

const [inputNameValue, setInputNameValue] = useState('');
const [inputCityValue, setInputCityValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  // const [storedData, setStoredData] = useState([]);

    const navigate = useNavigate()

    const intropage1 = ()=>{

        navigate("/intro1")

    }


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

  









      const postData = (e) => {
        e.preventDefault()
        // console.log(selectedOption);
        if (!inputNameValue || !inputCityValue || !selectedOption  || selectedOption === 'Select State') {
          alert("Fields are Empty")
          return;
        }

        setIsLoading(true);

       
        const newData = {
          doctorName: inputNameValue,
          city: inputCityValue,
          state: selectedOption,
        };




        fetch('https://quizapi-omsn.onrender.com/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        })
          .then((response) => response.json())
          
          .then((data) => {
            console.log("home page"+data.message);
            
            setInputNameValue(data.doctorName);
            setInputCityValue(data.city);
            setSelectedOption(data.state);
            // alert("Data Added")
            setIsSuccess(true);
            setIsLoading(false);
            navigate(`/cat/${data.Id}`);
            // navigate('/cat');
            
          })
          .catch((error) => {
            console.error('Error posting data:', error);
            setIsLoading(false);
          });
         
      }
















      


      const handleInputChange = (e) => {
        setInputNameValue(e.target.value);
      };

      const handleInputChange2 = (e) => {
        setInputCityValue(e.target.value);
      };

    

      const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
      };

  return (
   <>
 


   <section class="h-[200vh]">
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-white dark:text-white">Welcome to the Quiz</h2>
      <p class="mb-8 lg:mb-16 font-light text-center text-black dark:text-gray-400 sm:text-xl">Let's Play.</p>
      <form action="#" class="space-y-8 ">
        <div className=''>
          <div>
              <label for="name" class="block mb-2 text-sm font-medium  text-white dark:text-gray-300">Doctor Name</label>
              <input type="name" value={inputNameValue} onChange={handleInputChange} id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter Name" required/>
          </div>
          <div>
              <label for="city" class="block mb-2 mt-8 text-sm font-medium text-white dark:text-gray-300">City</label>
              <input type="text" value={inputCityValue} onChange={handleInputChange2} id="subject" class="block p-3  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter Your City" required/>
          </div>
          <div>
                  <label for="state" class="block mb-2 mt-8 text-sm font-medium text-white dark:text-white">State</label>
                  <select value={selectedOption} onChange={handleDropdownChange} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option selected="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
<option value="Arunachal Pradesh">Arunachal Pradesh</option>
<option value="Assam">Assam</option>
<option value="Bihar">Bihar</option>
<option value="Chhattisgarh">Chhattisgarh</option>
<option value="Goa">Goa</option>
<option value="Gujarat">Gujarat</option>
<option value="Haryana">Haryana</option>
<option value="Himachal Pradesh">Himachal Pradesh</option>
<option value="Jharkhand">Jharkhand</option>
<option value="Karnataka">Karnataka</option>
<option value="Kerala">Kerala</option>
<option value="Madhya Pradesh">Madhya Pradesh</option>
<option value="Maharashtra">Maharashtra</option>
<option value="Manipur">Manipur</option>
<option value="Meghalaya">Meghalaya</option>
<option value="Mizoram">Mizoram</option>
<option value="Nagaland">Nagaland</option>
<option value="Odisha">Odisha</option>
<option value="Punjab">Punjab</option>
<option value="Rajasthan">Rajasthan</option>
<option value="Sikkim">Sikkim</option>
<option value="Tamil Nadu">Tamil Nadu</option>
<option value="Telangana">Telangana</option>
<option value="Tripura">Tripura</option>
<option value="Uttar Pradesh">Uttar Pradesh</option>
<option value="Uttarakhand">Uttarakhand</option>
<option value="West Bengal">West Bengal</option>
                  </select>
              </div>
              </div>


              <button onClick={postData}    disabled={isLoading}
  className={`py-3 px-5 text-sm text-white font-medium text-center ${
    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-400'
  } rounded-lg sm:w-fit`}> {isLoading ? (
    <BeatLoader className='spinnercss' size={10} color={'#ffffff'} />
  ) : (
    'Lets Go'
  )}</button>








              {/* <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Doctor name..."/>
    </div> */}
   




{/* <ul>
        {data.doctorNames.map((item) => (
          <li key={item._id}>{item.doctorName}</li>
        ))}
      </ul> */}



{/* searchbar starts here  */}

<div className="search-bar-container">
        <SearchBar setResults={setResults} />
     
        {results && results.length > 0 && <SearchResultsList results={results}  />}
        

    


      </div>









{/* searchbar starts here  */}




         
          {/* <button onClick={intropage1} type="submit" class="py-3 px-5 text-sm text-white font-medium text-center bg-blue-500 rounded-lg  sm:w-fit ">Submit</button> */}
      </form>
  </div>
</section>


   
   </>
  )
}

export default Home