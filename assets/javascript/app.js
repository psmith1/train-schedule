// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBpjLLBBvAHzUyTx6gy33zKH8XIDhr2A-o",
    authDomain: "timesheetproject-14ffb.firebaseapp.com",
    databaseURL: "https://timesheetproject-14ffb.firebaseio.com",
    projectId: "timesheetproject-14ffb",
    storageBucket: "timesheetproject-14ffb.appspot.com",
    messagingSenderId: "1000606389209",
    appId: "1:1000606389209:web:608489380ee262e79b3fc8",
    measurementId: "G-3HRMENMREJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Create a variable to reference the database.
let database = firebase.database();

// Initial Values
let trainName = "";
let destination = "";
let firstDeparture = null;
let arrivalTime = 0;
let frequency = 0;
let minutesAway = 0;
let newRow = {};
let newTrain = {};
// Capture Button Click
$("#submitbtn").on("click", function (event) {
    event.preventDefault();

    trainName = $("#inputTrainName").val().trim();
    destination = $("#inputDestination").val().trim();
    firstDeparture = $("#inputFirstDeparture").val().trim();
    frequency = $("#inputFrequency").val().trim();

    doMath();
    // Creates local "temporary" object for holding employee data
    newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstDeparture: firstDeparture,
        arrivalTime: moment(arrivalTime).format("hh:mm A"),
        minutesAway: minutesAway
    };
    console.log(minutesAway + "before doMath()");
    // console.log(moment(arrivalTime).format("hh:mm") + "before doMath()");
    // Uploads train data to the database

    // console.log(moment(arrivalTime).format("hh:mm") + "after doMath()");
    console.log(minutesAway + "before doMath()");
    database.ref().push(newTrain);
    // database.ref().on("child_added", function (snapshot)
    database.ref().on('child_added', function(snapshot) {
        trainName = snapshot.val().name;
        desination = snapshot.val().destination;
        frequency = snapshot.val().frequency;
        arrivalTime = snapshot.val().arrivalTime;
        minutesAway = snapshot.val().minutesAway;

        newRow = $("<tr>").append( //let
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            // $("<td>").text(firstDeparture),
            $("<td>").text(arrivalTime),
            $("<td>").text(minutesAway)
        );
        return newRow;
    });
    $("#trainList").append(newRow);

});


let doMath = function () {

    console.log(frequency);

    let firstDepartureConverted = moment(firstDeparture, "HH:mm").subtract(1, "years");
    console.log(firstDepartureConverted);

    let currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    //difference between the times
    let diffTime = moment().diff(moment(firstDepartureConverted), "minutes");
    console.log("Difference in Times: " + diffTime);

    //Time apart (remainder)
    let remainder = diffTime % frequency;
    console.log("remainder: " + remainder);

    //minute until train arrival
    minutesAway = frequency - remainder;
    console.log("Minutes until train arrival: " + minutesAway);

    //next train
    arrivalTime = moment().add(minutesAway, "minutes");
    console.log("Arrival time: " + moment(arrivalTime).format("hh:mm"));
    console.log(arrivalTime);

};