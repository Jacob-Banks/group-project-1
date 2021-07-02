let yesA = [];
let maybeA = [];
let notNowA = [];



//clicks push text of title div to array
//yes button
$("#yes").click(function (event) {
        event.preventDefault();
yesA.push($(".title").text())

console.log(yesA)
console.log($(".title").text())});

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

