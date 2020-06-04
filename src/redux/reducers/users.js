import consts from "../consts/user";

const initialState = {
  loggedInUser: {},
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case consts.ADD_USER:
      return { ...state, users: [...state.users, action.payload.user] };
    default:
      return state;
  }
}
