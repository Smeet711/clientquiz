import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
// const [categoryCount, setCategoryCount] = useState(0);
// import axios from 'axios'; // You may need to install axios if you haven't already

const AdminCategory = () => {

 const [categories, setCategories] = useState([]);
 useEffect(() => {
    // Make an HTTP GET request to fetch data from the API
    fetch('https://quizapi-omsn.onrender.com/api/get/docter/name')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Extract the relevant data from the response
        data = data[0];
  
        // Extract all categories from the data (without filtering)
        const allCategories = Object.keys(data.QuizCategory).slice(0, 9);
        // setCategoryCount(allCategories.length);
        // Update the state with all categories
        setCategories(allCategories);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  





  return (
    <>
    <Sidebar  />
{/* // starts  */}

{/* <div class="flex flex-col items-center justify-center w-screen h-screen px-10 py-20 text-gray-700 bg-gray-100">

	<div class="flex flex-col items-center w-full max-w-screen-md p-6 pb-6 bg-white rounded-lg shadow-xl sm:p-8">
		<h2 class="text-xl font-bold">Monthly Revenue</h2>
		<span class="text-sm font-semibold text-gray-500">2020</span>
		<div class="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$37,500</span>
				<div class="relative flex justify-center w-full h-8 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-6 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full h-16 bg-indigo-400"></div>
				<span class="absolute bottom-0 text-xs font-bold">Jan</span>
			</div>
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$45,000</span>
				<div class="relative flex justify-center w-full h-10 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-6 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full h-20 bg-indigo-400"></div>
				<span class="absolute bottom-0 text-xs font-bold">Feb</span>
			</div>
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$47,500</span>
				<div class="relative flex justify-center w-full h-10 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-8 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full h-20 bg-indigo-400"></div>
				<span class="absolute bottom-0 text-xs font-bold">Mar</span>
			</div>
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$50,000</span>
				<div class="relative flex justify-center w-full h-10 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-6 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full h-24 bg-indigo-400"></div>
				<span class="absolute bottom-0 text-xs font-bold">Apr</span>
			</div>
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$47,500</span>
				<div class="relative flex justify-center w-full h-10 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-8 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full h-20 bg-indigo-400"></div>
				<span class="absolute bottom-0 text-xs font-bold">May</span>
			</div>
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$55,000</span>
				<div class="relative flex justify-center w-full h-12 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-8 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full h-24 bg-indigo-400"></div>
				<span class="absolute bottom-0 text-xs font-bold">Jun</span>
			</div>
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$60,000</span>
				<div class="relative flex justify-center w-full h-12 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-16 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full h-20 bg-indigo-400"></div>
				<span class="absolute bottom-0 text-xs font-bold">Jul</span>
			</div>
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$57,500</span>
				<div class="relative flex justify-center w-full h-12 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-10 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full h-24 bg-indigo-400"></div>
				<span class="absolute bottom-0 text-xs font-bold">Aug</span>
			</div>
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$67,500</span>
				<div class="relative flex justify-center w-full h-12 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-10 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full h-32 bg-indigo-400"></div>
				<span class="absolute bottom-0 text-xs font-bold">Sep</span>
			</div>
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$65,000</span>
				<div class="relative flex justify-center w-full h-12 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-12 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full bg-indigo-400 h-28"></div>
				<span class="absolute bottom-0 text-xs font-bold">Oct</span>
			</div>
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$70,000</span>
				<div class="relative flex justify-center w-full h-8 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-8 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full h-40 bg-indigo-400"></div>
				<span class="absolute bottom-0 text-xs font-bold">Nov</span>
			</div>
			<div class="relative flex flex-col items-center flex-grow pb-5 group">
				<span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$75,000</span>
				<div class="relative flex justify-center w-full h-12 bg-indigo-200"></div>
				<div class="relative flex justify-center w-full h-8 bg-indigo-300"></div>
				<div class="relative flex justify-center w-full h-40 bg-indigo-400"></div>
				<span class="absolute bottom-0 text-xs font-bold">Dec</span>
			</div>
		</div>
		<div class="flex w-full mt-3">
			<div class="flex items-center ml-auto">
				<span class="block w-4 h-4 bg-indigo-400"></span>
				<span class="ml-1 text-xs font-medium">Existing</span>
			</div>
			<div class="flex items-center ml-4">
				<span class="block w-4 h-4 bg-indigo-300"></span>
				<span class="ml-1 text-xs font-medium">Upgrades</span>
			</div>
			<div class="flex items-center ml-4">
				<span class="block w-4 h-4 bg-indigo-200"></span>
				<span class="ml-1 text-xs font-medium">New</span>
			</div>
		</div>
	</div>
</div> */}
  
{/* // ends  */}
    <div className="ml-[300px] h-[100vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {categories.map((category, index) => (
    
    <div key={index} className="relative">
      <img
        className="h-auto max-w-full rounded-lg opacity-70 hover:opacity-100 transition-opacity"
        src={`https://source.unsplash.com/900x700/?${category.toLowerCase()}`}
        alt={category}
        title={category}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white  text-3xl font-bold pointer-events-none">
        {category}
      </div>
    </div>
  ))}
</div>



    </>
    
  )
}

export default AdminCategory