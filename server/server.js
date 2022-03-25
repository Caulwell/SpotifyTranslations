require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");
const translate = require("@vitalets/google-translate-api");



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
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Fouund";
    translate(lyrics, {to: "en"})
        .then(response => {
            const lyricsArray = lyrics.split("\n");
            const translationArray = response.text.split("\n");

            lyricsArray.forEach((line, index) => {
                if(lyricsArray[index] === translationArray[index].trim()){
                    lyricsArray[index] = {original: line, translation: ""};
                } else {
                    lyricsArray[index] = {original: line, translation: translationArray[index].trim()};
                }
                
            });

            res.json({lyrics: lyricsArray});
        });
        
});

app.get("/definition",  (req, res) => {

    const word = req.query.word;
    const fields = "pronunciations";
    const strictMatch = "false";

    const url = `${process.env.OXFORD_BASE_URL}${word}`;

      axios.get(url, {
        headers: {
            'app_id': process.env.OXFORD_ID,
            'app_key': process.env.OXFORD_KEY
          }
      })
        .then(response => {
            console.log(response.data.results[0].lexicalEntries[0].entries);
        })
        .catch(err => {
            console.log(err);
        });

});




app.listen(3001);