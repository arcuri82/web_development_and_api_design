const Users = require('../../../src/server/db/users');
const Matches = require('../../../src/server/db/matches');



beforeEach(() => {Users.resetAllUsers();});

test("Test get single quiz", () =>{

    const  id = "foo";
    Users.createUser(id, "123");

    const match = Matches.createMatch(id, 1);

    expect(match.current).toBe(0);
    expect(match.victory).toBe(false);
    expect(match.defeat).toBe(false);
    expect(match.quizzes.length).toBe(1);
    expect(match.quizzes[0].question).toBeDefined();
    expect(match.quizzes[0].answers).toBeDefined();
    expect(match.quizzes[0].answers.length).toBe(4);
});