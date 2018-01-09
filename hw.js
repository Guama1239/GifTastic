//create topics which is an array
var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret",
 "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat",
  "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
//function that when an animal button name is clicked makes an ajax method (GET) with its respective url and api
$(document).on("click", ".animal", function () {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=WfvRn8tDsMMEJINcNPe3KBLGl7Ewxrry&limit=10&offset=0&rating=G&lang=en"
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {
          // check for accurate and output data  console.log(queryURL);
          //  console.log(response);
            var results = response.data;
           // console.log("got data");
            // this for loop populates the animalDiv with the gifs obtained thru the ajax call
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.addClass("animalPic");
                animalImage.attr("data-state", "still");
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#animals").prepend(animalDiv);
            }
        })
})

// the makeButtons function populates the animals buttons by default pre defined in the topics array
function makeButtons() {
        $("#animalButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button id = addAnimal>");
            a.addClass("animal");
            a.attr("data-animal", topics[i]);
            a.text(topics[i]);
            $("#animalButtons").append(a);
        }
    }

    //Jquery obtains the value submitted on the add animal button and push its new value or name to the topics array
$("#addAnimal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    topics.push(animal);
    makeButtons();
    // Clear the textbox when done
    $("#animal-input").val("");
});
//Jquery on click method identifies when the pic or image has been clicked and performs the code to animate or not the image
$(document).on("click", ".animalPic", function () {
   // console.log("click working");
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
    }

    else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }

});
//anonymous function creates the animal buttons names predefined in topics array
makeButtons();
