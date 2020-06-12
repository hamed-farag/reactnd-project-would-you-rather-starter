export function getUnAnsweredQuestions(questions, loggedInUser) {
  return questions.filter((question) => {
    return (
      question.optionOne.votes.indexOf(loggedInUser.id) === -1 &&
      question.optionTwo.votes.indexOf(loggedInUser.id) === -1
    );
  });
}

export function getAnsweredQuestions(questions, loggedInUser) {
  return questions.filter((question) => {
    return (
      question.optionOne.votes.indexOf(loggedInUser.id) !== -1 ||
      question.optionTwo.votes.indexOf(loggedInUser.id) !== -1
    );
  });
}
