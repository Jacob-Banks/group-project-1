let movie;
let btn = document.getElementById("launch");
function pickMovie(genres) {
  let page = Math.ceil(Math.random() * 10);
  fetch(
    `http://api.themoviedb.org/3/discover/movie?api_key=eb7b39196026d99a9bb9dd30201f9b64&sort_by=vote_count.desc&with_genres=${genres}&page=${page}`
  )
    .then((value) => value.json())
    .then((value) => {
      // console.log(value);

      let whichMovie = Math.floor(Math.random() * 20);
      movie = value.results[whichMovie].id;
      console.log(page + " " + whichMovie);
      getMovie(movie);

      //json response
    });
}
function getMovie(movie) {
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
      const whereToWatch = value["watch/providers"].results.CA;
      const youtubeKey = value.videos.results[0].key;
      const posterPath = value.poster_path;
      const youtube = document.getElementById("iframe");
      const descriptiion = value.overview;
      let logo;
      const title = value.title;
      if (!("flatrate" in whereToWatch)) {
        logo = value["watch/providers"].results.CA.rent[0].logo_path;
      } else {
        logo = value["watch/providers"].results.CA.flatrate[0].logo_path;
      }
      const link = `https://www.youtube.com/embed/${youtubeKey}`;
      youtube.innerHTML = `<h2>${title}</h2>
      <p>${descriptiion}</p>
      <ul>
      <li>${cast[0]}</li>
      <li>${cast[1]}</li>
      <li>${cast[2]}</li>
      <li>${cast[3]}</li>
      <li>${cast[4]}</li>
      </ul>
      <iframe width="420" height="315"  src=${link}>
        </iframe>
        <img src="http://image.tmdb.org/t/p/w500/${posterPath}"/> 
        <h3>where to watch:</h3>
        <img src="http://image.tmdb.org/t/p/original/${logo}"/>
  `;
    });
}
var userGenre = document.getElementById("genre").value;
btn.addEventListener("click", () => pickMovie(userGenre));
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
