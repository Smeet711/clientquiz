import React, { useState, useEffect,useRef } from "react";
import Image from "./king.png";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from 'react-spinners';
import back from './leaderbg.png'
import './Leader.css'

const LeaderBoard = () => {

  const customStyles = {
    fontFamily: 'Roboto, sans-serif',
    backgroundImage: `url(${back})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontSize: '20px',
  }



  const topPlayerRef = useRef(null);



  const [top3FilteredDoctors, setTop3FilteredDoctors] = useState([]);
  const [top3Doctors, setTop3Doctors] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

const [top1, settop1] = useState("")

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const navigate = useNavigate();
  const { doctorId } = useParams();
  const { category } = useParams();

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
  };

  const handleCategoryChange2 = (event) => {
    const newCategory = event.target.value;
    setSelectedState(newCategory);
  };


  const playOther = () => {
    navigate("/home");
    // window.location.reload();
  };
 
  const fetchCat = () => {
    useEffect(() => {
      // Make an HTTP request to fetch the data from the API
      fetch(`https://quizapi-omsn.onrender.com/api/get/leaderboard/${category}`)
        .then((response) => response.json())
        .then((data) => {
          // Extract the relevant data (doctorName and score) from the API response
          const categoryLeaderboard = data.categoryLeaderboard || [];
          setLeaderboardData(categoryLeaderboard);
           
          console.log(data);

           

          // Now you have the top 1 doctor's information in the `topOneDoctor` variable
        

        })
        .catch((error) => console.error("Error fetching data:", error));
        // fetchCat();
    },
  []
    
    
    );
  };
// console.log(response);
  fetchCat();

 
  // const topThreeDoctors = leaderboardData
  // .sort((a, b) => b.score - a.score) // Sort by score in descending order
  // .slice(0, 3); // Take the top 3 doctors
  // settop1(topThreeDoctors[0])




  // const scro = ()=>{
  //   ref.current?.scrollIntoView({ behavior: 'smooth' });
  // }


// const load = ()=>{
//     // alert("laoding ")
//     setIsLoading(true);
//     if (selectedCategory && selectedState) {
//       // Make a POST request with the selected category and state
//       const requestBody = {
//         state: selectedState,
//         categoryName: selectedCategory,
//       };

// console.log("Cat " + selectedCategory);
// console.log("State " + selectedState);

//       fetch("https://quizapi-omsn.onrender.com/api/get/filter/leaderboard", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//       })
//         .then((response) => response.json())
        
//         .then((data) => {
//           // Handle the response from the POST request here
          
//           console.log("POST request response:", data);
//           const categoryLeaderboard2 = data.categoryLeaderboard || [];
//           setFilteredData(categoryLeaderboard2);
//           setShowFilteredData(true);
//           setIsSuccess(true);

//             setIsLoading(false);
//             console.log(isLoading);
         
//             // const topPlayerElement = topPlayerRef.current;
//             // console.log(topPlayerElement);
//             //     if (topPlayerElement) {
//             //       topPlayerElement.scrollIntoView({
//             //         behavior: "smooth", // You can use "auto" for immediate scrolling
//             //         block: "start",     // You can use "end" or "center" for different alignments
//             //       });
//             //     }
          
             
          
          
           



//         })
//         .catch((error) => {
//           console.error("Error making POST request:", error);
//         });
//       }

// }



