import React, { useState, useEffect } from 'react';
import './Categories.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import back from './catbg.png'
import ques from './ques.png'
import brand from './sompraz.png'

const Categories = () => {
  
  const customStyles = {
    backgroundImage: `url(${back})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontSize: '20px',
  };

  const navigate = useNavigate();
  const { doctorId } = useParams();

  const [selectedDiv, setSelectedDiv] = useState(null);
  const [divValue, setDivValue] = useState('');

  // State to hold category play status
  const [categoryStatus, setCategoryStatus] = useState({});

  useEffect(() => {
    // Fetch the QuizCategory data for the doctorId and update categoryStatus accordingly
    const fetchData = async () => {
      try {
        const response = await fetch(`https://quizapi-omsn.onrender.com/api/get/users/${doctorId}`);

      console.log(response);
     
        const data = await response.json();
        
{console.log(doctorId);}

        console.log(data);
        
        if (data && data.QuizCategory) {
          setCategoryStatus(data.QuizCategory);
         
          console.log(data);
        }else{
          console.log("no data");
          console.log(categoryStatus);
        }
      } catch (error) {
      
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [doctorId]);


  
  const gotoquizpage = () => {
    if (divValue === 'Entertainment') {
      navigate(`/enter/${doctorId}?category=${divValue}`);
      window.location.reload();
    } else if (divValue === 'Astronomy') {
      navigate(`/astro/${doctorId}?category=${divValue}`);
      window.location.reload();
    } else if (divValue === 'History') {
      navigate(`/hist/${doctorId}?category=${divValue}`);
      window.location.reload();
    }   else if (divValue === 'Literature') {
      navigate(`/liter/${doctorId}?category=${divValue}`);
      window.location.reload();
    } else if (divValue === 'Mathematics') {
      navigate(`/maths/${doctorId}?category=${divValue}`);
      window.location.reload();
    }else if (divValue === 'Science') {
      navigate(`/science/${doctorId}?category=${divValue}`);
      window.location.reload();
    }else if (divValue === 'Technology') {
      navigate(`/tech/${doctorId}?category=${divValue}`);
      window.location.reload();
    }else if (divValue === 'Wildlife') {
      navigate(`/wild/${doctorId}?category=${divValue}`);
      window.location.reload();
    }else if (divValue === 'Geography') {
      navigate(`/geo/${doctorId}?category=${divValue}`);
      window.location.reload();
    }











  };

  const handleDivClick = (id, category) => {
    if (categoryStatus[category].isPlayed) {
      // If the category is already played, do nothing
      return;
    }
    setSelectedDiv(id);
    setDivValue(category);
  };

  const selectedClass = (id) => {
    return id === selectedDiv
      ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white transform scale-105 transition-transform shadow-lg'
      : 'bg-white text-gray-700 hover:bg-blue-100 transition-transform shadow-md';
  };

  return (

    <section className='' style={customStyles}> 
    
<img className=' w-[100px]  ml-2 absolute left-0 ' src={ques} alt="" />

<img className=' w-[100px] mr-2 mt-5 absolute right-0' src={brand} alt="" />

    <div className="  h-[220vh] sm:h-[150vh]">
      <h1 className=" relative top-10   text-4xl font-bold text-center p-[50px] mb-0">Choose a Quiz Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 m-5">
       
        {Object.entries(categoryStatus).map(([category, categoryData], index) => (
          
          <div
            key={index}
            className={`p-6 rounded border-4 cursor-pointer transform transition-transform ${selectedClass(index + 1)} ${
              categoryData.isPlayed ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleDivClick(index + 1, category)}
          >
           
            <div className="text-2xl font-semibold text-center">{category}</div>
            {categoryData.isPlayed ? (
              <div className="text-sm text-gray-500 mt-2 text-center">Already Played</div>
            ) : null}
          </div>
        ))}
      </div>
<div className='flex justify-center '>
      <button
        onClick={gotoquizpage}
        type="button"
        className="mt-12 mx-auto px-6 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:via-blue-700 hover:to-blue-600 transition-all shadow-lg"
        disabled={!divValue || categoryStatus[divValue].isPlayed}
      >
        Start Quiz
      </button>
      </div>
    </div>
    </section>
  );
};

export default Categories;
