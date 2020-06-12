export function mapUserToSave(user) {
  return {
    name: user.name,
    avatarURL: user.avatarURL,
    questions: [],
    answers: {},
  };
}
