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
//  var oMDBUrl = "http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy";

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
} else if (userInput === "concert-this" && process.argv[3]) {
    concertThis(process.argv[3])
} else if (userInput === "do-what-it-says") {
    doWhatItSays()
}

// function for displaying Spotify info based on user input
function spotifyThisSong(response) {
    spotify.search({ type: "track", query: response }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        console.log(data);
    });
}

// axios request to OMDB API to grab and display:

function movieThis() {
    axios.get("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy").then(function (response) {

        if (response) {
            // //    * Title of the movie.
            console.log("Title: " + response.data.Title)
            // //    * Year the movie came out.
            console.log("Year: " + response.data.Year)
            // //    * IMDB Rating of the movie.
            console.log("iMDB Rating: " + response.data.Ratings[0].Value)
            // //    * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            // //    * Country where the movie was produced.
            console.log("Country: " + response.data.Country)
            // //    * Language of the movie.
            console.log("Language: " + response.data.Language)
            // //    * Plot of the movie.
            console.log("Plot: " + response.data.Plot)
            // //    * Actors in the movie.
            console.log("Actors: " + response.data.Actors)

        }

    });
}

// axios request to bandsintown API to grab and display info of the band user inputs
function concertThis() {
    var artist = process.argv[3];
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
        for (var i = 0; i < response.data.length; i++) {

            console.log("Venue Name: " + response.data[i].venue.name);
            console.log("Location: " + response.data[i].venue.city);
            console.log("Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
        }

    })
};

// function to read the random.txt file
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function read(err, data) {
        if (err) throw err;
        console.log(data)
    })
}

