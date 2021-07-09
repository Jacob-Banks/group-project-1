let movie,
  which,
  title,
  whichMovie,
  movieCheck,
  thisPageIS,
  movieValue,
  whereToWatch,
  lat,
  lon,
  x,
  country,
  newfilm,
  genres,
  conditions;
let userHasSeenArr = [];
let notNowA = [];
let yesA = [];
let maybeA = [];
var tempM;
let page = 1;

// openweather api key
const key = "&appid=7f412d4278c03b3c06e49f9a1ebebf0b";
// call current weather conditions
const oneCall = "https://api.openweathermap.org/data/2.5/onecall?";
// call geographic coordinates
let limit, temp, city, nowweather;
let possibleGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
// get current conditions
var currentWeather = function () {
  fetch(oneCall + "&lat=" + lat + "&lon=" + lon + "&units=metric" + key).then(
    function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // get coordinates
          temp = data.current.temp;
          conditions = data.current.weather[0].main;
          nowweather = data.current.weather[0].description;
          //console.log(data);

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
            genres = "18,9648,27";
          }
          // if ugly and below 0, suggest ____ genres
          if (conditions === "Ugly" && temp < 0) {
            genres = "18,53,27";
          }
          // if rain and below 0
          if (conditions === "Rain" && temp > 0) {
            genres = "10770,80,53";
          }
          // if thunderstorm and below 0
          if (conditions === "Thunderstorm" && temp > 0) {
            genres = "16,878,14";
          }
          // snow and below 0
          if (conditions === "Snow" && temp > 0) {
            genres = "14,35,16";
          }
          // if sunny and between 0-20 degree, suggest ____ genres
          if (conditions === "Clear" && temp > 0 && temp <= 20) {
            genres = "18";
          }
          // if cloudy/rainy and between 0-20 degrees, suggest ____ genres
          if (conditions === "Clouds" && temp > 0 && temp <= 20) {
            genres = "27";
          }
          // is ugly and between 0-20 degrees, suggest _____ genres
          if (conditions === "Ugly" && temp > 0 && temp <= 20) {
            genres = "878,12,14";
          }
          // if rain anf 0-20 degrees
          if (conditions === "Rain" && temp > 0 && temp <= 20) {
            genres = "18,878,12";
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
            genres = "10751,12";
          }
          // if rain and 21-30 degrees
          if (conditions === "Rain" && temp > 20 && temp <= 30) {
            genres = "14,16";
          }
          // if thunderstorms and 21-30 degrees
          if (conditions === "Thunderstorm" && temp > 20 && temp <= 30) {
            genres = "28,12";
          }
          // if sunny and 30+ degrees, suggest _____ genres
          if (conditions === "Clear" && temp >= 30) {
            genres = "35,10402";
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
            genres = "10402,10749";
          }
          // if thunderstorm and 30+
          if (conditions === "Thunderstorm" && temp >= 30) {
            genres = "35,80";
          }
          console.log(genres);
          // pickMovie(genres);
          populateIntroModal();
        });
      }
    }
  );
};
function numberMovie() {
  fetch(
    //sort all movies by vote count in provided genres
    `https://api.themoviedb.org/3/discover/movie?api_key=eb7b39196026d99a9bb9dd30201f9b64&sort_by=vote_count.desc&with_genres=${genres}`
  )
    .then((value) => value.json())
    .then((value) => {
      console.log(value);
      //display total amount of movies availible for that genre combo
      document.getElementById("results").innerHTML = value.total_results;
    });
}

function getGenres() {
  // empty these genres
  theseGenres = "";
  //split provided genres at a comma
  var splitStr = genres.split(",");
  // fill thesgenres with the name that corrisponds with genre id number
  for (var i = 0; i < splitStr.length; i++) {
    possibleGenres.forEach((item) => {
      if (item.id == splitStr[i].substring()) {
        theseGenres += " " + item.name;
      }
    });
  }
}

// render city & conditions in modal window
function populateIntroModal() {
  //function to changes genre id number to its corisponding name ie 18 ---->drama
  getGenres();
  // show amount of movies that genre combo has
  numberMovie();
  // display modal
  document.getElementById("modal-1").style.display = "block";

  // add welcome/explanation text
  $("#modal-text").html(
    `<p>Looks like it's ${nowweather} and ${temp} C*  in ${city}. Here are some movie suggestions based on that.</p>`
  );

  // display genre names
  $("#paraGenres").html("your Genres: " + theseGenres);

  // change genres based on users input via select form
  $("#submitChanges").on("click", () => {
    let a = document.getElementById("change").value;
    let b = document.getElementById("change2").value;
    let c = document.getElementById("change3").value;

    // reassign genre value
    genres = a + b + c;
    // update the modal with new genres
    populateIntroModal();
  });

  // exit modal and launch pick movie
  $("#close").on("click", () => {
    document.getElementById("modal-1").style.display = "none";
    pickMovie();
  });
}

