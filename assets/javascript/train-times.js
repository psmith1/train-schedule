var config = {
    apiKey: "AIzaSyBpjLLBBvAHzUyTx6gy33zKH8XIDhr2A-o",
    authDomain: "timesheetproject-14ffb.firebaseapp.com",
    databaseURL: "https://timesheetproject-14ffb.firebaseio.com",
    projectId: "timesheetproject-14ffb",
    storageBucket: "timesheetproject-14ffb.appspot.com",
    messagingSenderId: "1000606389209",
    appId: "1:1000606389209:web:608489380ee262e79b3fc8",
    measurementId: "G-3HRMENMREJ"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = 0;
  var minutesAway = null;
  var nextTrain = null;


  // Capture Button Click
  $("#submitbtn").on("click", function(event) {
    event.preventDefault();
    alert("Form submitted");

    // Grabbed values from text boxes
    trainName = $("#inputTrainName").val().trim();
    destination = $("#inputDestination").val().trim();
    firstTrain = $("#inputFirstTrain").val().trim();
    frequency = $("#inputFrequency").val().trim();

    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
     });

// Create the new row
var newRow = $('<tr>').append(
    $('<td>').text(trainName),
    $('<td>').text(destination),
    $('<td>').text(frequency),
    $('<td>').text(nextTrain),
    $('<td>').text(minutesAway)

  );
  // Append the new row to the table
  calculateTime();
  $("#trainList").append(newRow);
  });

  function calculateTime() {
    console.log(frequency);

      // Assumptions
      // var tFrequency = $('<td>').text(frequency);
      // console.log(frequency);

      // Time is 3:30 AM
      // var firstTime = database.ref(firstTrain);
      // console.log(firstTime);
      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var remainder = diffTime % frequency;
      console.log(remainder);
  
      // Minute Until Train
      var minutesAway = frequency - remainder;
      console.log("MINUTES TILL TRAIN: " + minutesAway);

      //next train
      var nextTrain = moment().add(minutesAway, "minutes");
      console.log("Arrival time: " + moment(nextTrain).format("hh:mm A"));
  }


// // Firebase watcher + initial loader HINT: .on("value")
// database.ref().on("value", function(snapshot) {

//   // Log everything that's coming out of snapshot
//   console.log(snapshot.val());
//   console.log(snapshot.val().name);
//   console.log(snapshot.val().email);
//   console.log(snapshot.val().age);
//   console.log(snapshot.val().comment);

  // Change the HTML to reflect
  // $("#name-display").text(snapshot.val().nextTrain);

// }