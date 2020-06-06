import consts from "../consts/question";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case consts.ADD_QUESTION:
      return [...state, action.payload.question];

    case consts.GET_ALL_QUESTION:
      return [...action.payload.questions];
    default:
      return state;
  }
}
