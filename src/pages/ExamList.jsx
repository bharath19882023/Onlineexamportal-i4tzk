import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, getUserExams } from 'wasp/client/operations';

const ExamListPage = () => {
  const { data: exams, isLoading, error } = useQuery(getUserExams);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {exams.map((exam) => (
        <Link to={`/exam/${exam.id}`} key={exam.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{exam.title}</div>
          <div>{exam.questions.length} questions</div>
        </Link>
      ))}
    </div>
  );
}

export default ExamListPage;