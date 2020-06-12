import consts from "../consts/question";

const initialState = {
  questions: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case consts.SET_QUESTION_LOADING_FLAG:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case consts.ADD_QUESTION:
      return {
        ...state,
        isLoading: false,
        questions: [action.payload.question, ...state.questions],
      };

    case consts.GET_ALL_QUESTION:
      return { ...state, questions: [...action.payload.questions] };

    default:
      return state;
  }
}
