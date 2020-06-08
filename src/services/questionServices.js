import { _saveQuestion, _getQuestions, _saveQuestionAnswer } from "../_DATA";

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function getAllQuestions() {
  return _getQuestions();
}

export function updateQuestionChoice(questionId, answer, userId) {
  return _saveQuestionAnswer({
    authedUser: userId,
    qid: questionId,
    answer,
  });
}
