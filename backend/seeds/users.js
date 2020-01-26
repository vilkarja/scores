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
    let userList = [];

    for (let i = 0; i < numOfUsers; i++) {
        let name = `${ ADJECTIVES[Math.floor(Math.random()*ADJECTIVES.length)] }${ ANIMALS[Math.floor(Math.random()*ANIMALS.length)] }`
        let user = {
            userName: name,
            points: Math.floor(Math.random() * 1000)
        };
        userList.push(user);
    }

    return userList;
}



exports.seed = async (knex) => {
    const USER_LIST = generateUserList(200);

    await knex("scores").del(); // Delete old users
    await knex('scores').insert(USER_LIST); // Add new users as list

    console.log('seed done')
};