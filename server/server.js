require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const genius = require('genius-lyrics-api');
const SpotifyWebApi = require("spotify-web-api-node");
const translate = require("@vitalets/google-translate-api");
const scraper = require("./scraper.js");



const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post("/refresh", (req, res) => {

    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken
    });

    spotifyApi
        .refreshAccessToken()
        .then( data => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
        })
        .catch(() => {
            res.sendStatus(400);
        });
});

app.post("/login", (req, res) => {

    const code = req.body.code;


    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    });

    spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            });
        }).catch(() => {
            res.sendStatus(400);
        });
    
});

app.get("/lyrics", async (req, res) => {

    const options = {
        apiKey: process.env.GENIUS_TOKEN,
        title: req.query.track,
        artist: req.query.artist,
        optimizeQuery: true
    };

    const lyrics = (await genius.getLyrics(options)) || "No Lyrics Found";


    translate(lyrics, {to: "en"})
        .then(response => {
            const lyricsArray = lyrics.split("\n");
            const translationArray = response.text.split("\n");

            const trimmedLyrics = lyricsArray.map((line, index) => {
                if(line === translationArray[index].trim()){
                    return {original: line, translation: ""};
                } else {
                    return {original: line, translation: translationArray[index].trim()};
                }
            });

            const filteredSubheadings = trimmedLyrics.filter(line => {
                return line.original.charAt(0) !== '[';
            });

            res.json({lyrics: filteredSubheadings});
        });
        
});

app.get("/definition", async (req, res) => {

    const word = req.query.word;

    const definitions = await scraper.getDefinitions(word);

    res.json(definitions);

});




app.listen(3001);