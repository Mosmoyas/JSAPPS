

let questionCounts = document.querySelector(".count span"),
    spanContainer = document.querySelector('.bullets .spans'),
    quizArea = document.querySelector('.quiz-area'),
    answersArea = document.querySelector('.answers-area'),
    SubmitButton = document.querySelector('.submit-button'),
    result = document.querySelector('.results'),
    bullets = document.querySelector('.bullets'),
    countownElement = document.querySelector('.countdown');


//Set variables
let currentIndex = 0;
let right_Answers = 0;
let answer;


function getQuestions() {
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.onreadystatechange = () => {
        if (xhrRequest.readyState === 4 && xhrRequest.status === 200) {
            let questions = JSON.parse(xhrRequest.responseText);
            let count = questions.length;
            //Create the Questions container with the questions
            createQuestionItem(questions[currentIndex], count);
            //Create bullest
            generateBullets(count);
            // start duration
            countdown(5, count)
            //click on submit answer button
            SubmitButton.onclick = () => {
                let rightAnswer = questions[currentIndex].right_answer;
                //increase the index by 1
                currentIndex++;
                //check the answer
                checkAnswer(rightAnswer, count);
                //remove the previous question
                quizArea.innerHTML = '';
                answersArea.innerHTML = "";
                //add the the next question
                createQuestionItem(questions[currentIndex], count);
                handleSpans();
                //clear interval
                clearInterval(countdownInterval);

                // start duration
                countdown(5, count)
                showResults(count);
            }  
        }
}
    xhrRequest.open("GET", "/data/quiz.json", true)
    xhrRequest.send();
}
getQuestions();
// funtion to generate bullets depending on the number of questions
function generateBullets(num) {
    //show the number of the question on page
    questionCounts.innerHTML = num;
    //making loop to create the spans according to the number of questions
    for (let i = 0; i < num; i++) {
        let qSpan = document.createElement('span');
        // set the first element of spans with the class on 
        if (i === 0) qSpan.className = "on";
        spanContainer.appendChild(qSpan)
    }
}

function createQuestionItem(obj, count) {
    if (currentIndex < count) {
        //create the Question title
        let h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode(obj['title']));
         quizArea.append(h2)

        
        // make a loop to create the question depends on the count of the question in Json file
        for (let i = 1; i <= 4; i++) {
            // firstly create the div behalter
            let mainDiv = document.createElement('div');
            mainDiv.className = "answer";

            // secondly create the div radio button to check the answer and their properties
            let radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name='question'
            radioButton.setAttribute('id',`answer_${i}`)//=== radioButton.id = `answer_${i}`;
            radioButton.dataset.answer = obj[`answer_${i}`];
            mainDiv.appendChild(radioButton);
            if (i === 1) radioButton.checked = true;
            //create the label for every radio button
            let label = document.createElement('label');
            label.htmlFor = `answer_${i}`;//=== label.setAttribute('for', `answer_${i}`);
        
            label.appendChild(document.createTextNode(obj[`answer_${i}`]))
            mainDiv.appendChild(label)
            answersArea.appendChild(mainDiv);

        }
    }
    
}

function checkAnswer(rightAnswer, count) {
      answer = document.getElementsByName("question");
    let chosenAnswer;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].checked) chosenAnswer = answer[i].dataset.answer;
    }
    if (chosenAnswer === rightAnswer) right_Answers += 1;
}
console.log(Array.from(answer).length
)
function handleSpans() {
    let bulletsSpans = document.querySelectorAll('.bullets .spans span');
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index)=>{
        if (currentIndex === index) {
            span.className = "on";            // span.classList.add('on');
        }
    })
}
function showResults(count) {
    //currentIndex equal to count that means we are on the last question
    if (currentIndex === count) {
        //remove every thing
        quizArea.remove();
        answersArea.remove();
        SubmitButton.remove();
        bullets.remove()

        result.style.marginTop="50px"
        let grad = document.createElement('span');
        grad.style.marginTop = "20px";
    
        let gradText = '';
        if (right_Answers === count) {
            gradText = "Perfect"
            grad.className='perfect'
        } else if (right_Answers > count/2 && right_Answers < count) {
            gradText = "Good"
            grad.className='good'
        }else if (right_Answers === count/2) {
            gradText = "Passed"
            grad.className='pass'
        } else {
            gradText = "Failed"
            grad.className = 'fail'
            grad.style.color='red'
        }
        grad.appendChild(document.createTextNode(gradText));
        result.appendChild(grad)

        result.appendChild(document.createTextNode(`  | You answered ${right_Answers} of ${count}`))

        
    }
}



function countdown(duration, count) {
    // if currentIndex < count that means we are not on the last question
    if (currentIndex < count) {
        let minutes, seconds;
        countdownInterval = setInterval(() => {
             // counting the time in minutes and seconds
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
            //decoration
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            countownElement.innerHTML = `${minutes}:${seconds}`

            if (--duration < 0) {
                clearInterval(countdownInterval);
                SubmitButton.onclick();        }
        },1000);
        
    }
}
//<span class="minutes">02</span>: <span class="seconds">45</span>











