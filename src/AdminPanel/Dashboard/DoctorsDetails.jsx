import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const DoctorsDetails = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const apiUrl = 'https://quizapi-omsn.onrender.com/api/get/docter/name';

  useEffect(() => {
    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setDoctorsData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Define a dictionary for category colors
  const categoryColors = {
    Entertainment: 'bg-blue-200',
    Astronomy: 'bg-yellow-200',
    History: 'bg-red-200',
    Science: 'bg-green-200',
    Literature: 'bg-purple-200',
    Geography: 'bg-indigo-200',
    Wildlife: 'bg-pink-200',
    Technology: 'bg-teal-200',
    Mathematics: 'bg-orange-200',
  };

  return (
    <>
      <Sidebar />



      
      <div className="relative overflow-x-auto">
        <table className="w-[70vw] ml-[300px] mt-[40px] text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-l-lg text-black">
                Doctor Name
              </th>
              <th scope="col" className="px-6 py-3 text-black">
                Categories
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-lg text-black">
                Scores
              </th>
            </tr>
          </thead>
          <tbody>
            {doctorsData.map((doctor, index) => (
              <tr className={index % 2 === 0 ? 'bg-white' : 'dark:bg-gray-800'} key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {doctor.doctorName}
                </th>
                <td className="px-6 py-4">
                  {Object.keys(doctor.QuizCategory)
                    .filter((category) => doctor.QuizCategory[category].isPlayed)
                    .map((category) => (
                      <div
                        key={category}
                        className={`${
                          categoryColors[category] || 'bg-gray-200'
                        } p-2 rounded-md`}
                      >
                        {category}
                      </div>
                    ))}
                </td>
                <td className="px-6 py-4">
                  {Object.keys(doctor.QuizCategory)
                    .filter((category) => doctor.QuizCategory[category].isPlayed)
                    .map((category) => (
                      <div
                        key={category}
                        className={`${
                          categoryColors[category] || 'bg-gray-200'
                        } p-2 rounded-md`}
                      >
                        {doctor.QuizCategory[category].TotalPoints || 0}
                      </div>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DoctorsDetails;
