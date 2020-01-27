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


// Creates a list of random scores 
function generateScoreList(numOfUsers, scoreTableId) {
    let scoreList = [];

    for (let i = 0; i < numOfUsers; i++) {
        let name = `${ ADJECTIVES[Math.floor(Math.random()*ADJECTIVES.length)] }${ ANIMALS[Math.floor(Math.random()*ANIMALS.length)] }`
        let user = {
            userName: name,
            points: Math.floor(Math.random() * 1000),
            scoretable_id: scoreTableId
        };
        scoreList.push(user);
    }

    return scoreList;
}



exports.seed = async (knex) => {

    const FIRST_USER_ID = 1;
    const SECOND_USER_ID = 2;
    const FIRST_SCORETABLE_ID = 1;
    const SECOND_SCORETABLE_ID = 2;
    const NUM_OF_SCORES = 202;
    
    const hashedPassword = await passwordUtil.hashPassword('password');
    await knex("users").del(); // Delete old users
    await knex('users').insert({
        id: FIRST_USER_ID,
        username: "tester",
        password: hashedPassword.hash
    }); // Add test account

    await knex('users').insert({
        id: SECOND_USER_ID,
        username: "tester2",
        password: hashedPassword.hash
    }); // Add second account

    await knex("scoretables").del(); // Delete old score tables
    await knex('scoretables').insert([{
        id: FIRST_SCORETABLE_ID ,
        name: "Testers scores",
        user_id: FIRST_USER_ID,
        
    },
    {
        id: SECOND_SCORETABLE_ID,
        name: "Tester2s scores",
        user_id: SECOND_USER_ID,
        
    }]); // Add scoretables

    // Add scores to to the first users scoretable
    const SCORES_LIST = generateScoreList(NUM_OF_SCORES, FIRST_SCORETABLE_ID);

    await knex("scores").del(); // Delete old scores
    await knex('scores').insert(SCORES_LIST); // Add new scores as list

    console.log('seed done')
};