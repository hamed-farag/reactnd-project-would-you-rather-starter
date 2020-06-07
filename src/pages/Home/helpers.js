export function getAnsweredQuestions(questions, loggedInUser) {
  return questions.filter((ques) => {
    if (ques.optionOne && ques.optionOne.votes.length > 0) {
      const index = ques.optionOne.votes.findIndex(
        (vote) => vote === loggedInUser.id
      );
      return index === -1 ? false : true;
    }
    if (ques.optionTwo && ques.optionTwo.votes.length > 0) {
      const index = ques.optionTwo.votes.findIndex(
        (vote) => vote === loggedInUser.id
      );
      return index === -1 ? false : true;
    }
    return false;
  });
}

export function getUnAnsweredQuestions(questions, loggedInUser) {
  return questions.filter((ques) => {
    if (ques.optionOne && ques.optionOne.votes.length > 0) {
      const index = ques.optionOne.votes.findIndex(
        (vote) => vote === loggedInUser.id
      );
      return index !== -1 ? false : true;
    }
    if (ques.optionTwo && ques.optionTwo.votes.length > 0) {
      const index = ques.optionTwo.votes.findIndex(
        (vote) => vote === loggedInUser.id
      );
      return index !== -1 ? false : true;
    }
    return false;
  });
}
