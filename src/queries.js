import { HttpError } from 'wasp/server';

export const getUserExams = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  return context.entities.Exam.findMany({
    where: { userId: context.user.id }
  });
};

export const getExam = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  const exam = await context.entities.Exam.findUnique({
    where: {
      id: args.examId,
      userId: context.user.id
    }
  });

  if (!exam) { throw new HttpError(404, 'Exam not found'); }

  return exam;
};
