import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getExam, startExam, submitAnswer } from 'wasp/client/operations';

const ExamPage = () => {
  const { examId } = useParams();
  const { data: exam, isLoading, error } = useQuery(getExam, { examId });
  const startExamFn = useAction(startExam);
  const submitAnswerFn = useAction(submitAnswer);
  const [answers, setAnswers] = useState({});

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleStartExam = () => {
    startExamFn({ examId });
  };

  const handleSubmitAnswer = (questionId) => (answer) => {
    submitAnswerFn({ questionId, answer });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Exam: {exam.title}</h1>
      <button onClick={handleStartExam} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Start Exam</button>
      {exam.questions.map((question) => (
        <div key={question.id} className='border border-gray-300 p-4 my-4 rounded-lg'>
          <p className='font-bold'>{question.content}</p>
          <input type='text' value={answers[question.id] || ''} onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })} className='border border-gray-300 rounded p-2 my-2' />
          <button onClick={() => handleSubmitAnswer(question.id)(answers[question.id])} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Submit Answer</button>
        </div>
      ))}
      <Link to='/exams' className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4'>Back to Exams</Link>
    </div>
  );
}

export default ExamPage;