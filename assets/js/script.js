let yesA = [];
let maybeA = [];
let notNowA = [];



//updates, refreshes, yes List

function refreshTitles(){
    var titles =$("#yesList");
    titles.empty();
    var storedTitle = JSON.parse(localStorage.getItem("yesA"));
    if(storedTitle != null){
      for(var i = 0; i< storedTitle.length; i++){
        var title = storedTitle[i];
        titles.append("<p>"+title+"</p>");
      }
    }
  };

  function refreshTitlesM(){
    var titlesM =$("#maybeList");
    titlesM.empty();
    var storedTitleM = JSON.parse(localStorage.getItem("maybeA"));
    if(storedTitleM != null){
      for(var i = 0; i< storedTitleM.length; i++){
        var titleM = storedTitleM[i];
        titlesM.append("<p>"+titleM+"</p>");
      }
    }
  };

  function refreshTitlesN(){
    var titlesN =$("#notList");
    titlesN.empty();
    var storedTitleN = JSON.parse(localStorage.getItem("notNowA"));
    if(storedTitleN != null){
      for(var i = 0; i< storedTitleN.length; i++){
        var titleN = storedTitleN[i];
        titlesN.append("<p>"+titleN+"</p>");
      }
    }
  }
  
// title of movie needs something assigned to it
//clicks push text of title div to array
//yes button
$("#yes").click(function (event) {
        event.preventDefault();
yesA.push($("#title").text());
localStorage.setItem("yesA", JSON.stringify(yesA));
refreshTitles();
});

$("#maybe").click(function (event) {
    event.preventDefault();
maybeA.push($("#title").text());
localStorage.setItem("maybeA", JSON.stringify(maybeA));
refreshTitlesM();
});

$("#notNow").click(function (event) {
    event.preventDefault();
notNowA.push($("#title").text());
localStorage.setItem("notNowA", JSON.stringify(notNowA));
refreshTitlesN();

});



































//maybe button
$("#maybe").click(function (event) {
    event.preventDefault();
maybeA.push($(".title").text())

console.log(maybeA)
console.log($(".title").text())});

//notNow button
$("#notNow").click(function (event) {
    event.preventDefault();
notNowA.push($(".title").text())

console.log(notNowA)
console.log($(".title").text())});







//localStorage.setItem()

//localstorage.yes = JSON.stringify(yes);
//var storedYes = JSON.parse(localStorage.names);

//var storedYes = 
  
        //localStorage.setItem(timeOf, savedPlan)

