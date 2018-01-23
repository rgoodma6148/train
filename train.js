var config = {
    apiKey: "AIzaSyAnp4JgaOW2MgV8D8CkuEC-ts3LObVwp7Y",
    authDomain: "train-9d4be.firebaseapp.com",
    databaseURL: "https://train-9d4be.firebaseio.com",
    projectId: "train-9d4be",
    storageBucket: "train-9d4be.appspot.com",
    messagingSenderId: "705175785569"
  };
  firebase.initializeApp(config);

 var database = firebase.database();

 $("#add-train-btn").on("click", function(event) {
     event.preventDefault();

     var trainName = $("#train-name-input").val().trim();
     var trainDestination = $("#train-destination-input").val().trim();
     var trainTime = $("#train-time-input").val().trim();
     var trainFrequency = $("#train-frequency-input").val().trim();

var newTrain = {
   name: trainName,
   destination: trainDestination,
   time: trainTime,
   frequency: trainFrequency
};

database.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency);

$("#train-name-input").val("");
$("#train-destination-input").val("");
$("#train-time-input").val("");
$("#train-frequency-input").val("");


 });

 database.ref().on("child_added", function(childSnapshot, prevChildKey) {

   console.log(childSnapshot.val());

   var trainName = childSnapshot.val().name;
   var trainDestination = childSnapshot.val().destination;
   var trainTime = childSnapshot.val().time;
   var trainFrequency = childSnapshot.val().frequency;

   console.log(trainName);
   console.log(trainDestination);
   console.log(trainTime);
   console.log(trainFrequency);


   var trainTimePretty = moment.unix(trainTime).format("hh:mm");

   var minutesUntilNext = trainTime % trainFrequency;
   console.log("MINUTES TILL TRAIN: " + minutesUntilNext);

   var nextTrain = moment().add(minutesUntilNext, "minutes");
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh.mm"));

   $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainTimePretty + "</td><td>" + minutesUntilNext + "</td></tr>");


});
