const audioElement = document.getElementById('audio');
const button = document.getElementById('button');

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

function tellJoke(joke) {
  VoiceRSS.speech({
    key: 'API_KEY',
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJoke() {
  try {
    toggleButton();
    let joke = '';
    const reponse = await fetch(
      'https://sv443.net/jokeapi/v2/joke/Programming'
    );
    const data = await reponse.json();

    if (data.type === 'twopart') {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellJoke(joke);
  } catch (err) {
    toggleButton();
    console.log(err);
  }
}

// Event listeners
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);
