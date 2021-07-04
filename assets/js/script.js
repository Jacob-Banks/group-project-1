let movie,
  which,
  title,
  whichMovie,
  movieCheck,
  page,
  thisPageIS,
  movieValue,
  movedLi;
let userHasSeenArr = [];
//array items will be pages that the user has viewed all 20 movies that page responds with
let notThesePages = [];
let possiblePages = 1;
// openweather api key
const key = "&appid=7f412d4278c03b3c06e49f9a1ebebf0b";
// call current weather conditions
const oneCall = "https://api.openweathermap.org/data/2.5/onecall?";
// reverse geocoding to get city name for modal window
let userLocation = "http://api.openweathermap.org/geo/1.0/reverse?";
// call geographic coordinates
let lat, lon, x, genres, conditions, limit;



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
            genres = "28,9648";
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





// get current cinditions and reverse geocode city name for modal window
var getUserLocation = function() {
  fetch(userLocation + "&lat" + lat + "&lon" + lon + "&limit" + limit + key).then(
    function (response) {
      if (response.ok) {
        response.json().then(function(data) {
          // get coordinates and city name
          city = data.name
          temp = data.current.temp
          conditions = data.current.weather[0].description
          console.log(data)

        })
      }
    }
  )
}



// render city & conditions in modal window
function populateIntroModal() {

}








function pickMovie(genres) {
  page = Math.ceil(Math.random() * possiblePages); // there is no page 0
  //genre is a id number ie drama has a id of '18'---> id is string
  console.log(page + " page");
  //set the page that the api will resspond with 20 movies
  while (notThesePages.includes(page)) {
    page = Math.ceil(Math.random() * possiblePages);
  }
  console.log(page + " " + genres);

  fetch(
    //sort all movies by vote count in provided genres on this page.. api only allows 1 page with 20 results per fetch
    `http://api.themoviedb.org/3/discover/movie?api_key=eb7b39196026d99a9bb9dd30201f9b64&sort_by=vote_count.desc&with_genres=${genres}&page=${page}`
  )
    .then((value) => value.json())
    .then((value) => {
      console.log(value);

      movieValue = value;
      //get which page this is
      thisPageIS = value.page;

      //pick a random movie from this page  20 options
      whichMovie = Math.floor(Math.random() * 20);
      movie = value.results[whichMovie].id;

      //check if user has seen this movie

      // if (userHasSeenArr.includes(movie)) {
      //   checkMovie();
      // } else {
      getMovieInfo(movie);
      //}
    });
}
// function checkMovie() {
//   let seen = 0;
//   movieValue.results.forEach((element) => {
//     if (userHasSeenArr.includes(element.id)) {
//       seen++;
//     }
//   });
//   console.log(
//     "a dublicate movie was selected this page has " +
//       seen +
//       " items in user has seen array " +
//       page
//   );
//   if (seen >= 19) {
//     console.log("page full");
//     possiblePages++;
//     notThesePages.push(thisPageIS);

//     pickMovie();
//   } else {
//     pickMovie();
//   }
// }

function getMovieInfo(movie) {
  fetch(
    "https://api.themoviedb.org/3/movie/" +
      movie +
      "?api_key=eb7b39196026d99a9bb9dd30201f9b64&append_to_response=videos,images,watch/providers,credits"
  )
    .then((value) => value.json())
    .then((value) => {
      // console.log(value);
      let cast = [];
      for (let i = 0; i < 6; i++) {
        cast.push(value.credits.cast[i].name);
      }

      let youtubeKey = "";
      value.videos.results.forEach((element) => {
        if (element.type === "Trailer") {
          youtubeKey = element.key;
        }
      });

      if (!youtubeKey) {
        youtubeKey = value.videos.results[0].key;
      }
      const link = `https://www.youtube.com/embed/${youtubeKey}`;
      const posterPath = value.poster_path;
      const youtube = document.getElementById("trailer");

      const description = value.overview;
      const title = value.title;

      let logo;
      const whereToWatch = value["watch/providers"].results.CA;
      if (!("flatrate" in whereToWatch)) {
        logo = value["watch/providers"].results.CA.rent[0].logo_path;
      } else {
        logo = value["watch/providers"].results.CA.flatrate[0].logo_path;
      }

      // <ul>
      //   <li>${cast[0]}</li>
      //   <li>${cast[1]}</li>
      //   <li>${cast[2]}</li>
      //   <li>${cast[3]}</li>
      //   <li>${cast[4]}</li>
      //  </ul>

      youtube.innerHTML = `<iframe width="320" height="315"  src=${link}></iframe>`;

      $("#poster").append(`
      <img src="http://image.tmdb.org/t/p/w400/${posterPath}" />`);
      $("#movieInfo").append(`
        <h2 id="title">${title}</h2>
          <p>${description}</p>
        <h3>where to watch:</h3>
          <img src="http://image.tmdb.org/t/p/original/${logo}"/>
      `);
    });
}

// display current

$.ajax({
  url: "https://geolocation-db.com/jsonp",
  jsonpCallback: "callback",
  dataType: "jsonp",
  success: function (location) {
    lat = location.latitude;
    lon = location.longitude;
    currentWeather();
    console.log("got lat lon");
  }, // if cant find user location
  error: function () {
    console.log("error");
  },
});


