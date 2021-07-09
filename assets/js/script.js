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
let page=1;

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
        //sort all movies by vote count in provided genres on this page.. api only allows 1 page with 20 results per fetch
        `https://api.themoviedb.org/3/discover/movie?api_key=eb7b39196026d99a9bb9dd30201f9b64&sort_by=vote_count.desc&with_genres=${genres}`
    )
        .then((value) => value.json())
        .then((value) => {
            console.log(value);
            
            document.getElementById('results').innerHTML = value.total_results
        });
}
function getGenres() {
    theseGenres = "";
  
    var splitStr = genres.split(",");
    for (var i = 0; i < splitStr.length; i++) {
      possibleGenres.forEach((item) => {
        if (item.id == splitStr[i].substring()) {
          theseGenres += " " + item.name;
        }
      });
    }
  }
  let changed=false;
  // render city & conditions in modal window
  function populateIntroModal() {
    //function to changes genre id number to its corisponding name ie 18 ---->drama
    getGenres();
  numberMovie()
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
        
      populateIntroModal(genres);
    });
  
    
    $("#close").on("click", () => {
      document.getElementById("modal-1").style.display = "none";
     
      
      pickMovie();
    });
  }

function pickMovie() {

    
  //genre is a id number ie drama has a id of '18'---> id is string

 
 

  
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
      whichMovie = Math.floor(Math.random() * (value.results.length -1));
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
  console.log("in checkmovie genre is " +genres);
  if (seen >= movieValue.results.length -1) {
    console.log("page full");
    page++;
   
  }
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
      if(posterPath){
      $("#poster").html(`
      <img class = "pure-img" src="http://image.tmdb.org/t/p/w342/${posterPath}" />`);
      }else{$("#poster").html(`
      <img class = "pure-img" src="./assets/placehold.png" />`);}
      
      //fill iframe
      let youtubeKey = "";
      
      if (!((value.videos.results.length))){
          console.log("no video");document.getElementById("iframe").src =""}
      else{
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
      }
      //fill cast
      let cast = [];
      for (let i = 0; i < 5; i++) {
        if(!(value.credits.cast[i])){
            cast.push("")
        }else{cast.push(value.credits.cast[i].name)}
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
      
      
      title = value.title;
      description = value.overview;
      
      $("#movieTitle").html(title);
      $("#description").html(description);
      
      
      if (value["watch/providers"].results[country]){
      whereToWatch = value["watch/providers"].results[country];
      if (!("flatrate" in whereToWatch)) {
        $("#stream").html(" ");
        $("#stream").html("Sorry can't find a Stream");
      } else {
        $("#stream").html(" ");
        value["watch/providers"].results[country].flatrate.forEach((element) => {
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
        value["watch/providers"].results[country].rent.forEach((element) => {
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
        value["watch/providers"].results[country].buy.forEach((element) => {
          logoS = element.logo_path;
          // console.log[element];

          $("#buy").append(
            `<img src="https://image.tmdb.org/t/p/w45/${logoS}"/>`
          );
        });
      }
    }else{  $("#buy").html(" ");
    $("#buy").html("Sorry can't find a Stream");$("#rent").html(" ");
    $("#rent").html("Sorry can't find a Stream");   $("#stream").html(" ");
    $("#stream").html("Sorry can't find a Stream");}

      
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
      `<div class="pure-g"><p class="pure-u-20-24">${maybeA[item]}</p><a href="#titleMain"  class="pure-u-2-24"><button class="pure-button liInfo"><i class="fas fa-info"></i></button></a> <span class="pure-u-1-24"><button class="pure-button liTrash"><i class="fas fa-trash-alt"></i></button></span><div>`
    );
  }
  for (item in notNowA) {
    $("#notNowMain").append(
      `<div class="pure-g"><p class="pure-u-20-24">${notNowA[item]}</p><a href="#titleMain"  class="pure-u-2-24"><button class="pure-button liInfo"><i class="fas fa-info"></i></button></a> <span class="pure-u-1-24"><button class="pure-button liTrash"><i class="fas fa-trash-alt"></i></button></span><div>`
    );
  }

  $(".liTrash").click(function () {
    let val = $(this).parent().parent()[0].firstChild.textContent;
    //var val = $(this).text();
    console.log(val);
    for (var i = yesA.length - 1; i >= 0; i--) {
      if (yesA[i] === val) {
        yesA.splice(i, 1);
        console.log(yesA);
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
     console.log(location);
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
    //  console.log(notNowA);
    refreshTitles();
    pickMovie();
  });
  $("#no").click(function () {
    userHasSeenArr.push({ film: `${title}`, id: `${movie}` });
    localStorage.setItem("userHasSeenArr", JSON.stringify(userHasSeenArr));
    pickMovie();
  });