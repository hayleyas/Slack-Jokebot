const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-395357709623-394060065572-Y7jHYeWcUwlnJ5ZLPZCiTFEG',
    name: 'jokebot'
});

//Start handler.
bot.on('start', () => {
    const params = {
        icon_emoji: ':taco:'
    };

    bot.postMessageToChannel(
        'general', 
        'Get ready to laugh with @jokebot!',
        params
    );
});

//Error handler.
bot.on('error', err => console.log(err));

//Message handler.
bot.on('message', data => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
});

//Respond to data (messages).
function handleMessage(message) {
    if(message.includes(' chucknorris')) {
        chuckJoke();
    } else if(message.includes(' yomama')) {
        yoMamaJoke();
    } else if (message.includes( 'random')) {
        randomJoke();
    } else if (message.includes(' help')) {
        runHelp();
    }
}

//Tell a Chuck Norris joke.
function chuckJoke () {
    axios.get('http://api.icndb.com/jokes/random')
    .then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        };

        bot.postMessageToChannel(
            'general',
            `Chuck Norris: ${joke}`,
            params
        );
    });
}

//Tell a Yo Mama joke.
function yoMamaJoke () {
    axios.get('http://api.yomomma.info')
    .then(res => {
        const joke = res.data.joke;

        const params = {
            icon_emoji: ':laughing:'
        };

        bot.postMessageToChannel(
            'general',
            `Yo Mama: ${joke}`,
            params
        );
    });
}

//Tell a random joke.
function randomJoke() {
    const rand = Math.floor(Math.random() * 2) + 1;
    if (rand === 1) {
        chuckJoke();
    } else if (rand === 2) {
        yoMamaJoke();
    }
}

//Show help text.
function runHelp() {
    const params = {
        icon_emoji: ':question:'
    };

    bot.postMessageToChannel(
    'general',
    `Type @jokebot with either 'chucknorris', 'yomama', or 'random' to get a joke`,
    params);
}