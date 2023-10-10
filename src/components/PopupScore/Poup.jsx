import React, { useState } from 'react';

const Poup = ({ isOpen, onClose,scorePoints }) => {
 

    const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

    const handleOpenAddQuestionModal2 = () => {
        setIsAddQuestionModalOpen(true);
      };
      
      const handleCloseAddQuestionModal2 = () => {
        setIsAddQuestionModalOpen(false);
      };

  return (
   
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md p-8 rounded-lg shadow-lg z-50">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
       {console.log("Final Score "+scorePoints)}
        <h2 className="text-2xl font-semibold mb-4">{scorePoints}</h2>
       
      
       
        <button
onClick={onClose}
          className="w-full mt-4 bg-blue-500 text-white rounded-md py-2 font-medium hover:bg-blue-600"
        >
          Go to LeaderBoard
        </button>








      </div>
    </div>
  );
};

export default Poup;
