import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, startExam } from 'wasp/client/operations';

const HomePage = () => {
  const handleStartExam = () => {
    startExam();
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Welcome to the Online Exam Portal</h1>
      <p className='mb-4'>Please proceed to the exam by using facial recognition for authentication.</p>
      <p>Proctoring is enabled during the exam to ensure fair conduct.</p>
      <button
        onClick={handleStartExam}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Start Exam
      </button>
    </div>
  );
}

export default HomePage;