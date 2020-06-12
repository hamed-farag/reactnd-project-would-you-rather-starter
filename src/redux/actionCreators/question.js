import consts from "../consts/question";

import {
  saveQuestion,
  getAllQuestions,
  updateQuestionChoice,
} from "../../services/questionServices";

export function addNewQuestion(question) {
  return function (dispatch) {
    return saveQuestion(question).then((question) => {
      dispatch({
        type: consts.ADD_QUESTION,
        payload: {
          question,
        },
      });
    });
  };
}

export function getQuestions() {
  return function (dispatch) {
    return getAllQuestions().then((questions) => {
      const questionsArr = Object.values(questions);
      // sort by timestamp
      questionsArr.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      dispatch({
        type: consts.GET_ALL_QUESTION,
        payload: {
          questions: questionsArr,
        },
      });
    });
  };
}

export function updateQuestionAnswer(questionId, answer, userId) {
  return function (dispatch) {
    // instead to update the question in the store, component will fetch again all questions
    return updateQuestionChoice(questionId, answer, userId);
  };
}

export function setIsLoadingFlag(isLoading) {
  return {
    type: consts.SET_QUESTION_LOADING_FLAG,
    payload: {
      isLoading,
    },
  };
}
