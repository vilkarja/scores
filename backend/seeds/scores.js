const passwordUtil = require('./../utils/password');

const ADJECTIVES = [
    "Running",
    "Flying",
    "Swimming",
    "Walking",
    "Laughing",
    "Smiling",
    "Freezing",
    "Thinking",
    "Cheerful",
    "Happy"
];

const ANIMALS = [
    "Squirrel",
    "Mouse",
    "Dog",
    "Cat",
    "Koala",
    "Zebra",
    "Hedgehog",
    "Gecko",
    "Lamb",
    "Salmon",
    "Bear"
];


// Creates a list of random users 
function generateUserList(numOfUsers) {
    let scoreList = [];

    for (let i = 0; i < numOfUsers; i++) {
        let name = `${ ADJECTIVES[Math.floor(Math.random()*ADJECTIVES.length)] }${ ANIMALS[Math.floor(Math.random()*ANIMALS.length)] }`
        let user = {
            userName: name,
            points: Math.floor(Math.random() * 1000)
        };
        scoreList.push(user);
    }

    return scoreList;
}



exports.seed = async (knex) => {
    const SCORES_LIST = generateUserList(200);
    const hashedPassword = await passwordUtil.hashPassword('password');

    await knex("scores").del(); // Delete old scores
    await knex('scores').insert(SCORES_LIST); // Add new scores as list

    await knex("users").del(); // Delete old users
    await knex('users').insert({
        username: "test",
        password: hashedPassword.hash
    }); // Add new scores as list

    console.log('seed done')
};