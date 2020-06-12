export function mapQuestionToSave(optionOneText, optionTwoText, authorId) {
  return {
    optionOneText,
    optionTwoText,
    author: authorId,
  };
}
