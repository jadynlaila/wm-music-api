const mongoose = require('mongoose');


const playlistSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'must provide a playlist name'],
            maxLength: 30
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, 'could not create "createdBy"'],
          }
    }
)

module.exports = mongoose.model("Playlist", playlistSchema)