import { HttpError } from 'wasp/server'

export const startExam = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const exam = await context.entities.Exam.findUnique({
    where: { id: args.examId }
  });

  if (exam.userId !== context.user.id) { throw new HttpError(403) };

  const questions = await context.entities.Question.findMany({
    where: { examId: args.examId }
  });

  return { ...exam, questions };
}

export const submitAnswer = async ({ questionId, answer }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const question = await context.entities.Question.findUnique({ where: { id: questionId } });
  const updatedQuestion = await context.entities.Question.update({ where: { id: questionId }, data: { answer } });

  return updatedQuestion;
}