let questions = [
  {text: "What was your favorite candy when you were ten years old?", hint: "e.g. Runts, Twix"},
  {text: "What was the name of your favorite actor when you were a teenager?", hint: "e.g. Barrymore, Bassett"},
  {text: "What is the last name of your favorite teacher growing up?", hint: "e.g. Johnson, Adler "},
  {text: "What is the most dependable tool in your toolbox?", hint: "e.g. pliers, kindness"},
  {text: "What is the last name of your favorite athlete?", hint: "e.g. Sanders, Williams"},
  {text: "What is your favorite, oddly specific color?", hint: "e.g. fuschia, seafoam "},
  {text: "What’s a place in the world that you’ve always wanted to go?", hint: "e.g., Hogwarts, Santiago"},
  {text: "What’s the name of the street you were last on with a friend?", hint: "e.g., Franklin, Main"},
  {text: "What’s a topic you wish you knew more about?", hint: "e.g., carpentry, dressage"},
  {text: "Who’s the person that makes you laugh the hardest?", hint: "e.g., Jessica, Seinfeld"},
];
let word_list = [
  'copper',
  'explain',
  'ill',
  'talk',
  'go',
  'truck',
  'neat',
  'unite',
  'branch',
  'educate',
  'ten',
  'hum',
  'notice',
  'stitch',
  'laugh',
  'cute',
  'show',
  'three',
  'two',
  'why',
  'no',
  'yes',
  'you',
  'me',
  'go',
  'stop',
  'first',
  'safe',
  'home',
  'men',
  'jog',
  'wrist',
  'place',
  'hop',
  'unit',
  'untie',
  'cup',
  'run',
  'tie',
  'train',
  'key',
  'hand',
  'step',
  'floor',
  'zinc',
  'grin',
  'nice',
  'wire',
  'even',
  'odd',
  'lace',
  'nest',
  'alive',
  'find',
  'lost',
  'on',
  'thirsty',
  'sock',
  'cakes',
  'stay',
  'squeal',
  'rush',
  'glue',
  'baby',
  'see',
  'watch',
  'smell',
  'toil',
  'mine',
  'egg',
  'cold',
  'hot',
  'badge',
  'tiny',
  'slip',
  'sign',
  'awake',
  'aware',
  'flock',
  'love',
  'hate',
  'want',
  'drink',
  'turn',
  'glass',
  'all',
  'things',
  'cut',
  'loose',
  'lose',
  'break',
  'again',
  'war',
  'boo',
  'own',
  'plant',
  'star',
  'lie',
  'hop',
  'food',
  'fowl',
  'big',
  'pat',
  'hair',
  'alert',
  'reply',
  'steel',
  'trick',
  'nifty',
  'mist',
  'leg',
  'jog',
  'talk',
  'knee',
  'trip',
  'rob',
  'dare',
  'last',
  'use',
  'title',
  'mug',
  'false',
  'coat',
  'toy',
  'tan',
  'strap',
  'mark',
  'wait',
  'spot',
  'word',
  'hook',
  'wash',
  'chin',
  'fold',
  'alike',
  'drab',
  'pass',
  'maid',
  'air',
  'clean',
  'scarf',
  'time',
  'free',
  'calm',
  'float',
  'sore',
  'zoom',
  'bolt',
  'hot',
  'saw',
  'flat',
  'thank',
  'rule',
  'egg',
  'utter',
  'price',
  'water',
  'trade',
  'tip',
  'yam',
  'yak',
  'rate',
  'carve',
  'bit',
  'miss',
  'bang',
  'guess',
  'thaw',
  'look',
  'dry',
  'crown',
  'boil',
  'aunt',
  'little',
  'last',
  'peel',
  'smart',
  'card',
  'steer',
  'known',
  'honey',
  'wine',
  'third',
  'sail',
  'low',
  'dog',
  'cat',
  'vest',
  'belong',
  'long',
  'debt',
  'drum',
  'ajar',
  'kiss',
  'far',
  'form',
  'dad',
  'mom',
  'join',
  'plant',
  'quilt',
  'quit',
  'flow',
  'base',
  'run',
  'care',
  'ink',
  'side',
  'ocean',
  'elite',
  'whip',
  'quartz',
  'spare',
  'fair'
];

