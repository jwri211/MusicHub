const mongoose = require('mongoose');

//Describes the model of a musical track and the associated database.
const TrackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
    },
    album: {
        type: String,
    },
    genre: {
        type: String,
    },
    length: {
        type: String,
    },
    released: {
        type: String,
    },
    lyrics: {
        type: String,
    }
});

const Track = mongoose.model("MusicHub", TrackSchema, 'Tracks');
module.exports = Track;