function pickMovie() {
  fetch(
    //sort all movies by vote count in provided genres on provided page.. api only allows 1 page with 20 results per fetch
    `https://api.themoviedb.org/3/discover/movie?api_key=eb7b39196026d99a9bb9dd30201f9b64&sort_by=vote_count.desc&with_genres=${genres}&page=${page}`
  )
    .then((value) => value.json())
    .then((value) => {
      //assign response to  a var for checkmovie()
      movieValue = value;

      //pick a random movie from this page  20 options, usually
      whichMovie = Math.floor(Math.random() * (value.results.length - 1));
      // assign the resulting id to movie which passes to getMovieInfo
      movie = value.results[whichMovie].id;
      //check if user has seen this movie
      if (userHasSeenArr.some((e) => e.id == movie)) {
        checkMovie();
      } else {
        getMovieInfo(movie);
      }
    });
}
function checkMovie() {
  //assign seen to be a counter for which movies usser has seen
  let seen = 0;
  movieValue.results.forEach((element) => {
    userHasSeenArr.forEach((item) => {
      // check all availible movies to see if the user has rated them
      if (item.id == element.id) {
        seen++;
      }
    });
  });
  // if the user has seen all movies go to the next page of results
  if (seen >= movieValue.results.length - 1) {
    console.log("page full");
    page++;
  }
  //select a new movie
  pickMovie();
}

