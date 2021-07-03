let yesA = [];
let maybeA = [];
let notNowA = [];

var storedTitle = JSON.parse(localStorage.getItem("yesA"))
console.log(storedTitle)


//clicks push text of title div to array
//yes button
$("#yes").click(function (event) {
        event.preventDefault();
yesA.push($(".title").text());
localStorage.setItem("yesA", JSON.stringify(yesA));
let yesLi = storedTitle.value;
console.log(yesLi)




console.log(yesA)
console.log($(".title").text())

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

