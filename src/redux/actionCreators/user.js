import consts from "../consts/user";

import { saveUser, getAllUsers } from "../../services/userServices";

import converObjCollectionToArr from "../../utils/convertToArr";

function generateIdFromName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(
      /([^A-Z0-9]+)(.)/gi, //match multiple non-letter/numbers followed by any character
      function (match) {
        return arguments[2].toUpperCase(); //3rd index is the character we need to transform uppercase
      }
    );
}

export function addNewUser(user) {
  return function (dispatch) {
    return saveUser({ ...user, id: generateIdFromName(user.name) }).then(
      (user) =>
        dispatch({
          type: consts.ADD_USER,
          payload: {
            user: user,
          },
        })
    );
  };
}

export function getUsers() {
  return function (dispatch) {
    return getAllUsers().then((users) =>
      dispatch({
        type: consts.GET_ALL_USERS,
        payload: {
          users: converObjCollectionToArr(users),
        },
      })
    );
  };
}

export function setLoggedInUser(user) {
  return {
    type: consts.SET_LOGGEDIN_USER,
    payload: {
      user,
    },
  };
}

export function removeLoggedInUser() {
  return {
    type: consts.REMOVE_LOGGEDIN_USER,
  };
}
