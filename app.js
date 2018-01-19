let questions = [
  "What is the last name of your favorite 90's actress?",
  "What was your favorite type of candy in the 5th grade?",
  "Some other question",
  "And one more for kicks"
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

let num_let_options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

// Helper functions
let wrapEachLetter = function(str){
  let result = str.split('').map((letter, i) => i % 2 ? ('<span>' + letter + '</span>') : letter).join('');
  return result;
}

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
  let password_input = document.getElementById('password');
  
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
    if (doorhanger.getAttribute('open') != 'open') {
      return;
    }
    doorhanger.setAttribute('state', 'generate');
    shuffleArray(questions);
    let question = questions[question_index];
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
    shuffleArray(word_list);
    return `${word_list[0]}-${word_list[1]}-<span>${answer}</span>-${word_list[2]}`;
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
    doorhanger.setAttribute('type', 'passphrase');
    result_input.innerHTML = phrase_result;
  }
  
  let resultToggle = function(e) {
    if (e.target == password_switch) {
      result_input.innerHTML = password_result;
      doorhanger.setAttribute('type', 'password');
    } else {
      result_input.innerHTML = phrase_result;
      doorhanger.setAttribute('type', 'passphrase');
    }
  }
  
  document.getElementById('options').onclick = function() {
    if (doorhanger.getAttribute('options') == 'true') {
      doorhanger.removeAttribute('options');
    } else {
      doorhanger.setAttribute('options', 'true');
    }
  }
  
  let newEntryFilled = function() {
    final_password = result_input.innerText;
    doorhanger.setAttribute('state', 'new-entry');
    password_input.value = final_password;
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
  
  change_q.onclick = function() {
    question_index++;
    if (question_index >= questions.length) {
      question_index = 0;
    }
    prompt.innerHTML = questions[question_index];
  }

  go_back.onclick = function() {
    doorhanger.setAttribute('state', 'entrylist');
  }
  document.getElementById('eye').onclick = function(e) {
    if (password_input.getAttribute('type') == 'password') {
      password_input.setAttribute('type', 'text');
    } else {
      password_input.setAttribute('type', 'password');
    }
  }
  
  document.getElementById('save-entry').onclick = function(){
    doorhanger.setAttribute('state', 'confirmation');
  }
  
  use_this.onclick = newEntryFilled;
  password_switch.onclick = resultToggle;
  passphrase_switch.onclick = resultToggle;
  continue_button.onclick = submitAnswer;
  generate.onclick = showPrompt;
  new_button.onclick = createnewEntry;
  lb_icon.onclick = toggleDoorHanger; 
}


document.addEventListener('DOMContentLoaded', runTest, false);
