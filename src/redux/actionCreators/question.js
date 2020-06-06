import consts from "../consts/question";

import { saveQuestion, getAllQuestions } from "../../services/questionServices";

import converObjCollectionToArr from "../../utils/convertToArr";

export function addNewQuestion(optionOneText, optionTwoText, authorId) {
  return function (dispatch) {
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authorId,
    }).then((question) => {
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
      const questionsArr = converObjCollectionToArr(questions);
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
