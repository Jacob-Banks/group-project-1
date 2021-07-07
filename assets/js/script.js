let movie,
  which,
  title,
  whichMovie,
  movieCheck,
  page,
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

//array items will be pages that the user has viewed all 20 movies that page responds with
let notThesePages = [];
let possiblePages = 1;
// openweather api key
const key = "&appid=7f412d4278c03b3c06e49f9a1ebebf0b";
// call current weather conditions
const oneCall = "https://api.openweathermap.org/data/2.5/onecall?";
// call geographic coordinates
let limit, temp, city, nowweather;

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
          populateIntroModal(genres);
        });
      }
    }
  );
};

// render city & conditions in modal window
function populateIntroModal(genres) {
  document.getElementById("modal-1").style.display = "block";
  $("#modal-text").append(
    `<p>Looks like it's ${nowweather} and ${temp} in ${city}. Here are some movie suggestions based on that.</p>`
  );

  // $("#close").on("click", pickMovie(genres));

  $("#close").on("click", () => {
    document.getElementById("modal-1").style.display = "none";
    pickMovie(genres);
  });
}

function pickMovie(genres) {
  page = Math.ceil(Math.random() * possiblePages); // there is no page 0
  //genre is a id number ie drama has a id of '18'---> id is string

  //set the page that the api will resspond with 20 movies
  while (notThesePages.includes(page)) {
    page = Math.ceil(Math.random() * possiblePages);
  }

  // console.log(page + " " + genres);

  fetch(
    //sort all movies by vote count in provided genres on this page.. api only allows 1 page with 20 results per fetch
    `https://api.themoviedb.org/3/discover/movie?api_key=eb7b39196026d99a9bb9dd30201f9b64&sort_by=vote_count.desc&with_genres=${genres}&page=${page}`
  )
    .then((value) => value.json())
    .then((value) => {
      // console.log(value);

      movieValue = value;
      //get which page this is
      thisPageIS = value.page;
      //pick a random movie from this page  20 options
      whichMovie = Math.floor(Math.random() * 20);
      movie = value.results[whichMovie].id;
      //check if user has seen this movie
      if (userHasSeenArr.some((e) => e.id == movie)) {
        checkMovie();
      } else {
        getMovieInfo(movie);
      }
      //}
    });
}
function checkMovie() {
  let seen = 0;
  movieValue.results.forEach((element) => {
    userHasSeenArr.forEach((item) => {
      if (item.id == element.id) {
        seen++;
      }
    });
  });
  console.log("in checkmovie");
  if (seen >= 19) {
    console.log("page full");
    possiblePages++;
    notThesePages.push(thisPageIS);
  }
  pickMovie(genres);
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
      document.getElementById("iframe").src = link;
      const posterPath = value.poster_path;
      title = value.title;
      description = value.overview;
      whereToWatch = value["watch/providers"].results[country];
      if (!("flatrate" in whereToWatch)) {
        $("#stream").html(" ");
        $("#stream").html("Sorry can't find a Stream");
      } else {
        $("#stream").html(" ");
        value["watch/providers"].results["CA"].flatrate.forEach((element) => {
          logoS = element.logo_path;
          // console.log[element];

          $("#stream").append(
            `<img src="https://image.tmdb.org/t/p/w45/${logoS}"/>`
          );
        });
      }

      if (!("rent" in whereToWatch)) {
        $("#rent").html(" ");
        $("#rent").html("Sorry can't find a Stream");
      } else {
        $("#rent").html(" ");
        value["watch/providers"].results["CA"].rent.forEach((element) => {
          logoS = element.logo_path;
          //console.log[element];

          $("#rent").append(
            `<img src="https://image.tmdb.org/t/p/w45/${logoS}"/>`
          );
        });
      }
      if (!("buy" in whereToWatch)) {
        $("#buy").html(" ");
        $("#buy").html("Sorry can't find a Stream");
      } else {
        $("#buy").html(" ");
        value["watch/providers"].results["CA"].buy.forEach((element) => {
          logoS = element.logo_path;
          // console.log[element];

          $("#buy").append(
            `<img src="https://image.tmdb.org/t/p/w45/${logoS}"/>`
          );
        });
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

      $("#poster").html(`
      <img class = "pure-img" src="http://image.tmdb.org/t/p/w342/${posterPath}" />`);
      $("#movieTitle").html(title);
      $("#description").html(description);
    });
}
function refreshTitles() {
  userHasSeenArr = JSON.parse(localStorage.getItem("userHasSeenArr"));
  if (userHasSeenArr == null) userHasSeenArr = [];

  notNowA = JSON.parse(localStorage.getItem("notNowA"));
  if (notNowA == null) notNowA = [];

  maybeA = JSON.parse(localStorage.getItem("maybeA"));
  if (maybeA == null) maybeA = [];

  yesA = JSON.parse(localStorage.getItem("yesA"));
  if (yesA == null) yesA = [];
  $("#yesMain").html(" ");
  $("#maybeMain").html(" ");
  $("#notNowMain").html(" ");
  for (item in yesA) {
    $("#yesMain").append(
      `<div class="pure-g"><p class="pure-u-20-24">${yesA[item]}</p><a href="#titleMain"  class="pure-u-2-24"><button class="pure-button liInfo"><i class="fas fa-info"></i></button></a> <span class="pure-u-1-24"><button class="pure-button liTrash"><i class="fas fa-trash-alt"></i></button></span><div>`
    );
  }
  for (item in maybeA) {
    $("#maybeMain").append(
      `<div class="pure-g"><p class="pure-u-15-24">${maybeA[item]}</p><a href="#titleMain"  class="pure-u-2-24"><button class="pure-button liInfo"><i class="fas fa-info"></i></button></a> <span class="pure-u-1-24"><button class="pure-button liTrash"><i class="fas fa-trash-alt"></i></button></span><div>`
    );
  }
  for (item in notNowA) {
    $("#notNowMain").append(
      `<div class="pure-g"><p class="pure-u-15-24">${notNowA[item]}</p><a href="#titleMain"  class="pure-u-2-24"><button class="pure-button liInfo"><i class="fas fa-info"></i></button></a> <span class="pure-u-1-24"><button class="pure-button liTrash"><i class="fas fa-trash-alt"></i></button></span><div>`
    );
  }

  $(".liTrash").click(function () {
    let val = $(this).parent().parent()[0].firstChild.textContent;
    //var val = $(this).text();
     console.log(val);
     for(var i = yesA.length - 1; i >= 0; i--) {
       if(yesA[i] === val) {
          yesA.splice(i, 1);
          console.log(yesA);
          localStorage.setItem("yesA", JSON.stringify(yesA));
       }
   }
   for(var i = maybeA.length - 1; i >= 0; i--) {
    if(maybeA[i] === val) {
       maybeA.splice(i, 1);
       console.log(maybeA);
       localStorage.setItem("maybeA", JSON.stringify(maybeA));
    }
}

for(var i = notNowA.length - 1; i >= 0; i--) {
  if(notNowA[i] === val) {
    notNowA.splice(i, 1);
     console.log(notNowA);
     localStorage.setItem("notNowA", JSON.stringify(notNowA));
  }
}
     refreshTitles();
     
 });

  $(".liInfo").on("click", function () {
    userHasSeenArr = JSON.parse(localStorage.getItem("userHasSeenArr"));
    tempM = $(this).parent()[0].previousSibling.textContent;
    console.log(tempM);
    let a = yesA.indexOf(tempM);
    let b = maybeA.indexOf(tempM);
    let c = notNowA.indexOf(tempM);
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
    for (let i = 0; i < userHasSeenArr.length; i++) {
      if (tempM == userHasSeenArr[i].film) {
        //   console.log("  found ya");
        getMovieInfo(userHasSeenArr[i].id);
      }
    }
  });
}

