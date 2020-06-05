import { _saveUser, _getUsers } from "../_DATA";

export function saveUser(user) {
  return _saveUser(user);
}

export function getAllUsers() {
  return _getUsers();
}