let all_options = ["0123456789", "!@#$%^&*()", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"];

// Helper functions
let shuffleArray = function(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let runTest = function() {
  let lb_icon = document.getElementById('lb-icon');
  let doorhanger = document.getElementById('doorhanger');
  let new_button = document.getElementById('new-button');
  let generate = document.getElementById('generate');
  let prompt = document.getElementById('prompt');
  let continue_button = document.getElementById('continue');
  let result_input = document.getElementById('generated-result');
  let phrase_result = '';
  let password_result = '';
  let password_switch = document.getElementById('password-switch');
  let passphrase_switch = document.getElementById('passphrase-switch');
  let results_wrapper = document.getElementById('results');
  let regenerate = document.getElementById('regenerate');
  let answer = '';
  let answer_input = document.getElementById('answer');
  let change_q = document.getElementById('change-q');
  let question_index = 0;
  let go_back = document.getElementById('go-back');
  let use_this = document.getElementById('use-this');
  let final_password = '';
  let dismiss = document.getElementById('dismiss');

  let toggleDoorHanger = function() {
    doorhanger.setAttribute('open', doorhanger.getAttribute('open') === 'open' ? 'closed' : 'open');
    doorhanger.setAttribute('state', 'generate');
    document.body.setAttribute('open', doorhanger.getAttribute('open'));
    
    shuffleArray(questions);
    let question = questions[question_index].text;
    prompt.innerHTML = question;
    answer_input.placeholder = questions[question_index].hint;

    // reset everything incase they begin again
    answer_input.value = '';
    answer = '';
  }

  let generateNewPassword = function(answer) {
    let result = '';
    let temp_result = '';

    let selection_length = answer.length >= 4? answer.length : (8 - answer.length);
    for (let i = 0; i < selection_length; i++) {
      if (i < 3) {
        temp_result += all_options[i].charAt(Math.floor(Math.random() * all_options[i].length));
      } else {
        let random_selection = Math.floor(Math.random() * 4);
        temp_result += all_options[random_selection].charAt(Math.floor(Math.random() * all_options[random_selection].length));
      }
    }
    // split just to use shuffleArray
    temp_result = temp_result.split('');
    shuffleArray(temp_result);
    temp_result = temp_result.join('');

    for(var i = 0; i < answer.length; i++) {
      result += temp_result[i] + '<span>' + answer[i] + '</span>';
    }
    result += temp_result.substr(answer.length);

    return result;
  }

  let generateNewPhrase = function(answer) {
    shuffleArray(word_list);
    let result = '';
    for (let i = 0; i < answer.length; i++) {
      result += '<span>' + answer[i] + '</span>';
    }

    let temp_word_list = [word_list[0], word_list[1], word_list[2], result]
    shuffleArray(temp_word_list)

    return `${temp_word_list[0]}-${temp_word_list[1]}-${temp_word_list[2]}-${temp_word_list[3]}`;
  }

  let submitAnswer = function() {
    answer = answer_input.value;
    if (doorhanger.getAttribute('open') != 'open'
    || doorhanger.getAttribute('state') != 'generate'
    || answer == '') {
      return;
    }
    answer = answer.replace(/\s/g, '');

    password_result = generateNewPassword(answer);
    phrase_result = generateNewPhrase(answer);

    doorhanger.setAttribute('state', 'results');
    doorhanger.setAttribute('type', 'passphrase');
    result_input.innerHTML = phrase_result;
    result_input.removeAttribute('edited');
  }

  let resultToggle = function(e) {
    if (e.target == password_switch) {
      result_input.innerHTML = password_result;
      doorhanger.setAttribute('type', 'password');
      result_input.removeAttribute('edited');
      use_this.classList.add('enabled');
    } else {
      result_input.innerHTML = phrase_result;
      doorhanger.setAttribute('type', 'passphrase');
      result_input.removeAttribute('edited');
      use_this.classList.add('enabled');
    }
  }

  document.getElementById('options').onclick = function() {
    if (doorhanger.getAttribute('options') == 'true') {
      doorhanger.removeAttribute('options');
    } else {
      doorhanger.setAttribute('options', 'true');
    }
  }

  answer_input.onkeyup = function(e) {
    if (answer_input.value != '') {
      document.getElementById('continue').classList.add('enabled');
    } else {
      document.getElementById('continue').classList.remove('enabled');
    }
    if (e.keyCode === 13) {
      continue_button.onclick();
    }
  }

  regenerate.onclick = function() {
    if (doorhanger.getAttribute('type') == 'password') {
      password_result = generateNewPassword(answer);
      result_input.innerHTML = password_result;
      result_input.removeAttribute('edited');
    } else {
      phrase_result = generateNewPhrase(answer);
      result_input.innerHTML = phrase_result;
      result_input.removeAttribute('edited');
    }
  }

  change_q.onclick = function() {
    question_index++;
    if (question_index >= questions.length) {
      question_index = 0;
    }
    prompt.innerHTML = questions[question_index].text;
    answer_input.value = '';
    continue_button.classList.remove('enabled');
    answer_input.placeholder = questions[question_index].hint;
  }

  go_back.onclick = function() {
    if (doorhanger.getAttribute('state') == 'results') {
      doorhanger.setAttribute('state', 'generate');
    }
  }

  result_input.oninput = function() {
    result_input.setAttribute('edited', 'true');
    if (result_input.innerText.trim() === '') {
      use_this.classList.remove('enabled');
    } else {
      use_this.classList.add('enabled');
    }
  }

  use_this.onclick = toggleDoorHanger;
  password_switch.onclick = resultToggle;
  passphrase_switch.onclick = resultToggle;
  continue_button.onclick = submitAnswer;
  lb_icon.onclick = toggleDoorHanger;
}

document.addEventListener('DOMContentLoaded', runTest, false);
