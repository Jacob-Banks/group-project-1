// openweather api key
const key = "&appid=7f412d4278c03b3c06e49f9a1ebebf0b";
// call current weather conditions
const oneCall = "https://api.openweathermap.org/data/2.5/onecall?";
// call geographic coordinates
let lat, lon, x, genres, conditions;
let movie;

// get current conditions
var currentWeather = function () {
  fetch(oneCall + "&lat=" + lat + "&lon=" + lon + "&units=metric" + key).then(
    function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // get coordinates
          temp = data.current.temp;
          conditions = data.current.weather[0].main;
          console.log(data);

          ///// CONSOLIDATE CONDITION CODES
          // if condition response is drizzle, we call it rain
          if (conditions === "Drizzle") {
            conditions = "Rain";
          }
          // if condition response is any below, call it ugly
          if (
            conditions === "Mist" ||
            conditions === "Smoke" ||
            conditions === "Haze" ||
            conditions === "Dust" ||
            conditions === "Fog" ||
            conditions === "Sand" ||
            conditions === "Dust" ||
            conditions === "Ash"
          ) {
            conditions = "Ugly";
          }
          // if condition response is clear or sunny, call it clear
          if (conditions === "Sunny") {
            cinditions = "Clear";
          }

          ///// LINKING CONDITION WITH MOVIE GENRES
          // if sunny and below 0 degrees, suggest ____ genres
          if (conditions === "Clear" && temp < 0) {
            genres = "12,28,35";
          }
          // if cloudy/rainy and below 0, suggest ____ genres
          if (conditions === "Clouds" && temp < 0) {
            genres = "80,53,99";
          }
          // if ugly and below 0, suggest ____ genres
          if (conditions === "Ugly" && temp < 0) {
            genres = "10751,53,27";
          }
          // if rain and below 0
          if (conditions === "Rain" && temp > 0) {
            genres = "10770,80,53,10770";
          }
          // if thunderstorm and below 0
          if (conditions === "Thunderstorm" && temp > 0) {
            genres = "10749,16,878,14";
          }
          // snow and below 0
          if (conditions === "Snow" && temp > 0) {
            genres = "36,14,35,16";
          }

          // if sunny and between 0-20 degree, suggest ____ genres
          if (conditions === "Clear" && temp > 0 && temp <= 20) {
            genres = "10751,27,10752,37";
          }
          // if cloudy/rainy and between 0-20 degrees, suggest ____ genres
          if (conditions === "Clouds" && temp > 0 && temp <= 20) {
            genres = "9648,27,80";
          }
          // is ugly and between 0-20 degrees, suggest _____ genres
          if (conditions === "Ugly" && temp > 0 && temp <= 20) {
            genres = "878,12,14,878,53";
          }
          // if rain anf 0-20 degrees
          if (conditions === "Rain" && temp > 0 && temp <= 20) {
            genres = "10749,18,878,12";
          }
          //if thunderstorm and 0-20 degrees
          if (conditions === "Thunderstorm" && temp > 0 && temp <= 20) {
            genres = "27,36,99";
          }
          // if snow and 0-20 degrees
          if (conditions === "Snow" && temp > 0 && temp <= 20) {
            genres = "10770,14,80";
          }

          // if sunny and 21-30 degrees, suggest _____ genres
          if (conditions === "Clear" && temp > 20 && temp <= 30) {
            genres = "35,10402,10751,";
          }
          // if rainy/cloudy and 21-30 degrees, suggest _____ genres
          if (conditions === "Clouds" && temp > 20 && temp <= 30) {
            genres = "28,37,10402,9648";
          }
          // if ugly and 21-30, suggest _____ genres
          if (conditions === "Ugly" && temp > 20 && temp <= 30) {
            genres = "14,10751,10752,99";
          }
          // if rain and 21-30 degrees
          if (conditions === "Rain" && temp > 20 && temp <= 30) {
            genres = "10749,10751,14,16";
          }
          // if thunderstorms and 21-30 degrees
          if (conditions === "Thunderstorm" && temp > 20 && temp <= 30) {
            genres = "28,12,27,10770";
          }

          // if sunny and 30+ degrees, suggest _____ genres
          if (conditions === "Clear" && temp >= 30) {
            genres = "35,16,10751,14,10402,10770";
          }
          // if cloudy/rainy and 30+ degrees, suggest _____ genres
          if (conditions === "Clouds" && temp >= 30) {
            genres = "18,80,99";
          }
          // if ugly and 30+ degrees
          if (conditions === "Ugly" && temp >= 30) {
            genres = "27,9648,878";
          }
          // if rain and 30+
          if (conditions === "Rain" && temp >= 30) {
            genres = "10402,9648,10749";
          }
          // if thunderstorm and 30+
          if (conditions === "Thunderstorm" && temp >= 30) {
            genres = "27,35,14,18,80";
          }

          console.log(genres);
          pickMovie(genres);
        });
      }
    }
  );
};

// display current


$.ajax({
  url: "https://geolocation-db.com/jsonp",
  jsonpCallback: "callback",
  dataType: "jsonp",
  success: function (location) {
    lat = location.latitude;
    lon = location.longitude;
    currentWeather();
  }, // if cant find user location
  error: function () {
    console.log("error");
  },
});
