// Initialize Firebase
var config = {
    apiKey: "AIzaSyCEkC4CfI0aI1_oCbLNDxuqjFaczr0-Y2o",
    authDomain: "travel-app-623cb.firebaseapp.com",
    databaseURL: "https://travel-app-623cb.firebaseio.com",
    projectId: "travel-app-623cb",
    storageBucket: "",
    messagingSenderId: "532694120783"
  };
   firebase.initializeApp(config);
  //import 'firebase/database';
// Create a variable to reference the database
var database = firebase.database();
//Captures data from html from mouse click
  $("#travel").on("click", function(event){
      console.log("click");
    event.preventDefault();
    //get data from form
    var destination = $("#destination").val().trim(); //we don't need the destination button
    var budget = $("#budget").val().trim();
    var departure = $("#departure").val().trim();
    var returnDate = $("#returnDate").val().trim();
        //the push to database
        database.ref().push({
          destination: destination,
          budget: budget,
          departure: departure,
          returnDate: returnDate,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      window.location = "travelappbuttontest.hmtl.html";
 });
// Firebase watcher + initial loader
  database.ref().on("child_added", function(childSnapshot) {
    var newDestination = childSnapshot.val().destination; 
    var newBudget = childSnapshot.val().budget;
    var newDeparture= childSnapshot.val().departure;
    var newReturnDatea = childSnapshot.val().returnDate; //rename or remove a from var. see note below about var name
    // TODO:  Pass this into getIdeas
    if(window.location.href.indexOf("travelappbuttontest.hmtl.html") > -1){ getIdeas(); }
    // console.log(budget);
    // console.log(destination);
  });
  //API KEYS
var APIKeyAmadeus = "OfvxhHXHyaJilRi9PxAyZTudLjmcQe1c";
var APIKeyWeather = "db42f791787c1b0ce33f7b05f03ae690";
var APIKeyAviation = "4b6f40-91d38d-01a1f1-d4c66b-182e26";
// VARIABLES - GLOBAL SCOPE - may not need these & they are NOT hooked to anything right now
var newDestinationCity = ""; //pull from firebase database & need to convert city to IATA code for API search
var newDepartureDate = "";  //pull from firebase database & verify date format from html will work for API
var newReturnDate = ""; // pull from firebase & verify date formate from html will work & very this var name won't conflict with same var above
var newBudgetAmt = ""; // pull from firebase
//need to add search information from button capture to the ajax call below
function getIdeas(){
    $.ajax({
        url: "https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey=" +APIKeyAmadeus+ "&origin=OMA&departure_date=2018-09-06--2018-09-26&duration=7--9&max_price=500",
       
        method: "GET"
        
      }).then(function(response) {
       console.log(response);
       
    //    var priceDiv = $("<div class = 'price'>");
            //for Travel
        for (var i = 0; i < response.results.length; i++) {
            var results = response.results;
            var destination = response.results[i].destination;
            var depart = response.results[i].departure_date;
            var returnDate = response.results[i].return_date;
            var prices = response.results[i].price;
            var airline = response.results[i].airline;
            var cityCode = destination;
          
// pushes the getIdeas API call to the DOM as a table - I haven't fixed the IATA codes
    $("#display").append(
        ' <tr><td>' + cityCode +
        ' </td><td>' + depart +
        ' </td><td>' + returnDate +
        ' </td><td>' + prices +
        ' </td><td>' + airline + ' </td></tr>');
        }
        
      });
    };
    // getIdeas(); //what does this do? if i take it out it breaks the code
   
    // Ajax API call to get IATA city code and exchange to City Name (DEN = Denver)
    // NOT WORKING RIGHT NOW
    function getCity(cityCode){
         $.ajax({
          url: "https://api.sandbox.amadeus.com/v1.2/location/PHX?apikey=" +APIKeyAmadeus+ "", //how to get IATA code in query
         
          method: "GET"
        }).then(function(response1) {
            console.log(response1);
        for (var i = 0; i < response1.results.length; i++) {
            var results = response1.results;
            var cityName = response.results[i].destination;
            var depart = response.results[i].departure_date;
            var returnDate = response.results[i].return_date;
            var prices = response.results[i].price;
            var airline = response.results[i].airline;
            var cityCode = destination;
        
        //for City
        var city = response1.city.name;
      //  console.log(city);
        var cityCode1 = val;
        //   console.log(cityCode1);
        //   console.log(city);
        //   console.log(val);
        getWeather(city);
        }
      });
        
    }
    // getCity();
  
    // Ajax API call to get weather information based on a city - ALREADY using 2 API calls?
//     function getWeather(val2){
//       $.ajax({
//         url: "https://api.openweathermap.org/data/2.5/weather?" + "q="+val2+ "&units=imperial&appid=" + APIKeyWeather + "",
       
//         method: "GET"
//       }).then(function(response2) {
//            // console.log(response2);
//         //for (var i = 0; i < response2.results.length; i++) {
//         var weather = response2.main.temp;
//         var low = response2.main.temp_min;
//         var high = response2.main.temp_max;
//         console.log(weather);
//        // console.log(low);
//        // console.log(high);
//        //var description = response2.weather[].description;
//        //console.log(description);
//           var newCityName = val2;
//           console.log(newCityName);
        
//     });
// //   }
  
  //   getAirline();
// }); 