const React = require("react");
const { mount } = require("enzyme");
const { Match } = require("../../src/client/match");
const { quizzes } = require("../../src/server/db/quizzes");
const { overrideFetch, asyncCheckCondition } = require("../mytest-utils");
const { app } = require("../../src/server/app");
const { resetAllUsers } = require("../../src/server/db/users");

beforeEach(() => {
  resetAllUsers();
});

async function signup(userId, password) {
  const response = await fetch("/api/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId: userId, password: password })
  });

  return response.status === 201;
}

function isQuizDisplayed(driver) {
  const quiz = driver.find(".quiz");
  const questions = driver.find(".question");
  const answers = driver.find(".answer");

  return quiz.length === 1 && questions.length === 1 && answers.length === 4;
}

function getDisplayedQuiz(driver) {
  const quizDiv = driver.find(".quiz").at(0);
  const html_id = quizDiv.prop("id");
  const id = parseInt(html_id.substring("quiz_".length, html_id.length));

  const quiz = quizzes.find(e => e.id === id);
  return quiz;
}

async function waitForQuizDisplayed(driver) {
  const displayed = await asyncCheckCondition(
    () => {
      driver.update();
      return isQuizDisplayed(driver);
    },
    2000,
    200
  );

  return displayed;
}

async function waitForChangeOfQuiz(driver, currentQuizId) {
  const changed = await asyncCheckCondition(
    () => {
      driver.update();

      const quizDivs = driver.find(".quiz");
      if (quizDivs.length === 0) {
        return true;
      }

      const html_id = quizDivs.at(0).prop("id");
      const id = parseInt(html_id.substring("quiz_".length, html_id.length));

      return id !== currentQuizId;
    },
    2000,
    200
  );

  return changed;
}

async function startMatch() {
  const response = await fetch("/api/matches", {
    method: "post",
    headers: { "Content-Type": "application/json" }
  });

  return response.status === 201;
}

test("Test rendered quiz", async () => {
  overrideFetch(app);

  const signedup = await signup("foo", "bar");
  expect(signedup).toEqual(true);

  const started = await startMatch();
  expect(started).toEqual(true);

  const driver = mount(<Match />);

  const displayed = await waitForQuizDisplayed(driver);

  const html = driver.html();
  expect(html.includes("ERROR")).toEqual(false);
  expect(html.includes("Loading")).toEqual(false);

  expect(displayed).toEqual(true);
});

test("Test do answer wrongly", async () => {
  overrideFetch(app);
  await signup("foo", "bar");
  await startMatch();

  const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());
  const driver = mount(
    <Match fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} />
  );

  await waitForQuizDisplayed(driver);

  const quiz = getDisplayedQuiz(driver);
  const wrong = (quiz.indexOfRightAnswer + 1) % 4;

  const first = driver.find(".answer").at(wrong);
  first.simulate("click");

  const changed = await waitForChangeOfQuiz(driver, quiz.id);
  expect(changed).toEqual(true);

  const html = driver.html();
  const lost = html.includes("Lost");
  const won = html.includes("Won");

  expect(lost).toEqual(true);
  expect(won).toEqual(false);
});

test("Test do answer correctly", async () => {
  overrideFetch(app);
  await signup("foo", "bar");
  await startMatch();

  const driver = mount(<Match />);

  await waitForQuizDisplayed(driver);

  const quiz = getDisplayedQuiz(driver);
  const correct = quiz.indexOfRightAnswer;

  const first = driver.find(".answer").at(correct);
  first.simulate("click");

  const changed = await waitForChangeOfQuiz(driver, quiz.id);
  expect(changed).toEqual(true);

  const html = driver.html();
  const lost = html.includes("Lost");
  const won = html.includes("Won");

  expect(lost).toEqual(false);
  expect(won).toEqual(false);

  //game still on
  const displayed = await waitForQuizDisplayed(driver);
  expect(displayed).toEqual(true);
});

test("Test win match", async () => {
  overrideFetch(app);
  await signup("foo", "bar");
  await startMatch();

  const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());
  const driver = mount(
    <Match fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} />
  );

  await waitForQuizDisplayed(driver);

  for (let i = 0; i < 3; i++) {
    const quiz = getDisplayedQuiz(driver);
    const correct = quiz.indexOfRightAnswer;

    const first = driver.find(".answer").at(correct);
    first.simulate("click");

    const changed = await waitForChangeOfQuiz(driver, quiz.id);
    expect(changed).toEqual(true);
  }

  const lost = driver.html().includes("Lost");
  const won = driver.html().includes("Won");

  expect(lost).toEqual(false);
  expect(won).toEqual(true);
});
