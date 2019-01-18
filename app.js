$(document).ready(function() {

var config = {
    apiKey: "AIzaSyCvpGh-fQ58a6JeauKGuvZPyUDLXB4ELUc",
    authDomain: "train-schedule-3fc68.firebaseapp.com",
    databaseURL: "https://train-schedule-3fc68.firebaseio.com",
    projectId: "train-schedule-3fc68",
    storageBucket: "train-schedule-3fc68.appspot.com",
    messagingSenderId: "376048978946"
  };
  firebase.initializeApp(config);

// Define Databse and variables
var database = firebase.database();


// Button for adding Train info
$("#submit").on("click", function() {
    event.preventDefault();

    var empName = $("#trainName").val().trim();
    var empdestination = $("#trainDestination").val().trim();
    var empTrainTime = moment($("#startTrain").val().trim(), 'HH:mm').format("X");
    var empFrequency = $("#trainFrequency").val().trim();
  

// Temporary Div to hold info
var newTrainInfo = {
   name: empName,
   destination: empdestination,
   frequency: empFrequency,
   arrival: empTrainTime 
};

// Upload user input to database
database.ref().push(newTrainInfo);

console.log(newTrainInfo.name);
console.log(newTrainInfo.destination);
console.log(newTrainInfo.frequency);
console.log(newTrainInfo.arrival);

// Clear all text boxes
$("#trainName").val("");
$("#trainDestination").val("");
$("#startTrain").val("");
$("#trainFrequency").val("");
});

// Capture the User Input
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());


  // var data = childSnapshot.val();
    // var trainNames = data.name;
    // var trainDestin = data.destination;
    // var trainFrequency = data.frequency;
    // var theFirstTrain = data.firstTrain;
    // console.log(theFirstTrain);

    // var tRemainder = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFrequency;
    
    var startTime = moment(childSnapshot.val().arrival, "X").subtract(1, "years");
    
    var diffTime = moment().diff(moment(startTime), "minutes");
    var tRemainder = diffTime % childSnapshot.val().frequency;
    console.log(tRemainder);
    var tMinutes = childSnapshot.val().frequency - tRemainder;
    console.log(tMinutes);
    var nextTrain = moment().add(tMinutes, "minutes");
    console.log(nextTrain);
    

  $("#name").append("<div><span class='member-name'>" +
childSnapshot.val().name);
$("#destination").append("<div><span class='member-name'>" +
childSnapshot.val().destination);
$("#frequency").append("<div><span class='member-name'>" +
childSnapshot.val().frequency);
$("#arrival").append("<div><span class='member-name'>" +
childSnapshot.val().nextTrain);
$("#minaway").append("<div><span class='member-name'>" + tMinutes);
}); // Ends databse.ref() function

}); // END OF JAVASCRIPT