//Interacting With The DOM - User Stories Feature Needs

// As a user, I should see the timer increment every second once the page has loaded.
        // create timer function setInterval 1000ms
        // pause = clearInterval

// As a user, I can manually increment and decrement the counter using the plus and minus buttons.
        // create onClick eventListener to add or subtract


// As a user, I can 'like' an individual number of the counter. 
// I should see the count of the number of 'likes' associated with that number displayed.
        // create onClick eventListener
        // output innerHTML to unordered UI list = times clicked at counter time
        // UL class = Likes

// As a user, I can pause the counter, which should:

// pause the counter
// disable all buttons except the pause button
// switch the label on the button from "pause" to "resume"
        // onClick eventListener
        // setTimeout and pause counter
        // Disable buttons (greyed out)
        // "Pause" becomes "Restart"
    


// As a user, I should be able to click the "restart" button to restart the counter and re-enable the buttons.
        // onClick eventListener to return to previous state
        // use clearTimeout() function

// As a user, I can leave comments on my game play, such as: "Wow, what a fun game this is."
        // innerHTML linked to elementID "list"



// WORKFLOW

// 1. Comments section
        //  Variables to locate IDs in DOM

const commentForm = document.getElementById("comment-form");
const commentText = document.getElementById("comment-input");
const commentSection = document.getElementById("list")

        // Variable to create comments array
const comments = [];

        // Function to make array list from comment text
const commentObject = (text) => {
    comments.push(text);
    return comments;
}

        // Function to set HTML formatting for comments list
const formatComments = (input) => {
    return input.map( comment => {
        return `<p>${comment}</p>`
    });
};

// function to display comments on webpage
const displayComments = () => {
    return commentSection.innerHTML = formatComments(comments).join("");
};

// eventListener for submitting comments to page.
commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    commentObject(commentText.value);
    e.target.reset();
    displayComments()
});

// 2. Pause to Resume to disable remaining buttons
        // set other buttons to "buttonID".disabled = true; and vice versa

// variables to locate button Id's in DOM
const pauseButton = document.getElementById("pause");
// these Id's to be 'disabled' 
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const heartButton = document.getElementById("heart");
const submitButton = document.getElementById("submit");
// commentText input variable declared globally above

// 3 - likes button will return UL list similar to todo, possibly easier than pause! (Narrator: it was not)

// DOM Variables
// heartButton variable in DOM declared above
const likesList = document.querySelector("ul.likes");

// create array to store likes
const likeArray = [];

// value for the counter
// const counterElement = document.querySelector("h1#counter"); 
const counterElement = document.getElementById("counter");
let counterValue = parseInt(counterElement.innerText);


// value for the likes
let likes = 0
// will need on counter change reset likes 
// increments the like counter on click - probably should be added to another function (e.g. likeObject)
const likeCounter = (counterVal) => {
    let repeatCounterValue = likeArray.find( array => array.counterNumber === counterVal)
    if (!!repeatCounterValue) {
        likes = parseInt(repeatCounterValue.likeNumber[0]) + 1;
    } else {
    likes++
    } 
    return likes
};

// push to likeArray Current Counter Value, current number of clicks of Like
const likeObject = (counterVal, likeVal) => {
    let repeatCounterValue = likeArray.find( array => array.counterNumber === counterVal)
    if (!!repeatCounterValue) {
       repeatCounterValue.likeNumber.splice(-1, 1, likeVal);
    } else{ 
        likeArray.push({counterNumber: counterVal, likeNumber: [likeVal]})
    } 
    return likeArray
};

// format the like output to desired text - if/else to plural the output. 
// string similar to the example (reverse engineering it) but can be shortened data-num & span tags.
const formatLikes = (input) => {
    return input.map( array => {
        if(array.likeNumber == 1) {
        return `<li> ${array.counterNumber} has been liked ${array.likeNumber} time.</li>`
        } else {
          return `<li> ${array.counterNumber} has been liked ${array.likeNumber} times.</li>`
        }
    });
};
  
// function to display likes text.

const displayLikes = () => {
    return likesList.innerHTML = formatLikes(likeArray).join("");
}

 // What I believe is happening innerHTML <li> tag to say:
    // `<li> ${counterValue} has been liked ${numberOfLikes} time(s).</li>`
    // there is some form of an if/else for numberOfLikes >1 to assign " time" or " times"
    // there is no bullet formatting, there is no sorting by liked value (feature?)
heartButton.addEventListener("click", (e) =>{
    likeCounter(counterValue); // increases likes 'score' every click.
    likeObject(counterValue, likes); // calls function to push the counters value and the likes value to the likeArray.
    displayLikes(); // calls the string format of the array, joins it together and returns it to the innerHTML
    likes = 0; // resets
});

// 4 - Counter function as everything else is dependent on it(!) 

// adds 1 to counter when called
const addToCounter = () => {
    counterValue++;
    displayCounter();
};
// displays the counter value to the webpage inner html.
const displayCounter = () => {
    return counterElement.innerHTML = counterValue
};
// sets the interval to call the addToCounter function. 
let counterInterval = setInterval(addToCounter, 1000);

// eventListener which on load calls the counter interval to start it off.
document.addEventListener("DOMContentLoaded", () => {
    counterInterval;
});

// 5 - increment decrement
    // no need to worry about going negative the example can as well!

//minus one to counter value, display the value on click.
minusButton.addEventListener("click", () =>{
    counterValue--;
    displayCounter();
});
// plus one to counter value, display the value on click.
plusButton.addEventListener("click", () => {
    counterValue++;
    displayCounter();
});

// 6 - pause and resume counter - add to the pauseResume function or pauseButton eventListener above

// pauseResume function - IF text value = pause, disable everything and change to resume ELSE enable and set pause.
const pauseResume = () => {
    if (pauseButton.innerText === "pause"){
            clearInterval(counterInterval);
            pauseButton.innerText = "resume";
            minusButton.disabled = true;
            plusButton.disabled = true;
            heartButton.disabled = true;
            submitButton.disabled = true;
            commentText.disabled = true;
    }else{
        counterInterval = setInterval(addToCounter, 1000);
        pauseButton.innerText = "pause";
        minusButton.disabled = false;
        plusButton.disabled = false;
        heartButton.disabled = false;
        submitButton.disabled = false;
        commentText.disabled = false;
    }
};

// event listener for pause button
pauseButton.addEventListener("click", (e) =>{
    pauseResume();
});
