import consts from "../consts/user";

const initialState = {
  loggedInUser: null,
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case consts.ADD_USER:
      return { ...state, users: [...state.users, action.payload.user] };

    case consts.GET_ALL_USERS:
      return { ...state, users: [...action.payload.users] };

    case consts.SET_LOGGEDIN_USER:
      return { ...state, loggedInUser: action.payload.user };

    case consts.REMOVE_LOGGEDIN_USER:
      return { ...state, loggedInUser: null };

    default:
      return state;
  }
}
