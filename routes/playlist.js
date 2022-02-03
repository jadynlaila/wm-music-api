const express = require('express')
const router = express.Router()
const {getAllPlaylists, getPlaylist, createPlaylist, updatePlaylist, deletePlaylist, addSong, getSong, editSong, deleteSong, getAllSongs} = require('../controllers/Playlist')


router.route('/').get(getAllPlaylists).post(createPlaylist)
router.route('/songs').post(addSong).get(getAllSongs)
router.route('/songs/:id').get(getSong).patch(editSong).delete(deleteSong)
router.route('/:id').get(getPlaylist).delete(deletePlaylist).patch(updatePlaylist)

module.exports = router;