require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
var oMDB = "";
var bandsInTown = "";
var userInput = process.argv[2];

switch (action) {
    case "spotify-this-song":
    spotifyThisSong();
        break;

    case "concert-this":
    concertThis();
        break;

    case "movie-this":
    movieThis();
        break

    case "do-what-it-says":
    doWhatItSays();
        break;
}
if (userInput === "spotify-this-song" && process.argv[3]) {
    spotifyThisSong(process.argv[3])
} else if (userInput === "spotify-this-song" && !process.argv[3]) {
    spotifyThisSong("The Sign")
} else if (userInput === "movie-this" && process.argv[3]) {
    movieThis(process.argv[3])
} else if (userInput === "movie-this" && !process.argv[3]) {
    movieThis("Mr. Nobody")
}

function spotifyThisSong(response) {
    spotify.search({ type: "track", query: response }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        console.log(tracks.items.album.album_type.artists);
    });
}
