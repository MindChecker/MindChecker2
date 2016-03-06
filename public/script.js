var form = document.getElementById('ta-form');
var wholeForm = $("#whole-form");
var newFormButton = document.getElementById('new-form');
var pdfButton  = $("#pdf");
var questions = ["personal-appearance","appearance-others","likes","dislikes","strengths"];

var score = 0;

document.getElementsByClassName('button')[0].addEventListener('click', function(e){
    console.log('clicked');
    document.getElementsByClassName('q1')[0].classList.add('hidden');
    document.getElementsByClassName('q2')[0].classList.remove('hidden');
    if(allFilled()){
        getAnswers(form);
    }
});

document.getElementsByClassName('button')[1].addEventListener('click', function(e){
    console.log('clicked');
    document.getElementsByClassName('q2')[0].classList.add('hidden');
    document.getElementsByClassName('q3')[0].classList.remove('hidden');
    if(allFilled()){
        getAnswers(form);
    }
});

document.getElementsByClassName('button')[2].addEventListener('click', function(e){
    console.log('clicked');
    document.getElementsByClassName('q3')[0].classList.add('hidden');
    document.getElementsByClassName('q4')[0].classList.remove('hidden');
    if(allFilled()){
        getAnswers(form);
    }
});

document.getElementsByClassName('button')[3].addEventListener('click', function(e){
    console.log('clicked');
    document.getElementsByClassName('q4')[0].classList.add('hidden');
    document.getElementsByClassName('q5')[0].classList.remove('hidden');
    if(allFilled()){
        getAnswers(form);
    }
});

document.getElementsByClassName('button')[3].addEventListener('click', function(e){
    console.log('clicked');
    document.getElementsByClassName('q4')[0].classList.add('hidden');
    document.getElementsByClassName('q5')[0].classList.remove('hidden');
    if(allFilled()){
        getAnswers(form);
    }
});

document.getElementsByClassName('button')[4].addEventListener('click', function(e){
    console.log('clicked');
    document.getElementsByClassName('q5')[0].classList.add('hidden');
    getAnswers(form);
});

newFormButton.addEventListener("click", function(e){
  wholeForm.removeClass("hidden");
  pdfButton.addClass("hidden inactive");
  $("#new-form").addClass("hidden");
  $("#wheel-svg").remove();
  $("#detail-text").remove();
  form.reset();
});

function getAnswers(form) {
  var formAnswers = $(form).serializeArray().reduce(function(array ,element){
    var obj = {
      question:element.name,
      answer:element.value
    };
    array.push(obj);
    return array;
  },[]);
  var textNode = document.createTextNode('Your Results');
  var node = document.createElement('h1');
  node.appendChild(textNode);
  document.getElementsByClassName('qanda')[0].appendChild(node);
  formAnswers.forEach(function(x){
      var textNode = document.createTextNode(x.question + ': ' + x.answer);
      var node = document.createElement('li');
      node.appendChild(textNode);
      document.getElementsByClassName('qanda')[0].appendChild(node);
    //   score = score + x.answer;
    if(x.answer === "problem" || x.answer === "may be problem" || x.answer === "not coping well"){
        score++;
    }
  });
  console.log(score);
  if(score>0){
      var textNode = document.createTextNode("You may have a problem");
  }
  else{var textNode = document.createTextNode('You seem well, keep monitoring your health');}
  var node = document.createElement('li');
  node.classList.add('special');
  node.appendChild(textNode);
  document.getElementsByClassName('qanda')[0].appendChild(node);
  console.log(formAnswers);
  var textNode = document.createTextNode('Talk to someone');
  var butt = document.createElement('a');
  butt.href = 'helpMethods.html';
  butt.classList.add('button');
  butt.classList.add('btn');
  butt.classList.add('submit');
  butt.classList.add('col-md-offset-9');
  butt.classList.add('col-md-2');
  butt.classList.add('samsSpacing');
  butt.appendChild(textNode);
  var node = document.createElement('div');
  node.classList.add('buttonDiv');
  node.appendChild(butt);
  document.getElementsByClassName('qanda')[0].appendChild(node);
  return formAnswers;
}

// var a = document.getElementById('yourlinkId'); //or grab it by tagname etc
// a.href = "somelink url"

/*
<div class="buttonDiv">
  <button class="button btn  submit col-md-offset-9 col-md-2" type="button">NEXT</button>
</div>
*/


function allFilled(){

  var detailsFilled = Array.prototype.slice.call(document.getElementsByClassName('student-details'));
  var answeredDetails = detailsFilled.filter(function(el){
      console.log(el.value);
    return el.value;
  });
  var unansweredDetails = detailsFilled.filter(function(el){
    return !el.value;
  }).map(function(el){
    return el.name;
  });

  var questionsAnswered = questions.map(function(el){
    var answered =  Array.prototype.slice.call(document.getElementsByName(el)).filter(function(el, i){
        console.log('answered ---- ', el, i);
        // console.log(el);
      return el.checked;
    });
    return answered.length || el;
  });

  var allQuestions = questionsAnswered.filter(function(el){
    return typeof el !== 'string';
  });
  console.log(allQuestions.length === 5, 'questions is 5!!!');
  if(allQuestions.length === 5){
    return true;
  } else {
    return false;
  }
}
