const mongoose = require('mongoose');

const songSchema = new mongoose.Schema( 
    {
        name:{
            type: String, 
            required: [true, 'must provide a name for the song']
        },
        artist:{
            type: String,
            required: [true, 'must provide an artist name']
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, 'could not create "createdBy"'],
        },
        playlist: {
            type: String,
            required: [true, 'must provide a playlist name']
        }
    }
)

module.exports = mongoose.model("Song", songSchema)