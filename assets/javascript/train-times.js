// Create a variable to reference the database.
let database = firebase.database();

// Initial Values
let trainName = "";
let destination = "";
let firstDeparture = null;
let arrivalTime = 0;
let frequency = 0;
let minutesAway = 0;
let newRow = "";

// Capture Button Click
$("#submitbtn").on("click", function (event) {
    event.preventDefault();

    trainName = $("#inputTrainName").val().trim();
    destination = $("#inputDestination").val().trim();
    firstDeparture = $("#inputFirstDeparture").val().trim();
    frequency = $("#inputFrequency").val().trim();


    // Creates local "temporary" object for holding employee data
    let newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstDeparture: firstDeparture,
        arrivalTime: arrivalTime,
        minutesAway: minutesAway
    };


    // Uploads train data to the database
    doMath();
    database.ref().push(newTrain);
    database.ref().on("child_added", function () {

        $("#trainList").append(newRow);
    });

    let newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(firstDeparture),
        $("<td>").text(arrivalTime),
        $("<td>").text(minutesAway)

    );



    // database.ref().push({
    //     trainName: trainName,
    //     destination: destination,
    //     frequency: frequency,
    //     firstDeparture: firstDeparture,
    //     arrivalTime: arrivalTime,
    //     minutesAway: minutesAway
    // });



    // console.log(snapshot.val());
    // console.log(snapshot.val().trainName);
    // console.log(snapshot.val().destination);
    // console.log(snapshot.val().firstDeparture);
    // console.log(snapshot.val().arrivalTime);
    // console.log(snapshot.val().frequency);
    // console.log(snapshot.val().minutesAway);
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

};