function getMovieInfo(movie) {
  fetch(
    "https://api.themoviedb.org/3/movie/" +
      movie +
      "?api_key=eb7b39196026d99a9bb9dd30201f9b64&append_to_response=videos,images,watch/providers,credits"
  )
    .then((value) => value.json())
    .then((value) => {
      // console.log(value);
      logit = value;

      //fill poster
      const posterPath = value.poster_path;
      if (posterPath) {
        $("#poster").html(`
      <img class = "pure-img" src="http://image.tmdb.org/t/p/w342/${posterPath}" />`);
      } else {
        //if no poster use placeholder img
        $("#poster").html(`
      <img class = "pure-img" src="./assets/placehold.png" />`);
      }

      //fill iframe
      let youtubeKey = "";
      // if no videos hide iframe
      if (!value.videos.results.length) {
        console.log("no video");
        document.getElementById("iframe").src = "";
      } else {
        //find the video called trailer, this shows the last video labeled trailer
        value.videos.results.forEach((element) => {
          if (element.type === "Trailer") {
            youtubeKey = element.key;
          }
        });
        //if no trailer show first video
        if (!youtubeKey) {
          youtubeKey = value.videos.results[0].key;
        }
        // assign iframe this youtube src
        const link = `https://www.youtube.com/embed/${youtubeKey}`;
        document.getElementById("iframe").src = link;
      }
      //fill cast
      let cast = [];
      //if no cast push blank, else fill cast
      for (let i = 0; i < 5; i++) {
        if (!value.credits.cast[i]) {
          cast.push("");
        } else {
          cast.push(value.credits.cast[i].name);
        }
      }

      $("#cast").html(`
      <p> Made With</p>
        <ul class="cast">
          <li>${cast[0]}</li>
          <li>${cast[1]}</li>
          <li>${cast[2]}</li>
          <li>${cast[3]}</li>
          <li>${cast[4]}</li>
        </ul>
      `);
      //get title and synopsis
      title = value.title;
      description = value.overview;
      //fill title and synopsis
      $("#movieTitle").html(title);
      $("#description").html(description);

      // set the service providers if avilible otherswise fill with placholder
      if (value["watch/providers"].results[country]) {
        whereToWatch = value["watch/providers"].results[country];
        //get stream if availible
        if (!("flatrate" in whereToWatch)) {
          $("#stream").html(" ");
          $("#stream").html("Sorry can't find a Stream");
        } else {
          $("#stream").html(" ");
          value["watch/providers"].results[country].flatrate.forEach(
            (element) => {
              logoS = element.logo_path;
              // fill stream
              $("#stream").append(
                `<img src="https://image.tmdb.org/t/p/w45/${logoS}"/>`
              );
            }
          );
        }
        //get rent if availible
        if (!("rent" in whereToWatch)) {
          $("#rent").html(" ");
          $("#rent").html("Sorry can't find a Stream");
        } else {
          $("#rent").html(" ");
          value["watch/providers"].results[country].rent.forEach((element) => {
            logoS = element.logo_path;
            //fill rent
            $("#rent").append(
              `<img src="https://image.tmdb.org/t/p/w45/${logoS}"/>`
            );
          });
        }
        //get buy if availible
        if (!("buy" in whereToWatch)) {
          $("#buy").html(" ");
          $("#buy").html("Sorry can't find a Stream");
        } else {
          $("#buy").html(" ");
          value["watch/providers"].results[country].buy.forEach((element) => {
            logoS = element.logo_path;
            //fill buy
            $("#buy").append(
              `<img src="https://image.tmdb.org/t/p/w45/${logoS}"/>`
            );
          });
        }
      } else {
        // if there is nothing in value.watch/providers fill with placeholder
        $("#buy").html(" ");
        $("#buy").html("Sorry can't find a Stream");
        $("#rent").html(" ");
        $("#rent").html("Sorry can't find a Stream");
        $("#stream").html(" ");
        $("#stream").html("Sorry can't find a Stream");
      }
    });
}
function refreshTitles() {
  //retrieve arrays from storage
  userHasSeenArr = JSON.parse(localStorage.getItem("userHasSeenArr"));
  if (userHasSeenArr == null) userHasSeenArr = [];

  notNowA = JSON.parse(localStorage.getItem("notNowA"));
  if (notNowA == null) notNowA = [];

  maybeA = JSON.parse(localStorage.getItem("maybeA"));
  if (maybeA == null) maybeA = [];

  yesA = JSON.parse(localStorage.getItem("yesA"));
  if (yesA == null) yesA = [];

  // empty current watch list
  $("#yesMain").html(" ");
  $("#maybeMain").html(" ");
  $("#notNowMain").html(" ");

  // repopulate watchlist with current arrays
  for (item in yesA) {
    $("#yesMain").append(
      `<div class="pure-g"><p class="pure-u-20-24">${yesA[item]}</p><a href="#titleMain"  class="pure-u-2-24"><button class="pure-button liInfo"><i class="fas fa-info"></i></button></a> <span class="pure-u-1-24"><button class="pure-button liTrash"><i class="fas fa-trash-alt"></i></button></span><div>`
    );
  }
  for (item in maybeA) {
    $("#maybeMain").append(
      `<div class="pure-g"><p class="pure-u-20-24">${maybeA[item]}</p><a href="#titleMain"  class="pure-u-2-24"><button class="pure-button liInfo"><i class="fas fa-info"></i></button></a> <span class="pure-u-1-24"><button class="pure-button liTrash"><i class="fas fa-trash-alt"></i></button></span><div>`
    );
  }
  for (item in notNowA) {
    $("#notNowMain").append(
      `<div class="pure-g"><p class="pure-u-20-24">${notNowA[item]}</p><a href="#titleMain"  class="pure-u-2-24"><button class="pure-button liInfo"><i class="fas fa-info"></i></button></a> <span class="pure-u-1-24"><button class="pure-button liTrash"><i class="fas fa-trash-alt"></i></button></span><div>`
    );
  }
  // event listener for if the trash btn is clicked
  $(".liTrash").click(function () {
    // get the text content of this movie list item
    let val = $(this).parent().parent()[0].firstChild.textContent;

    // check which array the item is in and delete it
    //  and update storage
    for (var i = yesA.length - 1; i >= 0; i--) {
      if (yesA[i] === val) {
        yesA.splice(i, 1);
        localStorage.setItem("yesA", JSON.stringify(yesA));
      }
    }
    for (var i = maybeA.length - 1; i >= 0; i--) {
      if (maybeA[i] === val) {
        maybeA.splice(i, 1);
        console.log(maybeA);
        localStorage.setItem("maybeA", JSON.stringify(maybeA));
      }
    }

    for (var i = notNowA.length - 1; i >= 0; i--) {
      if (notNowA[i] === val) {
        notNowA.splice(i, 1);
        console.log(notNowA);
        localStorage.setItem("notNowA", JSON.stringify(notNowA));
      }
    }
    // update the watchlist
    refreshTitles();
  });

  // event listener for if info is clicked
  // repopulate info section with this movie and remove from the watchlist

  $(".liInfo").on("click", function () {
    // get current list of all rated movies
    userHasSeenArr = JSON.parse(localStorage.getItem("userHasSeenArr"));
    // get the text of the list item
    tempM = $(this).parent()[0].previousSibling.textContent;
    // check what the index of the list item is in all watch list arrays
    let a = yesA.indexOf(tempM);
    let b = maybeA.indexOf(tempM);
    let c = notNowA.indexOf(tempM);

    //if the item isn't in array it has -1 value, if its in the array remove it
    // and update the watchlist
    if (a >= 0) {
      yesA.splice(a, 1);
      localStorage.setItem("yesA", JSON.stringify(yesA));
      refreshTitles();
    }
    if (b >= 0) {
      maybeA.splice(b, 1);
      localStorage.setItem("maybeA", JSON.stringify(maybeA));
      refreshTitles();
    }
    if (c >= 0) {
      notNowA.splice(c, 1);
      localStorage.setItem("notNowA", JSON.stringify(notNowA));
      refreshTitles();
    }
    // find the movie in user has seen array and get its id and repopulate info section with this film
    for (let i = 0; i < userHasSeenArr.length; i++) {
      if (tempM == userHasSeenArr[i].film) {
        //   console.log("  found ya");
        getMovieInfo(userHasSeenArr[i].id);
      }
    }
  });
}

