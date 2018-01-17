let questions = [
  "What is the last name of your favorite 90's actress?",
  "What was your favorite type of candy in the 5th grade?"
];
let word_list = [
  'copper',
  'explain',
  'ill',
  'truck',
  'neat',
  'unite',
  'branch',
  'educate',
  'ten',
  'hum',
  'decisive',
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
];

let num_let_options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


let wrapEachLetter = function(str){
  let result = str.split('').map((letter, i) => i % 2 ? ('<span>' + letter + '</span>') : letter).join('');
  return result;
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
  
  let toggleDoorHanger = function() {
    doorhanger.setAttribute('open', doorhanger.getAttribute('open') === 'open' ? 'closed' : 'open');
    doorhanger.setAttribute('state', 'entrylist');
  }
  
  let createnewEntry = function() {
    if (doorhanger.getAttribute('open') != 'open' || !doorhanger.getAttribute('state', 'entrylist')) {
      return;
    }
    doorhanger.setAttribute('state', 'new-entry');
  }
  
  let showPrompt = function() {
    if (doorhanger.getAttribute('open') != 'open' || !doorhanger.getAttribute('state', 'new-entry')) {
      return;
    }
    doorhanger.setAttribute('state', 'generate');
    let question = questions[Math.floor(Math.random() * questions.length)];
    prompt.innerHTML = question;
  }
  
  let generateNewPassword = function(answer) {
    let result = '';
    for(var i = 0; i < answer.length * 2; i++) {
      if (i % 2 == 0) {
        result += num_let_options.charAt(Math.floor(Math.random() * num_let_options.length));
      } else {
        result += answer[Math.floor(i/2)];
      }
    }
    return wrapEachLetter(result);
  }
  
  let generateNewPhrase = function(answer) {
    for (let i = word_list.length - 1; i > 0; i--) {
       let j = Math.floor(Math.random() * (i + 1));
       [word_list[i], word_list[j]] = [word_list[j], word_list[i]];
   } 
    return `${word_list[0]}-${word_list[1]}-${answer}-${word_list[2]}`;
  }
  
  let submitAnswer = function() {
    answer = answer_input.value;
    if (doorhanger.getAttribute('open') != 'open'
    || !doorhanger.getAttribute('state', 'generate')
    || answer == '') {
      return;
    }
    
    password_result = generateNewPassword(answer);
    phrase_result = generateNewPhrase(answer);
    
    doorhanger.setAttribute('state', 'results');
    result_input.innerHTML = phrase_result;
  }
  
  let resultToggle = function(e) {
    if (e.target == password_switch) {
      result_input.innerHTML = password_result;
      results_wrapper.setAttribute('state', 'password');
    } else {
      result_input.innerHTML = phrase_result;
      results_wrapper.setAttribute('state', 'passphrase');
    }
  }
  
  answer_input.onkeyup = function() {
    if (answer_input.value != '') {
      document.getElementById('continue').style.opacity = 1;
    } else {
      document.getElementById('continue').style.opacity = 0;
    }
  }

  regenerate.onclick = function() {
    if (results_wrapper.getAttribute('state') == 'password') {
      password_result = generateNewPassword(answer);
      result_input.innerHTML = password_result;
    } else {
      phrase_result = generateNewPhrase(answer);
      result_input.innerHTML = phrase_result;
    }
  }
  
  password_switch.onclick = resultToggle;
  passphrase_switch.onclick = resultToggle;
  continue_button.onclick = submitAnswer;
  generate.onclick = showPrompt;
  new_button.onclick = createnewEntry;
  lb_icon.onclick = toggleDoorHanger; 
}


document.addEventListener('DOMContentLoaded', runTest, false);
