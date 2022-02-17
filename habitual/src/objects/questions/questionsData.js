class questionObj {
  constructor(questionName, options) {
    this.questionName = questionName;
    this.options = options;
  }
}

export default questionObj;

export const quizQuestions = [
  new questionObj("How is your day going so far?", [
    "Good",
    "Neither Good Nor Bad",
    "Bad",
  ]),
  new questionObj("How stressfull are you feeling?", [
    "Not stressed at all",
    "Stressed a little bit",
    "Very Stressed",
  ]),
  new questionObj("How is your mental health lately?", [
    "Good",
    "Neither Good Nor Bad",
    "Bad",
  ]),
  new questionObj("How is your sleeping lately?", [
    "I oversleep",
    "I sleep the average recommended",
    "What is sleep?",
  ]),
  new questionObj("How often do you workout?", [
    "All the time",
    "Sometimes",
    "Never",
  ]),
  new questionObj("Have you been on track with you schedule lately?", [
    "Yes",
    "I try to",
    "What schedule?",
  ]),
];