// make the 3 watchlist sortable
$(".movieList").sortable({
  connectWith: $(".movieList"),
  scroll: false,
  tolerance: "pointer",
  helper: "clone",

  update: function (event) {
    // set a temparr to fill updated lists with
    let tempArr = [];
    // get the movies in the updated list push its content to temparray
    $(this)
      .children()
      .each(function () {
        var text = $(this).find("p").text().trim();
        tempArr.push(text);
        console.log(text);
      });
    //get the array it belongs/ed... does belongs first then it updates belonged
    //find which array
    let arrayName = $(this).attr("id");

    //update array and push to storage
    if (arrayName === "yesMain") {
      yesA = tempArr;
      localStorage.setItem("yesA", JSON.stringify(yesA));
    }
    if (arrayName === "maybeMain") {
      maybeA = tempArr;
      localStorage.setItem("maybeA", JSON.stringify(maybeA));
    }
    if (arrayName === "notNowMain") {
      notNowA = tempArr;
      localStorage.setItem("notNowA", JSON.stringify(notNowA));
    }
    //console.log(yesA, maybeA, notNowA);
  },
});

// on load display watchlists
refreshTitles();

// on load get users location for weather and which service providers to show
$.ajax({
  url: "https://geolocation-db.com/jsonp",
  jsonpCallback: "callback",
  dataType: "jsonp",
  success: function (location) {
    lat = location.latitude;
    lon = location.longitude;
    city = location.city;
    country = location.country_code;
    currentWeather();
    console.log(location);
  }, // if cant find user locationt
  error: function () {
    console.log("error");
  },
});

// capture the ranking button press, update arrays/watchlist and pick a new movie

$("#yes").click(function () {
  userHasSeenArr.push({ film: `${title}`, id: `${movie}` });
  yesA.push(title);
  localStorage.setItem("userHasSeenArr", JSON.stringify(userHasSeenArr));
  localStorage.setItem("yesA", JSON.stringify(yesA));
  refreshTitles();
  pickMovie();
});

$("#maybe").click(function () {
  userHasSeenArr.push({ film: `${title}`, id: `${movie}` });
  maybeA.push(title);
  localStorage.setItem("userHasSeenArr", JSON.stringify(userHasSeenArr));
  localStorage.setItem("maybeA", JSON.stringify(maybeA));
  refreshTitles();
  pickMovie();
});

$("#notNow").click(function () {
  userHasSeenArr.push({ film: `${title}`, id: `${movie}` });
  notNowA.push(title);
  localStorage.setItem("userHasSeenArr", JSON.stringify(userHasSeenArr));
  localStorage.setItem("notNowA", JSON.stringify(notNowA));
  refreshTitles();
  pickMovie();
});
$("#no").click(function () {
  userHasSeenArr.push({ film: `${title}`, id: `${movie}` });
  localStorage.setItem("userHasSeenArr", JSON.stringify(userHasSeenArr));
  pickMovie();
});
