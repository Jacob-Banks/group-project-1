let movie, which, title, whichMovie, movieCheck, page, movieValue;
let yesArr = [];
let userHasSeenArr = [];
let maybeArr = [];
let notNowArr = [];
//let btn = document.getElementById("launch");
let thisPageIS;

//array items will be pages that the user has viewed all 20 movies that page responds with
let notThesePages = [];

let possiblePages = 1;

function pickMovie() {
  page = Math.ceil(Math.random() * possiblePages); // there is no page 0
  //genre is a id number ie drama has a id of '18'---> id is string
  console.log(page + " page");
  //set the page that the api will resspond with 20 movies
  while (notThesePages.includes(page)) {
    page = Math.ceil(Math.random() * possiblePages);
  }

  fetch(
    //sort all movies by vote count in provided genres on this page.. api only allows 1 page with 20 results per fetch
    `http://api.themoviedb.org/3/discover/movie?api_key=eb7b39196026d99a9bb9dd30201f9b64&sort_by=vote_count.desc&with_genres=18&page=${page}`
  )
    .then((value) => value.json())
    .then((value) => {
      //console.log(value);
      movieValue = value;
      //get which page this is
      thisPageIS = value.page;

      //pick a random movie from this page  20 options
      whichMovie = Math.floor(Math.random() * 20);
      movie = value.results[whichMovie].id;

      //check if user has seen this movie

      if (userHasSeenArr.includes(movie)) {
        checkMovie();
      } else {
        getMovieInfo(movie);
      }
    });
}
function checkMovie() {
  let seen = 0;
  movieValue.results.forEach((element) => {
    if (userHasSeenArr.includes(element.id)) {
      seen++;
    }
  });
  console.log(
    "a dublicate movie was selected this page has " +
      seen +
      " items in user has seen array " +
      page
  );
  if (seen > 18) {
    console.log("page full");
    possiblePages++;
    notThesePages.push(thisPageIS);

    pickMovie();
  } else {
    pickMovie();
  }
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
      const youtube = document.getElementById("iframe");
      const description = value.overview;
      const title = value.title;

      let logo;
      const whereToWatch = value["watch/providers"].results.CA;
      if (!("flatrate" in whereToWatch)) {
        logo = value["watch/providers"].results.CA.rent[0].logo_path;
      } else {
        logo = value["watch/providers"].results.CA.flatrate[0].logo_path;
      }
      //

      youtube.innerHTML = ` <h2 id="title">${title}</h2>    
      <iframe width="620" height="615"  src=${link}>
      </iframe>
      <img src="http://image.tmdb.org/t/p/w500/${posterPath}"/> 
      <p>${description}</p>
      <ul>
        <li>${cast[0]}</li>
        <li>${cast[1]}</li>
        <li>${cast[2]}</li>
        <li>${cast[3]}</li>
        <li>${cast[4]}</li>
       </ul>
      <h3>where to watch:</h3>
        <img src="http://image.tmdb.org/t/p/original/${logo}"/>
      `;
    });
}

$(document).ready(function () {
  $("ul.tabs a").click(function () {
    $(".pane div").hide();
    $($(this).attr("href")).show();
    return false;
  });
});
function fillList() {
  $("#tab1").html(" ");
  $("#tab2").html(" ");
  $("#tab3").html(" ");
  for (item in yesArr) {
    $("#tab1").append(`<p>${yesArr[item]}</p>`);
  }
  for (item in maybeArr) {
    $("#tab2").append(`<p>${maybeArr[item]}</p>`);
  }
  for (item in notNowArr) {
    $("#tab3").append(`<p>${notNowArr[item]}</p>`);
  }
}
function setList() {
  title = document.getElementById("title").textContent;

  // console.log(title + " " + which);

  if (which == "yes") {
    yesArr.push(title);
  }
  if (which == "maybe") {
    maybeArr.push(title);
  }
  if (which == "notNow") {
    notNowArr.push(title);
  }
  userHasSeenArr.push(movie);
  // console.log(
  //   yesArr +
  //     " are in yes " +
  //     maybeARR +
  //     " are in maybe " +
  //     notnowARR +
  //     " are in notnow "
  // );
  fillList();
  pickMovie();
  //pickMovie(userGenre);
}

$("#yes").on("click", function () {
  which = $(this).attr("id");
  setList();
});
$("#maybe").on("click", function () {
  which = $(this).attr("id");
  setList();
});
$("#notNow").on("click", function () {
  which = $(this).attr("id");
  setList();
});
$("#no").on("click", function () {
  which = $(this).attr("id");
  setList();
});

pickMovie();

//var userGenre = document.getElementById("genre").value;
//btn.addEventListener("click", () => pickMovie(userGenre));
// $.ajax({
//   url: "https://geolocation-db.com/jsonp",
//   jsonpCallback: "callback",
//   dataType: "jsonp",
//   success: function (location) {
//     //console.log(location);
//     city = location.city;
//     lat = location.latitude;
//     lon = location.longitude;
//   }, // if cant find user location
//   error: function () {
//     currentForecast("Paris");
//   },
// });
// });
// / 0: {id: 28, name: "Action"}
// 1: {id: 12, name: "Adventure"}
// 2: {id: 16, name: "Animation"}
// 3: {id: 35, name: "Comedy"}
// 4: {id: 80, name: "Crime"}
// 5: {id: 99, name: "Documentary"}
// 6: {id: 18, name: "Drama"}
// 7: {id: 10751, name: "Family"}
// 8: {id: 14, name: "Fantasy"}
// 9: {id: 36, name: "History"}
// 10: {id: 27, name: "Horror"}
// 11: {id: 10402, name: "Music"}
// 12: {id: 9648, name: "Mystery"}
// 13: {id: 10749, name: "Romance"}
// 14: {id: 878, name: "Science Fiction"}
// 15: {id: 10770, name: "TV Movie"}
// 16: {id: 53, name: "Thriller"}
// 17: {id: 10752, name: "War"}
// 18: {id: 37, name: "Western"}//
