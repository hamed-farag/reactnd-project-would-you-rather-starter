import { _saveQuestion, _getQuestions } from "../_DATA";

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function getAllQuestions() {
  return _getQuestions();
}
