import consts from "../consts/user";

import { saveUser } from "../../services/userServices";

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
