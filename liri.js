require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");

var Spotify = require("node-spotify-api");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
var bandsInTownURL = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp"
var userInput = process.argv[2];
var oMDBUrl = "http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy";

var multiWord = process.argv.slice(3).join(" ");

// If-else if statements to call which function to run 
if (userInput === "spotify-this-song" && process.argv[3]) {
    spotifyThisSong(process.argv[3])
} else if (userInput === "spotify-this-song" && !process.argv[3]) {
    spotifyThisSong("The Sign")
} else if (userInput === "movie-this" && process.argv[3]) {
    movieThis(process.argv[3])
} else if (userInput === "movie-this" && !process.argv[3]) {
    movieThis("Mr. Nobody")
} else if (userInput === "conert-this" && process.argv[3]) {
    concertThis(process.argv[3])
} else if (userInput === "do-what-it-says") {
    // read file random.txt
}

function spotifyThisSong(response) {
    spotify.search({ type: "track", query: response }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        console.log(data);
    });
}

// axios request to OMDB API to grab and display:

axios.get("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy").then(
    function movieThis(response) {
        oMDBUrl.search({ })
        if (response)
        //    * Title of the movie.
            console.log(response.Title)
        //    * Year the movie came out.
            console.log(response.Year)
        //    * IMDB Rating of the movie.
            console.log(response.Rating)
        //    * Rotten Tomatoes Rating of the movie.
        //    * Country where the movie was produced.
            console.log(response.Country)
        //    * Language of the movie.
            console.log()
        //    * Plot of the movie.
        //    * Actors in the movie.
    }
)

// axios request to bandsintown API to grab and display info of the band user inputs
axios.get("https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp").then(
    function concertThis(response) {
        if (response) {
            console.log("Venue Name: " + results.value.name);
            console.log("Location: " + results.venue.city);
            console.log("Event Date: " + moment(results.datetime).format("MM/DD/YYYY"));

        }
    }
)