$(".movieList").sortable({
  connectWith: $(".movieList"),
  scroll: false,
  tolerance: "pointer",
  helper: "clone",

  update: function (event) {
    // console.log(yesA, maybeA, notNowA);
    let tempArr = [];
    $(this)
      .children()
      .each(function () {
        var text = $(this).find("p").text().trim();
        tempArr.push(text);
        console.log(text);
      });
    let arrayName = $(this).attr("id");
    //console.log(tempArr);

    //console.log(arrayName);

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

refreshTitles();
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
    // console.log("got lat lon");
  }, // if cant find user locationt
  error: function () {
    console.log("error");
  },
});

$("#yes").click(function () {
  userHasSeenArr.push({ film: `${title}`, id: `${movie}` });
  yesA.push(title);
  localStorage.setItem("userHasSeenArr", JSON.stringify(userHasSeenArr));
  localStorage.setItem("yesA", JSON.stringify(yesA));
  refreshTitles();
  pickMovie(genres);
});

$("#maybe").click(function () {
  userHasSeenArr.push({ film: `${title}`, id: `${movie}` });
  maybeA.push(title);
  localStorage.setItem("userHasSeenArr", JSON.stringify(userHasSeenArr));
  localStorage.setItem("maybeA", JSON.stringify(maybeA));
  refreshTitles();
  pickMovie(genres);
});

$("#notNow").click(function () {
  userHasSeenArr.push({ film: `${title}`, id: `${movie}` });
  notNowA.push(title);
  localStorage.setItem("userHasSeenArr", JSON.stringify(userHasSeenArr));
  localStorage.setItem("notNowA", JSON.stringify(notNowA));
  //  console.log(notNowA);
  refreshTitles();
  pickMovie(genres);
});
$("#no").click(function () {
  userHasSeenArr.push({ film: `${title}`, id: `${movie}` });
  localStorage.setItem("userHasSeenArr", JSON.stringify(userHasSeenArr));
  pickMovie(genres);
});
