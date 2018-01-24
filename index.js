// prevent form from being submitted
$('#quiz-form').on("click", function(e){
  e.preventDefault();
});

  
const quizQuestions = [
  { 
    question: 'What type of galaxy is the most common in the universe?',
  answers: ['Elliptical', 'Spiral', 'Irregular','Square'
  ],
  correctChoice: '0'
  },
  
  { 
    question: 'How old is the universe in light years? (Plus or minus 1 billion light years.)',
    answers: ['1 billion','15 billion','20 billion','13.8 billion'
    ],
    correctChoice: '3'
  },
  
  {
    question: 'How many planets are in the Solar System?',
    answers: ['0','9','10','8'
    ],
    correctChoice: '3'
  },
  {
    question: 'What is the largest planet in our solar system?',
    answers: ['Moon','Earth','Pluto','Jupiter'],
    correctChoice:'3'
  },
  {question:'What is the smallest planet in our solar system?',
    answers:['Mercury', 'Jupiter','Mars','Pluto'],
    correctChoice:'0'
  },
  {
    question:'Which year was the first exoplanet discovered in?',
    answers:['1996','1994','1995','2018'],
    correctChoice:'2'
  },
  {
    question:'What is the most common type of star found in the Milky Way?',
    answers:['White dwarf', 'Red dwarf', 'yellow dwarf', 'Rainbow dwarf'],
    correctChoice:'1'
  },
  {
    question:'What has a gravitational pull so strong that even light cannot escape it?',
    answers:['Earth','Mars','A black hole','A star'],
    correctChoice:'2'
  },
  {
    question:'Which NASA space flight was the last manned mission to the moon?',

    answers:['Apollo 17', 'Oceans 13', 'Oceans 12','Oceans 11'],
    correctChoice:'0'
  },
  {
    question:'Which way does Earth spin?',
    answers:['From east to west','From west to east','From left to right','From up to down'],
    correctChoice:'1'
  }
  
 ];
 
correctChoice = 0; 
var currentQuestionNum = 0 ; // set to first question
var points = 0;
var totalQuestions = quizQuestions.length;
quizOver= false; 

$(document).ready(function(){
  $(document).find('#quiz-form > #results').hide();// hide results div
  
  $('#quiz-form').hide();// hide quiz-form div
  $('#startquiz').on('click', function(){
  $('#startdiv').hide();
    $('#quiz-form').show();
  });
  
  // call function displayQuestion and display first question.
  displayQuestion();
  
  // handle reset button
  $(document).find('#reset').hide(); // hide button till end of all questions.
  $('#reset').on('click',function(){
   resetQuiz(); // method to reset quiz
   // bring displayQuestion method again
    $('#startdiv').show();
    $('#quiz-form').hide();
      displayQuestion();
       $(document).find('#reset').hide();
      $(document).find("#submit").show();
      quizOver = false;
  });
  
  // handle submit button
  $('#submit').on("click", function(){
  
    if(!quizOver){
      
      answervalue = $("input[type='radio']:checked").val();
      if (answervalue === undefined){
        alert("select a choice first");
      } else{
        
        if (answervalue === quizQuestions[currentQuestionNum].correctChoice){
          points++;
          }
          currentQuestionNum++;
          if(currentQuestionNum < quizQuestions.length){
          displayQuestion();
           } 
          else{
            displayScore();
            $(document).find("#submit").hide()
            $(document).find('#reset').show().addClass('resetpos');
            
            quizOver= true;
          }
        }
    }
  });
   
  
  function displayQuestion(){
    var question = quizQuestions[currentQuestionNum].question;
  var choiceAmt = quizQuestions[currentQuestionNum].answers.length;
    $('#quizstat').html(`Question ` + (currentQuestionNum+1) +` `);
    $('.quizquestion').text(question);

   $('.answerList').empty();
    var choice;
    for(var i=0; i < choiceAmt; i++){
      choice = quizQuestions[currentQuestionNum].answers[i];
      $(`<li>
      <input type='radio' name="ansbttns" value=` + i + ` class="option-input">`+ choice + 
      `</br>` + 
      `</li>`).appendTo('.answerList');
      
    }
  }
  
  function resetQuiz(){
    currentQuestionNum = 0;
    correctChoice = 0;
    points = 0;
    hideScore();
  }
  
  function displayScore(){
    $(document).find('#quiz-form > #results').text('you scored ' + points + " out of " + quizQuestions.length);
    $(document).find('#quiz-form > #results').show();
  }
  
  function hideScore(){
    $(document).find("#quiz-form > #results").hide();
  }
  
});
