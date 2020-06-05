import consts from "../consts/question";

import { saveQuestion } from "../../services/questionServices";

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