const load = () => {
  // alert("laoding ");
  setIsLoading(true);
  if (selectedCategory && selectedState) {
    // Make a POST request with the selected category and state
    const requestBody = {
      state: selectedState,
      categoryName: selectedCategory,
    };

    console.log("Cat " + selectedCategory);
    console.log("State " + selectedState);

    fetch("https://quizapi-omsn.onrender.com/api/get/filter/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the POST request here

        console.log("POST request response:", data);
        const categoryLeaderboard2 = data.categoryLeaderboard || [];
        setFilteredData(categoryLeaderboard2);
      
        setShowFilteredData(true);
        setIsSuccess(true);
        setIsLoading(false);

        // Update the top3Doctors state with the fetched data
        // Sort the data by score in descending order
        const sortedLeaderboard = categoryLeaderboard2.sort(
          (a, b) => b.score - a.score
        );

        // Get the top 3 doctors
        const top3 = sortedLeaderboard.slice(0, 3);

        // Update the top3Doctors state
        setTop3Doctors(top3);

        const topPlayerElement = topPlayerRef.current;
        console.log(topPlayerElement);
        if (topPlayerElement) {
          topPlayerElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
  }
};









  useEffect(() => {
    if (isSuccess) {
      const topPlayerElement = topPlayerRef.current;
      console.log(topPlayerElement);
      if (topPlayerElement) {
        topPlayerElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [isSuccess]);


  // const topOneDoctor = leaderboardData.length > 0 ? leaderboardData[0] : null;

  // Now you have the top 1 doctor's information in the `topOneDoctor` variable
  
  useEffect(() => {
    // Fetch leaderboard data and get the top 3 doctors
    if (category) {
      fetch(`https://quizapi-omsn.onrender.com/api/get/leaderboard/${category}`)
        .then((response) => response.json())
        .then((data) => {
          const categoryLeaderboard = data.categoryLeaderboard || [];

          // Sort the categoryLeaderboard by score in descending order
          const sortedLeaderboard = categoryLeaderboard.sort(
            (a, b) => b.score - a.score
          );

          // Get the top 3 doctors
          const top3 = sortedLeaderboard.slice(0, 3);

          // Set the top 3 doctors in state
          setTop3Doctors(top3);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [category]);

 
  useEffect(() => {
    if (selectedCategory && selectedState) {
      // Make an HTTP request to fetch the data from the API
      fetch(`https://quizapi-omsn.onrender.com/api/get/filter/leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: selectedState,
          categoryName: selectedCategory,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Extract the relevant data (doctorName and score) from the API response
          const categoryLeaderboard = data.categoryLeaderboard || [];
  
          // Sort the categoryLeaderboard by score in descending order
          const sortedLeaderboard = categoryLeaderboard.sort(
            (a, b) => b.score - a.score
          );
  
          // Get the top 3 doctors
          const top3 = sortedLeaderboard.slice(0, 3);
  
          // Set the top 3 doctors in state
          setTop3FilteredDoctors(top3);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [selectedCategory, selectedState]);
  



// state fetching 


// useEffect(() => {
//   // Fetch leaderboard data and get the top 3 doctors
//   if (category) {
//     fetch(`https://quizapi-omsn.onrender.com/api/get/leaderboard/${category}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const categoryLeaderboard = data.categoryLeaderboard || [];

//         // Sort the categoryLeaderboard by score in descending order
//         const sortedLeaderboard = categoryLeaderboard.sort((a, b) => b.score - a.score);

//         // Get the top 3 doctors
//         const top3 = sortedLeaderboard.slice(0, 3);
// console.log(top3);




//         // Fetch the state for each of the top 3 doctors
//         const statePromises = top3.map(async (doctor) => {
//           const doctorName = doctor.doctorName;
// // console.log("dcot"+doctorName);
//           // Make an API call to fetch the state based on the doctor's name
//           const response = await fetch(`https://quizapi-omsn.onrender.com/api/get/users-name-state-city?name=${doctorName}`);
//           const stateData = await response.json();
//           // console.log(`State data for ${doctorName}:`, stateData);
//           // Create a new object with the doctor's data and the state
//           // console.log(doctor);
//           console.log(stateData);
//           const doctorWithState = {
//             ...doctor,
//             state: stateData.state,
//           };
//           // console.log(doctorWithState);
//           return doctorWithState;
//         });

//         // Wait for all state promises to resolve
//         Promise.all(statePromises)
//           .then((doctorsWithState) => {
//             // Now you have the top 3 doctors with their respective states
//             setTop3Doctors(doctorsWithState);
//           })
//           .catch((error) => console.error("Error fetching state data:", error));
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }
// }, [category]);





const top10Data = leaderboardData
    .sort((a, b) => b.score - a.score)
    .slice(0, 7);

    const filtertop10Data = filteredData.sort((a, b) => b.score - a.score);


const gotohome = ()=>{
  navigate('/home')
}
const playagain = ()=>{
  navigate('/cat')
}

  

  return (
    <>

{/* {console.log(top3Doctors)} */}




<section className="" style={customStyles}>


<main class="max-w-6xl mx-auto pt-1 pb-36 px-8 w-[100vw]  overflow-x-hidden">
<button
          onClick={playOther}
          class="py-3 px-5 mb-1  mt-1 text-sm text-white font-medium text-center bg-green-950 rounded-lg  sm:w-fit "
        >
          Back to Home
        </button>

        <h1 class="text-2xl font-semibold mb-6 lg:text-5xl"><span class="text-red-800">Leaderboard</span> </h1>

  <div class="max-w-md mx-auto mb-14 text-center">
    <h1 class="text-4xl font-semibold mb-6 lg:text-5xl"><span class="text-yellow-500">Top 3 Players</span> of {category}</h1>
    {/* <p class="text-xl text-gray-500 font-medium">Choose a plan that works best for you and your team.</p> */}
  </div>
  
  <div class="flex flex-col justify-between items-center lg:flex-row lg:items-start">
    
    <div class="w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none">
      <div class="mb-7 pb-7 flex items-center border-b border-gray-300">
      <img src={Image}  alt="" class="rounded-3xl w-20 h-20" />
        <div class="ml-5">
          {/* <span class="block text-2xl font-semibold">{topDoctor2.doctorName}</span> */}
          {top3Doctors.length > 2  ? <span class="block text-3xl font-semibold ">Dr. {top3Doctors[1].doctorName}</span>  : <p>...</p>}
          {/* <span><span class="font-medium text-gray-500 text-xl align-top">$&thinsp;</span><span class="text-3xl font-bold">10 </span></span><span class="text-gray-500 font-medium">/ user</span> */}
        </div>
      </div>
      {/* <ul class="mb-7 font-medium text-gray-500">
        <li class="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span class="ml-3"> <span class="text-black"></span></span>
        </li>
        <li class="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span class="ml-3"><span class="text-black"></span></span>
        </li>
        <li class="flex text-lg">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span class="ml-3"><span class="text-black"></span> </span>
        </li>
      </ul> */}
      <a href="#/" class="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl">
      {/* Score :- {topDoctor2.score} */}
      {top3Doctors.length > 2  ? <span class="block text-3xl font-semibold text-white"> Score : {top3Doctors[1].score}</span>  : <p>...</p>}
        {/* <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" class="ml-2" /> */}
       
      </a>
    </div>
    
    <div class="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0">
      <div class="mb-8 pb-8 flex items-center border-b border-gray-600">
        <img src={Image}  alt="" class="rounded-3xl w-20 h-20" />
        <div class="ml-5">
        
          {/* <span class="block text-3xl font-semibold text-white">{top3Doctors[0].doctorName}</span> */}

          {top3Doctors.length > 2  ? <span class="block text-3xl font-semibold text-white">Dr. {top3Doctors[0].doctorName}</span>  : <p>...</p>}

          {/* <span><span class="font-medium text-xl align-top">$&thinsp;</span><span class="text-3xl font-bold text-white">24 </span></span><span class="font-medium">/ user</span> */}
        </div>
      </div>
      {/* <ul class="mb-10 font-medium text-xl">
        <li class="flex mb-6">
          <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
          <span class="ml-3"> <span class="text-white"></span></span>
        </li>
        <li class="flex mb-6">
          <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
          <span class="ml-3"> <span class="text-white"></span></span>
        </li>
        <li class="flex">
          <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
          <span class="ml-3"><span class="text-white"></span> </span>
        </li>
      </ul> */}
      <a href="#/" class="flex justify-center items-center bg-indigo-600 rounded-xl py-6 px-4 text-center text-white text-2xl">
       {/* Score :-  {topDoctor.score} */}
       {top3Doctors.length > 2  ? <span class="block text-3xl font-semibold text-white"> Score : {top3Doctors[0].score}</span>  : <p>...</p>}
        {/* <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" class="ml-2" /> */}
      </a>
    </div>
    
    <div class="w-full flex-1 mt-8 p-8 order-3 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3 lg:rounded-l-none">
      <div class="mb-7 pb-7 flex items-center border-b border-gray-300">
      <img src={Image}  alt="" class="rounded-3xl w-20 h-20" />
        <div class="ml-5">
          {/* <span class="block text-2xl font-semibold">{topDoctor3.doctorName}</span> */}
          {top3Doctors.length > 2  ? <span class="block text-3xl font-semibold ">Dr. {top3Doctors[2].doctorName}</span>  : <p>...</p>}
          {/* <span><span class="font-medium text-gray-500 text-xl align-top">$&thinsp;</span><span class="text-3xl font-bold">35 </span></span><span class="text-gray-500 font-medium">/ user</span> */}
        </div>
      </div>
      {/* <ul class="mb-7 font-medium text-gray-500">
        <li class="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span class="ml-3"><span class="text-black"></span></span>
        </li>
        <li class="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span class="ml-3"> <span class="text-black"></span></span>
        </li>
        <li class="flex text-lg">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span class="ml-3"><span class="text-black"></span> </span>
        </li>
      </ul> */}
      <a href="#/" class="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl">
       {/* Score :- {topDoctor3.score} */}
       {top3Doctors.length > 2  ? <span class="block text-3xl font-semibold text-white"> Score : {top3Doctors[2].score}</span>  : <p>...</p>}
        {/* <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" class="ml-2" /> */}
      </a>
    </div>
    
  </div>
  
</main>



{/* new ui ends */}





    {/* // */}
   
<div className="w-[100vw] ">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md bg-gradient-to-b ">
        <h1 className="text-2xl font-semibold mb-6 lg:text-5xl ">LeaderBoard </h1>
        {/* <button
          onClick={playOther}
          class="py-3 px-5 mb-10  mt-10 text-sm text-white font-medium text-center bg-green-950 rounded-lg  sm:w-fit "
        >
          Back to Home
        </button> */}

        <div>
          <label
            for="state"
            class="block mb-2  text-sm font-medium text-white dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option selected="">Select Category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
            <option value="Science">Science</option>
            <option value="Astronomy">Astronomy</option>
            <option value="Literature">Literature</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Technology">Technology</option>
            <option value="Wildlife">Wildlife</option>
          </select>
        </div>

        <div>
          <label
            for="state"
            class="block mb-2 mt-10 text-sm font-medium text-white dark:text-white"
          >
            State
          </label>
          <select
            id="category"
            value={selectedState}
            onChange={handleCategoryChange2}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
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
<option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
  <option value="Chandigarh">Chandigarh</option>
  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
  <option value="Delhi (National Capital Territory of Delhi)">Delhi (National Capital Territory of Delhi)</option>
  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
  <option value="Ladakh">Ladakh</option>
  <option value="Lakshadweep">Lakshadweep</option>
  <option value="Puducherry">Puducherry</option>
          </select>
        </div>

        <button onClick={load}    disabled={isLoading}
  className={`py-3 px-5 mt-10 text-sm text-white font-medium text-center ${
    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-400'
  } rounded-lg sm:w-fit`}> {isLoading ? (
    <BeatLoader className='spinnercss' size={10} color={'#ffffff'} />
  ) : (
    'Load'
  )}</button>
      </div>



{showFilteredData ? (
  


       <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md bg-gradient-to-b">
  

  <h1  ref={topPlayerRef} class="text-4xl font-semibold mb-6 lg:text-5xl"><span class="text-yellow-500">Top  Players</span> of {selectedCategory} in <span className="text-orange-400">{selectedState}</span> </h1>


  <div className="container">
      <div className="maindiv">
        <div id="header">
          <h1>Ranking</h1>
        </div>
        <div id="leaderboard">
          <div className="ribbon"></div>
          <table>
            {filtertop10Data.slice(0, 7).map((doctor, index) => (
              <tr key={index}>
                <td className="number">{index + 1}</td>
                <td className="name">
                 Dr. {doctor.doctorName}
                </td>
               
                <td className={`points ${index < 3 ? '' : ''}`}>
                {index < 3 ? Math.floor(doctor.score) : doctor.score.toFixed(0)}{' '}
                  {index < 3 && (
                    <img
                      className="gold-medal"
                      src={Image}
                      alt="gold medal"
                    />
                  )}
                </td>
              </tr>
            ))}
          </table>
          
        </div>
      </div>
    </div>
</div>

      ) : (
       
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md bg-gradient-to-b">
          
          <h1  class="text-4xl font-semibold mb-6 lg:text-5xl"><span class="text-yellow-500">Top  Players</span> of {category} </h1>
          <div className="container">
<div className="maindiv ">
      <div id="header">
        <h1>Ranking</h1>
       
      </div>
      <div id="leaderboard">
        <div class="ribbon"></div>
        

<table>
            {top10Data.map((doctor, index) => (
              <tr key={index}>
                <td className="number">{index + 1}</td>
                <td className="name">Dr. {doctor.doctorName}</td>
                <td className="name">{doctor.state}</td>
                <td className="points">
                {index < 3 ? Math.floor(doctor.score) : doctor.score.toFixed(0)}{' '}
              
                  {index < 3 && (
                    <img
                      className="gold-medal"
                      src={Image}
                      alt="gold medal"
                    />
                  )}
                </td>
              </tr>
            ))}
          </table>

      
      </div>
      </div>

      </div>
        </div>
      )}
</div>
</section>



{/* // new ui of table starts  */}
{/* <div className="container">
<div className="maindiv ">
      <div id="header">
        <h1>Ranking</h1>
       
      </div>
      <div id="leaderboard">
        <div class="ribbon"></div>
        

<table>
            {top10Data.map((doctor, index) => (
              <tr key={index}>
                <td className="number">{index + 1}</td>
                <td className="name">{doctor.doctorName}</td>
                <td className="points">
                  {doctor.score.toFixed(3)}{' '}
                  {index < 3 && (
                    <img
                      className="gold-medal"
                      src={Image}
                      alt="gold medal"
                    />
                  )}
                </td>
              </tr>
            ))}
          </table>










        <div id="buttons">
          <button class="exit">Exit</button>
          <button class="continue">Continue</button>
        </div>
      </div>
      </div>

      </div> */}



















    </>
  );
};

export default LeaderBoard;
